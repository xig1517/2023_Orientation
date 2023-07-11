import { Entity } from "../entity.js";
export class DynamicEntity extends Entity {
    constructor(id, className, imagePath) {
        super(id, className, imagePath);
    }
    getPosition() {
        const charactorRect = this.getElement().getBoundingClientRect();
        return {
            top: charactorRect.top,
            bottom: charactorRect.bottom,
            left: charactorRect.left,
            right: charactorRect.right
        };
    }
    setPosition(x, y) {
        const charactor = this.getElement();
        charactor.style.left = x + 'px'; // left
        charactor.style.top = y + 'px'; // top
        return this;
    }
}
