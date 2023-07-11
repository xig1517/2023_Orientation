import config from "../../config.js";
export class Entity {
    constructor(id, className, imagePath = ' ') {
        this.id = id;
        this.className = className;
        this.imagePath = imagePath;
    }
    getId() {
        return this.id;
    }
    getPath() {
        return this.imagePath;
    }
    getElement() {
        return document.getElementById(this.id);
    }
    changePath(newPath) {
        this.getElement().style.backgroundImage = "url('" + newPath + "')";
        this.imagePath = newPath;
    }
    summon(elementType = 'img') {
        const [newEntity, game] = [document.createElement(elementType), document.getElementById('game')];
        newEntity.id = this.id;
        newEntity.className = this.className;
        game.appendChild(newEntity);
        if (typeof this.imagePath != 'undefined')
            this.changePath(this.imagePath);
    }
    kill() {
        this.getElement().remove();
    }
}
export const entityList = [
    new Entity('upArrow', 'ActionButtom', config.imagePath.buttom['upArrow']),
    new Entity('downArrow', 'ActionButtom', config.imagePath.buttom['downArrow']),
    new Entity('leftArrow', 'ActionButtom', config.imagePath.buttom['leftArrow']),
    new Entity('rightArrow', 'ActionButtom', config.imagePath.buttom['rightArrow']),
    new Entity('interact', 'ActionButtom', config.imagePath.buttom['interact'])
];
export function getEntity(id) {
    return entityList.find(entity => entity.getId() == id);
}
