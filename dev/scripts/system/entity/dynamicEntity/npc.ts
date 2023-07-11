import { DynamicEntity } from "./dynamicEntity.js";
import config from "../../../config.js";
import { Game } from "../../game.js";
import { TextBox } from "../textBox.js";

export class NPC extends DynamicEntity implements INPC {

    #name: string;

    constructor(id: string, name: string, private readonly pos: [number, number]) {
        super(id, 'NPC', config.imagePath.npc[id]);
        this.#name = name;
    }

    getName() {
        return this.#name;
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

const npcList = [
    new NPC('NPC:1', '第一個NPC', [100, 200])
]

export function getNPC(id: string) {
    return npcList.find(npc => npc.getId() == id);
}