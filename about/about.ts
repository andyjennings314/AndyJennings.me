angular.module('AJPortfolio').component('about', {
  templateUrl: '/about/about.html',
  bindings: {},
  controller: function ($scope, $timeout) {
    var ctrl = this;

    ctrl.skipSW = false;
    ctrl.toggleModal = false;

    $timeout(function () {
        ctrl.skipSW = true;
    }, 9000);
  }
});