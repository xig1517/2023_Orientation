var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NPC_name;
import config from "../../../config.js";
import _entityList from "../_entityList.js";
import { DynamicEntity } from "./dynamicEntity.js";
import { Game } from "../../game.js";
import { TextBox } from "../textBox.js";
export class NPC extends DynamicEntity {
    constructor(id, name, pos) {
        super(id, 'NPC', config.imagePath.npc[id]);
        this.pos = pos;
        _NPC_name.set(this, void 0);
        __classPrivateFieldSet(this, _NPC_name, name, "f");
    }
    getName() {
        return __classPrivateFieldGet(this, _NPC_name, "f");
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
_NPC_name = new WeakMap();
export function getNPC(id) {
    return _entityList.npc.find(npc => npc.getId() == id);
}
