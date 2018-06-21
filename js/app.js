/*
 * Create a list that holds all of your cards
 */
var cardDeck = [ "fa-diamond" ,"fa-diamond",
				"fa-bomb", "fa-bomb",
				"fa-leaf", "fa-leaf",
				"fa-bolt", "fa-bolt",
				"fa-bicycle", "fa-bicycle",
				"fa-anchor", "fa-anchor",
				"fa-cube", "fa-cube",
				"fa-paper-plane-o", "fa-paper-plane-o"
			]; // card icons stored in an array

function buildDeck(icon) {			
	return `<li class="card" data-card="${icon}"> <i class="fa ${icon}"></i> </li>`;
} // builds the .deck <ul> dynamically using cardDeck array

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function startGame() {
	const deck = document.querySelector('.deck');  // <ul> with .deck class

	let cardHTML = shuffle(cardDeck).map(function(cards) {
		return buildDeck(cards);
	});

	deck.innerHTML = cardHTML.join(''); // add the cardHTML to the .deck <ul> in the html
	let moves = 0;

	starRating();
}

startGame();

const card = document.querySelectorAll('.card');
let openCards = []; //empty array to hold the open cards
let matchedCards = []; //empty array to hold the matched cards
let moves = 0; //to count the number of moves/ card clicks
const gameTime = document.querySelector('.timer');
const movesCounter = document.querySelector('.moves');
const resetDeck = document.querySelector('.restart');


// restart button
resetDeck.addEventListener('click', function(e) {
	// clear moves
	moves = 0;
	movesCounter.innerHTML = moves + ' Moves';

	// flip all cards back over, *Array.from() converts NodeList to an array with the new ES6*
	let openCardsArray = Array.from(document.querySelectorAll('.card'));
	openCardsArray.forEach(function(array){
		array.classList.remove('open', 'show', 'match');
	});
	
	// clear timer
	stopTimer();

});

//game timer
let time = 0;
let timer = setInterval(function(){
		time ++;
		let gameTimer = document.querySelector('.gameTimer');
		gameTimer.innerHTML = 'Timer ' + time;
	}, 1000);

/*gameTimer.innerHTML = 'Time ' + timer;
function gameTimer() {
	timer = 0;
}*/

function startTimer() {
	card.addEventListener('click', function(e) {
		gameTimer();
	});
}

function stopTimer() {
  clearInterval(timer);
}


//card flipping and matching
card.forEach(function (cardFlip) {
	cardFlip.addEventListener('click', function(e) {
		
	
		if (!cardFlip.classList.contains('open') && !cardFlip.classList.contains('show') && !cardFlip.classList.contains('match') ) { // prevents same card from being clicked or if card alread matched
			openCards.push(cardFlip); //adds current card clicked and flipped to the openCards array
			console.log(`number of open cards ${openCards.length} `);
			cardFlip.classList.add('open', 'show'); //cards flip by adding .open and .show classes
				
				
				if (openCards.length == 2) {
					//if 2 cards showing match
					if (openCards[0].dataset.card === openCards[1].dataset.card) {
						console.log('match!!');
						openCards[0].classList.add('open', 'show', 'match'); //first card clicked on added to the array [0] 
						openCards[1].classList.add('open', 'show', 'match'); //second card clicked on added to the array [1]

						matchedCards.push(cardFlip); //adds matched cards to the matchedCards array

						if (matchedCards.length === cardDeck.length/2) {
							setTimeout(function() {
								stopTimer();
								console.log('game over');
								youWin();
							}, 500); //delay congradulations message 1/2 second
						}

						openCards = []; // after match set number of cards in array back to 0
					}else {//if cards don't match unFlip them
						setTimeout(function() {
							openCards.forEach(function(card) {
								card.classList.remove('open', 'show'); //cards flip by removing .open and .show classes
							});
							openCards = []; // set card array back to 0
						}, 1000); //delay flip back over 1000 miliseconds = 1 second
						///NEED TO RETHINK, using setTimeout 1 second causes bug of allowing to click more than 2 cards open
					}
					moves += 1; // increment moves after 2 cards clicked
					//console.log(moves);
					//console.log(movesCounter);
					if (moves == 1) {
						movesCounter.innerHTML = moves + ' Move';
					}else {
						movesCounter.innerHTML = moves + ' Moves';
					}
				}
		}
	});
});

//star rating trying to build dynamically...

//var starIcons = [ "fa-star-o" ,"fa-star-o", "fa-star-o" ]; // star icons stored in an array
/*
function buildStars() {
	
	const starRow = document.querySelector('.stars');

	for (var i=1; i<4; i++) {
		const eachStar = document.createElement(`<li><i id="star${i}" class="fa fa-star-o"></i></li>`);
		starRow.appendChild(eachStar);
	}
}

buildStars();
	let makeStars = starIcons.map(function(icon) {
		return buildStars(icon);
	});

	starRow.innerHTML = makeStars.join(''); //builds stars
} // builds the star icon <ul> dynamically using starIcons array
*/

// remove class fa-star-o and add class fa-star to fill in star

//starRating using <li> in index.html
function starRating() {
	let oneStar = document.getElementById('star1');
	let twoStars = document.getElementById('star2');
	let threeStars = document.getElementById('star3');
	let moves = 0;
	
	console.log('3 stars');

	switch(moves) {
		case 12: // remove a star by switching class
			threeStars.classList.replace("fa-star", "fa-star-o");
			console.log('2 stars');
			break;
		case 15: // remove another star by switching class
			twoStar.classList.replace("fa-star", "fa-star-o");
			console.log('1 star');
			break;
	}
}

function youWin() {
	const message = document.querySelector('#winnerStats div');
	const closeBtn = document.querySelector('.close');
	
	//congradulatoins message show
	message.style.visibility = 'visible';

	//playagin button

	//close buttion
	closeBtn.addEventListener('click', function(e) {
		message.style.visibility = 'hidden';
	});

	//time:
	stopTimer();

	//moves:
	const movesEnd = document.querySelector('.finalMoves');
	movesEnd.innerHTML = moves + ' Moves';

	//star rating:
	
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */






