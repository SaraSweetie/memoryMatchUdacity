//Memory Match game for Udacity Front End Nanodegree program
let cards = [ "fa-paw", "fa-puzzle-piece", "fa-gift", "fa-camera-retro", "fa-gratipay", "fa-pagelines", "fa-fort-awesome", "fa-bug"];
var cardDeck = [...cards, ...cards]; // card icons stored in an array x2

function buildDeck(icon) {			
	return `<li class="card" data-card="${icon}"> <i class="fa ${icon}"></i> </li>`;
} //builds the .deck <ul> dynamically using cardDeck array

//Shuffle function from http://stackoverflow.com/a/2450976
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

const deck = document.querySelector('.deck');  // <ul> with .deck class
let openCards = []; //empty array to hold the open cards
let matchedCards = []; //empty array to hold the matched cards
let moves = 0; //to count the number of moves/ card clicks
let stars = 3; //global star counter
const gameTime = document.querySelector('.timer');
const movesCounter = document.querySelector('.moves');
let time = 0;
let timer;
const oneStar = document.getElementById('star1');
const twoStars = document.getElementById('star2');
const threeStars = document.getElementById('star3');

//restart button on gameboard calls restart game
let resetDeck = document.querySelector('.restart');
resetDeck.addEventListener('click', function() {
	restartGame();
});

function startGame() {
	let cardHTML = shuffle(cardDeck).map(function(cards) {
		return buildDeck(cards);
	});

	deck.innerHTML = cardHTML.join(''); //add the cardHTML to the .deck <ul> in the html
	console.log('game started deck loaded');
	let clicks = 0;

	const card = document.querySelectorAll('.card');
	card.forEach(function (cardFlip) {
		cardFlip.addEventListener('click', function() {
			clicks ++;
			if (clicks === 1){ //only start timer after first click
				startTimer();
			}
		
			if (!cardFlip.classList.contains('open') && !cardFlip.classList.contains('show') && !cardFlip.classList.contains('match')) { // prevents same card from being clicked or if card alread matched

				openCards.push(cardFlip); //adds current card clicked and flipped to the openCards array
				console.log(`number of cards clicked ${openCards.length} `);
				cardFlip.classList.add('open', 'show'); //cards flip by adding .open and .show classes
					
					if (openCards.length >= 3) {
						//dont flip!! only want 2 cards open
						cardFlip.classList.remove('open', 'show', 'match');
					}

					if (openCards.length == 2) {
						//if 2 cards showing match
						if (openCards[0].dataset.card === openCards[1].dataset.card) {
							console.log('match!!');
							openCards[0].classList.add('open', 'show', 'match'); //first card clicked on added to the array [0] 
							openCards[1].classList.add('open', 'show', 'match'); //second card clicked on added to the array [1]

							matchedCards.push(cardFlip); //adds matched cards to the matchedCards array

							if (matchedCards.length === cards.length) {
								setTimeout(function() {
									stopTimer();
									console.log('game over');
									youWin();
								}, 500); //delay congradulations message 1/2 second
							}

							openCards = []; //after match set number of cards in array back to 0
						}else {//if cards don't match unFlip them
							setTimeout(function() {
								openCards.forEach(function(card) {
									card.classList.remove('open', 'show'); //cards flip by removing .open and .show classes
								});
								openCards = []; //set card array back to 0
							}, 500); //delay flip back over 500 miliseconds  or 1/2 a second
						}
						moves += 1; //increment moves after 2 cards clicked
						//console.log(moves);
						//console.log(movesCounter);
						starRating();
						if (moves == 1) {
							movesCounter.innerHTML = `${moves} Moves`;
						}else {
							movesCounter.innerHTML = `${moves} Moves`;
						}
					}
			}
		});
	});
}

startGame();

//start timer
function startTimer() {
	timer = setInterval(function(){
		time ++;
		let clock = document.querySelector('.gameTimer');
		clock.innerHTML = `Timer ${time}`;
	}, 1000);
}

//call this to stop the timer
function stopTimer() {
  clearInterval(timer);
}

//restart game
function restartGame() {
		moves = 0;
		time = 0;
		movesCounter.innerHTML = `${moves} Moves`;
		openCards =  []; //empty array to hold the open cards
		matchedCards = []; //empty array to hold the matched cards

		//flip all cards back over, *Array.from() converts NodeList to an array with the new ES6*
		let openCardsArray = Array.from(document.querySelectorAll('.card'));
		openCardsArray.forEach(function(array){
			array.classList.remove('open', 'show', 'match');
		});
		
		//clear timer
		let clock = document.querySelector('.gameTimer');
		clock.innerHTML= `Timer ${time}`;
		clearInterval(timer); // stops timer

		//reset stars
		threeStars.classList.replace("fa-star-o", "fa-star");
		twoStars.classList.replace("fa-star-o", "fa-star");
		oneStar.classList.replace("fa-star-o", "fa-star");

		//restart game
		startGame();
}

//remove class fa-star-o and add class fa-star to fill in star
//starRating using <li> in index.html
function starRating() {

	
	console.log(`moves: ${moves}`);

	switch(moves) {
		case 0: //default
			threeStars.classList.replace("fa-star", "fa-star-o");
			twoStars.classList.replace("fa-star", "fa-star-o");
			oneStar.classList.replace("fa-star", "fa-star-o");
			stars = '3 Stars';
			break;
		case 12: //remove a star by switching class
			threeStars.classList.replace("fa-star", "fa-star-o");
			stars = '2 Stars';
			break;
		case 16: //remove another star by switching class
			twoStars.classList.replace("fa-star", "fa-star-o");
			stars = '1 Star';
			break;
	}
}

function youWin() {
	const message = document.querySelector('#winnerStats div');
	const closeBtn = document.querySelector('.close');
	const restartBtn = document.querySelectorAll('.restart')[1];
	clearInterval(timer);
	
	//congradulatoins message show
	message.style.visibility = 'visible';

	//playagin button
	restartBtn.addEventListener('click', function() {
		message.style.visibility = 'hidden';
		restartGame();
	});

	//close buttion
	closeBtn.addEventListener('click', function() {
		message.style.visibility = 'hidden';
	});

	//time:
	const mins = Math.floor(time/60);
	const secs = time%60;
	const timeEnd = document.querySelector('.finalTime');
		if (time <= 60) {
			timeEnd.innerHTML = `Time: ${time} seconds`;
		}if (mins === 1) {
			timeEnd.innerHTML = `Time: ${mins} min ${secs} secs`;
		}if (mins >= 1) {
			timeEnd.innerHTML = `Time: ${mins} mins ${secs} secs`;
		}

	//moves:
	const movesEnd = document.querySelector('.finalMoves');
	movesEnd.innerHTML = `Moves: ${moves}`;

	//star rating:
	const ratingEnd = document.querySelector('.finalStars');
	ratingEnd.innerHTML = `Rating: ${stars}`;
}