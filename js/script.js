/*eslint-env browser*/
var maxDieSides = 6;

var $ = function (id) {
    "use strict";
    return document.getElementById(id);
};

var getRandomNumber = function () {
   "use strict";
    var random;
    if (!isNaN(maxDieSides)) {
    random = Math.random(); // value between 0 and 1
    random = Math.floor(random * maxDieSides); // value is integer  between 0 and max-1
    random = random + 1;//value is integer  between 0 and max
    }
    return random;
};

var changePlayer = function () {
   "use strict";
    if ($("current").innerHTML === $("player1").value) {
        $("current").innerHTML = $("player2").value;
    } else {
        $("current").innerHTML = $("player1").value;
    }
     $("die").value = "0";
    $("total").value = "0";
    $("roll").focus();
};

var newGame = function () {
    "use strict";
    $("score1").value = "0";
    $("score2").value = "0";
    
    if ($("player1").value === "" || $("player2").value === "") {
        $("turn").removeAttribute("class");
        window.alert("Please enter two player names");
    } else {
        $("turn").setAttribute("class", "open");
        changePlayer();
    }
   
    
};

var rollDice = function () {
    "use strict";
    var total, die;
    total = parseInt($("total").value, 10);
    die = getRandomNumber();
    if (die === 1) {
        total = 0;
        changePlayer();
    } else {
        total = total + die;
    }
    $("die").value = die;
    $("total").value = total;
};

var holdTrun = function () {
    "use strict";
    var score, total;
    //get the current total 
    total = parseInt($("total").value, 10);
    
    if ($("current").innerHTML === $("player1").value) {
        score = $("score1");// player 1 banked total
    } else {
        score = $("score2");// player 2 banked total
    }
    score.value = parseInt(score.value, 10) + total; // add current total to banked total
    //if the score is morethan 100 the win
    if (score.value >= 100) {
        window.alert($("current").innerHTML + " wins!");
        newGame();
    } else {
        changePlayer();
    }
};

window.addEventListener("load", function () {
    "use strict";
    $("new_game").addEventListener("click", newGame);
    $("roll").addEventListener("click", rollDice);
    $("hold").addEventListener("click", holdTrun);
});