import config from "../../../config.js";
import _entityList from "../_entityList.js";
import { DynamicEntity } from "./dynamicEntity.js";
import { Game } from "../../game.js";
import { TextBox } from "../textBox.js";
export class NPC extends DynamicEntity {
    constructor(id, name, pos) {
        super(id, 'NPC', config.imagePath.npc[id]);
        this.name = name;
        this.pos = pos;
    }
    getName() {
        return this.name;
    }
    summon() {
        super.summon();
        this.setPosition(this.pos[0], this.pos[1]);
    }
    action() {
        Game.status = 'reading';
        new TextBox(this.id + '_textBox', config.story[this.id]).summon();
    }
}
export function getNPC(id) {
    return _entityList.npc.find(npc => npc.getId() == id);
}
