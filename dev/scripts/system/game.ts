import { getBGClass } from "./entity/backGround.js";
import { NPC, getNPC } from "./entity/dynamicEntity/npc.js";
import { getPlayer } from "./entity/dynamicEntity/player.js";
import { Portal, getPortal } from "./entity/dynamicEntity/portal.js";
import { entityList } from "./entity/entity.js";

export abstract class Game {

    static currentBGId: string;
    static status: StatusType;

    static initGame() {
        Game.currentBGId = 'BG:Home';
        Game.status = 'walking';

        getBGClass(Game.currentBGId).summon();
        getPlayer().summon();
        entityList.forEach(entity => entity.summon());
    }

    // 玩家的下一個位置是否在邊界之外(僅適用於玩家)
    static isOutSide(pos: IPosition): OrNull<DirectionType> {
        const player = getPlayer();
        const [plRect, bgRect] = [
            player.getElement().getBoundingClientRect(),
            getBGClass(Game.currentBGId).getElement().getBoundingClientRect()
        ];

        if (bgRect.top >= pos.top) return 'up';
        if (bgRect.bottom <= (pos.top + plRect.height)) return 'down';
        if (bgRect.left >= pos.left) return 'left';
        if (bgRect.right <= (pos.left + plRect.width)) return 'right';

        return undefined;
    }

    // 轉場
    static loadFollowingBG(to: DirectionType) {
        const currentBG = getBGClass(Game.currentBGId);

        const nextBGId = (to == 'right' ? currentBG.getNext() : (to == 'left' ? currentBG.getLast() : undefined));
        if (typeof nextBGId == 'undefined') return; // 沒有上一頁或下一頁 或是不需要翻頁

        // 更換頁面
        currentBG.kill();
        getBGClass(Game.currentBGId = nextBGId).summon();

        // 更新玩家的位置
        const player = getPlayer();
        const [plRect, bgRect] = [
            player.getElement().getBoundingClientRect(),
            getBGClass(Game.currentBGId).getElement().getBoundingClientRect()
        ];
        const pos = player.getPosition();
        player.setPosition((to == 'right' ? bgRect.left : (to == 'left' ? bgRect.right - plRect.width : pos.left)), pos.top)
    }

    static interact() {
        const [player, backGround] = [
            getPlayer(),
            getBGClass(Game.currentBGId)
        ]
        const plPos = player.getPosition();

        const getEntity = (entityId: string): NPC | Portal => {
            const npc = getNPC(entityId);
            if (typeof npc != 'undefined') return npc;
            return getPortal(entityId);
        }

        const targetEntity =
            backGround.getEntityList()
                .map(entityId => getEntity(entityId))
                .find(entity => {
                    const entityPos = entity.getPosition();
                    return !(
                        entityPos.right < plPos.left ||
                        entityPos.left > plPos.right ||
                        entityPos.bottom < plPos.top ||
                        entityPos.top > plPos.bottom
                    );
                });

        if (typeof targetEntity == 'undefined') return;
        targetEntity.action();
        // https://codepen.io/ashimiro/pen/XWwoNG
    }
}