const SQ = 10;
const ROW = 60;
const COL = 60;
const EMPTY = "white";
const ctv = document.getElementById("gameBoard");
const ctx = ctv.getContext("2d");
const BIRD = "red"


let board = [];
//create board
for (r=0; r<ROW; r++) {
    board[r] = []
    for (c=0; c<COL; c++) {
        board[r][c] = EMPTY;
    }
}

//draw squares with given coordinates and color
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

//draw board
function drawBoard() {
    for (r=0; r<ROW; r++) {
        for (c=0; c<COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();

function Bird() {
    this.color = BIRD;
    this.x = 30;
    this.y = 30;
}

Bird.prototype.draw = function() {
    for (x=0; x<5; x++) {
        for (y=0; y<5; y++) {
            drawSquare(this.x+x, this.y+y, BIRD)
        }
    }
}

let bird = new Bird();
bird.draw();

Bird.prototype.unDraw = function() {
    for (x=0; x<5; x++) {
        for (y=0; y<5; y++) {
            drawSquare(this.x+x, this.y+y, EMPTY)
        }
    }
}
