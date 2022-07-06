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
//saving (cache) any elements you want to save
const circleEls = [...document.querySelectorAll("#board > div")];
const msgEl = document.querySelector("h2");
const playBtn = document.querySelector('button')


/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick);
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
  // [c0r5, c1r5, c2r5, c3r5, c4r5, c5r5, c6r5,]
  // [c0r4, c1r4, c2r4, c3r4, c4r4, c5r4, c6r4,]
  // [c0r3, c1r3, c2r3, c3r3, c4r3, c5r3, c6r3,]
  // [c0r2, c1r2, c2r2, c3r2, c4r2, c5r2, c6r2,]
  // [c0r1, c1r1, c2r1, c3r1, c4r1, c5r1, c6r1,] 
  // [c0r0, c1r0, c2r0, c3r0, c4r0, c5r0, c6r0,]

// function renderCircles() {
//   circleEls.forEach(function(circleEl, colIdx) {
//     circleEl.style.visibility = board[colIdx].includes(0) ? "visible" : "hidden";
//   });
// }

function handleClick(evt) {
  const colIdx = circleEls.indexOf(evt.target);
  if (colIdx === -1) return;
  const colArr = board[colIdx];
  if (!colArr.includes(0)) return; //guard/
  const rowIdx = colArr.indexOf(0);
  colArr[rowIdx] = turn;
  GameStatus = getGameStatus();
  turn *= -1;
  winner = checkWin(colIdx, rowIdx);
  // if (winner === checkVertWin) return ; // create a guard for after vertical win
  render();
};

function checkWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  if (checkVertWin(colIdx, rowIdx, player) ||
  checkHorzWin(colIdx, rowIdx, player) ||
  checkDiagonalLeftWin(colIdx, rowIdx) ||
  // checkDiagonalRightWin(colIdx, rowIdx))
  return turn;
  }

function checkVertWin(colIdx, rowIdx, player) {
  const colArr = board[colIdx];
  let count = 1;
  rowIdx--;
  while(colArr[rowIdx] === player && rowIdx >= 0) {
      count++;
      rowIdx--;
  }
  return count === 4 ? winner = turn : 0;
}

function checkHorzWin(colIdx, rowIdx, player) {
  const colArr = board[colIdx];
  let count = 1;
  let idx = colIdx + 1;
  while(idx < board.length && board[idx][rowIdx] === player) {
      count++;
      idx++;
  }
  idx = colIdx - 1;
  while((idx >= 0) && board[idx][rowIdx] === player) {
    count++;
    idx--;
  }
  return count === 4 ? winner = turn : 0;
}

function checkDiagonalLeftWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1;
  let idx1 = colIdx - 1;
  let idx2 = rowIdx + 1;

  while (idx1 >= 0 && idx2 < board[0].length && board[idx1][idx2] === player) {
    count++;
    idx1--;
    idx2++;
  }
  idx1 = colIdx + 1;
  idx2 = rowIdx - 1;
  while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === player) {
    count++;
    idx1++;
    idx2--;
  }
  return count >= 4 ? winner = turn : 0;
}

function getGameStatus() {
  if (!board.includes(0)) return "T";
  return 0;
}

function render() {
  board.forEach(function(colArr, colIdx) {
    colArr.forEach(function(cellVal, rowIdx) {
    const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
    cellEl.style.backgroundColor = PLAYER_COLOR[cellVal];
  });
});
renderMessage();
playBtn.style.visibility = winner ? "visible" : "hidden";
}

function renderMessage() {
  if (gameStatus === 0) {
    msgEl.innerHTML = `Player <span style="color: ${PLAYER_COLOR[turn]}">${PLAYER_COLOR[turn].toUpperCase()}</span>'s Turn`;
  } else if (gameStatus === "T") {
    msgEl.textContent = "Another Tie Game";
  } else {
    msgEl.innerHTML = `Player <span style="color:${PLAYER_COLOR[winner]}">${PLAYER_COLOR[winner].toUpperCase()}</span>'s Wins!`;
  }
};