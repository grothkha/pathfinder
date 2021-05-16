import Vector2 from "./Vector2";

/**
 * Based on tutorial from Sebastian Lague
 * https://www.youtube.com/watch?v=-L-WgKMFuhE
 */

export default class PathNode {
    private position: Vector2;
    private gCost: number; // distance from starting node
    private hCost: number; // distance to target node
    private parentNode: PathNode;

    constructor(position: Vector2, parentNode?: PathNode, gCost = 0, hCost = 0) {
        this.position = position;
        this.parentNode = parentNode;
        this.gCost = gCost;
        this.hCost = hCost;
    }

    setGCost(cost: number) {
        this.gCost = cost;
    }

    setHCost(cost: number) {
        this.hCost = cost;
    }

    setParentNode(node: PathNode) {
        this.parentNode = node;
    }

    getGCost(): number {
        return this.gCost;
    }

    getHCost(): number {
        return this.hCost;
    }

    getFCost(): number {
        return this.gCost + this.hCost;
    }

    getPosition(): Vector2 {
        return this.position;
    }

    getParentNode(): PathNode {
        return this.parentNode;
    }

    distanceTo(otherNode: PathNode): number {
        // TODO might needs to be improved using horizontal (10), vertical (10) and diagonal (14) movement weights
        return this.position.distanceTo(otherNode.position);
    }

    equals(otherNode: PathNode): boolean {
        // TODO improve equality check
        if (this.getPosition().x == otherNode.getPosition().x) {
            if (this.getPosition().y == otherNode.getPosition().y) {
                return true;
            }
        }
        return false;
    }
}