import { Actor, Color, CollisionType, Vector, Timer, Engine } from "excalibur";
import { Resources } from "./resources.js";
import { Bullet } from "./bullet.js";
import { MainFish } from "./mainFish.js";

export class Enemy extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50,
            color: Color.Red,
            collisionType: CollisionType.Active
        });
    }

    onInitialize(engine) {
        const enemy = Resources.Enemy1.toSprite();
        enemy.scale = new Vector(0.3, 0.3);
        this.graphics.use(enemy);
        this.on('collisionstart', (event) => this.getHit(event))
        this.vel = new Vector(-50, 0)

        this.enemyShootTimer = new Timer({
            fcn: () => this.shoot(engine),
            interval: 3000,
            repeats: true
        });
        engine.add(this.enemyShootTimer);
        this.enemyShootTimer.start();
    }

    onPreUpdate(engine, delta) {
        // Remove this if it goes out of screen
        if (this.pos.y < 0) {
            this.kill();
        }
    }

    shoot(engine) {
        if (this.baseAmmo < 1) {
            return;
        }

        console.log(this.baseAmmo);
        console.log("Shot")
        this.baseAmmo -= 1;

        const bullet = new Bullet(this.pos.x - 50, this.pos.y, -500);
        engine.add(bullet);
    }

    getHit(event, engine) {
        const otherActor = event.other;

        if (otherActor instanceof MainFish || otherActor instanceof Bullet) {
            // Collision with main or bullet, kill
            this.kill();
            this.enemyShootTimer.stop();
        }
    }
}
