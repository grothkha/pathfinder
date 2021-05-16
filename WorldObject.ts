import Vector2 from './Vector2.js';

export default class WorldObject {
    currentPosition: Vector2;

    constructor(position?: Vector2) {
        if (position) this.currentPosition = position;
    }
}