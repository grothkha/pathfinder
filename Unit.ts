import Vector2 from './Vector2.js';
import WorldObject from './WorldObject.js';

export default class Unit extends WorldObject {
    name: string;

    constructor(position: Vector2, name?: string) {
        super(position);
        if (name) this.name = name;
    }
}