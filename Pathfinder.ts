import PathNode from "./PathNode.js";
import Vector2 from "./Vector2.js";
import World from "./World.js";

export default class Pathfinder {
    private STRAIGHT_LINE_COST = 10;
    private DIAGONAL_LINE_COST = 14;

    private world: World;

    private startNode: PathNode;
    private targetNode: PathNode;
    private currentNode: PathNode;

    private openNodes: Array<PathNode> = []; // nodes with calculated costs
    private closedNodes: Array<PathNode> = []; // nodes that have already been evaluated

    constructor(world: World) {
        this.world = world;
    }

    findPath(start: Vector2, target: Vector2) {
        this.startNode = new PathNode(start, null, 0, start.distanceTo(target));
        this.targetNode = new PathNode(target, null, target.distanceTo(start), 0);
        this.openNodes.push(this.startNode);

        let run = true;
        while (run) {
            this.currentNode = this.findLowestCostNode();
            // stop if no more nodes are in open node list
            if (this.currentNode == null) {
                run = false;
                break;
            }

            // check if current node is the target
            if (this.currentNode.getPosition().x == this.targetNode.getPosition().x && this.currentNode.getPosition().y == this.targetNode.getPosition().y) {
                run = false;
                return this.getPathFromNode(this.currentNode);
            }

            // get valid neigbour positions
            let neighbourPositions = this.getValidNeighbourCoordinates(this.currentNode);

            // update cost values
            neighbourPositions.forEach(position => {
                // check if node is in open list and use this instead
                let existingNode = this.getNodeFromOpenList(position);
                if (existingNode != null) {
                    // TODO only do this if gCost is lower
                    existingNode.setParentNode(this.currentNode);
                    this.updateCostValues(existingNode, this.currentNode);
                } else {
                    let newNeighbour = new PathNode(position, this.currentNode);
                    this.updateCostValues(newNeighbour, this.currentNode);
                    this.openNodes.push(newNeighbour);
                }
            });
        }
    }

    private findLowestCostNode(): PathNode {
        if (this.openNodes.length <= 0) return null;
        let result = this.openNodes[0];
        let resultIndex = 0;
        // finde node with lowest fCost
        this.openNodes.forEach((node, index) => {
            // if fCost is equal use hCost for decision
            if (node.getFCost() == result.getFCost()) {
                if (node.getHCost() < result.getHCost()) {
                    result = node;
                    resultIndex = index;
                }
            } else if (node.getFCost() < result.getFCost()) {
                result = node;
                resultIndex = index;
            }
        });
        // remove result node from open node list
        this.openNodes.splice(resultIndex, 1); // TODO check reference
        // add current visited node to closed node list
        if (!this.isNodeInClosedList(result)) this.closedNodes.push(result); // TODO check reference
        return result;
    }

    private getValidNeighbourCoordinates(node: PathNode): Array<Vector2> {
        let nodePosition = node.getPosition();
        let results = new Array<Vector2>();
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                // check if neighbour position is notthe position of the given node
                if (i == 0 && j == 0) continue;
                // check if neighbour position is in world and walkable
                if (!this.world.isWalkable(nodePosition.x + i, nodePosition.y + j)) continue;
                // skip neighbour position if it is in closed list
                if (this.isPositionInClosedList(nodePosition.x + i, nodePosition.y + j)) continue;
                // push position to results
                results.push(new Vector2(nodePosition.x + i, nodePosition.y + j));
            }
        }
        return results;
    }

    private updateCostValues(currentNode: PathNode, parentNode: PathNode): void {
        // update cost values from starting node
        let newGCost: number;
        if (currentNode.getPosition().x != parentNode.getPosition().x && currentNode.getPosition().y != parentNode.getPosition().y) {
            newGCost = parentNode.getGCost() + this.DIAGONAL_LINE_COST;
        } else {
            newGCost = parentNode.getGCost() + this.STRAIGHT_LINE_COST;
        }
        // only set new gCost if not set before or lower
        if (!currentNode.getGCost() || currentNode.getGCost() > newGCost) {
            currentNode.setGCost(newGCost);
        }

        // update cost values to target node
        // TODO improve calculation
        if (!currentNode.getHCost()) {
            currentNode.setHCost(currentNode.distanceTo(this.targetNode));
        }
    }

    private getPathFromNode(node: PathNode): Array<Vector2> {
        let path = Array<Vector2>(node.getPosition());
        let currentNode = node;
        let currentParentNode = node.getParentNode();
        while (currentParentNode) {
            currentNode = currentParentNode;
            currentParentNode = currentNode.getParentNode();
            path.unshift(currentNode.getPosition());
        }
        return path;
    }

    private getNodeFromOpenList(position: Vector2): PathNode {
        let result = null
        this.openNodes.forEach(currentNode => {
            if (currentNode.isAtPosition(position)) {
                result = currentNode;
                return;
            }
        });
        return result;
    }

    private isNodeInClosedList(node: PathNode): boolean {
        return this.isPositionInClosedList(node.getPosition().x, node.getPosition().y);
    }

    private isPositionInClosedList(x: number, y: number): boolean {
        let result = false;
        this.closedNodes.forEach(node => {
            if (node.getPosition().x == x) {
                if (node.getPosition().y == y) {
                    result = true;
                }
            }
        });
        return result;
    }

}