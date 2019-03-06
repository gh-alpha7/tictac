/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
*
*/

let grid = [];
const GRID_LENGTH = 3;
let turn = 'X',turnCount=0;



function initializeGrid() {

    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {

    let rowDivs = '';

    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {

    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {

    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {

    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");

    let newValue =1
    turnCount+=1
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    if(!winCheck()){
      if(turnCount<9)
        computerTurn();
      else{
        document.getElementById("winner").innerHTML="Tie <button onclick=resetGame()>Restart</button>"
    }
  }

}

function computerTurn(){
  let x=0,y=0
  while(grid[x][y])
    x=Math.floor(Math.random() * 3 ),y=Math.floor(Math.random() * 3 )
  turnCount+=1
  grid[x][y]=2
  renderMainGrid();
  addClickHandlers();
  winCheck();
}

function winCheck(){
  if(computerWin()){
    document.getElementById("winner").innerHTML="COMPUTER WON <button onclick=resetGame()>Restart</button>"
    return true
  }
  else if(humanWin()){
    document.getElementById("winner").innerHTML="HUMAN WON <button onclick=resetGame()>Restart</button>"
    return true
  }
  return false
}

function computerWin(){
  for(var i=0;i<3;i++){
    if((grid[i][0]==grid[i][1]&&grid[i][1]==grid[i][2]&&grid[i][2]==2)||(grid[0][i]==grid[1][i]&&grid[1][i]==grid[2][i]&&grid[2][i]==2)){
      return true;
    }

  }
  if(grid[0][0]==grid[1][1]&&grid[1][1]==grid[2][2]&&grid[2][2]==2){
    return true;
  }
  if(grid[0][2]==grid[1][1]&&grid[1][1]==grid[2][0]&&grid[2][0]==2){
    return true;
  }
}

function humanWin(){
  for(var i=0;i<3;i++){
    if((grid[i][0]==grid[i][1]&&grid[i][1]==grid[i][2]&&grid[i][2]==1)||(grid[0][i]==grid[1][i]&&grid[1][i]==grid[2][i]&&grid[2][i]==1)){
      return true;
    }
  }
  if(grid[0][0]==grid[1][1]&&grid[1][1]==grid[2][2]&&grid[2][2]==1){
    return true;
  }
  if(grid[0][2]==grid[1][1]&&grid[1][1]==grid[2][0]&&grid[2][0]==1){
    return true;
  }
}

function resetGame(){
  grid=[]
  initializeGrid();
  renderMainGrid();
  addClickHandlers();
  turnCount=0
  document.getElementById("winner").innerHTML="New Game <button onclick=resetGame()>Restart</button>"


}

function addClickHandlers() {

    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
