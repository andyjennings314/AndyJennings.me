(function () {
    var app = angular.module('AJPortfolio');

    var portfolioCtrl = function ($scope, $timeout) {
        var self = this;

        var timer = $timeout(function () {
            jQuery(".FolioPod .FolioImgs").height(jQuery(".FolioPod img").height());
        }, 200);

        $scope.$on("$destroy", function (event) {
            $timeout.cancel(timer);
        });

        //Switch through images in Folio
        self.cycleImages = function (podId, numOfPhotos, activePhoto) {
                if (numOfPhotos > 1) {
                    var folioActiveClass = activePhoto;
                    $(".FolioPod:eq(" + podId + ") img").fadeOut().removeClass("active");
                    $(".FolioPod:eq(" + podId + ") img:eq(" + folioActiveClass + ")").fadeIn().addClass("active");
                    folioActiveClass++;
                    if (folioActiveClass == numOfPhotos) { folioActiveClass = 0 }
                    $timeout(self.cycleImages, 5000, true, podId, numOfPhotos, folioActiveClass);
                }
                else {
                    if (!$(".FolioPod:eq(" + podId + ") img").hasClass("active")) {
                        $(".FolioPod:eq(" + podId + ") img").addClass("active");
                    }
                }
        }
    }

    app.controller('portfolioCtrl', portfolioCtrl);

}());