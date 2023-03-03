const { APIError } = require("../helpers");

class Sorter {
  constructor(boardingPasses = []) {
    this.boardingPasses = boardingPasses;
    this.sortedBoardingPasses = [];
  }

  sort() {
    if (this.boardingPasses.length == 0) {
        return this.sortedBoardingPasses;
    }
    // Get starting and ending node
    const [startNode, endNode, sMap, dMap] = this.validator();
    // Set starting node as first element in sorted passes
    this.sortedBoardingPasses.push(startNode);

    if (!endNode) {
        return this.sortedBoardingPasses;
    }

    let current = startNode;
    for (let i = 1; i < this.boardingPasses.length; i++) {
        const curr = sMap.get(current.destination);
        if (!curr) {
            throw new APIError(400, 'Bad Request', `No path found from ${current.destination}`);
        }
        this.sortedBoardingPasses.push(curr);
        current = sMap.get(current.destination);
    }
    
    return this.sortedBoardingPasses;
  }

  validator() {
    const sMap = this.createSourceMap();
    const dMap = this.createDestinationMap();

    const startNode = this.startNode(sMap, dMap);
    if (!startNode && this.boardingPasses.length > 0) {
        throw new APIError(400, 'Bad Request', 'No start node found');
    }

    const endNode = this.endNode(sMap, dMap);
    if (!endNode && this.boardingPasses.length > 0) {
        throw new APIError(400, 'Bad Request', 'No end node found');
    }

    return [startNode, endNode, sMap, dMap]
  }

  createSourceMap() {
    const locationMap = new Map();
    for (let i = 0; i < this.boardingPasses.length; i++) {
        locationMap.set(this.boardingPasses[i].source, this.boardingPasses[i])
    } 
    return locationMap;
  }

  createDestinationMap() {
    const locationMap = new Map();
    for (let i = 0; i < this.boardingPasses.length; i++) {
        locationMap.set(this.boardingPasses[i].destination, this.boardingPasses[i])
    } 
    return locationMap;
  }

  startNode(sMap, dMap) {
    for(const [key, value] of sMap) {
        if (!dMap.has(key)) {
            return value
        }
    }
  }

  endNode(sMap, dMap) {
    for(const [key, value] of dMap) {
        if (!sMap.has(key)) {
            return value
        }
    }
  }
}

module.exports = Sorter;
 