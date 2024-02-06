//simon game:
//select a button at random, animation+ sound
//user must press same button
//progress level, add new button repeat.

//Global Vars -----------------------------------------------------------------------
var button_sequence = [];
var buttons = ["red", "green", "yellow", "blue"];
var playerClickCount = 0;
var level = 0;

// Utility Functions ----------------------------------------------------------------

//adds string id of random button to list
function selectRandomButton(buttons, button_sequence) {
    var i = Math.floor(Math.random() * 4);
    console.log("random number = " + i);
    var button = buttons[i];
    button_sequence.push(button);
    console.log(button_sequence);
}

function checkCorrect(playerClickId) {
    playerClickCount += 1;
    if (playerClickCount > button_sequence.length || playerClickId != button_sequence[playerClickCount -1]) {
        //end game
        const sound = new Audio("./sounds/wrong.mp3");
        sound.play();
        gameOver();
    }
    else if (playerClickCount == button_sequence.length) {
        //next turn
        animate(playerClickId);
        setTimeout(simonTurn, 1000);
        //simonTurn();
    }
    else {
        animate(playerClickId);
    }
}

function enableButtonClicks() {
    $(".btn").on("click", function() {
        checkCorrect($(this).attr("id"));
    })
}

//gets passed a string id for the button, activates audio + animation
function animate(buttonId) {
    console.log("animate() recieved " + buttonId);
    $("#" + buttonId).addClass("pressed");
    var sound = new Audio("./sounds/" + buttonId + ".mp3");
    sound.play();
    //removes visual after short delay
    setTimeout(function() {
        $("#" + buttonId).removeClass("pressed");
    }, 100);
    console.log("animated " + buttonId);
}

// UI Functions -----------------------------------------------------------------------
function setGameOverTitle() {
    $("#level-title").text("Game Over. Press Any Key to Try Again.");
}

function setLevelTitle(levelNo) {
    $("#level-title").text("Level " + levelNo);
}


// Turn funcitons / Game Controllers ---------------------------------------------------
//FIXME: Utilizing a while loop here doesnt work it just hangs up the code.

function simonTurn() {
    console.log("simon turn: " + level);
    level += 1;
    setLevelTitle(level);
    selectRandomButton(buttons, button_sequence);
    for (let i = 0; i < button_sequence.length; i ++) {
        setTimeout(function() {
            animate(button_sequence[i]);
            console.log(button_sequence[i]);
        }, i * 1000);
    }
    playerClickCount = 0;
}

//reset globals, revert to a game over screen
function gameOver() {
    setGameOverTitle();
    //reset global vars
    button_sequence = [];
    playerClickCount = 0;
    $(".btn").off("click");
    $(document).on("keydown", startGame);
}

function startGame() {
    console.log("starting game");
    $(document).off("keydown");
    enableButtonClicks();
    level = 0;
    simonTurn();
}

// Tutorial reccomended functions ----------------------------
// Simply nextSequence + checkAnswer.


$(document).ready(function() {
    // Your JavaScript code here
    $(document).on("keydown", startGame);
});

