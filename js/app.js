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
}

startGame();

const card = document.querySelectorAll('.card');
let openCards = []; //empty array to hold the open cards
let moves = 0; //to count the number of moves/ card clicks
let movesCounter = document.querySelector('.moves');


card.forEach(function (cardFlip) {
	cardFlip.addEventListener('click', function(e) {
	
		if (!cardFlip.classList.contains('open') && !cardFlip.classList.contains('show') && !cardFlip.classList.contains('match') ) { // prevents same card from being clicked or if card alread matched
			openCards.push(cardFlip); //adds current card clicked and flipped to the openCards array
			console.log(`number of open cards ${openCards.length} `);
			cardFlip.classList.add('open', 'show'); //cards flip by adding .open and .show classes
				
				

				//if cards match do this
				//if (openCards.classList.contains('xxx') ){
					//openCards.classList.add('match');
				//}

				if (openCards.length == 2) {
					//if 2 cards showing match
					if (openCards[0].dataset.card === openCards[1].dataset.card) {
						console.log('match!!');
						openCards[0].classList.add('open', 'show', 'match'); //first card clicked on added to the array [0] 
						openCards[1].classList.add('open', 'show', 'match'); //second card clicked on added to the array [1]

						openCards = []; // after match set number of cards in array back to 0
					}else {//if cards don't match unFlip them
						setTimeout(function() {
							openCards.forEach(function(card) {
								card.classList.remove('open', 'show'); //cards flip by removing .open and .show classes
							});
							openCards = []; // set card array back to 0
						}, 1000); //delay flip back over 1000 miliseconds = 1 second
					}
					moves += 1; // increment moves after 2 cards clicked
					console.log(moves);
					console.log(movesCounter);
					movesCounter.innerHTML = moves;
				}
		}
	});
});



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
