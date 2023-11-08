
// these values are set at the beginning
// and then used throughout the game
let gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false
}
// function that considers which player's turn it is and then
// changes the UI accordingly
function changePlayer() {
    // if the current player is player 1 at the end of a move

    if (gameState.whoseTurn === 1) {
        let playerTwoHealth = document.getElementById("playerTwoHealth");
        // converts the innerHTML from string to a number and stores it in a variable

        let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);
        // reduces by 10
        playerTwoHealthNum -= 10;
        // resets the HTML to the new value
        playerTwoHealth.innerHTML = playerTwoHealthNum;
        // checks if the player has reached 0 health
        if (playerTwoHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerTwoHealth = 0;
            // ends the game
            gameOver();
        } else {
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 2;
        }
    //Moved outside of the if statement to ensure it is updated.
    } else {
        gameState.whoseTurn = 1;
    }
    
    // grabs the 'playerName' element and changes the player's turn display
    //Moved here to help display message for both players.
    let playerName = document.getElementById("playerName");
    playerName.innerHTML = `Player ${gameState.whoseTurn}`;
    
}

// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
    let title = document.getElementById("title");
    title.style = "display: none;";
    let playerTurnDisplay = document.getElementById("playerTurn");
    playerTurnDisplay.style = "display: none;";

    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`

    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: flex; flex-direction: column;";
}

// function that allows the player two attack button to reduce the player two's
// health
function attackPlayerTwo() {
    // compartmentalized function that will switch the player 2 attack button to inactive
    // and player 1 attack button to active using DOM manipulation
    // this also DISABLES the button, meaning they are not interactable
    function changeButtonStatus() {
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        playerTwoAttackButton.disabled = true;
        playerTwoAttackButton.classList.add("inactive");
        playerTwoAttackButton.classList.remove("active");

        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = false;
        playerOneAttackButton.classList.add("active");
        playerOneAttackButton.classList.remove("inactive");
    }

    // commpartmentalized function that changes the player 1's sprite using the array
    // containing multiple images
    function animatePlayer() {
        // an array containing the images using in player one's animation
        // the indices are later used to cycle / "animate" when the player attacks
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];

        let playerSprite = document.getElementById("playerOneSprite");
      
        playerSprite.src = playerOneFrames[1];
        
        // removes the 'idle' class from the player sprite
        playerSprite.classList.remove("idle");
        // adds the 'attack' class to the player sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        playerSprite.classList.add("attack");

        // grabs the enemy sprite
        let enemySprite = document.getElementById("playerTwoSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        // removes the 'idle' class from the enemy sprite
        enemySprite.classList.remove("idle");
        // adds the 'attack' class to the enemy sprite
        // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
        enemySprite.classList.add("damage");
        // sound that plays when enemy takes damage
        enemyDamage.play();

        // the function we will call in the setTimeOut method below
        // after 350 milliseconds
        // this function will execute this block of code
        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerOneSprite, 350);
    }

    // for easy reading,
    // we do not include ALL of the above code within this condition
    // instead, we create higher-order functions to keep the code neat and readable
    if (gameState.whoseTurn = 1) {
        animatePlayer();
        changeButtonStatus();
        changePlayer();
    }
}

//Player Two attacks
function attackPlayerOne() {
    if (gameState.whoseTurn === 2) {
        //When Player 2 attacks, the player is animated and the status of the buttons changes
        animatePlayerTwo();
        changeBtnStatus();

        let playerOneHealth = document.getElementById("playerOneHealth");
        //converts the innerHTML from string to number and stores it in a variable for player 1
        let playerOneHealthNum = Number(playerOneHealth.innerHTML);
        //Player 1's heath is reduced by 10
        playerOneHealthNum -= 10;
        //Player's health status is updated on the screen
        playerOneHealth.innerHTML = playerOneHealthNum;

        //This checks when Player 1's health has reached 0
        if (playerOneHealth <= 0) {
            playerOneHealth = 0;
            //ends the game
            gameOver();
        } else {
            //if Player 1's health is greater than 0, it changes to Player 2's turn.
        changePlayer();
        }
    }
}

//Button status
function changeBtnStatus() {
    //Changes the classes for Player 1's button
    let playerOneAttackButton = document.getElementById("playerOneAttack");
    //disables the button so we can't click it.
    playerOneAttackButton.disabled = true;
    //Adds the inactive class
    playerOneAttackButton.classList.add("inactive");
    //Removes the active class
    playerOneAttackButton.classList.remove("active");

    
    //Changes the classes for Player 2's button
    let playerTwoAttackButton = document.getElementById("playerTwoAttack");
    //Enables the button so we can click it.
    playerTwoAttackButton.disabled = false;
    //Adds the active class
    playerTwoAttackButton.classList.add("active");
    //Removes the inactive class
    playerTwoAttackButton.classList.remove("inactive");

};

//Animation for player 2
function animatePlayerTwo() {
    //Array has the frames for player 2
    let playerTwoFrames = [
        "./images/L_Idle.png",
        "./images/L_Attack.png"
    ];

    let playerTwoSprite = document.getElementById("playerTwoSprite");
    //We ge the second frame to display attack mode
    playerTwoSprite.src = playerTwoFrames[1];
    //Removes the idle class from the player 2's sprite
    playerTwoSprite.classList.remove("idle");
    //this add the attack class
    playerTwoSprite.classList.add("attack");

    //Grabs the enemy sprite and the sound for player damage
    let enemySprite = document.getElementById("playerOneSprite");
    let enemyDamage = document.getElementById("SFX_PlayerDamage");

    //Removed the idle class
    enemySprite.classList.remove("idle");
    //Adds the damage class
    enemySprite.classList.add("damage");
    //When enemy is damage the sound is activated
    enemyDamage.play();

    //The function changes the sprite for player 2
    //Changes the classes for the player 1
    function changePlayerTwoSprite() {
        enemySprite.classList.remove("damage");
        enemySprite.classList.add("idle");
        
        //We get the first frame to display the idle mode
        playerTwoSprite.src = playerTwoFrames[0];
        playerTwoSprite.classList.remove("attack");
        playerTwoSprite.classList.add("idle");
    }
    //After 350 milliseconds the code is executed.
    setTimeout(changePlayerTwoSprite, 350);
}

