angular.module("AJPortfolio").directive('ajFooter', function () {
    return {
        templateUrl: '/footer/footer.html',
        scope: {},
        controllerAs: '$ctrl',
        bindToController: true,
        controller: function () {
            var ctrl = this;
            ctrl.copyrightYear = new Date().getFullYear();
            ctrl.ExcepHover = false;
        }
    };
});
