/*
Welcome to Minesweeper Solver v1.awesome
    created by Shanan Sussman

If you are unfamiliar with the game itself, it is pretty straight forward. There is a grid of NxN squares
on the board. Behind some of the squares are mines. It is your job to discover and flag (click) where you think 
those mines are located. In order to win, you have to successfully flag as many mines as there are in the
gameboard.

Alt + Clicking on a square will reveal if there is a mine there or not. If there is a mine, game over, you lose, 
reset and try again. If there is not a mine there, hooray!, it will reveal a number from 0-8 indicating how many
mines are in the direct vincinity of that location. You should use this information to your advantage in order to
try and discern which nearby square has a mine in it. If the result is 0 that means there are no mines located in 
any location nearby, which is great news!

Currently you can play the game through index.html, but can you build a solver to do it programattically?

In the solver function please try and implement a solution for the game itself. You may write as much or little 
code as you deem necessary

Feel free to inspect minesweeper.js to learn about any game logic, however, you should not need to modify it

There are no space or time restrictions

Global Variables
  boardSize - (int) sets the width and height of the gameboard to play on
  numMines - (int) generates a number of randomly placed mines on the game board

API Functions
  resetGame() - will reset the gameBoard based off of boardSize and numMines. All previous game data will be
                regenerated and a new board will be created

  simulateSquareClick(row, col, altKey) - this will simulate a user click event on a target square of the game,
        if the value is 0, it will automatically reveal as many adjacent 0s as it can
            row - (int) the row of the target square you wish to click
            col - (int) the column of the target square you wish to click
            altKey - (boolean) defines the type of click event you are simulating
                     true - reveals the value behind the target square
                     false - places a flag or removes a flag ontop of the target square
            return - the result of this action will return the possible values:
                      0-8 -  (number of nearby mines)
                      M  - (you found a mine! oh no, game over, womp womp)
                      * -  (this is a userplaced flag)
                      null - (you have removed a user placed flag)

  simulateWinCheck() - this will simulate clicking the check for win button to see if you have a correct solution
            return - (boolean) this will return true or false if you have won the game or not

  checkSquareValue(row, col) - this will return the value of a target square
            row - (int) the row of the target square you wish to check
            col - (int) the column of the target square you wish to check

  isValid(row, col) - given  location, this function will let you know if you are checking a valid position or not
            return - (boolean)

  checkRemainingMines() - returns number of mines left to find on the game board
            return - (int) number value of mines left


solver - a naive solution has been provided to provide an example implementation of the function API. Please
         feel free to remove all the code and write your own solution!



Every execution of resetGame() will print a console message with a formatted table of the solution for your
reference

Execute solver by running solver() in the console of index.html or if enabled on this page, simply refresh 
index.html
*/

// global game settings
boardSize = 5;
numMines = 1;


// this is a naive solution, please replace and try it yourself!
var solver = function(){
  resetGame();
  var row = 0;
  var col = 0;

  var firstClick = simulateSquareClick(row, col, true);
  
  // edge case for if we lose on our first guess
  if (firstClick === 'M') {
    resetGame();
  }

  else if (firstClick === 1) {
    col = 3;
    simulateSquareClick(row, col, true);
  }

  for (row; row < boardSize; row++) {
    col = 0;
    for (col; col < boardSize; col++) {
      var currentValue = checkSquareValue(row, col);
      if (typeof currentValue === 'number' && currentValue > 0) {
        var nearbyMines = findNearbyMines(row, col);
        if (nearbyMines.length === 1) {
          if (checkSquareValue(nearbyMines[0][0], nearbyMines[0][1]) !== '*') {
            simulateSquareClick(nearbyMines[0][0],nearbyMines[0][1], false);
          }
        }
        else if (nearbyMines.length > 1) {
          var spaceAroundMines = {count: 0, index:0};
          for (var i = 0; i < nearbyMines.length; i++) {
            var mineRow = nearbyMines[i][0];
            var mineCol = nearbyMines[i][1];
            var counter = 0;
            checkProximity(mineRow, mineCol, function(row, col) {
              var currentVal = checkSquareValue(row, col);
              if (typeof currentVal === 'number' && currentVal > 0) {
                counter++;
              }
            })
            if (counter > spaceAroundMines.count) {
              spaceAroundMines.count = counter;
              spaceAroundMines.index = i;
            }
          }
          var toFlag = nearbyMines[spaceAroundMines.index];
          if (checkSquareValue(toFlag[0], toFlag[1]) !== '*') {
            simulateSquareClick(toFlag[0], toFlag[1], false);
          }
        }
      }
    }

  }

  simulateWinCheck();
}

var findNearbyMines = function(row, col) {
  var possibleMines = [];
  var rowOffset = -1;
  var colOffset = -1;

  var callback = function(row, col) {
      var currentVal = checkSquareValue(row, col);
      
      if (currentVal === null || currentVal === '*') {
        possibleMines.push([row, col]);
      }
  }

  checkProximity(row, col, callback)
  return possibleMines;
}

var checkProximity = function(row, col, callback) {
  var rowOffset = -1;
  var colOffset = -1;

  for (var i = 0; i < 9; i++) {
    var currentRow = row + rowOffset;
    var currentCol = col + colOffset;

    if (isValid(currentRow, currentCol)) {
      callback(currentRow, currentCol);

      colOffset++;

      if (colOffset === 2) {
        colOffset = -1;
        rowOffset++;
      }
    } else {
      colOffset++;
      if (colOffset === 2) {
        colOffset = -1;
        rowOffset++;
      }
    }
  }
}


// Uncomment the line below to have the solver automatically run every refresh of index.html
// otherwise manually execute solver() in console of index.html
// solver();