let hangCurrentWord;
let hangWordDis = document.getElementById("hangword");
let hangWordDrawing = hangWordDis.getContext("2d");
let hangFaze = 0;
let hangLetterIn = false;
let hangGuessWord;

function hangRestart(){
    hangCurrentWord= hangmanWords[Math.floor(Math.random() * hangmanWords.length)].toLowerCase();
    hangGuessWord = Array(hangCurrentWord.length).fill("_");
    console.log(hangCurrentWord);
    console.log(hangGuessWord);
    hangWordDraw();
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
            console.log(hangFaze)
            hangPicDraw();
        }
    hangLetterIn = false;

}

function hangPicDraw(){
                                            //TODO
}
function hangWordDraw(){
    hangWordDrawing.clearRect(0, 0, 400, 400);
    hangWordDrawing.font = "30px 'Google Sans Flex'";
    for (let i = 0; i < hangGuessWord.length; i++){
        hangWordDrawing.fillText(hangGuessWord[i], 10+ Math.floor((11 - hangGuessWord.length)*17.5+(i*35)), 40);
    }
}