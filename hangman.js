let hangCurrentWord;
let hangPicDis = document.getElementById("hangfield")
let hangPicDrawing = hangPicDis.getContext("2d");
let hangWordDis = document.getElementById("hangword");
let hangWordDrawing = hangWordDis.getContext("2d");
let hangFaze = 0;
let hangLetterIn = false;
let hangGuessWord;
let hangRestBut = document.getElementById("hangrestart")

function hangRestart(){
    hangRestBut.innerHTML = "restart"
    hangCurrentWord= hangmanWords[Math.floor(Math.random() * hangmanWords.length)].toLowerCase();
    hangGuessWord = Array(hangCurrentWord.length).fill("_");
    hangFaze=0;
    hangWordDraw();
    hangPicDraw();
}

function hangKeypress(key) {
    for (let i = 0; i < hangCurrentWord.length; i++) {
        if (hangCurrentWord[i] === key){
            hangLetterIn = true;
            hangGuessWord[i] = key;
            hangWordDraw();
        }
        
    }
    if (!hangLetterIn){
            hangFaze += 1;
            hangPicDraw();
        }
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