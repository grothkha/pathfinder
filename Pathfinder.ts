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
            // add current visited node to closed node list
            if (!this.nodeIsInClosedList(this.currentNode)) this.closedNodes.push(this.currentNode); // TODO check reference

            // check if current node is the target
            if (this.currentNode.getPosition().x == this.targetNode.getPosition().x && this.currentNode.getPosition().y == this.targetNode.getPosition().y) {
                run = false;
                console.log(`FOUND! ${this.currentNode}`);
                // TODO backtrace path
                return this.currentNode;
            }

            // get valid neigbours
            let neighbours = this.getValidNeighbours(this.currentNode);

            // update cost values
            neighbours.forEach(neighbour => {
                // check if node is in open list and use this instead
                let existingNode = this.getNodeFromOpenList(neighbour);
                if (existingNode != null) {
                    existingNode.setParentNode(this.currentNode);
                    this.updateCostValues(existingNode, this.currentNode);
                } else {
                    this.updateCostValues(neighbour, this.currentNode);
                    this.openNodes.push(neighbour);
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
            }
            else if (node.getFCost() < result.getFCost()) {
                result = node;
                resultIndex = index;
            }
        });
        // remove result node from open node list
        this.openNodes.splice(resultIndex, 1); // TODO check reference
        return result;
    }

    private getValidNeighbours(node: PathNode): Array<PathNode> {
        let nodePosition = node.getPosition();
        let results = new Array<PathNode>();
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                // check if neighbour node is not given node
                if (i == 0 && j == 0) continue;
                // check if neighbour node is in world and walkable
                if (!this.world.isWalkable(nodePosition.x + i, nodePosition.y + j)) continue;
                // skip neighbour node if it is in closed list
                let newPathNode = new PathNode(new Vector2(nodePosition.x + i, nodePosition.y + j), node);
                if (this.nodeIsInClosedList(newPathNode)) continue;
                // push node to results
                results.push(newPathNode);
            }
        }
        return results;
    }

    private updateCostValues(currentNode: PathNode, parentNode: PathNode) {
        // update cost values from starting node
        if (currentNode.getPosition().x != parentNode.getPosition().x && currentNode.getPosition().y != parentNode.getPosition().y) {
            currentNode.setGCost(parentNode.getGCost() + this.DIAGONAL_LINE_COST);
        } else {
            currentNode.setGCost(parentNode.getGCost() + this.STRAIGHT_LINE_COST);
        }
        // update cost values to target node
        // TODO improve calculation
        currentNode.setHCost(currentNode.distanceTo(this.targetNode));
    }

    private getNodeFromOpenList(node: PathNode): PathNode {
        let result = null
        this.openNodes.forEach(currentNode => {
            if (currentNode.equals(node)) {
                result = currentNode;
                return;
            }
        });
        return result;
    }

    private nodeIsInClosedList(node: PathNode): boolean {
        let result = false
        this.closedNodes.forEach(currentNode => {
            if (currentNode.equals(node)) {
                result = true;
                return;
            }
        });
        return result;
    }

}