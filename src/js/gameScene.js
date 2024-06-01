import '../css/style.css'
import { Vector, DisplayMode, Timer, Scene, EventEmitter, Actor, Label, Color, FontUnit, Font } from "excalibur"
import { MainFish } from './mainFish.js'
import { HealthDisplay } from './healthBar.js'
import { BulletCounter } from './bulletCounter.js'

import { Enemy } from './basicEnemy.js'
import { Trash } from './trash.js'
import { AmmoPickup } from './pickupAmmo.js'
import { ScrollingBackground } from './background.js'


export class GameScene extends Scene {
    width = 1280;
    height = 720;
    enemySpawnTimer = null;
    trashSpawnTimer = null;
    ammoSpawnTimer = null;
    score = 0;
    label = "";

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
   
        })
    }

    onInitialize(engine) {
        this.enemySpawnTimer = new Timer({
            fcn: this.spawnEnemy.bind(this),
            interval: 2000,
            repeats: true
        });
        this.add(this.enemySpawnTimer);
        this.enemySpawnTimer.start();

        this.trashSpawnTimer = new Timer({
            fcn: this.spawnTrash.bind(this),
            interval: 3000,
            repeats: true
        });
        this.add(this.trashSpawnTimer);
        this.trashSpawnTimer.start();

        this.ammoSpawnTimer = new Timer({
            fcn: this.spawnAmmo.bind(this),
            interval: 10000, 
            repeats: true
        });
        this.add(this.ammoSpawnTimer);
        this.ammoSpawnTimer.start();

        this.scoreCounterTimer = new Timer({
            fcn: this.scoreCounter.bind(this),
            interval: 1000,
            repeats: true
        });
        this.add(this.scoreCounterTimer);
        this.scoreCounterTimer.start();


        const background = new ScrollingBackground;
        this.add(background);
        const player = new MainFish;
        this.add(player);
        const healthDisplay = new HealthDisplay(new Vector(10, 10), player);
        this.add(healthDisplay);
        const bulletCounter = new BulletCounter(new Vector(10, 30), player);
        this.add(bulletCounter);

        player.eventEmitter.on('healthZero', () => {
            engine.goToScene('gameOver'); // Transition to the Game Over scene
        });

        this.label = new Label({
            text: `Score: ${this.score}`,
            pos: new Vector(600, 0),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 32,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.add(this.label);
    }

    onPostUpdate() {
    }

    scoreCounter() {
        this.score += 1;
        this.label.text = `Score: ${this.score}`
    }

    spawnEnemy() {
        const randomY = Math.random() * (this.height - 50); 
        const enemy = new Enemy(this.width + 50, randomY); 
        this.add(enemy);
    }

    spawnTrash() {
        const randomY = Math.random() * (this.height - 50); 
        const trash = new Trash(this.width + 50, randomY); 
        this.add(trash);
    }

    spawnAmmo() {
        const randomY = Math.random() * (this.height - 50); 
        const ammo = new AmmoPickup(this.width + 50, randomY); 
        this.add(ammo);
    }
}