import config from "../../../config.js";
import _entityList from "../_entityList.js";
import { DynamicEntity } from "./dynamicEntity.js";
export class Portal extends DynamicEntity {
    constructor(id, pos, directLink) {
        super(id, 'Portal', config.imagePath.portal);
        this.pos = pos;
        this.directLink = directLink;
        this.imagePath = config.imagePath.portal;
    }
    summon() {
        super.summon();
        this.setPosition(this.pos[0], this.pos[1]);
    }
    action() {
        document.location.href = this.directLink;
    }
}
export function getPortal(id) {
    return _entityList.portal.find(portal => portal.getId() == id);
}
