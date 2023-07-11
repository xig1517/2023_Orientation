import config from "../../../config.js";
import { DynamicEntity } from "./dynamicEntity.js";
export class Portal extends DynamicEntity {
    constructor(id, pos, actionFunc) {
        super(id, 'Portal', config.imagePath.portal);
        this.pos = pos;
        this.actionFunc = actionFunc;
        this.imagePath = config.imagePath.portal;
    }
    summon() {
        super.summon();
        this.setPosition(this.pos[0], this.pos[1]);
    }
    action() {
        this.actionFunc();
    }
}
const portalList = [
    new Portal('Portal:exit', [400, 400], function () {
        document.location.href = "https://www.google.com.tw/";
    })
];
export function getPortal(id) {
    return portalList.find(portal => portal.getId() == id);
}
