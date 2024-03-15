import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 * 
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** game board: nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y=0; y<nrows; y++) {
      let row = []
      for (let x=0; x<ncols; x++) {
        row.push(Math.random() >= chanceLightStartsOn)
      }
      initialBoard.push(row)
    }
    return initialBoard;
  }

  // check board for all false values
  function hasWon() {
    return board.every(i => Array.isArray(i) ? i.every(j => !j) : !i)
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if coord on board flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // make a (deep) copy of the oldBoard
      let deepCopy = JSON.parse(JSON.stringify(oldBoard));

      // flip value of cell and the cells around it
      flipCell(y, x, deepCopy);
      flipCell(y, x+1, deepCopy); // right
      flipCell(y-1, x, deepCopy); // below
      flipCell(y, x-1, deepCopy); // left
      flipCell(y+1, x, deepCopy); // top
      
      return deepCopy;
    });
  }

  return (
      <div>
        { hasWon() ? 
          <h1>You Won!</h1> : 
          <table>
            <tbody>
              {board.map((row,y) => (
                <tr key={`row-${y}`}>
                  {row.map((col, x) => (
                    <Cell
                      key={`${y}-${x}`}
                      coord={`${y}-${x}`}
                      isLit={col}
                      flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} />
                    )
                  )}
                </tr>
                )
              )}
            </tbody>
          </table>
        }
			</div>
  );
}
Board.defaultProps = {
  nrows: 5,
  ncols: 5, 
  chanceLightStartsOn: 0.4
}

export default Board;
