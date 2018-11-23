import {Connect4Helper} from './Connect4Helper';
import {EvaluationInterface} from './EvaluationInterface';

export class Connect4AI {

    static predict(grid: Array<Array<number>>): number {
        grid = this.cloneData(grid);
        const best = this.minimax(grid, 4, -1);
        return best.move;
    }

    static minimax(grid: Array<Array<number>>, depth: number, turn: number): EvaluationInterface {
        let result = {value: null, move: null};
        let best = {value: -1000, move: 0};

        if(Connect4Helper.checkWinner(grid) !== 0) {
            return {
                value: -10000,
                move: best.move
            };
        }

        if(depth === 0) {
            return {
                value: turn*this.evalPosition(this.cloneData(grid)),
                move: best.move
            };
        }
        const allPosiibleMoves = this.getAllPossibleMoves(grid);
        best.move = allPosiibleMoves[0];
        for (let i = 0; i < allPosiibleMoves.length; i++) {
            let moveResult = Connect4Helper.doMove(this.cloneData(grid), allPosiibleMoves[i], turn);
            if(moveResult !== null) {
                result = this.minimax(moveResult.grid, depth-1, -turn);
                result.value = -result.value;
                if(result.value > best.value) {
                    best.value = result.value;
                    best.move = allPosiibleMoves[i];
                }
            }
        }
        return best;
    }

    static evalPosition(grid){
        let maxYArray = [];
        for (let x = 0; x < 7; x++){
            maxYArray[x] =this.maxY(x, grid);
        }
        let maxYHArray = [];
        for (let x = 0; x < 7; x++){
            maxYHArray[x] = (x != 0 && maxYArray[x-1] < maxYArray[x]) ? maxYArray[x-1]  : maxYArray[x];
            maxYHArray[x] = (x != 6 && maxYArray[x+1] < maxYArray[x]) ? maxYArray[x+1]  : maxYHArray[x];
            maxYHArray[x] = Math.min(0, maxYHArray[x]-1);
        }

        let winningMoves = 0;
        for (let x = 0; x < 7; x++){
            for (var y = maxYHArray[x]; y <= maxYArray[x] ; y++){
                if (grid[x][y] == 0){
                    grid[x][y] = 1;
                    if (this.checkGameEnd(x,y,grid)){
                        winningMoves++;
                    }
                    grid[x][y] = -1;
                    if (this.checkGameEnd(x,y,grid)){
                        winningMoves--;
                    }
                    grid[x][y] = 0;
                }
            }
        }

        return winningMoves;
    }

    static maxY(x, grid){
        let height = 6;
        while (height >= 0 && grid[x][height] != 0){
            height--;
        }
        return height;
    }

    static checkGameEnd(x, y, grid){
        let rv = false;
        if (grid[x][y] != 0) {
            let color = grid[x][y];
            rv = (rv) ? rv : Connect4Helper.check4(x, y, 1, 0, grid, color);
            rv = (rv) ? rv : Connect4Helper.check4(x, y, 1, -1, grid, color);
            rv = (rv) ? rv : Connect4Helper.check4(x, y, 0, 1, grid, color);
            rv = (rv) ? rv : Connect4Helper.check4(x, y, 1, 1, grid, color);
        }
        return rv;
    }

    static getAllPossibleMoves(grid: Array<Array<number>>): Array<number> {
        const possible = [];
        for (let i = 0; i < grid.length; i++) {
            if(grid[i][0] === 0) possible.push(i);
        }
        return possible.sort(() => Math.random() - 0.5);
    }

    static cloneData(data) {
        const jsonString = JSON.stringify(data);
        return JSON.parse(jsonString);
    }
}