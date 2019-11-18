angular.module('AJPortfolio').controller('portfolioCtrl', function ($timeout) {
    var ctrl = this;

    //Switch through images in Folio
    ctrl.cycleImages = function (podId, numOfPhotos, activePhoto) {
            if (numOfPhotos > 1) {
                var folioActiveClass = activePhoto;
                $(".FolioPod:eq(" + podId + ") img").fadeOut().removeClass("active");
                $(".FolioPod:eq(" + podId + ") img:eq(" + folioActiveClass + ")").fadeIn().addClass("active");
                folioActiveClass++;
                if (folioActiveClass == numOfPhotos) { folioActiveClass = 0 }
                $timeout(ctrl.cycleImages, 5000, true, podId, numOfPhotos, folioActiveClass);
            }
            else {
                if (!$(".FolioPod:eq(" + podId + ") img").hasClass("active")) {
                    $(".FolioPod:eq(" + podId + ") img").addClass("active");
                }
            }
    }
});    