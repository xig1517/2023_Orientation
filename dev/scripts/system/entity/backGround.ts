import config from "../../config.js";

import { Entity } from "./entity.js";
import { NPC, getNPC } from "./dynamicEntity/npc.js";
import { Portal, getPortal } from "./dynamicEntity/portal.js";

class BackGround extends Entity implements IBackGround {

    constructor(
        id: string,
        private last: OrNull<string>,
        private next: OrNull<string>,
        private entityList: string[]
    ) {
        super(id, 'BG', config.imagePath.backGround[id]);
    }

    getLast() {
        return this.last;
    }

    getNext() {
        return this.next;
    }

    getEntityList() {
        return this.entityList;
    }

    summon() {
        super.summon();
        this.entityList.forEach(entityId => getEntity(entityId).summon());
    }

    kill() {
        this.entityList.forEach(entityId => getEntity(entityId).kill());
        super.kill();
    }

}

const getEntity = (entityId: string): NPC | Portal => {
    const npc = getNPC(entityId);
    if (typeof npc != 'undefined') return npc;
    return getPortal(entityId);
}

const backGroundList = [
    new BackGround('BG:Home', undefined, 'BG:2', ['NPC:1']),
    new BackGround('BG:2', 'BG:Home', undefined, ['Portal:exit'])
]

export function getBGClass(id: string) {
    return backGroundList.find(backGround => backGround.getId() == id);
}