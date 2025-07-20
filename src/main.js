import StartGame from './game/main.js';
import { adjustCanvasResolution } from './game/utils/CanvasResolutionUtil.js';

document.addEventListener('DOMContentLoaded', () => {

    const game = StartGame('game-container');

    // Adjust canvas resolution to match device pixel ratio
    adjustCanvasResolution(game.canvas);
    window.addEventListener('resize', () => adjustCanvasResolution(game.canvas));

});
