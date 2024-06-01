import { Actor, Vector, Color, Label, FontUnit, Font } from "excalibur";

export class BulletCounter extends Actor {
    constructor(pos, mainFish) {
        super({
            pos: pos,
        });
        this.mainFish = mainFish;
        console.log(mainFish)
        this.label = new Label({
            text: `Bullets: ${this.mainFish.baseAmmo}`,
            pos: new Vector(0, 0),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 20,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.addChild(this.label);
    }

    onPostUpdate() {
        this.label.text = `Bullets: ${this.mainFish.baseAmmo}`;
    }
}