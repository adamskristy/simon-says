//turn == 0, computer turn
//turn == 1, player 1 turn
//turn == 2, player 2 turn

 //nextRound
 function gameTurn() {
    turn = 0; //set to computer turn
    level +=1; //increase level
    
    //computers turn
    if (turn == 0){
        strikeCounter.innerHTML = "WAIT";
    //start next sequence of game
    const nextSequence = [...sequence];
    //returns random tile and add to nextSequence array
    nextSequence.push(randomTile());
    playRound(nextSequence)
   
    } else if (compTurn = false && p1.turn == true){
        playerOne();
    } else if (compTurn = false && p2.turn == true){
        playerTwo();
    }
}