import { Actor, CollisionType, Vector } from "excalibur";
import { Resources } from './resources.js'
import { Enemy } from "./basicEnemy.js";
import { Player } from "./player.js";

export class Bullet extends Actor {
    constructor(x, y, velx) {
        super({
            x: x,
            y: y,
            width: 20,
            height: 20,
            collisionType: CollisionType.Active,
            vel: new Vector(velx, 0)
        });
    }

    onInitialize(engine) {
        // Set as the default drawing
        const bullet = Resources.Bullet.toSprite();
        bullet.scale = new Vector(0.05, 0.05);
        this.graphics.use(bullet);
        this.on('collisionstart', (event) => this.bulletHit(event))
    }

    onPreUpdate(engine, delta) {
        // Remove bullet if it goes out of screen
        if (this.pos.y < 0) {
            this.kill();
        }
    }

    bulletHit(event) {
        const otherActor = event.other;
        if (otherActor instanceof Enemy) {
            // Collision with enemy, kill
            otherActor.kill();
            this.kill();
        }

        if (otherActor instanceof Player) {
            this.kill();
        }
        if (otherActor instanceof Bullet) {
            this.kill();
        }
    }
}
