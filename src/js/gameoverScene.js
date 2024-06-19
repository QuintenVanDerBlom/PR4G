import { Scene, Label, Color, FontUnit, Font, Vector, Keys } from "excalibur";
import { ScrollingBackground } from "./background";

export class GameOverScene extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine, ctx) {
        const background = new ScrollingBackground;
        this.add(background);

        const gameOverLabel = new Label({
            text: 'Game Over! Press SPACE to try again! Uw Score is opgeslagen!',
            pos: new Vector(200, 350), 
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        gameOverLabel.anchor.setTo(0.5, 0.5);
        this.add(gameOverLabel);
    }

    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene('start');
        }
    }

    onDeactivate(ctx = SceneActivationContext) {
        this.clear();
        this.onInitialize();
    }

}