let hangCurrentWord;
let hangPicDis = document.getElementById("hangfield")
let hangPicDrawing = hangPicDis.getContext("2d");
let hangWordDis = document.getElementById("hangword");
let hangWordDrawing = hangWordDis.getContext("2d");
let hangFaze = 0;
let hangLetterIn = false;
let hangGuessWord;
let hangRestBut = document.getElementById("hangrestart")

document.addEventListener('keydown', function(event) {
    hangKeypress(event.key);
});

function hangRestart(){
    hangRestBut.innerHTML = "restart"
    hangCurrentWord= hangmanWords[Math.floor(Math.random() * hangmanWords.length)].toLowerCase();
    hangGuessWord = Array(hangCurrentWord.length).fill("_");
    hangFaze=0;
    hangWordDraw();
    hangPicDraw();

    let pressedButtons = document.querySelectorAll('.keybutton.pressed');
    pressedButtons.forEach(button => {
        button.classList.remove('pressed');
    });
}

function hangLoseCheck(){
    if (hangFaze >= 9){
        hangGuessWord = hangCurrentWord;
        hangWordDraw();
        
        let img = new Image();
        img.src = `hangmanimg/${hangFaze}.jpg`; 
        
        img.onload = function() {
            hangPicDrawing.clearRect(0, 50, 400, 300); 
            hangPicDrawing.drawImage(img, 40, 60, 320, 280); 
        };

        setTimeout(function() {
            hangPicDrawing.font = "30px 'Google Sans Flex'";
            hangPicDrawing.fillStyle = "red";
            hangPicDrawing.fillText("u dead", 100, 100);
        }, (100));
        return false;
    }
    else{
        return true;
    }
}

function hangWinCheck(){
    if(!hangGuessWord.includes("_")){
        hangPicDrawing.font = "30px 'Google Sans Flex'";
        hangPicDrawing.fillStyle = "green";
        hangPicDrawing.fillText("u win", 100, 100);
    }
}

function hangKeypress(key) {
    let button = document.getElementById(key);
        if (button) {
            button.classList.add('pressed');
        }

    for (let i = 0; i < hangCurrentWord.length; i++) {
        if (hangCurrentWord[i] === key){
            hangLetterIn = true;
            hangGuessWord[i] = key;
            hangWordDraw();
        }
    }
    if (!hangLetterIn){
            hangFaze += 1;
            if(hangLoseCheck()){
            hangPicDraw();
            }
        }
    hangWinCheck();
    hangLetterIn = false;

}

function hangPicDraw(){
    let img = new Image();
    img.src = `hangmanimg/${hangFaze}.jpg`; 
    
    img.onload = function() {
        hangPicDrawing.clearRect(0, 50, 400, 300); 
        hangPicDrawing.drawImage(img, 40, 60, 320, 280); 
    };

    img.onerror = function() {
        console.error(`Could not find image at path: images/${hangFaze}.png`);
    };
}
function hangWordDraw(){
    hangWordDrawing.clearRect(0, 0, 400, 400);
    hangWordDrawing.font = "30px 'Google Sans Flex'";
    hangWordDrawing.fillStyle = "#e0e0e0";
    for (let i = 0; i < hangGuessWord.length; i++){
        hangWordDrawing.fillText(hangGuessWord[i], 10+ Math.floor((11 - hangGuessWord.length)*17.5+(i*35)), 40);
    }
}