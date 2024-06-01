import { Actor, Engine, Keys, Vector, CollisionType, EventEmitter } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import { Bullet } from "./bullet.js";
import { HealthDisplay } from './healthBar.js';
import { Enemy } from "./basicEnemy.js";
import { AmmoPickup } from "./pickupAmmo.js";

export class MainFish extends Actor {
    health = 100;
    baseAmmo = 50;

    constructor() {
        super({
            pos: new Vector(300, 300),
            width: 50,
            height: 50,
            collisionType: CollisionType.Active
        });
        this.eventEmitter = new EventEmitter();
    }

    onInitialize(engine) {
        const fishSprite = Resources.Fish.toSprite();
        fishSprite.scale = new Vector(0.3, 0.3); 
        this.graphics.use(fishSprite);
        //Collision Check
        this.on('collisionstart', (event) => this.getHit(event))
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;
        let bulletFireDelay = 500; // milliseconds
        let lastBulletTime = 0;

        //Movement Keys
        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -300;
        }

        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 300;
        }

        if (engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -300;
        }

        if (engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 300;
        }

        this.vel = new Vector(xspeed, yspeed);

        //Press Space to Shoot
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
                const now = Date.now();
                if (now - lastBulletTime > bulletFireDelay) {
                    this.shoot(engine);
                    lastBulletTime = now;
                }
        }

        //Checks if player tries to go out of bounds and prevents it
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        if (this.pos.x > engine.drawWidth) {
            this.pos.x = engine.drawWidth;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
        }
        if (this.pos.y > engine.drawHeight) {
            this.pos.y = engine.drawHeight;
        }
    }


    shoot(engine) {
        if (this.baseAmmo < 1) {
            return;
        }

        console.log(this.baseAmmo);
        console.log("Shot")
        this.baseAmmo -= 1;

        const bullet = new Bullet(this.pos.x + 50, this.pos.y, 500);
        engine.add(bullet);
    }

    getHit(event, engine) {
        const otherActor = event.other;

        if (otherActor instanceof Enemy || otherActor instanceof Bullet) {
            // Collision with enemy or bullet, deduct health
            this.health -= 20;
            console.log("Ouch! Health: ", this.health);
            otherActor.kill();
            if (this.health <= 0) {
                this.eventEmitter.emit('healthZero');
                this.health = 100;
            }
        }

        if (otherActor instanceof AmmoPickup) {
            this.baseAmmo += 5;
            otherActor.kill();
        }
    }
}