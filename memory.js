/*function rotation(e) {

    front.style.transform = "rotateY(180deg)";
    back.style.transform = "rotateY(180deg)";


}

var front = document.getElementById('front1');
var back = document.getElementById('back1');
var card = document.getElementById("card");
card.addEventListener('click', rotation);

console.log(card); */

/*const cards = document.querySelectorAll('card');

function flipCard() {
    this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));*/


//DECLARATION DE MES VARIABLES
var record = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var img = [];
var random;
var flipIndex = 0;
var cardTextRec = [];
var cardRec = [];
var cardNum;
var front;
var back;
var cardCheck = 0;
var correct = 0;
var game = document.getElementById("game");
var time = document.getElementById("timer");
var newGame;
var popUp = document.getElementById("backgroundPopUp");
var result = document.getElementById("popUpResult");
var photo = document.getElementById("popUpImg");
var status = 0;
var countDown; //timer
var secsInput = 45;
var seconds = secsInput;
var gameOver = false;




// LA PARTIE GAME EST CLICKABLE ET PEUT EXECUTER MA FONTION DE FLIP
game.addEventListener("click", function (e) {
    var element = e.target.parentElement;
    var numId = element.id;
    console.log(numId);
    /*if (Number.isInteger(parseInt(numId.replace("back", ""), 10))) {*/
    cardClick(element.parentElement.id);
    /*}
    else {
        cardClick(numId);
    }*/
    // On peut reduire le code
});


// FLIP DE MES CARTES ON_CLICK
function cardClick(cardId) {

    cardNum = cardId.replace("card", "");
    cardNum = parseInt(cardNum, 10);
    console.log(cardNum);


    if (record[cardNum - 1] === 0 && cardCheck === 0 && gameOver === false) {

        front = document.getElementById("front" + cardNum);
        back = document.getElementById("back" + cardNum);
        front.style.transform = "rotateY(-180deg)";
        back.style.transform = "rotateY(0deg)";

        cardTextRec.push(back.innerHTML);
        cardRec.push(cardNum);

        flipIndex++;
        record[cardNum - 1] = 1;


        // COMPARAISON DES IMAGES ( MATCH ) 

        if (flipIndex === 2) {
            if (cardTextRec[0] === cardTextRec[1]) {

                correct++;
                cardRec = [];
                cardTextRec = [];
                flipIndex = 0;
                if (correct === 8) {
                    clearTimeout(countDown);
                    setTimeout(function () { displayResult() }, 600);

                }
                return;
            }
            else {
                cardCheck = 1;
                console.log(cardCheck);
                setTimeout(function () { flipBack(); }, 600);
                return;

            }
        }
    }

    if (gameOver === true) {
        alert("Game is over !");
    }
}


// FLIPBACK DES CARTES QUAND ELLES NE MATCH PAS

function flipBack() {
    front = document.getElementById("front" + cardRec[0]);
    back = document.getElementById("back" + cardRec[0]);
    front.style.transform = "rotateY(0deg)";
    back.style.transform = "rotateY(180deg)";

    front = document.getElementById("front" + cardRec[1]);
    back = document.getElementById("back" + cardRec[1]);
    front.style.transform = "rotateY(0deg)";
    back.style.transform = "rotateY(180deg)";

    record[cardRec[0] - 1] = 0;
    record[cardRec[1] - 1] = 0;
    cardTextRec = [];
    cardRec = [];
    flipIndex = 0;
    cardCheck = 0;


}


//LES RESULTATS DU JEU AVEC POP UP MESSAGES

function displayResult() {
    gameOver = true;
    if (correct === 8) {
        alert("Congrats ! You've made it !");
    }
    else {
        alert("Sorry, Try Again !");
    }
}


//FAIRE FONCTIONNER MON BOUTON

var newGame = document.getElementById("button");
newGame.addEventListener("click", refresh);

function refresh() {
    window.location.reload();

}


//RANDOM DE MES IMAGES

function newBoard() {


    for (var i = 0; i < 16; i++) {
        console.log(document.getElementById("back" + (i + 1)));
        if (i == 0) {
            var random = Math.round(Math.random() * images.length);
            while (random == images.length) {
                random = Math.round(Math.random() * images.length);
            }
            img[i] = random;

        }
        else {
            while (status == 0) {
                random = Math.round(Math.random() * images.length);
                if (random !== images.length) {
                    for (var j = 0; j < img.length; j++) {
                        if (random == img[j]) {
                            break;
                        }
                        else if (j == img.length - 1) {
                            status = 1;
                            img[i] = random;
                        }
                    }

                }
            }
        }
        status = 0;
        document.getElementById("back" + (i + 1)).innerHTML = images[random];

    }
    startTimer(seconds);
}


//FAIRE FONCTIONNER MON TIMER
function startTimer(secs) {
    time.innerHTML = "00:" + secs;

    if (secs === 0) {
        clearTimeout(countDown);
        setTimeout(function () { displayResult(); }, 800);
        time.innerHTML = "00:00";
        return;
    }
    secs--;
    countDown = setTimeout(function () { startTimer(secs) }, 1000);
}

window.onload = newBoard();


