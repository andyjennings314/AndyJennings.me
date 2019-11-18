angular.module('AJPortfolio').controller('homeCtrl', function ($scope, $rootScope, $timeout) {
    var self = this;

    if ($rootScope.isItDropped != true)
    { $rootScope.isItDropped = false; }
    else { $rootScope.isItDropped = true; }

    var dropTheTitle = $timeout(function () {
        $rootScope.isItDropped = true
    }, 500);

    $scope.$on("$destroy", function (event) {
        $timeout.cancel(dropTheTitle);
    });

});