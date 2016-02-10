var boardSize = 5;
var numMines = 5;
var gameboard;
var mineCount;
var mineCountDom = document.getElementById('mine-count');


var calculateBoard = function(boardSize, numMines) {
  var mines = Object.keys(generateMines(numMines, boardSize));
  var board = initializeBoardArray(boardSize);

  for (var k = 0; k < mines.length; k++) {
    board[mines[k][0]][mines[k][1]] = 'M';
  }

  for (m = 0; m < board.length; m++) {
    for (p = 0; p < board[m].length; p++) {
      if (board[m][p] !== 'M') {
        board[m][p] = countMines(m, p, board.length, board)
      }
    }
  }

  return board
};

var generateMines = function(numMines, boardSize) {
  var mineLocations = {};
  var random;
  var totalSquares = boardSize * boardSize;

  if (numMines > totalSquares) {
    numMines = totalSquares;
    console.log(numMines, totalSquares);
  }

  for (var i = 0; i < numMines; i++) {
    random = generateRandomLocation(boardSize);

    while (mineLocations[random] === true) {
      random = generateRandomLocation(boardSize);
    }
    mineLocations[random] = true;
  }

  return mineLocations;
}

var initializeBoardArray = function(boardSize) {
  return Array.apply(null, Array(boardSize)).map(function(row) {
    return Array.apply(null, Array(boardSize)).map(function(item) {
      return item = 0
    })
  });
}

var generateRandomLocation = function(boardSize) {
  var x = Math.floor(Math.random() * boardSize);
  var y = Math.floor(Math.random() * boardSize);
  return "" + x + y;
}

var countMines = function(posX, posY, size, board) {
  var count = 0;
  var xOffset = -1;
  var yOffset = -1;

  for (var i = 0; i < 9; i++) {
    if (isValid(posX - xOffset, posY - yOffset, size)) {
      if (board[posX - xOffset][posY - yOffset] === 'M') {
        count++;
      }

      yOffset++;

      if (yOffset === 2) {
        yOffset = -1;
        xOffset++;
      }
    } else {
      yOffset++;
      if (yOffset === 2) {
        yOffset = -1;
        xOffset++;
      }
    }
  }

  return count;
}

var isValid = function(posX, posY, size) {
  return posX < size && posX >= 0 && posY < size && posY >= 0;
}

var el = document.getElementsByClassName('square')[0];
var mineEl = el.children[0];
var mineFlag = mineEl.innerHTML;
var dom;

var attachClickEvent = function(el){
  var clickEvent = function(event){
    if (!event.altKey){
      if(el.style.backgroundColor !== 'grey') {
        if (el.children.length > 0) {
          el.removeChild(el.children[0]);
          mineCount++;
        }
        else {
          var tempMine = mineEl.cloneNode(true);
          el.appendChild(tempMine);
          mineCount--;
        }
        mineCountDom.innerHTML = mineCount;
      }
    }
    else {
      var id;
      var nearbyMines;
      var tempMine;
      var target = event.target;
      if (target.className === "mine") {
        id = target.parentElement.id.split(',');
        target.parentElement.removeChild(target.parentElement.children[0]);
      }
      else {
        id = target.id.split(',');
      }
      
      nearbyMines = checkBoard(id[0], id[1]);
      tempMine = mineEl.cloneNode(true);
      tempMine.innerHTML = nearbyMines;
      el.appendChild(tempMine);
      
      if (nearbyMines !== 'M') {
        el.style.backgroundColor = 'grey';
      }
      else {
        el.style.backgroundColor = 'red';
        var domTest = dom.cloneNode(true);
        dom.parentNode.replaceChild(domTest, dom);
        throw new Error('Found A Mine!');
      }
    }
  }
  el.addEventListener('click', clickEvent);
};

var drawBoard = function(boardSize) {
  for (var i = 0; i < boardSize; i++) {
    var row = document.createElement('div');
    row.className = 'row';
    document.getElementById('game-board').appendChild(row);
    
    for (var k = 0; k < boardSize; k++) {
      var newSquare = el.cloneNode(true);
      
      newSquare.style.display = "inline-block";
      newSquare.removeChild(newSquare.children[0]);
      newSquare.id = '' + i + ',' + k;
      row.appendChild(newSquare);
      attachClickEvent(row.children[k]);
    }
  }
  dom = document.getElementById('game-board');
};

var clearBoard = function() {
  var domBoard = document.getElementById('game-board');
  var children = Array.prototype.slice.call(domBoard.children);

  children.forEach(function(child) {
    domBoard.removeChild(child);
  });
}
var resetGame = function() {
  mineCount = numMines;
  mineCountDom.innerHTML = mineCount;
  gameboard = calculateBoard(boardSize, numMines);

  clearBoard();
  console.table(gameboard);
  drawBoard(boardSize);
}
var checkBoard = function(row, col) {
  return gameboard[row][col];
}

var simulateSquareClick = function(row, col, altKey) {
  var click = new MouseEvent('click', {altKey: altKey});
  var targetSquare = document.getElementById('' + row + ',' + col);

  // (function(targetSquare, click){setTimeout(function(){targetSquare.dispatchEvent(click);}, 1000)})(targetSquare, click);
  targetSquare.dispatchEvent(click)
  return targetSquare.children[0] ? targetSquare.children[0].innerHTML : null;
};

var simulateWinCheck = function() {
  var click = new MouseEvent('click');
  var checkForWinButton = document.getElementById('check-win');

  checkForWinButton.dispatchEvent(click);
}

var checkFalseFlag = function(foundMine, squareFlag) {
  return foundMine && squareFlag && squareFlag === mineFlag;
}

var checkMine = function(row, col) {
  return gameboard[row][col] === 'M';
}

var checkForWin = function() {
  var result = true;
  var id;
  var squares;
  var rows;
  
  rows = Array.prototype.slice.call(dom.children);
  rows.forEach(function(row) {
    squares = Array.prototype.slice.call(row.children);
    squares.forEach(function(square){
      var foundMine;
      var squareFlag;
      
      id = square.id.split(',');
      foundMine = checkMine(id[0], id[1]);
      if (square.children.length > 0) {
        squareFlag = square.children[0].innerHTML;
      }
      if (result) {
        if (foundMine) {
          if (squareFlag) {
            result = checkFalseFlag(foundMine, squareFlag);
          }
          else {
            result = false;
          }
        }
        else {
          if (squareFlag) {
            result = squareFlag !== mineFlag;
          }
        }
      }
    });
  });
  console.log('checkForWin result:', result);
  if (result) alert('You Win!');
  else alert('Not this time');
  return result;
};

var attachEventListeners = function(){
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('check-win').addEventListener('click', checkForWin);
};

var init = function(){
attachEventListeners();
resetGame();
}

init();