export class Connect4Helper {

    static checkWinner(grid: Array<Array<number>>): number {
        //check vertical
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0, count = 0; j < grid[i].length-1; j++) {
                if(grid[i][j] !== 0 && grid[i][j+1] === grid[i][j]) {
                    count++;
                } else {
                    count = 0;
                }
                if(count === 3) return grid[i][j];
            }
        }
        //check horizontal
        for (let i = 0; i < grid[0].length; i++) {
            for (let j = 0, count = 0; j < grid.length-1; j++) {
                if(grid[j][i] !== 0 && grid[j+1][i] === grid[j][i]) {
                    count++;
                } else {
                    count = 0;
                }
                if(count === 3) return grid[j][i];
            }
        }
        //check diagonal 1 first half
        for (let i = 3, count = 0; i < grid.length; i++) {
            for (let y = 0, x = i; y < i && y < grid[i].length-1; y++, x--) {
                if(grid[x][y] !== 0 && grid[x-1][y+1] === grid[x][y]) {
                    count++;
                } else {
                    count = 0;
                }
                if(count === 3) return grid[x][y];
            }
        }
        //check diagonal 1 second half
        for (let i = 1, count = 0; i < grid[0].length-3; i++) {
            for (let x = grid.length-1, y = i; y < grid[0].length-1; x--, y++) {
                if(grid[x][y] !== 0 && grid[x-1][y+1] === grid[x][y]) {
                    count++;
                } else {
                    count = 0;
                }
                if(count === 3) return grid[x][y];
            }
        }
        //check diagonal 2 first half
        for (let i = 2, count = 0; i >= 0; i--) {
            for (let y = i, x = 0; y < grid[i].length-1; y++, x++) {
                if(grid[x][y] !== 0 && grid[x+1][y+1] === grid[x][y]) {
                    count++;
                } else {
                    count = 0;
                }
                if(count === 3) return grid[x][y];
            }
        }
        //check diagonal 2 second half
        for (let i = 1, count = 0; i < grid.length-3; i++) {
            for (let x = i, y = 0; y < grid[i].length-1 && x < grid.length-1; x++, y++) {
                if(grid[x][y] !== 0 && grid[x-1][y+1] === grid[x][y]) {
                    count++;
                } else {
                    count = 0;
                }
                if(count === 3) return grid[x][y];
            }
        }
        return 0;
    }

    static doMove(grid: Array<Array<number>>, move: number, player: number): Array<Array<number>> {
        for (let i = grid[move].length-1; i >= 0; i--) {
            if(grid[move][i] === 0) {
                grid[move][i] = player;
                return grid;
            }
        }
        return null;
    }
}