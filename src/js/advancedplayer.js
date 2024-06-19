import { Player } from './player.js'; // Zorg ervoor dat je het juiste pad gebruikt
import { Bullet } from './bullet.js';
import { Vector } from 'excalibur';
import * as ex from 'excalibur';


class AdvancedPlayer extends Player {
    constructor(health, ammo, spriteType) {
        // Roep de constructor van de Player klasse aan
        super(health, ammo, spriteType);
        this.baseAmmo = 5; // Een extra eigenschap voor speciale aanvallen
    }

    // Overschrijft de shoot methode van Player
    shoot(engine) {
        if (this.baseAmmo < 1) {
            console.log('Out of special ammo!');
            return;
        }
        this.baseAmmo -= 1;

        // Schiet drie kogels tegelijk in verschillende richtingen
        const bullet1 = new Bullet(this.pos.x + 50, this.pos.y, 500);
        const bullet2 = new Bullet(this.pos.x + 50, this.pos.y - 30, 500);
        const bullet3 = new Bullet(this.pos.x + 50, this.pos.y + 30, 500);

        engine.add(bullet1);
        engine.add(bullet2);
        engine.add(bullet3);

        console.log('AdvancedPlayer used special attack!');
    }

    // Overschrijft de onPreUpdate methode om de special attack toe te voegen
    onPreUpdate(engine) {
        super.onPreUpdate(engine); // Roep de onPreUpdate methode van Player aan

        // Voer een speciale aanval uit als 'Q' is ingedrukt
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Q)) {
            this.specialAttack(engine);
        }
    }
}

export { AdvancedPlayer };