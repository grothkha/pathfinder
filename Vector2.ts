export default class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getLength(): number {
        // https://stackoverflow.com/a/11832950
        return Math.round((Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) + Number.EPSILON) * 100) / 100;
    }

    distanceTo(otherVector: Vector2): number {
        let connector = new Vector2(this.x - otherVector.x, this.y - otherVector.y);
        return connector.getLength();
    }
}