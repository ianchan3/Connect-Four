/*----- constants -----*/
const PLAYER_COLOR = {
  "1": "blue",
  "-1": "red",
  0: "orange"
};



/*----- app's state (variables) -----*/
let board;
let turn; // 1 or -1; 0 for nobody home in that cell
let gameStatus; // null -> game is in turn; 1/-1 player window; "T" -> tie
let player;
let winner;


/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll("#markers > div")];
const msgEl = document.querySelector("h2");
const playBtn = document.querySelector('button')


/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
playBtn.addEventListener("click", init);

/*----- functions -----*/
init();
//job of init to initialize state and call render
//any time you are updating state, you need to have a render call
function init() {
  board = [
      [0, 0, 0, 0, 0, 0], //column 0
      [0, 0, 0, 0, 0, 0], //column 1
      [0, 0, 0, 0, 0, 0], //column 2
      [0, 0, 0, 0, 0, 0], //column 3
      [0, 0, 0, 0, 0, 0], //column 4
      [0, 0, 0, 0, 0, 0], //column 5
      [0, 0, 0, 0, 0, 0], //column 6
  ];
  turn = 1;
  gameStatus = 0;
  render();
}

function handleDrop(evt) {
  const colIdx = markerEls.indexOf(evt.target);
  if (colIdx === -1) return;
  const colArr = board[colIdx];
  if (!colArr.includes(0)) return; //guard/
  const rowIdx = colArr.indexOf(0);
  colArr[rowIdx] = turn;
  turn *= -1;
  winner = checkWin(colIdx, rowIdx);
  if (winner === checkVertWin) return ; // create a guard for after vertical win
  render();
};

function checkWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  return checkVertWin(colIdx, rowIdx, player) ||
      checkHorzWin(colIdx, rowIdx, player) ||
      checkDiagonalLeftWin(colIdx, rowIdx, player) ||
      checkDiagonalRightWin(colIdx, rowIdx, player ) ||
      (board.flat().includes(0) ? 0 : "T")
};

function checkVertWin(colIdx, rowIdx, player) {
  const colArr = board[colIdx];
  let count = 1;
  rowIdx--;
  while (colArr[rowIdx] === player && rowIdx >= 0) {
      count++;
      rowIdx--;
  }
  return count === 4 ? winner = turn : 0;
}

function checkHorzWin(colIdx, rowIdx, player) {
  const colArr = board[colIdx];
  let count = 1;
  let idx = colIdx + 1;
  while (idx < board.length && board[idx][rowIdx] === player) {
      count++;
      idx++;
  }
  idx = colIdx - 1;
  while ((idx >= 0) && board[idx][rowIdx] === player) {
      count++;
      idx--;
  }
  return count === 4 ? winner = turn : 0;
}

function checkDiagonalLeftWin(colIdx, rowIdx, player) {
  const colArr = board[colIdx][rowIdx];
  let count = 1;
  let idx1 = colIdx - 1;
  let idx2 = rowIdx + 1;

  while (idx1 >= 0 && idx2 < board[0].length && board[idx1][idx2] === colArr) {
      count++;
      idx1--;
      idx2++;
  }
  idx1 = colIdx + 1;
  idx2 = rowIdx - 1;
  while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === colArr) {
      count++;
      idx1++;
      idx2--;
  }
  return count >= 4 ? winner = turn : 0;
}

function checkDiagonalRightWin(colIdx, rowIdx, player) {
  const colArr = board[colIdx][rowIdx];
  let count = 1;
  let idx1 = colIdx + 1;
  let idx2 = rowIdx + 1;
  while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === colArr) {
      count++;
      idx1++;
      idx2++;
  }
  idx1 = colIdx - 1;
  idx2 = rowIdx - 1;
  while (idx1 >= 0 && idx2 < board[0].length && board[idx1][idx2] === colArr) {
      count++;
      idx1--;
      idx2--;
  }
  return count >= 4 ? winner = turn : 0;
}

function render() {
  board.forEach(function(colArr, colIdx) {
      colArr.forEach(function(cellVal, rowIdx) {
          const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
          cellEl.style.backgroundColor = PLAYER_COLOR[cellVal];
      });
  });
  renderMessage();
  renderMarkers();
  playBtn.style.visibility = winner ? "visible" : "hidden";
}

function renderMarkers() {
  markerEls.forEach(function(markerEl, colIdx) {
    markerEl.style.visibility = board[colIdx].includes(0) ? "visible" : "hidden";
    if (winner === -1 || winner === 1) {
      markerEl.style.visibility = "hidden";
    };
  });
}

function renderMessage() {
  if (winner === 0) {
    msgEl.innerHTML = `Player <span style="color: ${PLAYER_COLOR[turn]}">${PLAYER_COLOR[turn].toUpperCase()}</span>'s Turn`; 
  } else if (winner === 1 || winner === -1) {
    msgEl.innerHTML = `Player <span style="color:${PLAYER_COLOR[winner*-1]}">${PLAYER_COLOR[winner*-1].toUpperCase()}</span>'s Wins!`;
  } else if (winner === "T")
    msgEl.innerHTML = "It's a Tie";
}