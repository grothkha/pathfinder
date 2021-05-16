import Vector2 from './Vector2.js';
import Unit from './Unit.js';

let v1 = new Vector2(1,2);
console.log(`x: ${v1.x} | y: ${v1.y}`);

let u1 = new Unit(v1, 'player');
console.log(`name: ${u1.name} | x: ${u1.currentPosition.x} | y: ${u1.currentPosition.y}`);
