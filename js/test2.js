let sequence = []; //order pattern flashes
let playerOneSequence = []; //order player1 clicks
let playerTwoSequence = []; //order player2 clicks
let turn; //whose turn it is
let on; //power button on
let level = 0; //what level
let strike = false; // if player messed up



//grabbing html elements to reference in JS
const levelCounter = document.querySelector('#level');
const greenButton = document.querySelector('#green');
const redButton = document.querySelector('#red');
const yellowButton = document.querySelector('#yellow')
const blueButton = document.querySelector('#blue')
const onButton = document.querySelector('#on')
const startButton = document.querySelector('#start')
const twoPlayerButton = document.querySelector('#two-player')
const numOfPlayer = document.querySelector('#player')
const strikeCounter = document.querySelector('#strike');
const tileContainer = document.querySelector('.container')

// POWER ON
//when turn power on, prep the game for playing and reset variables
onButton.addEventListener('click', (event) => {
    if (onButton.checked == true){
        on = true;
        levelCounter.innerHTML = "-";
        strikeCounter.innerHTML = "-";
        console.log('power on')
    } else {
        on = false;
        levelCounter.innerHTML = "";
        strikeCounter.innerHTML = "";
    }
})


function resetGame() {
    sequence = [];
    playerOneSequence = [];
    playerTwoSequence = [];
    level = 0;
    strike = false;
    levelCounter.innerHTML = "-";
    strikeCounter.innerHTML = "-";
}

//indicates player turn
function playerTurn() {
    console.log('player turn')
    tileContainer.classList.remove('unclickable')

    if (turn == 1) {
        console.log('p1 turn')
        strikeCounter.innerHTML = "P1";
        playerOneClick();
    } else if (turn == 2) {
        console.log('p2 turn')
        strikeCounter.innerHTML = "P2";
        playerTwoClick();
    }

}

//handleclick
function playerTwoClick(tile){
    turn = 2;
    strikeCounter.innerHTML = "P2"; 
    console.log('p2 click')

    const index = playerTwoSequence.push(tile) - 1;

    if (playerTwoSequence[index] !== sequence[index]) {
        strike = true;
        strikeCounter.innerHTML = "NO!"
        resetGame();
    }

    if (playerTwoSequence.length === sequence.length) {
        if (playerTwoSequence.length === 20 && strike == false){
            resetGame();
            return;
        }
        playerTwoSequence = [];

        setTimeout(() => {
            gameTurn();
        }, 1000)
        return;
    } turn = 0;
}

//handleclick
function playerOneClick(tile){
    turn = 1;
    strikeCounter.innerHTML = "P1";  
    console.log('p1 click')

    const index = playerOneSequence.push(tile) - 1;

    if (playerOneSequence[index] == sequence[index]) {
        turn = 2;
        setTimeout(() => {
            playerTurn(level);
        }, 1000)
        return;
         
    } else if (playerOneSequence[index] !== sequence[index]) {
        strike = true;
        strikeCounter.innerHTML = "NO!"
        resetGame();
        console.log('p1 wrong')
        
    } else if (playerOneSequence.length === sequence.length) {
        if (playerOneSequence.length === 20 && strike == false){
            resetGame();
            return;
        }
        playerOneSequence = [];

        setTimeout(() => {
            playerTurn(level);
            console.log('player turn2')
        }, 1000)
        return;
    } turn = 2;
}

startButton.addEventListener('click', startGame);

//data-tile is stored in tile variable
//if value is not empty string handleclick will run with tile as arguement
tileContainer.addEventListener('click', event => {
    const {tile} = event.target.dataset;

    if (tile) handleClick(tile);
});

function startGame(){
    console.log('start game')
    //all tiles flash?
    gameTurn();
    
}

function activateTile(color) {
    console.log('flash tile')
    const tile = document.querySelector(`[data-tile='${color}']`);

    tile.classList.add('activated');

    setTimeout(()=> {
        tile.classList.remove('activated');
    }, 300);
}

function playRound(nextSequence) {
//iterate over sequence array
    nextSequence.forEach((color, index) => {
        //activate each tile with 600ms delay
        setTimeout (() => {
            activateTile(color);
        }, (index + 1) * 600);
    });
}

//nextStep
function randomTile() { 
    console.log('create random tile')
    const tiles = ['green', 'red', 'yellow', 'blue'];
    //randomize selection of tiles
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
}

 //nextRound
function gameTurn() {
    turn = 0; //set to computer turn
    level += 1; //increase level
     //players unable to click while its computer turn
    tileContainer.classList.add('unclickable')

    //computers turn
    if (turn == 0){
        strikeCounter.innerHTML = "WAIT";
    //start next sequence of game
    const nextSequence = [...sequence];
    console.log('add tile to sequence')
    //returns random tile and add to nextSequence array
    nextSequence.push(randomTile());
    playRound(nextSequence);
    
        //start p1 turn right after comp turn
        //total time corresponds to current level * 600ms
        sequence = [...nextSequence];
        setTimeout(() => {
            playerTurn(level);
        }, level * 600 + 1000);
    } turn = 1;
    console.log('compturn')
}

