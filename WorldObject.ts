import Vector2 from './Vector2.js';

export default class WorldObject {
    private currentPosition: Vector2;

    constructor(position?: Vector2) {
        if (position) this.currentPosition = position;
    }

    getPosition(): Vector2 {
        return this.currentPosition;
    }
}