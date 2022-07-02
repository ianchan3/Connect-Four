/*----- constants -----*/
const PLAYER_COLOR_LOOKUP = {
  "1": "blue",
  "-1": "red",
  "0": "white"
};

/*----- app's state (variables) -----*/
let board; 
let playerTurn; // 1 or -1; 0 for nobody home in that cell
// let gameStatus; // null -> game is in playerTurn; 1/-1 player window; "T" -> tie


/*----- cached element references -----*/
//saving (cache) any elements you want to save
const circleEls = document.querySelectorAll("#board > div");
const msgEl = document.querySelector("h2");
const playBtn = document.querySelector('button')

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick);
// playBtn.addEventListener("click", init);
//dont forget guards!!!!!!!
//dont forget to change pointer when already occupied
/*----- functions -----*/
init();
//job of init to initialize state and call render
//any time you are updating state, you need to have a render call
function init() {
  board = [
    [1, 0, 0, 0, 0, -1], //column 0
    [-1, 0, 0, 0, 0, 0], //column 1
    [1, 0, 0, 0, 0, 0], //column 2
    [1, 0, 0, 0, 0, 0], //column 3
    [1, 0, 0, 0, 0, 0], //column 4
    [0, 0, 0, 0, 0, 0], //column 5
    [1, 0, 0, 0, 0, -1], //column 6
  ];
playerTurn = 1;
render();
}
  // [c0r5, c1r5, c2r5, c3r5, c4r5, c5r5, c6r5,]
  // [c0r4, c1r4, c2r4, c3r4, c4r4, c5r4, c6r4,]
  // [c0r3, c1r3, c2r3, c3r3, c4r3, c5r3, c6r3,]
  // [c0r2, c1r2, c2r2, c3r2, c4r2, c5r2, c6r2,]
  // [c0r1, c1r1, c2r1, c3r1, c4r1, c5r1, c6r1,] 
  // [c0r0, c1r0, c2r0, c3r0, c4r0, c5r0, c6r0,]



//Render's job is to transfer/visualize
//all state to the DOM
function render() {
  board.forEach(function(colArr, colIdx) {
    colArr.forEach(function(cellVal, rowIdx) {
  const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
  cellEl.style.backgroundColor = PLAYER_COLOR_LOOKUP[cellVal];
  });
});
}
  // circleEls.forEach(function(circleEl, idx) {
  //   circleEl.style.backgroundColor = PLAYER_COLOR_LOOKUP[board[idx]];
  // });
  renderMessage();



function renderMessage() {

};