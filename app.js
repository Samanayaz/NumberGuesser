/* 
Game Rule 
-player must guess a number btw min and max value 
-player gets a certain amount of guesses 
-notify player #of guesses remaining 
-Notify player of corrrect answer if they lose
-Let player, play again 

*/

// Game value 
let min = 1; 
let max = 10;
let winningNum = getRandom(min, max);
let guessesLeft = 3;
// console.log(winningNum);

// UI elements 
const game= document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// assign ui min and max values 
minNum.textContent = min;
maxNum.textContent = max;

// play again eventListener 
game.addEventListener('mousedown', function(e){
    if(e.target.className === "play-again"){
        window.location.reload(); 
    }
})

// listen for the actual guess (submit button)

guessBtn.addEventListener("click", function(){
    // console.log(guessInput.value);
    let guess= parseInt(guessInput.value);
    // console.log(guess);

    // validate Input 
    if (isNaN(guess) || guess < min || guess > max){
        setMessage(`please enter a number between ${min} and ${max}.`, 'red');      
    }

    // check if we can 
    if (guess === winningNum) {
        // condition for winning number
        gameOver(true, `${winningNum} is correct. You guessed Correctly!`)
        // condition for incorrect number
    } else {
        guessesLeft -= 1;   
    }
     
    // see if any guesses left 
    if (guessesLeft===0){
        gameOver(false, `You're wrong! Correct number was ${winningNum}. better luck next time!`)
    } else{
        // game continue => answer is incorrect
        // change border color 
        guessInput.style.borderColor = "red";

        // clear the input 
        guessInput.value= "";

        // notify use of wrong guess and guess remaining 
        setMessage(`${guess} is not correct. You have ${guessesLeft} guesses remaining`, 'red')
    }
})

// game over 
function gameOver(won, msg){
    let color;
    won === true ? color = "green" : color = "red"; 

    // disable input 
    guessInput.disable = true; 

    // change the border color 
    guessInput.style.borderColor = color;

    // set the text color
    message.style.color = color; 

    //Set message
    setMessage(msg);
    
    // Play again 
    guessBtn.value = "Play Again";
    guessBtn.className = "play-again"
}

// get Winning number 
function getRandom(min, max){
    return Math.floor(Math.random() * (max-min +1) + min);
}

// set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

