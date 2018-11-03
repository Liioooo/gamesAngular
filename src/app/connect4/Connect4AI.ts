import {Connect4Helper} from '../app-tictactoe/Connect4Helper';
import {EvaluationInterface} from './EvaluationInterface';

export class Connect4AI {

    static predict(grid: Array<Array<number>>): number {
        grid = this.cloneData(grid);
        const best = this.minimax(grid, 5, true);
        return best.move;
    }

    static minimax(grid: Array<Array<number>>, depth: number, maximizingPlayer: boolean): EvaluationInterface {
        let evaluation = {value: null, move: null};
        let best = {value: null, move: null};

        if(depth === 0 || Connect4Helper.checkWinner(grid) !== 0) {
            return {
                value: this.evalPosition(grid),
                move: 0
            };
        }
        if(maximizingPlayer) {
            best.value = -100000;
            const allPosiibleMoves = this.getAllPossibleMoves(grid);
            for (let i = 0; i < allPosiibleMoves.length; i++) {
                evaluation = this.minimax(Connect4Helper.doMove(this.cloneData(grid), allPosiibleMoves[i], -1), depth-1, false);
                if(evaluation.value > best.value) {
                    best.value = evaluation.value;
                    best.move = allPosiibleMoves[i];
                }
            }
            return best;
        } else {
            best.value = 100000;
            const allPosiibleMoves = this.getAllPossibleMoves(grid);
            for (let i = 0; i < allPosiibleMoves.length; i++) {
                evaluation = this.minimax(Connect4Helper.doMove(this.cloneData(grid), allPosiibleMoves[i], 1), depth-1, true);
                if(evaluation.value < best.value) {
                    best.value = evaluation.value;
                    best.move = allPosiibleMoves[i];
                }
            }
            return best;
        }
    }

    static evalPosition(grid: Array<Array<number>>): number {
        let evaluation = 0;
        //check vertical
        for (let i = 0; i < grid.length; i++) {
            let lastPiece;
            for (let j = 0, count = 0; j < grid[i].length-1; j++) {
                if(grid[i][j] !== 0 && grid[i][j+1] === grid[i][j]) {
                    lastPiece = grid[i][j];
                    count++;
                } else {
                    if(count > 0) {
                        evaluation += this.calcEval(count, lastPiece);
                    }
                    count = 0;
                }
            }
        }
        //check horizontal
        for (let i = 0; i < grid[0].length; i++) {
            let lastPiece;
            for (let j = 0, count = 0; j < grid.length-1; j++) {
                if(grid[j][i] !== 0 && grid[j+1][i] === grid[j][i]) {
                    lastPiece = grid[j][i];
                    count++;
                } else {
                    if(count > 0) {
                        evaluation += this.calcEval(count, lastPiece);
                    }
                    count = 0;
                }
            }
        }
        //check diagonal 1 first half
        for (let i = 3, count = 0; i < grid.length; i++) {
            let lastPiece;
            for (let y = 0, x = i; y < i && y < grid[i].length-1; y++, x--) {
                if(grid[x][y] !== 0 && grid[x-1][y+1] === grid[x][y]) {
                    lastPiece = grid[x][y];
                    count++;
                } else {
                    if(count > 0) {
                        evaluation += this.calcEval(count, lastPiece);
                    }
                    count = 0;
                }
            }
        }
        //check diagonal 1 second half
        for (let i = 1, count = 0; i < grid[0].length-3; i++) {
            let lastPiece;
            for (let x = grid.length-1, y = i; y < grid[0].length-1; x--, y++) {
                if(grid[x][y] !== 0 && grid[x-1][y+1] === grid[x][y]) {
                    lastPiece = grid[x][y];
                    count++;
                } else {
                    if(count > 0) {
                        evaluation += this.calcEval(count, lastPiece);
                    }
                    count = 0;
                }
            }
        }
        //check diagonal 2 first half
        for (let i = 2, count = 0; i >= 0; i--) {
            let lastPiece;
            for (let y = i, x = 0; y < grid[i].length-1; y++, x++) {
                if(grid[x][y] !== 0 && grid[x+1][y+1] === grid[x][y]) {
                    lastPiece = grid[x][y];
                    count++;
                } else {
                    if(count > 0) {
                        evaluation += this.calcEval(count, lastPiece);
                    }
                    count = 0;
                }
            }
        }
        //check diagonal 2 second half
        for (let i = 1, count = 0; i < grid.length-3; i++) {
            let lastPiece;
            for (let x = i, y = 0; y < grid[i].length-1 && x < grid.length-1; x++, y++) {
                if(grid[x][y] !== 0 && grid[x-1][y+1] === grid[x][y]) {
                    lastPiece = grid[x][y];
                    count++;
                } else {
                    if(count > 0) {
                        evaluation += this.calcEval(count, lastPiece);
                    }
                    count = 0;
                }
            }
        }
        return evaluation;
    }

    static calcEval(count, lastPieceOfLine) {
        if(count >= 3) count = 100000;
        if(count === 2) count = 40;
        if(count === 1) count = 10;
        if(lastPieceOfLine === -1) {
            return count;
        } else {
            return -count;
        }
    }

    static getAllPossibleMoves(grid: Array<Array<number>>): Array<number> {
        const possible = [];
        for (let i = 0; i < grid.length; i++) {
            if(grid[i][0] === 0) possible.push(i);
        }
        return possible;
    }

    static cloneData(data) {
        const jsonString = JSON.stringify(data);
        return JSON.parse(jsonString);
    }
}