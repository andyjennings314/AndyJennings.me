angular.module('AJPortfolio').controller('pairsCtrl', function ($filter, $timeout) {
    var self = this;
    self.clickedCards = [];
    self.clickingActive = true;
    self.winGame = false;

    self.selectedCards = [];
    self.cardSortingHolding = [];
    self.allCards = [
        { type: 0, clicked: false, correct: false },
        { type: 1, clicked: false, correct: false },
        { type: 2, clicked: false, correct: false },
        { type: 3, clicked: false, correct: false },
        { type: 4, clicked: false, correct: false },
        { type: 5, clicked: false, correct: false }
    ];

    self.getCards = function (numberOfCards) {
        //get requested number of pairs into holding array
        self.cardSortingHolding = []
        while (self.cardSortingHolding.length < (numberOfCards)) {
            //var nextCard = (self.cardSortingHolding.length / 2);
            //self.cardSortingHolding.push(self.allCards[nextCard]);
            //self.cardSortingHolding.push(self.allCards[nextCard]);
            var nextCardnumber = (self.cardSortingHolding.length / 2);
            var nextCard = jQuery.extend({}, (self.allCards[nextCardnumber]));
            self.cardSortingHolding.push(nextCard);
            nextCard = jQuery.extend({}, (self.allCards[nextCardnumber]));
            self.cardSortingHolding.push(nextCard);
        }

        //shuffle holding array into selected cards array
        self.selectedCards = [];
        while (self.cardSortingHolding.length != 0) {
            var cardNumber = Math.floor(Math.random() * self.cardSortingHolding.length);
            self.selectedCards.push(self.cardSortingHolding[cardNumber]);
            self.cardSortingHolding.splice(cardNumber, 1);
        }
    }

    self.clickCard = function (card) {
        //has this card already been selected or paired up
        if (self.clickingActive == true && card.clicked == false && card.correct == false) {
            //if not, note it's been clicked, and add it to the current pair of selected cards
            self.clickingActive = false
            card.clicked = true;
            self.clickedCards.push(card);
            $timeout(function () {
                //when there's two cards selected, see if they match
                if (self.clickedCards.length == 2) {
                    if (self.clickedCards[0].type === self.clickedCards[1].type) {
                        //if they match, mark them as correct , and see if you've matched them all
                        self.clickedCards = [];
                        for (var i = 0; i < self.selectedCards.length; i++) {
                            if (self.selectedCards[i].clicked == true) {
                                self.selectedCards[i].clicked = false;
                                self.selectedCards[i].correct = true
                            }
                            var remainingCards = $filter('filter')(self.selectedCards, { correct: false });
                            if (remainingCards.length == 0) {
                                //U R TEH WINRAR
                                self.winGame = true;
                            }
                        }

                    }
                        //if they don't match, flip them over again and clear the selected cards
                    else {
                        self.clickedCards = [];
                        for (var i = 0; i < self.selectedCards.length; i++) {
                            self.selectedCards[i].clicked = false;
                        }
                    }
                }
                self.clickingActive = true;
            }, 1000);

        }
    }

    var init = function () {
        self.getCards(8);
    }
    self.resetGame = function (numberOfCards) {
        //do some reset stuff
        self.selectedCards = [];
        self.winGame = false;

        $timeout(function () {
        //then shuffle some cards
        self.getCards(numberOfCards);

        //other reset stuff?
        }, 1000);
    }

    init();
});