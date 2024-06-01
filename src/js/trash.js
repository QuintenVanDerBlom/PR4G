import { Actor, Color, CollisionType, Vector } from "excalibur";
import { Resources } from './resources.js'

export class Trash extends Actor {
    enemyShootTimer = null;

    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50,
            color: Color.Blue,
            collisionType: CollisionType.PreventCollision
        });
    }
    //Draw Random Number to Decide which piece of trash spawns
    randomNumber = Math.floor(Math.random() * 3);
    turnRadius = Math.random() * 2 * Math.PI; // Random angle between 0 and 2π radians

    onInitialize(engine) {
        this.vel = new Vector(-50, 0)
        if (this.randomNumber === 0) {
            // 0 = Seaweed
            const seaweed = Resources.Seaweed.toSprite();
            seaweed.scale = new Vector(0.1, 0.1);
            this.graphics.use(seaweed);
        } else if(this.randomNumber === 1) {
            // 1 = Bottle
            const bottle = Resources.Bottle.toSprite();
            bottle.scale = new Vector(0.2, 0.2);
            this.graphics.use(bottle);
        } else if (this.randomNumber === 2) {
            // 2 = Can
            const can = Resources.Can.toSprite();
            can.scale = new Vector(0.05, 0.05);
            this.graphics.use(can);
        }
    }

    onPreUpdate(engine, delta) {
        this.rotation += this.turnRadius * delta / 1000; // Adjust rotation speed as needed
        // Remove this if it goes out of screen
        if (this.pos.y < 0) {
            this.kill();
        }
    }
}
