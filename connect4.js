// Connect Four
const WIDTH = 7;
const HEIGHT = 6;
const htmlBoard = document.querySelector("#board")
let currPlayer = 1;
const board = [];

makeWholeBoard = () => {
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    board[y] = [];
    for (let x = 0; x < WIDTH; x++) {
      board[y][x] = null;
      const cell = document.createElement("td");
      cell.setAttribute("id", `${x}-${y}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

gameplay = (x) => {

  for (let y = HEIGHT - 1; y >= 0; y--) {
    let curr = document.getElementById(`${x}-${y}`);
    const newDiv = document.createElement('div');
    newDiv.classList.add(`player${currPlayer}`);

    if (curr.children.length < 1) {
      curr.appendChild(newDiv)
      board[y]
      board[y][x] = currPlayer
      // check for win
      if (checkForWin()) {
        alert(`Player ${currPlayer} won!`);
      }
      // switch players
      if (currPlayer === 1) {
        currPlayer = 2;
      } else {
        currPlayer = 1;
      }
      // full board tie
      if (board[0].includes(null) !== true) {
        alert('IT IS A TIE! REFRESH!')
      }
      return;
    }
  }
}

handleClick = (evt) => {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = gameplay(x);
  if (y === null) {
    return;
  }
}


checkForWin = () => {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
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

makeWholeBoard();


isFull = () => board[0].includes(null)
