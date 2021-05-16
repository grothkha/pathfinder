import Vector2 from './Vector2.js';
import Unit from './Unit.js';
import World from './World.js';

let world = new World(10,10);
world.setBarriers([[2,3],[3,3],[4,3],[4,5],[5,5],[5,6],[5,7]]);
console.log(`${world.isWalkable(5,4)}`);
console.log(`${world.isWalkable(5,5)}`);
console.log(`${world.isWalkable(3,5)}`);

let player = new Unit(new Vector2(2,8), 'player');
console.log(`name: ${player.name} | x: ${player.getPosition().x} | y: ${player.getPosition().y}`);
let target = new Unit(new Vector2(7,2), 'target');

console.log(player.getPosition().getLength());
console.log(target.getPosition().getLength());
console.log(player.getPosition().distanceTo(target.getPosition()));
