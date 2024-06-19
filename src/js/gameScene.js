import '../css/style.css'
import { Vector, DisplayMode, Timer, Scene, EventEmitter, Actor, Label, Color, FontUnit, Font, } from "excalibur"
import { HealthDisplay } from './healthBar.js'
import { BulletCounter } from './bulletCounter.js'

import { Enemy } from './basicEnemy.js'
import { Trash } from './trash.js'
import { AmmoPickup } from './pickupAmmo.js'
import { ScrollingBackground } from './background.js'
import { Player } from './player.js'
import { AdvancedPlayer } from './advancedplayer.js'


export class GameScene extends Scene {
    width = 1280;
    height = 720;
    enemySpawnTimer = null;
    trashSpawnTimer = null;
    ammoSpawnTimer = null;
    score = 0;
    highscore;
    label = "";
    difficultyMultiplier = 1;

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
        })

    }


    onInitialize(engine, ctx) {
        this.enemySpawnTimer = new Timer({
            fcn: this.spawnEnemy.bind(this),
            interval: 5000,
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

        const player = new Player(100, 50, 1);
        this.add(player);
        const healthDisplay = new HealthDisplay(new Vector(10, 10), player);
        this.add(healthDisplay);
        const bulletCounter = new BulletCounter(new Vector(10, 30), player);
        this.add(bulletCounter)

        const player2 = new AdvancedPlayer(100, 50, 2);
        this.add(player2);
        const healthDisplay2 = new HealthDisplay(new Vector(1150, 10), player2);
        this.add(healthDisplay2);
        const bulletCounter2 = new BulletCounter(new Vector(1150, 30), player2);
        this.add(bulletCounter2);

        this.setupEventListeners(player, player2, engine);

    
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

        this.highscore = JSON.parse(localStorage.getItem("score"))
        if (localStorage.getItem("score") === null) {
            return
        } else {
            this.label2 = new Label({
                text: `Your Highscore: ${this.highscore.score}`,
                pos: new Vector(500, 30),
                color: Color.White,
                font: new Font({
                    family: 'Arial',
                    size: 32,
                    unit: FontUnit.Px,
                    color: Color.White
                })
            });
            this.add(this.label2);
        }
    }

    onPostUpdate() {
    }

    setupEventListeners(player, player2, engine) {
        player.eventEmitter.on('healthZero', () => {
            let data = {
                score: this.score
            }
            localStorage.setItem("score", JSON.stringify(data))
            engine.goToScene('gameOver'); // Transition to the Game Over scene
        });
        player2.eventEmitter.on('healthZero', () => {
            engine.goToScene('gameOver'); // Transition to the Game Over scene
        });
    }

    onDeactivate(ctx = SceneActivationContext, engine) {
        this.clear();
        
        this.score = 0;
        this.onInitialize(engine);
    }

    scoreCounter() {
        this.score += 1;
        this.label.text = `Score: ${this.score}`

        // Verhoog de moeilijkheidsgraad naarmate de score toeneemt
        if (this.score % 10 === 0) {  // Elke 50 punten, verhoog de moeilijkheidsgraad
            this.difficultyMultiplier += 0.1;  // Verhoog de moeilijkheidsgraad met 10%

            // Pas de spawn-intervallen aan
            this.enemySpawnTimer.interval = Math.max(1000, 5000 / this.difficultyMultiplier);  // Min 1 seconde
            console.log(this.enemySpawnTimer.interval)

            // Optioneel: verhoog de snelheid van vijanden
            Enemy.vel = new Vector(-50 * 2, 0);  // Verhoog vijandsnelheid met 10%

            // Debug bericht om de aanpassingen te volgen
            console.log(`Moeilijkheidsgraad verhoogd: ${this.difficultyMultiplier}`);
        }
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