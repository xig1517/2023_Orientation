import { Entity } from "../entity.js";

export abstract class DynamicEntity extends Entity implements IDynamicEntity {

    constructor(id: string, className: string, imagePath: string) {
        super(id, className, imagePath);
    }

    getPosition(): IPosition {
        const charactorRect = this.getElement().getBoundingClientRect();

        return {
            top: charactorRect.top,
            bottom: charactorRect.bottom,
            left: charactorRect.left,
            right: charactorRect.right
        }
    }

    setPosition(x: number, y: number) {
        const charactor = this.getElement();

        charactor.style.left = x + 'px'; // left
        charactor.style.top = y + 'px'; // top

        return this;
    }

}