import { Actor, Vector, Color, Label, FontUnit, Font } from "excalibur";

export class HealthDisplay extends Actor {
    constructor(pos, mainFish) {
        super({
            pos: pos,
        });
        this.mainFish = mainFish;
        console.log(mainFish)
        this.label = new Label({
            text: `Health: ${this.mainFish.health}`,
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
        this.label.text = `Health: ${this.mainFish.health}`;
    }
}