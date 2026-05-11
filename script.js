let field = document.getElementById("field");
let drawing = field.getContext("2d");
let restartb = document.getElementById("restart")

document.onkeydown = function(event){keypress(event.key)}



let grid = [
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

let length = 1;
let direction = ">";
let px = 0;
let py = 0;
let alive = false;

function keypress (kdir) {
    if (kdir === "w"){
        direction = "A";
    }
    else if (kdir === "s"){
        direction = "V";
    }
    else if (kdir === "a"){
        direction = "<";
    }
    else if (kdir === "d"){
        direction = ">";
    }
}

function jablicko() {
    if (256-length-4 <= 0) {
        return;
    }
    let poz = Math.floor(Math.random() * (0, 256-length-4));
    let sy = 0;
    let sx = 0;
    while (poz >=0){
        if (grid[sy][sx] === 0){
            poz -=1;
        }
        if (poz >= 0){
            sx += 1;
            if (sx >= 16){
                sy += 1;
                sx = 0;
            }
        }
    }
    grid[sy][sx] = -1;
}

function move(){
    for (let iy = 0; iy < grid.length; iy++){  
        for (let ix = 0; ix <grid[0].length; ix++){
            if (grid[iy][ix]>0){
                grid[iy][ix] -= 1;
            }
            else{
            }
        }
    }
    if (direction === "A"){
        if (py-1 < 0 || grid[py-1][px] > 0){
            die();
            return false;
        }
        else if (grid[py-1][px] === -1){
            length +=1;
            jablicko();
        }
        grid[py-1][px] = length;
        py-=1;
    }
    else if (direction === "V"){
        if (py+1 > grid.length-1 || grid[py+1][px] > 0){
            die();
            return false;
        }
        else if (grid[py+1][px] === -1){
            length +=1;
            jablicko()
        }
        grid[py+1][px] = length;
        py+=1;
    }
    else if (direction === "<"){
        if (px-1 < 0 || grid[py][px-1] > 0){
            die();
            return false;
        }
        else if (grid[py][px-1] === -1){
            length +=1;
            jablicko();
        }
        grid[py][px-1] = length;
        px-=1;
    }
    else if (direction === ">"){
        if (px+1 > grid[0].length-1 || grid[py][px+1] > 0){
            die();
            return false;
        }
        else if (grid[py][px+1] === -1){
            length +=1;
            jablicko();
        }
        grid[py][px+1] = length;
        px+=1;
    }
    return true;
}

function die(){
    drawing.fillStyle = "#a13535"
    drawing.fillRect(0, 0, 400, 400);
}

function draw(){
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++){
            if (grid[y][x]===0){
                drawing.fillStyle = "grey";
                drawing.fillRect(x*25, y*25, 25, 25);
            }
            else if(grid[y][x]===length){
                drawing.fillStyle = "#268f00";
                drawing.fillRect(x*25, y*25, 25, 25);
            }
            else if (grid[y][x]===-1){
                drawing.fillStyle = "red";
                drawing.fillRect(x*25, y*25, 25, 25);

            }
            else if(grid[y][x]>0){
                drawing.fillStyle = "#3de600";
                drawing.fillRect(x*25, y*25, 25, 25);
            }

        
        }
    }
}

function restart(){
    grid = [
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
    length=1;
    alive=true;
    direction = ">";
    px = 0;
    py = 0;

    for (let i = 0; i < 4; i++){
        jablicko()
    restartb.innerHTML = "restart";
    }
}

setInterval(function(){
    if (alive){
        alive = move();
        draw();
    }
    else {
        die();
    }
}, 500)