# Minesweeper Solver

Welcome to Minesweeper Solver v1.awesome

    created by Shanan Sussman

## Setup

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


### Global Variables

  boardSize - (int) sets the width and height of the gameboard to play on

  numMines - (int) generates a number of randomly placed mines on the game board

### API Functions

resetGame() - will reset the gameBoard based off of boardSize and numMines. All previous game data will be
                regenerated and a new board will be created

simulateSquareClick(row, col, altKey) - this will simulate a user click event on a target square of the game
* row - (int) the row of the target square you wish to click
* col - (int) the column of the target square you wish to click
* altKey - (boolean) defines the type of click event you are simulating
    * true - reveals the value behind the target square
    * false - places a flag or removes a flag ontop of the target square
* return - the result of this action will return the possible values:
    * 0-8 -  (number of nearby mines)
    * M  - (you found a mine! oh no, game over, womp womp)
    * `*` -  (this is a userplaced flag)
    * null - (you have removed a user placed flag)

simulateWinCheck() - this will simulate clicking the check for win button to see if you have a correct solution
* return - (boolean) this will return true or false if you have won the game or not

returnSquareValue(row, col) - this will return the value of a target square
* row - (int) the row of the target square you wish to check
* col - (int) the column of the target square you wish to check

isValid(row, col, boardSize) - given the boardSize and location, this function will let you know if you are checking a valid position or not
* return - (boolean)


solver - a naive solution has been provided to provide an example implementation of the function API. Please
         feel free to remove all the code and write your own solution!


### Misc Notes
Every execution of resetGame() will print a console message with a formatted table of the solution for your
reference

Execute solver by running solver() in the console of index.html or if enabled on this page, simply refresh 
index.html