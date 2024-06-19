import { Scene, Label, Color, FontUnit, Font, Keys, Vector } from "excalibur";
import { ScrollingBackground } from "./background";

export class StartScene extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        const background = new ScrollingBackground;
        this.add(background);
        const startLabel = new Label({
            text: 'Fishy Fevers! Press SPACE to start',
            pos: new Vector(400,350),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        startLabel.anchor.setTo(0.5, 0.5);
        this.add(startLabel);
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            // Example transition to GameScene with data
            engine.goToScene('game', { data: { multiplayer: 0 } });
        } else if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            // Example transition to GameScene with data
            engine.goToScene('game', { data: { multiplayer: 1 } });
        }
    }
}