let sequence = []; //order pattern flashes
let playerSequence = []; //order player clicks
let compTurn; //computer turn
let on; //power button on
let win; //if player has won
let turn; //whose turn it is
let level = 0; //what level
let strike; //if player has a strike
let currentPlayer = [0, 1, 2]
let possibleColors = ["green", "red", "yellow", "blue"]


//grabbing html elements to reference in JS
const turnCounter = document.querySelector('#turn');
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft')
const bottomRight = document.querySelector('#bottomright')
const onButton = document.querySelector('#on')
const startButton = document.querySelector('#start')
const twoPlayerButton = document.querySelector('#two-player')
const numOfPlayer = document.querySelector('#player')
const strikeCounter = document.querySelector('#strike');

//restting the game variables
function resetGame() {
    
    sequence = [];
    playerSequence = [];
    level = 0;
}

// POWER ON
//when turn power on, prep the game for playing and reset variables
onButton.addEventListener('click', (event) => {
    if (onButton.checked == true){
        on = true;
        turnCounter.innerHTML = "-";
        strikeCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        strikeCounter.innerHTML = "";
        resetGame();
    }
})


// START THE GAME
startButton.addEventListener('click', (event) => {
    compTurn = true;
    strikeCounter.innerHTML = "WAIT"
});

//set to computer turn
    //computer gives pattern
    //set to p1 turn
    //p1 follows pattern
        //if p1 fails
            //end game
        //if p1 succeeds
            //p2 turn

function gameTurn(){


}

function nextSequence() {
    let rand = Math.floor(Math.random() * 4)
    let color = possibleColors[rand];
    sequence.push(color);
}



