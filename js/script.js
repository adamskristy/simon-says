let order = []; // keep track of the order the lights flash in
let playerOrder = []; //keep track of order player is pressing lights in
let flash; //integer, the number of flashed
let turn; //keep track of what turn we're on
let good; //boolean, how well player is doing
let compTurn; //boolean , whether its computer or player turn
let intervalId;
let strict = false; //is strict mode on
let noise = true; // using sounds
let on = false; //power button turned on
let win; //if player has won the game

//grabbing html elements to reference in JS
const turnCounter = document.querySelector('#turn');
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft')
const bottomRight = document.querySelector('#bottomright')
const strictButton = document.querySelector('#strict')
const onButton = document.querySelector('#on')
const startButton = document.querySelector('#start')
const twoPlayerButton = document.querySelector('#two-player')
const numOfPlayer = document.querySelector('#player')

//code written in order you play the game

//turn on two player mode
twoPlayerButton.addEventListener('change',(event) => {
    if (twoPlayerButton.checked == true){ //check box
    twoPlayer = true;
    numOfPlayer.innerHTML = "Player 1"
    } else {
    twoPlayer = false;
    numOfPlayer.innerHTML = "STRIKES"
    }
});

//when turn power on, display dash in counter
onButton.addEventListener('click', (event) => {
    if (onButton.checked == true){
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor(); //when turned off all colors should turn off
        clearInterval(intervalId); //stop game from flashing colors
    }
});

startButton.addEventListener('click', (event) => {
    if (on || win) {
        play();
    }
});

//resetting variables whe starting the game
function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;

    //filling array with random numbers to indicate order of lights
    for (let i = 0; i < 20; i++){
    order.push(Math.floor(Math.random() * 4) + 1); //random number between 1 and 4
    }
    compTurn = true; //starts with computers turn delivering the sequence

    //computer flashes a light every 800ms
    intervalId = setInterval(gameTurn, 800); //run the gameTurn function every 800ms
}


function gameTurn() {
    on = false; //dont want player to click buttons while lights are flashing

    if (flash == turn) { //number of flashes equals number of turn were on, computer turn is over
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }
    if (compTurn) {
       clearColor();
       setTimeout(() =>{
        if( order[flash] == 1) one();//if first item in array is one, run one function, etc
        if( order[flash] == 2) two(); 
        if( order[flash] == 3) three(); 
        if( order[flash] == 4) four();
        flash++;
       }, 200)
    }
}

//play audio and change/flash color
function one() {
    if (noise) {
        let audio = document.getElementById('clip1');
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
}

function two() {
    if (noise) {
        let audio = document.getElementById('clip2');
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
}

function three() {
    if (noise) {
        let audio = document.getElementById('clip3');
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
}

function four() {
    if (noise) {
        let audio = document.getElementById('clip4');
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
}


//set colors back to original after flashing
function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}


topLeft.addEventListener('click',(event) => {
    if(on){
        playerOrder.push(1);
        check(); //check if player was right
        one();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

topRight.addEventListener('click',(event) => {
    if(on){
        playerOrder.push(2);
        check(); //check if player was right
        two();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomLeft.addEventListener('click',(event) => {
    if(on){
        playerOrder.push(3);
        check(); //check if player was right
        three();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomRight.addEventListener('click',(event) => {
    if(on){
        playerOrder.push(4);
        check(); //check if player was right
        four();
        if(!win){
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

//check if player is right
function check(){
    if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) // if last color player clicked is not correct
    good = false;

    //if player wins the game
    if(playerOrder.length == 20 && good){
        winGame();
    }

    //if player is wrong
    if(good == false) {
        flashColor();
        turnCounter.innerHTML = "NO!";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor;

            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800)

        noise = false;
    }

    //if player is right but still hasnt won the game
    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }

    function winGame(){
        flashColor();
        turnCounter.innerHTML = "WIN!";
        on = false;
        win = true;
    }
}