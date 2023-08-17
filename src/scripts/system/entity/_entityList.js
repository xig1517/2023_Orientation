import config from "../../config.js";
import { NPC } from "./dynamicEntity/npc.js";
import { Player } from "./dynamicEntity/player.js";
import { Entity } from "./entity.js";
import { Portal } from "./dynamicEntity/portal.js";
import { BackGround } from "./backGround.js";
export default {
    entity: [
        new Entity('leftArrow', 'ActionButtom', config.imagePath.buttom['leftArrow']),
        new Entity('rightArrow', 'ActionButtom', config.imagePath.buttom['rightArrow']),
        new Entity('interact', 'ActionButtom', config.imagePath.buttom['interact'])
    ],
    npc: [
        new NPC('NPC1', '第一個NPC'),
        new NPC('NPC2', '第二個NPC'),
        new NPC('NPC3', '第三個NPC'),
        new NPC('NPC4', '第四個NPC'),
        new NPC('NPC5', '第五個NPC')
    ],
    player: new Player('player', config.speed.player),
    portal: [
        new Portal('Portal:exit', "https://www.google.com.tw/")
    ],
    backGround: [
        new BackGround('BG:Home', undefined, 'BG:2', ['NPC1', 'NPC2', 'NPC3']),
        new BackGround('BG:2', 'BG:Home', undefined, ['Portal:exit', 'NPC4', 'NPC5'])
    ]
};
