import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * Properties:
 *
 * - flipCellsAroundMe: flip value of cell and the cells around it
 * - isLit: value of effects cell class / appearance
 *
 * State:
 * 
 * - None
 * 
 **/

function Cell({ flipCellsAroundMe, isLit, coord }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td id={coord} className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
