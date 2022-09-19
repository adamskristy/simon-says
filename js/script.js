let sequence = []; //order pattern flashes
let playerOneSequence = []; //order player1 clicks
let playerTwoSequence = []; //order player2 clicks
let turn; //whose turn it is
let on; //power button on
let level = 0; //what level


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


//data-tile is stored in tile variable
//if value is not empty string playerclick will run with tile as arguement
tileContainer.addEventListener('click', event => {
    const {tile} = event.target.dataset;

    if (tile) playerOneClick(tile);
});


//randomly pick colors
function randomTile() { 
    console.log('create random tile')
    const tiles = ['green', 'red', 'yellow', 'blue'];
    //randomize selection of tiles
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
}

//flash tile colors
function flashTile(color) {
    console.log('flash tile')
    // template literal with html data attribute
    const tile = document.querySelector(`[data-tile='${color}']`);

    tile.classList.add('activated');

    setTimeout(()=> {
        tile.classList.remove('activated');
    }, 300);
}

function playGame(nextSequence) {
    //iterate over sequence array
        nextSequence.forEach((color, index) => {
            //activate each tile with 600ms delay
            flash = setTimeout (() => {
                flashTile(color);
            }, (index + 1) * 600);
        });
    }

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
        resetGame();
    }
})

startButton.addEventListener('click', startGame);

function startGame(){
    console.log('start game')
    //all tiles flash?
    gameTurn();
    
}

 //nextRound
 function gameTurn() {
    turn = 0; //set to computer turn
    levelCounter.innerHTML = level += 1; //increase level
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
    playGame(nextSequence);
    
        //start p1 turn right after comp turn
        //total time corresponds to current level * 600ms
        sequence = [...nextSequence];
        game = setTimeout(() => {
            playerTurn(level);
        }, level * 600 + 1000);
    } turn = 1;
    console.log('compturn')
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
        strikeCounter.innerHTML = "NO!"
        console.log("p2 wrong")
        resetGame();
    }

    if (playerTwoSequence.length === sequence.length) {
        if (playerTwoSequence.length === 20){
            return;
        }
        playerTwoSequence = [];

        setTimeout(() => {
            console.log("comp turn")
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

    setTimeout(() => {

        if (playerOneSequence[index] == sequence[index]) {
            turn = 2;
            setTimeout(() => {
                playerTurn(level);
            }, 1000)
            return;
            
        } else if (playerOneSequence[index] !== sequence[index]) {
            strike = true;
            strikeCounter.innerHTML = "NO!"
            console.log('p1 wrong')
            resetGame();
            
            
        } else if (playerOneSequence.length === sequence.length) {
            if (playerOneSequence.length === 20 && strike == false){
                resetGame();
                return;
            }
            playerOneSequence = [];

            player = setTimeout(() => {
                playerTurn(level);
                console.log('player turn2')
            }, 800)
            return;
        } turn = 2;
    }, 1000)
}


//reset the game to defaults
function resetGame() {
    console.log('reset game')
    sequence = [];
    playerOneSequence = [];
    playerTwoSequence = [];
    level = 0;
    levelCounter.innerHTML = "";
    strikeCounter.innerHTML = "";
    clearTimeout(game)
    clearTimeout(player)
    clearTimeout(flash)
}

