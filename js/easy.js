var board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

var player = "X";
var computer = "O";

function equal(a, b, c) {
  return a == b && b == c && a != "";
}

function isWin() {
  for (let i = 0; i < 3; i++) {
    if (equal(board[i][0], board[i][1], board[i][2])) return board[i][0];
    if (equal(board[0][i], board[1][i], board[2][i])) return board[0][i];
  }
  if (equal(board[0][0], board[1][1], board[2][2])) return board[0][0];
  if (equal(board[2][0], board[1][1], board[0][2])) return board[2][0];

  let spots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") spots++;
    }
  }

  if (spots == 0) return "tie";
  return null;
}

var game = false;

function reset() {
  window.location.href = "";
}

function check() {
  let result = isWin();
  if (result == "O") new Audio("./assests/loose.wav").play();
  else if (result == "X") new Audio("./assests/machinefail.wav").play();
  else if (result == "tie") new Audio("./assests/tie.mp3").play();
  if (result != null) {
    game = true;
    let winner =
      result == "X"
        ? "X is Winner..  Restart?"
        : result == "O"
        ? "O is Winner..  Restart?"
        : "This is a tie.. Restart?";
    if (confirm(winner)) setTimeout(reset, 6000);
  }
}

function Edith() {
  if (game) return false;
  setTimeout(check, 300);
  com.play();
  place = places[$()];
  while (board[parseInt(place[0])][parseInt(place[2])] != "")
    place = places[$()];
  let x = parseInt(place[0]);
  let y = parseInt(place[2]);
  board[x][y] = "O";
  document.getElementById(place).innerHTML = "<h1>O</h1>";
  document.getElementById(place).style.backgroundColor = "royalblue";
  document.getElementById("X").style.borderColor = "green";
  document.getElementById("O").style.borderColor = "white";
}

function move(x, y) {
  if (gameStart) return false;
  pl.play();
  document.getElementById("X").style.borderColor = "white";
  document.getElementById("O").style.borderColor = "royalblue";
  if (board[x][y] == "") {
    board[x][y] = "X";
    document.getElementById(x + "," + y).innerHTML = "<h1>X</h1>";
    document.getElementById(x + "," + y).style.backgroundColor = "green";
    setTimeout(check, 500);
    setTimeout(Edith, 500);
  } else alert("Already Occupied!");
}

var h = 0;
var places = ["0,0", "0,1", "0,2", "1,0", "1,1", "1,2", "2,0", "2,1", "2,2"];
var state = false;
var res;
var starts = new Audio("./assests/start.mp3");
var com = new Audio("./assests/computer.wav");
var pl = new Audio("./assests/player.wav");

function $() {
  let min = 0;
  let max = places.length - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var second = false;
function load() {
  if (h == 80) {
    gameStart = false;
    if (second) setTimeout(Edith, 500);
    starts.pause();
  }
  if (h < 80) {
    let place = places[$()];
    if (state == false) {
      let color = $() > 5 ? "royalblue" : "green";
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
  temp.innerHTML = "Easy";
  document.getElementById("start").remove();
  document.getElementById("board").style.display = "inline";
  document.getElementById("board").appendChild(temp);
  if (a) second = true;
  load();
  starts.play();
}
