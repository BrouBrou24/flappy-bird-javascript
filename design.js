const SQ = 10;
const ROW = 60;
const COL = 60;
const EMPTY = "white";
const ctv = document.getElementById("gameBoard");
const ctx = ctv.getContext("2d");
const BIRD = "red"
const OBS = "green"


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
    this.x = 10;
    this.y = 30;
    this.count = 0;
    this.obsY = 0;
    this.orientation = 0;
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

Bird.prototype.floatUp = function() {
    if (this.count<10) {
        this.unDraw();
        this.y -= 1;
        this.draw();
        this.count += 1;
    }
}

Bird.prototype.floatDown = function() {
    this.unDraw();
    this.y += 1;
    this.draw();
}

let time = Date.now();
let gameOver = false;
let flying = false;

function fall() {
    let now = Date.now();
    let delta = now - time;
    if (delta > 30) {
        bird.floatDown();
        time = Date.now();
    }
    if (!gameOver) {
        requestAnimationFrame(fall);
    }
}

function flap() {
    setInterval(() => {
        bird.floatUp();
    }, 12);
    bird.count = 0;
}

function Obstacle() {
    this.x = COL-3;
    this.y = ROW;
    this.obsY = 0
    this.body = []
}

Obstacle.prototype.draw = function() {
    this.orientation = Math.floor(Math.random() * 2) + 1;
    this.obsY = Math.floor(Math.random() * 20) + 10;
    if (this.orientation == 1) {
        for (x=0; x<4; x++) {
            for (y=0; y<this.obsY; y++) {
                drawSquare(this.x+x, this.y-y, OBS);
                this.body.unshift([this.x+x, this.y-y]);
            }
        }
    }
    else {
        for (x=0; x<4; x++) {
            for (y=0; y<this.obsY; y++) {
                drawSquare(this.x+x, y, OBS)
                this.body.unshift([this.x+x, y])
            }
        }
    }
}

Obstacle.prototype.unDraw = function () {
    while (this.body.length>0) {
        drawSquare(this.body[0][0], this.body[0][1], EMPTY);
        this.body.shift(this.body[0][0], this.body[0][1]);
    }
}

Obstacle.prototype.move = function() {
    this.unDraw();
    this.x -= 1;
    if (this.orientation == 1) {
        for (x=0; x<3; x++) {
            for (y=0; y<this.obsY; y++) {
                drawSquare(this.x+x, this.y-y, OBS);
                this.body.unshift([this.x+x, this.y-y])
            }
        }
    }
    else {
        for (x=0; x<3; x++) {
            for (y=0; y<this.obsY; y++) {
                drawSquare(this.x+x, y, OBS);
                this.body.unshift([this.x+x, y])
            }
        }
    }
}

obstacles = []

setInterval(function() {
    let newObs = new Obstacle();
    newObs.draw();
    obstacles.push(newObs);
}, 1000);

setInterval(function() {
    for (i=0; i<obstacles.length; i++) {
        obstacles[i].move();
        console.log(obstacles[i]);
    }
}, 50);

ctv.addEventListener("click", function() {
    flap();
    fall();
})


