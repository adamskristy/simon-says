let sequence = []; //order pattern flashes
let playerSequence = []; //order player clicks
let turn; //computer turn
let on; //power button on
let level = 0; //what level
let strike = false;



//grabbing html elements to reference in JS
const turnCounter = document.querySelector('#turn');
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
        turnCounter.innerHTML = "-";
        strikeCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        strikeCounter.innerHTML = "";
        resetGame();
    }
})

startButton.addEventListener('click', startGame);

function startGame(){
    //all tiles flash?
    gameTurn();
}

function activateTile(color) {
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
    const tiles = ['green', 'red', 'yellow', 'blue'];
    //randomize selection of tiles
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
}

 //nextRound
function gameTurn() {
    turn = 0; //set to computer turn
    level +=1; //increase level
     //players unable to click while its computer turn
    tileContainer.classList.add('unclickable')

    //computers turn
    if (turn == 0){
        strikeCounter.innerHTML = "WAIT";
    //start next sequence of game
    const nextSequence = [...sequence];
    //returns random tile and add to nextSequence array
    nextSequence.push(randomTile());
    playRound(nextSequence);
    
        //start p1 turn right after comp turn
        //total time corresponds to current level * 600ms
        sequence = [...nextSequence];
        setTimeout(() => {
            playerOne(level);
        }, level * 600 + 1000);
    } 
}

//human turn
function playerOne(level) {
    turn = 1;

    if (turn == 1){
        strikeCounter.innerHTML = "P1";  
        tileContainer.classList.remove('unclickable')
    
    }
}

//  function playerOne() {
// //player ones turn
// if (p1.turn == true){
// //allow p1 to follow pattern

//         //if p1 gets pattern wromg
//         if(p1.sequence != sequence){
//             //p1 loses the game
//             strike = true;
        
//             //if p1 gets pattern right
//         } else if (p1.sequence == sequence) {
//             strike = false;
//             p1.turn = false;
//             //set to p2 turn
//             p2.turn = true;
//             playerTwo();
//         }
//     }
// }


// //player twos turn
// if (p2.turn == true){
//     //allow p1 to follow pattern
    
//         //if p1 gets pattern wromg
//         if(p2.sequence != sequence){
//             //p1 loses the game
//             strike = true;
        
//             //if p1 gets pattern right
//         } else if (p2.sequence == sequence) {
//             strike = false;
//             p2.turn = false;
//             //set to p2 turn
//             p1.turn = true;
//             playerOne();
//         }
//     }

//function for sequence


