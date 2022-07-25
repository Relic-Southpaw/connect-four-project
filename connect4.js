/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
const htmlBoard = document.querySelector("#board")
let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // done

  for (let y = 0; y < HEIGHT; y++) {
    board[y] = []
    for (let x = 0; x < WIDTH; x++) {
      board[y][x] = null;
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  //done
  // TODO: add comment for this code
  //creates top of board where to click and drop your pieces
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //creates the rest of the board and sets IDs on each of the squares
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${x}-${y}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {

  // TODO: write the real version of this, rather than always returning 0

  for (let y = HEIGHT - 1; y >= 0; y--) {
    let curr = document.getElementById(`${x}-${y}`);
    const newDiv = document.createElement('div');
    newDiv.classList.add(`player${currPlayer}`);

    //if there isn't a div in the box, add one, or go to next highest
    //if a div is added, end loop
    if (curr.children.length < 1) {
      curr.appendChild(newDiv)
      board[y]
      board[y][x] = currPlayer
      // check for win
      if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
      }
      // switch players
      if (currPlayer === 1) {
        currPlayer = 2;
      } else {
        currPlayer = 1;
      }

      //check to see if the board is full
      //if so, it's a tie
      if (board[0].includes(null) !== true) {
        alert('IT IS A TIE! REFRESH!')
      }
      return;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */


//I can remove this function as I made one function do multiple
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  // OOPS! I did all that in the last function
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  // done
  alert(msg);

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  // I did this in a different function
  placeInTable(y, x);



  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  //done, up in the main function findSpotForCol

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  // THIS loops over the whole board, checking for 4 in a row
  // IF it returns true, there's a winner.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

<<<<<<< HEAD
const lst = 'last string'
=======
isFull = () => board[0].includes(null)
>>>>>>> sidebranch
