// Funcionamento do código:
// Escreva em boardBeSolved o Sudoku que deseja que seja resolvido

const b = null;

const boardBeSolved = [
  [b, b, b, 8, 7, b, b, b, b],
  [b, b, b, b, b, b, b, 8, b],
  [9, 2, b, b, b, b, b, b, 4],

  [b, 5, b, b, 3, b, b, b, 6],
  [b, b, b, b, b, b, b, b, b],
  [b, b, 4, 6, b, 1, b, b, 3],

  [b, 3, b, b, 5, 2, b, 4, b],
  [6, b, b, b, b, 9, 5, b, b],
  [b, b, 9, b, b, 6, b, 2, b]
];

function solveSudoku(board) {
    if (solved(board)) {
        return board;
    } else {
        const possibilities = nextBoards(board);
        const validBoards = keepOnlyValid(possibilities);
        return searchForSolution(validBoards);
    }
}

function searchForSolution(board) {
  if (board.length < 1) {
    return false;
  } else {
    var first = board.shift();
    const tryPath = solveSudoku(first);
    if (tryPath != false) {
      return tryPath;
    } else {
      return searchForSolution(board);
    }
  }
}

function solved(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == null) {
        return false;
      }
    }
  }
  return true;
}

function nextBoards(board) {
  var res = [];
  const firstEmpty = findEmptySquare(board);
  if (firstEmpty != undefined) {
    const y = firstEmpty[0];
    const x = firstEmpty[1];
    for (var i = 1; i <= 9; i++) {
      var newBoard = [...board];
      var row = [...newBoard[y]];
      row[x] = i;
      newBoard[y] = row;
      res.push(newBoard);
    }
  }
  return res;
}

function findEmptySquare(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == null) {
        return [i, j];
      }
    }
  }
}

function keepOnlyValid(board) {
  return board.filter((b) => validBoards(b));
}

function validBoards(board) {
  return rowGood(board) && columnGood(board) && boxesGood(board);
}

function rowGood(board) {
  for (var i = 0; i < 9; i++) {
    var cur = [];
    for (var j = 0; j < 9; j++) {
      if (cur.includes(board[i][j])) {
        return false;
      } else if (board[i][j]) {
        cur.push(board[i][j]);
      }
    }
  }
  return true;
}

function columnGood(board) {
  for (var i = 0; i < 9; i++) {
    var cur = [];
    for (var j = 0; j < 9; j++) {
      if (cur.includes(board[j][i])) {
        return false;
      } else if (board[j][i]) {
        cur.push(board[j][i]);
      }
    }
  }
  return true;
}

function boxesGood(board) {
  const boxCoordinates = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2]
  ];

  for (var y = 0; y < 9; y += 3) {
    for (var x = 0; x < 9; x += 3) {
      var cur = [];
      for (var i = 0; i < 9; i++) {
        var coordinates = [...boxCoordinates[i]];
        coordinates[0] += y;
        coordinates[1] += x;
        if (cur.includes(board[coordinates[0]][coordinates[1]])) {
          return false;
        } else if (board[coordinates[0]][coordinates[1]] != null) {
          cur.push(board[coordinates[0]][coordinates[1]]);
        }
      }
    }
  }
  return true;
}

console.log(solveSudoku(boardBeSolved)); //o output gerado será por linhas
