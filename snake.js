let snakeField = document.getElementById("field");
let snakeDrawing = snakeField.getContext("2d");
let snakeRestartb = document.getElementById("restart")

document.onkeydown = function(event){snakeKeypress(event.key)}



let snakeGrid = [
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

let snakeLength = 1;
let snakeDirection = ">";
let snakePx = 0;
let snakePy = 0;
let snakeAlive = false;

function snakeKeypress (snakeKdir) {
    if (snakeKdir === "w"){
        snakeDirection = "A";
    }
    else if (snakeKdir === "s"){
        snakeDirection = "V";
    }
    else if (snakeKdir === "a"){
        snakeDirection = "<";
    }
    else if (snakeKdir === "d"){
        snakeDirection = ">";
    }
}

function snakeJablicko() {
    if (256-snakeLength-4 <= 0) {
        return;
    }
    let snakePoz = Math.floor(Math.random() * (256-snakeLength-4));
    let snakeSy = 0;
    let snakeSx = 0;
    while (snakePoz >=0){
        if (snakeGrid[snakeSy][snakeSx] === 0){
            snakePoz -=1;
        }
        if (snakePoz >= 0){
            snakeSx += 1;
            if (snakeSx >= 16){
                snakeSy += 1;
                snakeSx = 0;
            }
        }
    }
    snakeGrid[snakeSy][snakeSx] = -1;
}

function snakeMove(){
    for (let iy = 0; iy < snakeGrid.length; iy++){  
        for (let ix = 0; ix <snakeGrid[0].length; ix++){
            if (snakeGrid[iy][ix]>0){
                snakeGrid[iy][ix] -= 1;
            }
            else{
            }
        }
    }
    if (snakeDirection === "A"){
        if (snakePy-1 < 0 || snakeGrid[snakePy-1][snakePx] > 0){
            snakeDie();
            return false;
        }
        else if (snakeGrid[snakePy-1][snakePx] === -1){
            snakeLength +=1;
            snakeJablicko();
        }
        snakeGrid[snakePy-1][snakePx] = snakeLength;
        snakePy-=1;
    }
    else if (snakeDirection === "V"){
        if (snakePy+1 > snakeGrid.length-1 || snakeGrid[snakePy+1][snakePx] > 0){
            snakeDie();
            return false;
        }
        else if (snakeGrid[snakePy+1][snakePx] === -1){
            snakeLength +=1;
            snakeJablicko()
        }
        snakeGrid[snakePy+1][snakePx] = snakeLength;
        snakePy+=1;
    }
    else if (snakeDirection === "<"){
        if (snakePx-1 < 0 || snakeGrid[snakePy][snakePx-1] > 0){
            snakeDie();
            return false;
        }
        else if (snakeGrid[snakePy][snakePx-1] === -1){
            snakeLength +=1;
            snakeJablicko();
        }
        snakeGrid[snakePy][snakePx-1] = snakeLength;
        snakePx-=1;
    }
    else if (snakeDirection === ">"){
        if (snakePx+1 > snakeGrid[0].length-1 || snakeGrid[snakePy][snakePx+1] > 0){
            snakeDie();
            return false;
        }
        else if (snakeGrid[snakePy][snakePx+1] === -1){
            snakeLength +=1;
            snakeJablicko();
        }
        snakeGrid[snakePy][snakePx+1] = snakeLength;
        snakePx+=1;
    }
    return true;
}

function snakeDie(){
    snakeDrawing.fillStyle = "#a13535"
    snakeDrawing.fillRect(0, 0, 400, 400);
}

function snakeDraw(){
    for (let y = 0; y < snakeGrid.length; y++) {
        for (let x = 0; x < snakeGrid[0].length; x++){
            if (snakeGrid[y][x]===0){
                snakeDrawing.fillStyle = "grey";
                snakeDrawing.fillRect(x*25, y*25, 25, 25);
            }
            else if(snakeGrid[y][x]===snakeLength){
                snakeDrawing.fillStyle = "#268f00";
                snakeDrawing.fillRect(x*25, y*25, 25, 25);
            }
            else if (snakeGrid[y][x]===-1){
                snakeDrawing.fillStyle = "red";
                snakeDrawing.fillRect(x*25, y*25, 25, 25);

            }
            else if(snakeGrid[y][x]>0){
                snakeDrawing.fillStyle = "#3de600";
                snakeDrawing.fillRect(x*25, y*25, 25, 25);
            }
        }
    }
}

function snakeRestart(){
    snakeGrid = [
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    snakeLength=1;
    snakeAlive=true;
    snakeDirection = ">";
    snakePx = 0;
    snakePy = 0;

    for (let i = 0; i < 4; i++){
        snakeJablicko()
    snakeRestartb.innerHTML = "restart";
    }
}

setInterval(function(){
    if (snakeAlive){
        snakeAlive = snakeMove();
        snakeDraw();
    }
    else {
        snakeDie();
    }
}, 500)