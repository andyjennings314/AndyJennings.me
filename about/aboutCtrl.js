angular.module('AJPortfolio').controller('aboutCtrl', function ($scope, $timeout) {
    var self = this;

    self.skipSW = false;
    self.toggleModal = false;

    var skipSWTimer = $timeout(function () {
        self.skipSW = true;
    }, 9000);

    $scope.$on("$destroy", function (event) {
        $timeout.cancel(skipSWTimer);
    });
});