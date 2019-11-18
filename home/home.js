angular.module('AJPortfolio').component('home', {
  templateUrl: '/home/home.html',
  bindings: {},
  controller: function ($scope, $rootScope, $timeout) {
    var ctrl = this;

    $timeout(function () {
      ctrl.dropIt = $rootScope.isItDropped = true;
    }, 500);
  }
});