import { Game } from "../game.js";
import { movementEvent } from "./movement.js";
export function eventHandler() {
    window.addEventListener('DOMContentLoaded', () => {
        Game.initGame();
        [
            movementEvent
        ].forEach(event => event());
    });
}
