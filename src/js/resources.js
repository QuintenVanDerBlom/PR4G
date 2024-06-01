import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.gif'),
    Background: new ImageSource('images/bgImage.jpg'),
    Bullet: new ImageSource('images/bubble.png'),
    Seaweed: new ImageSource('images/seaweed.png'),
    Bottle: new ImageSource('images/bottle.png'),
    Can: new ImageSource('images/can.png'),
    Enemy1: new ImageSource('images/fish1.png'),
    Ammo: new ImageSource('images/ammo.png'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }