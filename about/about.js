angular.module('AJPortfolio').component('about', {
  templateUrl: '/about/about.html',
  bindings: {},
  controller: function ($scope, $timeout) {
    var ctrl = this;

    ctrl.skipSW = false;
    ctrl.toggleModal = false;

    var skipSWTimer = $timeout(function () {
        ctrl.skipSW = true;
    }, 9000);

    $scope.$on("$destroy", function (event) {
        $timeout.cancel(skipSWTimer);
    });
  }
});