import _entityList from "./entity/_entityList.js";
import { getBGClass } from "./entity/backGround.js";
import { getNPC } from "./entity/dynamicEntity/npc.js";
import { getPlayer } from "./entity/dynamicEntity/player.js";
import { getPortal } from "./entity/dynamicEntity/portal.js";
export class Game {
    static initGame() {
        Game.currentBGId = 'BG:Home';
        Game.status = 'walking';
        getBGClass(Game.currentBGId).summon();
        getPlayer().summon();
        _entityList.entity.forEach(entity => entity.summon());
    }
    // 玩家的下一個位置是否在邊界之外(僅適用於玩家)
    static isOutSide(pos) {
        const [plRect, bgRect] = [
            getPlayer().getElement().getBoundingClientRect(),
            getBGClass(Game.currentBGId).getElement().getBoundingClientRect()
        ];
        if (bgRect.top >= pos.top)
            return 'up';
        if (bgRect.bottom <= (pos.top + plRect.height))
            return 'down';
        if (bgRect.left >= pos.left)
            return 'left';
        if (bgRect.right <= (pos.left + plRect.width))
            return 'right';
        return undefined;
    }
    // 轉場
    static loadFollowingBG(to) {
        const currentBG = getBGClass(Game.currentBGId);
        const nextBGId = (to == 'right' ? currentBG.getNext() : (to == 'left' ? currentBG.getLast() : undefined));
        if (typeof nextBGId == 'undefined')
            return; // 沒有上一頁或下一頁 或是不需要翻頁
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
        // 決定玩家的位置
        player.setPosition((to == 'right' ? bgRect.left + 'px' : (to == 'left' ? (bgRect.right - plRect.width) + 'px' : pos.left + 'px')), pos.top + 'px');
    }
    static interact() {
        const [player, backGround] = [
            getPlayer(),
            getBGClass(Game.currentBGId)
        ];
        const plPos = player.getPosition();
        const getEntity = (entityId) => {
            const npc = getNPC(entityId);
            if (typeof npc != 'undefined')
                return npc;
            return getPortal(entityId);
        };
        const targetEntity = backGround.getEntityList()
            .map(entityId => getEntity(entityId))
            .find(entity => {
            const entityPos = entity.getPosition();
            return !(entityPos.right < plPos.left ||
                entityPos.left > plPos.right ||
                entityPos.bottom < plPos.top ||
                entityPos.top > plPos.bottom);
        });
        if (typeof targetEntity == 'undefined')
            return;
        targetEntity.action();
        // https://codepen.io/ashimiro/pen/XWwoNG
    }
}
