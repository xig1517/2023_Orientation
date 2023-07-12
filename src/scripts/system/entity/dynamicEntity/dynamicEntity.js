import { Entity } from "../entity.js";
export class DynamicEntity extends Entity {
    constructor(id, className, imagePath) {
        super(id, className, imagePath);
    }
    getPosition() {
        const rect = this.getElement().getBoundingClientRect();
        return {
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right
        };
    }
    getSize() {
        const rect = this.getElement().getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height,
        };
    }
    setPosition(x, y) {
        const element = this.getElement();
        element.style.left = x; // left
        element.style.top = y; // top
        return this;
    }
    setSize(width, height) {
        const element = this.getElement();
        element.style.width = width;
        element.style.height = height;
    }
}
