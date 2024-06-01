import '../css/style.css';
import { Engine, DisplayMode } from "excalibur";
import { ResourceLoader } from './resources.js';
import { StartScene } from './startScene.js';
import { GameScene } from './gameScene.js';
import { GameOverScene } from './gameoverScene.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });

        this.start(ResourceLoader).then(() => this.setupScenes());
    }

    setupScenes() {
        const startScene = new StartScene();
        const gameScene = new GameScene();
        const gameOver = new GameOverScene();

        this.add('start', startScene);
        this.add('game', gameScene);
        this.add('gameOver', gameOver);

        this.goToScene('start');
    }
}

new Game();