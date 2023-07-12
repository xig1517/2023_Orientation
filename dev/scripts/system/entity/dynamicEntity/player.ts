import config from "../../../config.js";
import _entityList from "../_entityList.js";

import { Game } from "../../game.js";
import { DynamicEntity } from "./dynamicEntity.js";

export class Player extends DynamicEntity implements IPlayer {

    constructor(
        id: string,
        private speed: number
    ) {
        super(id, 'Player', config.imagePath.player.standing);
    }

    move(direction: DirectionType) {
        const player = this.getElement()

        player.style.transform = (direction == 'right' ? 'scaleX(1)' : direction == 'left' ? 'scaleX(-1)' : player.style.transform);

        let pos = this.getPosition();

        switch (direction) {
            case 'up': pos.top -= this.speed; break;
            case 'down': pos.top += this.speed; break;
            case 'left': pos.left -= this.speed; break;
            case 'right': pos.left += this.speed; break;
        }

        const result = Game.isOutSide(pos);
        if (typeof result != 'undefined') return Game.loadFollowingBG(result);

        this.setPosition(pos.left + 'px', pos.top + 'px');
        this.changePath(config.imagePath.player.running)
    }

}

export function getPlayer() {
    return _entityList.player;
}