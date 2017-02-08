import _ from 'lodash';

const PLAYER_1_TOKEN = 'O';
const PLAYER_2_TOKEN = 'X';

class XOBoard {

  constructor() {
    this.reset()
  }

  eachCell(callback) {
    _.forEach(this.board, (arr, row) => {
      _.forEach(arr, (value, col) => {
        callback(value, row, col);
      });
    });
  }

  reset() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    this.eachCell((value, row, col) => {
      $('#cell-' + row + '-' + col).html('').attr('disabled', false);
    });
  }

  disable() {
    this.eachCell((value, row, col) => {
      $('#cell-' + row + '-' + col).attr('disabled', true);
    });
  }

  set(row, col, player) {
    this.board[row][col] = player;
    let token = (player == 1) ? PLAYER_1_TOKEN : PLAYER_2_TOKEN;
    $('#cell-' + row + '-' + col).html(token).attr('disabled', true);
  }

  isWinner(row, col, player) {
    var num,
      rowWin = true,
      columnWin = true,
      forwardDiagonalWin = true,
      backwardDiagonalWin = true,
      onDiagonal = (row === col) || (col == -1 * row + 2);

    // check for row and column wins
    for (num = 0; num < 3; num++) {
      if (this.board[row][num] != player) {
        rowWin = false;
      }

      if (this.board[num][col] != player) {
        columnWin = false;
      }
    }

    // check for diagonal wins
    if (onDiagonal) {
      for (num = 0; num < 3; num++) {
        if (this.board[num][num] != player) {
          forwardDiagonalWin = false;
        }
        if (this.board[num][-1 * num + 2] != player) {
          backwardDiagonalWin = false;
        }
      }
    } else {
      forwardDiagonalWin = false;
      backwardDiagonalWin = false;
    }

    // determine if a win was found
    return rowWin || columnWin || forwardDiagonalWin || backwardDiagonalWin;
  }

  isTie() {
    return $(".btn:disabled").length === 9;
  }
}

export default XOBoard;
