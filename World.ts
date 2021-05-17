export default class World {
    private sizeX: number;
    private sizeY: number;
    private grid: Array<Array<number>>; // world tiles are simplified as numbers

    constructor(x: number, y: number) {
        this.sizeX = x;
        this.sizeY = y;
        this.grid = new Array<Array<number>>(x);
        for (let i = 0; i < x; i++) {
            this.grid[i] = new Array<number>(y).fill(1);
        }
    }

    public setBarriers(barriers: number[][]) {
        for (let i of barriers) {
            this.grid[i[0]][i[1]] = 0;
        }
    }

    public isWalkable(x: number, y: number): boolean {
        if (x >= 0 && x < this.sizeX && y >= 0 && y < this.sizeY) {
            return this.grid[x][y] == 1;
        }
    }
}