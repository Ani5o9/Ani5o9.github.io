var turn = "X";
var gameStart = true;

var computer = "O";
var player = "X";
var times = 0;

var isPlayerMiddle = false;
var isCritical = false;

var com = new Audio("./assests/computer.wav");
var pl = new Audio("./assests/player.wav");
var starts = new Audio("./assests/start.wav");

var board = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"]
];

Array.prototype.remove = function() {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) != -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

var places = ["0,0", "0,1", "0,2", "1,0", "1,1", "1,2", "2,0", "2,1", "2,2"];

var playerTurn = { x: 0, y: 0 };

function gameover() {
  var elems = document.getElementsByClassName("cell");
  for (var i = 0; i < elems.length; i++) {
    elems[i].disabled = true;
  }
  if (confirm("Game Over! Restart?")) {
    window.location.href = "";
  }
}
function isWin() {
  for (row = 0; row < 3; row++) {
    if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
      if (board[row][0] == player) return player;
      else if (board[row][0] == computer) return computer;
    }
  }

  for (col = 0; col < 3; col++) {
    if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {
      if (board[0][col] == player) return player;
      else if (board[0][col] == computer) return computer;
    }
  }

  if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
    if (board[0][0] == player) return player;
    else if (board[0][0] == computer) return computer;
  }

  if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
    if (board[0][2] == player) return player;
    else if (board[0][2] == computer) return computer;
  }

  return false;
}

function planB() {
  let block = "-",
    blocks = 0;
  let place = "-";
  let row;
  for (row = 0; row < 3; row++) {
    if (board[row][2] == board[row][1] && board[row][0] == "_") {
      if (board[row][2] == "O") {
        place = row + "," + "0";
      } else if (board[row][2] == "X") {
        block = row + "," + "0";
        blocks++;
      }
    }
    if (board[row][0] == board[row][1] && board[row][2] == "_") {
      if (board[row][0] == "O") {
        place = row + "," + "2";
      } else if (board[row][0] == "X") {
        block = row + "," + "2";
        blocks++;
      }
    }
    if (board[row][2] == board[row][0] && board[row][1] == "_") {
      if (board[row][2] == "O") {
        place = row + "," + "1";
      } else if (board[row][2] == "X") {
        block = row + "," + "1";
        blocks++;
      }
    }
    if (board[0][row] == board[1][row] && board[2][row] == "_") {
      if (board[0][row] == "O") {
        place = "2" + "," + row;
      } else if (board[0][row] == "X") {
        block = "2" + "," + row;
        blocks++;
      }
    }
    if (board[2][row] == board[1][row] && board[0][row] == "_") {
      if (board[2][row] == "O") {
        place = "0" + "," + row;
      } else if (board[2][row] == "X") {
        block = "0" + "," + row;
        blocks++;
      }
    }
    if (board[2][row] == board[0][row] && board[1][row] == "_") {
      if (board[2][row] == "O") {
        place = "1" + "," + row;
      } else if (board[2][row] == "X") {
        block = "1" + "," + row;
        blocks++;
      }
    }
  }
  if (board[0][0] == board[1][1] && board[2][2] == "_") {
    if (board[0][0] == "O") {
      place = "2,2";
    }
    if (board[0][0] == "X") {
      block = "2,2";
    }
  }
  if (board[0][0] == board[2][2] && board[1][1] == "_") {
    if (board[0][0] == "O") {
      place = "1,1";
    }
    if (board[0][0] == "X") {
      block = "1,1";
    }
  }
  if (board[2][2] == board[1][1] && board[0][0] == "_") {
    if (board[2][2] == "O") {
      place = "0,0";
    }
    if (board[2][2] == "X") {
      block = "0,0";
    }
  }
  if (board[0][2] == board[1][1] && board[2][0] == "_") {
    if (board[0][2] == "O") {
      place = "2,0";
    }
    if (board[0][2] == "X") {
      block = "2,0";
    }
  }
  if (board[0][2] == board[2][0] && board[1][1] == "_") {
    if (board[0][2] == "O") {
      place = "1,1";
    }
    if (board[0][2] == "X") {
      block = "1,1";
    }
  }
  if (board[1][1] == board[2][0] && board[0][2] == "_") {
    if (board[2][0] == "O") {
      place = "0,2";
    }
    if (board[2][0] == "X") {
      block = "0,2";
    }
  }
  turn = player;
  if (place != "-") {
    document.getElementById(place).innerHTML = "<h1>O</h1>";
    let x = parseInt(place[0]);
    let y = parseInt(place[2]);
    board[x][y] = "O";
    console.log("place : " + place);
    places.remove(place);
    document.getElementById(place).style.backgroundColor = "royalblue";
  } else if (block != "-") {
    document.getElementById(block).innerHTML = "<h1>O</h1>";
    board[parseInt(block[0])][parseInt(block[2])] = "O";
    console.log("block : " + block);
    places.remove(block);
    document.getElementById(block).style.backgroundColor = "royalblue";
  } else {
    place = places[$()];
    while (board[parseInt(place[0])][parseInt(place[2])] != "_")
      place = places[$()];
    console.log("place : " + place);
    document.getElementById(place).innerHTML = "<h1>O</h1>";
    let x = parseInt(place[0]);
    let y = parseInt(place[2]);
    board[x][y] = "O";
    places.remove(place);
    document.getElementById(place).style.backgroundColor = "royalblue";
  }
  times++;
  return times;
}

function $() {
  let min = 0;
  let max = places.length - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Edith() {
  if (times == 9) {
    setTimeout(gameover, 1000);
    new Audio("./assests/tie.mp3").play();
  }
  com.play();
  if (playerTurn.x == 1 && playerTurn.y == 1 && times == 1) {
    isPlayerMiddle = true;
    board[2][2] = "O";
    turn = player;
    let place = "2,2";
    console.log("place : " + place);
    places.remove(place);
    document.getElementById(place).innerHTML = "<h1>O</h1>";
    document.getElementById(place).style.backgroundColor = "royalblue";
    document.getElementById("X").style.borderColor = "green";
    document.getElementById("O").style.borderColorr = "white";
    return times++;
  } else if (times == 1) {
    turn = player;
    let place = "1,1";
    board[1][1] = "O";
    console.log("place : " + place);
    places.remove(place);
    document.getElementById(place).innerHTML = "<h1>O</h1>";
    document.getElementById(place).style.backgroundColor = "royalblue";
    document.getElementById("X").style.borderColor = "green";
    document.getElementById("O").style.borderColor = "white";
    return times++;
  } else if (isPlayerMiddle && times == 3) {
    if (playerTurn.x == 0 && playerTurn.y == 0) {
      turn = player;
      let place = "2,0";
      board[2][0] = "O";
      console.log("place : " + place);
      document.getElementById(place).innerHTML = "<h1>O</h1>";
      places.remove(place);
      document.getElementById(place).style.backgroundColor = "royalblue";
      document.getElementById("X").style.borderColor = "green";
      document.getElementById("O").style.borderColor = "white";
      return times++;
    } else planB();
  } else planB();
  turn = player;
  document.getElementById("X").style.borderColor = "green";
  document.getElementById("O").style.borderColor = "white";
  let temp = isWin();
  if (temp == player) {
    new Audio("./assests/machinefail.wav").play();
    setTimeout(gameover, 1000);
  } else if (temp == computer) {
    new Audio("./assests/loose.wav").play();
    setTimeout(gameover, 1000);
  }
}

function move(x, y) {
  if (turn == computer) return false;
  if (gameStart) return false;
  pl.play();
  document.getElementById("X").style.borderColor = "white";
  document.getElementById("O").style.borderColor = "royalblue";
  if (board[x][y] != "_") {
    alert("That is Occupied...");
  } else {
    if (times == 9) {
      setTimeout(gameover, 1000);
      new Audio("./assests/gameover.wav").play();
    } else {
      times++;
      board[x][y] = "X";
      playerTurn.x = x;
      playerTurn.y = y;
      let place = x.toString() + "," + y.toString();
      document.getElementById(place).innerHTML = "<h1>X</h1>";
      document.getElementById(place).style.backgroundColor = "green";
      places.remove(place);
      turn = computer;
      let temp = isWin();
      if (temp == player) {
        new Audio("./assests/machinefail.wav").play();
        setTimeout(gameover, 1000);
      } else if (temp == computer) {
        new Audio("./assests/loose.wav").play();
        setTimeout(gameover, 1000);
      } else setTimeout(Edith, 500);
    }
  }
}

var h = 0;
var state = false;
var res;
var second = false;
function load() {
  if (h == 80) {
    gameStart = false;
    if (second) {
      turn = player;
      setTimeout(Edith, 500);
    }
  }
  if (h < 80) {
    let place = places[$()];
    if (state == false) {
      let color = $() > 5 ? "blue" : "green";
      document.getElementById(place).style.backgroundColor = color;
      res = place;
      state = true;
    } else {
      document.getElementById(res).style.backgroundColor = "rgb(233, 233, 233)";
      state = false;
    }
    h++;
    setTimeout(load, 80);
  }
}

function start(a) {
  let temp = document.createElement("h1");
  temp.style.color = "white";
  temp.innerHTML = "Medium";
  document.getElementById("start").remove();
  document.getElementById("board").style.display = "inline";
  document.getElementById("board").appendChild(temp);
  if (a) second = true;
  load();
  starts.play();
}
