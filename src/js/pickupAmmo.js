import { Actor, CollisionType, Color, Vector } from "excalibur";
import { MainFish } from './mainFish.js';
import { Resources } from './resources.js'

export class AmmoPickup extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50,
            
        });

        this.collisionType = CollisionType.Passive 
    }

    onInitialize() {
        const ammo = Resources.Ammo.toSprite();
        ammo.scale = new Vector(0.1, 0.1);
        this.graphics.use(ammo);
        this.vel = new Vector(-50, 0)
    }
}