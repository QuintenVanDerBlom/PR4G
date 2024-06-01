import { Actor, Engine, Vector, CollisionType } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'

export class ScrollingBackground extends Actor {
    onInitialize(engine) {
        this.graphics.use(Resources.Background.toSprite())
    }

    constructor() {
        super({
            width: 1920,
            height: 1080,
            collisionType: CollisionType.PreventCollision
        });
        this.pos = new Vector(350, 300);
        this.scrollSpeed = 50; // Speed in pixels per second
    }

    onPreUpdate(engine, delta) {
    }

    onPostDraw(ctx, delta) {
    }
}
