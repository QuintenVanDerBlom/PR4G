import { Actor, Keys, Vector, CollisionType, EventEmitter, SpriteSheet, Animation } from "excalibur";
import { Resources } from './resources.js'
import { Bullet } from "./bullet.js";
import { Enemy } from "./basicEnemy.js";
import { AmmoPickup } from "./pickupAmmo.js";
import * as ex from 'excalibur';


export class Player extends Actor {

    constructor(health, ammo, spriteType) {
        super({
            pos: new Vector(300, 300),
            width: 50,
            height: 50,
            collisionType: CollisionType.Active
        });
        this.health = health;
        this.baseAmmo = ammo;
        this.spriteType = spriteType;
        this.eventEmitter = new EventEmitter();

    }

    onInitialize() {
        //Decide if the player is 1 or 2;
        if ( this.spriteType === 1) {
            this.sprite = Resources.Player;
        } else if ( this.spriteType === 2) {
            this.sprite = Resources.Player2;
        }
        // Define the spritesheet with 4 frames in a row and 1 frame in a column (adjust these values to match your spritesheet)
        const fishSpriteSheet = SpriteSheet.fromImageSource({
            image: this.sprite,
            grid: {
                rows: 1,
                columns: 6, // Assuming there are 4 frames in a row
                spriteWidth: 500, // Width of each frame
                spriteHeight: 434 // Height of each frame
            }
        });

        // Create an animation from the spritesheet (using all frames for the animation)
        const swimAnimation = Animation.fromSpriteSheet(fishSpriteSheet, ex.range(0, 5), 200); // Adjust 100 to change the speed of the animation

        // Scale the animation to fit the actor's size
        swimAnimation.scale = new Vector(0.2, 0.2); // Adjust scale to fit the desired size

        // Use the animation as the actor's graphics
        this.graphics.use(swimAnimation);

        //Collision Check
        this.on('collisionstart', (event) => this.getHit(event))
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;
        let bulletFireDelay = 500; // milliseconds
        let lastBulletTime = 0;
        //Decide if the player is 1 or 2;
        if (this.spriteType === 1) {
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
        } else if (this.spriteType === 2) {
            //Movement Keys
            if (engine.input.keyboard.isHeld(Keys.A)) {
                xspeed = -300;
            }

            if (engine.input.keyboard.isHeld(Keys.D)) {
                xspeed = 300;
            }

            if (engine.input.keyboard.isHeld(Keys.W)) {
                yspeed = -300;
            }

            if (engine.input.keyboard.isHeld(Keys.S)) {
                yspeed = 300;
            }

            this.vel = new Vector(xspeed, yspeed);

            //Press Space to Shoot
            if (engine.input.keyboard.wasPressed(Keys.Enter)) {
                const now = Date.now();
                if (now - lastBulletTime > bulletFireDelay) {
                    this.shoot(engine);
                    lastBulletTime = now;
                }
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
        this.baseAmmo -= 1;

        const bullet = new Bullet(this.pos.x + 50, this.pos.y, 500);
        engine.add(bullet);
    }

    getHit(event, engine) {
        const otherActor = event.other;

        if (otherActor instanceof Enemy || otherActor instanceof Bullet) {
            // Collision with enemy or bullet, deduct health
            this.health -= 20;

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