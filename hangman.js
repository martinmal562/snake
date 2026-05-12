let hangCurrentWord;

function hangRestart(){
    hangCurrentWord= hangmanWords[Math.floor(Math.random() * hangmanWords.length)].toLowerCase();
}