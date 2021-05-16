import Vector2 from './Vector2.js';
import Unit from './Unit.js';
import World from './World.js';
import Pathfinder from './Pathfinder.js';

let world = new World(10, 10);
world.setBarriers([[2, 3], [3, 3], [4, 3], [4, 5], [5, 5], [5, 6], [5, 7]]);

let pathfinder = new Pathfinder(world);

let player = new Unit(new Vector2(2, 8), 'player');
console.log(`name: ${player.name} | x: ${player.getPosition().x} | y: ${player.getPosition().y}`);
let target = new Unit(new Vector2(7, 2), 'target');

let path = pathfinder.findPath(player.getPosition(), target.getPosition());
console.log(path);
