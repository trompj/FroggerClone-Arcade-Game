/* Justin Tromp
** 12/25/2018
** Classic arcade game clone in Javascript - Frogger.
*/
let gameWon = false;

//Timer for screen
let sec = 0;
function timer ( timeValue ) {
    return timeValue >= 10 ? timeValue : "0" + timeValue;
}

//Code to run timer on screen
let modalTimer = setInterval( function(){
    document.getElementById("seconds").innerHTML=timer(++sec%60);
    document.getElementById("minutes").innerHTML=timer(parseInt(sec/60,10));
}, 1000);

'use strict';
// Enemies our player must avoid
var Enemy = function(xCoord, yCoord, enemySpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = xCoord;
    this.y = yCoord;
    this.speed = enemySpeed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (gameWon == false) {
    this.x += this.speed * dt;
    if (this.x > 525) {
        this.x = -105;
        this.speed = (Math.floor(Math.random() * (600 - 250)) + 250);
    }}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Player class
var Player = function(xCoord, yCoord) {
    this.x = xCoord;
    this.y = yCoord;
    // The image/sprite for player in the game.
    this.sprite = 'images/char-boy.png';

    //update() function for player
    Player.prototype.update = function() {
        //Check for collisions
        for (let enemy of allEnemies) {
            if (this.y >= (this.y-25) && this.y <= (enemy.y+25)) {
                if ((this.x <= (enemy.x + 60)) && (this.x >= (enemy.x - 45))) {
                    this.x = 203;
                    this.y = 380;
                }
            }

        }
    };

    //render() function for player
    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    Player.prototype.handleInput = function(dt) {

        //Movement when up arrow key is pressed.
        if ((dt == 'up') && (gameWon == false)) {
            this.y -= 85;

            //Win condition for player
            if (this.y == -45) {
                this.y = 380;
                this.x = 203;

                //Call winCondition function to show game win screen
                winCondition();
            }
        }
        //Movement when down arrow key is pressed.
        else if (dt == 'down' && this.y !== 380 && (gameWon == false)) {
            this.y += 85;
        }
        //Movement when right arrow key is pressed.
        else if (dt == 'right' && this.x !== 403 && (gameWon == false)) {
            this.x += 100;
        }
        //Movement when left arrow key is pressed.
        else if (dt == 'left' && this.x !== 3 && (gameWon == false)) {
            this.x -= 100;
        }
    };
};

//Function to run when win occurs. Stops timer and shows modal.
function winCondition() {
    let modalPopUp = document.getElementsByClassName('modal-popup');
    let min = Math.floor(sec / 60);

    //Stop timer
    clearInterval(modalTimer);

    //Set gameWon to true to stop game movement
    gameWon = true;

    //Update times on modal
    document.getElementsByClassName("time-sec")[0].innerHTML = (sec % 60) + ' sec';
    document.getElementsByClassName("time-min")[0].innerHTML = min + ' min';

    //Set modal to visible to see win and time elapsed
    modalPopUp[0].style.visibility = 'visible';
}

//Resets the game from scratch
function resetGame() {
    location.reload();
}

//Array of all enemy objects
let allEnemies = [new Enemy(-105, 60, (Math.floor(Math.random() * (600 - 250)) + 250)),
                  new Enemy (-105, 145, (Math.floor(Math.random() * (600 - 250)) + 250)),
                  new Enemy (-105, 230, (Math.floor(Math.random() * (600 - 250)) + 250))];

//player variable of Player object
let player = new Player(203, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function keyStroke (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
