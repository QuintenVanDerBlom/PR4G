import { Actor, Engine, Vector, SpriteSheet, Animation, CollisionType } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import * as ex from 'excalibur';

export class ScrollingBackground extends Actor {
    constructor() {
        super({
            pos: new Vector(1280 / 2, 720 / 2), // Center the image
            width: 1280,
            height: 720,
            anchor: new Vector(0.5, 0.5), // Center the anchor point
        });
        this.collisionType = CollisionType.Passive;
    }

    onInitialize(engine) {
        // Define the spritesheet with 4 frames in a row and 1 frame in a column (adjust these values to match your spritesheet)
        const backgroundSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.AnimatedBackground,
            grid: {
                rows: 3,
                columns: 6, // Assuming there are 4 frames in a row
                spriteWidth: 1280, // Width of each frame
                spriteHeight: 720 // Height of each frame
            }
        });

        // Create an animation from the spritesheet (using all frames for the animation)
        const backgroundAnimation = Animation.fromSpriteSheet(backgroundSpriteSheet, ex.range(0, 17), 200); // Adjust 100 to change the speed of the animation

        // Use the animation as the actor's graphics
        this.graphics.use(backgroundAnimation);
    }



    onPreUpdate(engine, delta) {
    }

    onPostDraw(ctx, delta) {
    }
}
