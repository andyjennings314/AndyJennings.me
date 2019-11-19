angular.module('AJPortfolio').component('pairs', {
    templateUrl: '/pairs/pairs.html',
    bindings: {},
    controller: function ($filter, $timeout) {
        var ctrl = this;
        ctrl.clickedCards = [];
        ctrl.clickingActive = true;
        ctrl.winGame = false;
        ctrl.selectedCards = [];
        ctrl.cardSortingHolding = [];
        ctrl.allCards = [
            { type: 0, clicked: false, correct: false },
            { type: 1, clicked: false, correct: false },
            { type: 2, clicked: false, correct: false },
            { type: 3, clicked: false, correct: false },
            { type: 4, clicked: false, correct: false },
            { type: 5, clicked: false, correct: false }
        ];
        ctrl.getCards = function (numberOfCards) {
            //get requested number of pairs into holding array
            ctrl.cardSortingHolding = [];
            while (ctrl.cardSortingHolding.length < (numberOfCards)) {
                //var nextCard = (ctrl.cardSortingHolding.length / 2);
                //ctrl.cardSortingHolding.push(ctrl.allCards[nextCard]);
                //ctrl.cardSortingHolding.push(ctrl.allCards[nextCard]);
                var nextCardnumber = (ctrl.cardSortingHolding.length / 2);
                var nextCard = jQuery.extend({}, (ctrl.allCards[nextCardnumber]));
                ctrl.cardSortingHolding.push(nextCard);
                nextCard = jQuery.extend({}, (ctrl.allCards[nextCardnumber]));
                ctrl.cardSortingHolding.push(nextCard);
            }
            //shuffle holding array into selected cards array
            ctrl.selectedCards = [];
            while (ctrl.cardSortingHolding.length != 0) {
                var cardNumber = Math.floor(Math.random() * ctrl.cardSortingHolding.length);
                ctrl.selectedCards.push(ctrl.cardSortingHolding[cardNumber]);
                ctrl.cardSortingHolding.splice(cardNumber, 1);
            }
        };
        ctrl.clickCard = function (card) {
            //has this card already been selected or paired up
            if (ctrl.clickingActive == true && card.clicked == false && card.correct == false) {
                //if not, note it's been clicked, and add it to the current pair of selected cards
                ctrl.clickingActive = false;
                card.clicked = true;
                ctrl.clickedCards.push(card);
                $timeout(function () {
                    //when there's two cards selected, see if they match
                    if (ctrl.clickedCards.length == 2) {
                        if (ctrl.clickedCards[0].type === ctrl.clickedCards[1].type) {
                            //if they match, mark them as correct , and see if you've matched them all
                            ctrl.clickedCards = [];
                            for (var i = 0; i < ctrl.selectedCards.length; i++) {
                                if (ctrl.selectedCards[i].clicked == true) {
                                    ctrl.selectedCards[i].clicked = false;
                                    ctrl.selectedCards[i].correct = true;
                                }
                                var remainingCards = $filter('filter')(ctrl.selectedCards, { correct: false });
                                if (remainingCards.length == 0) {
                                    //U R TEH WINRAR
                                    ctrl.winGame = true;
                                }
                            }
                        }
                        //if they don't match, flip them over again and clear the selected cards
                        else {
                            ctrl.clickedCards = [];
                            for (var i = 0; i < ctrl.selectedCards.length; i++) {
                                ctrl.selectedCards[i].clicked = false;
                            }
                        }
                    }
                    ctrl.clickingActive = true;
                }, 1000);
            }
        };
        var init = function () {
            ctrl.getCards(8);
        };
        ctrl.resetGame = function (numberOfCards) {
            //do some reset stuff
            ctrl.selectedCards = [];
            ctrl.winGame = false;
            $timeout(function () {
                //then shuffle some cards
                ctrl.getCards(numberOfCards);
                //other reset stuff?
            }, 1000);
        };
        init();
    }
});
