(function () {
    var app = angular.module('AJPortfolio', ['ngRoute',]);

    app.config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
            .when('/portfolio', {
                templateUrl: 'portfolio.html',
                controller: 'portfolioCtrl'
            })
            .when('/about', {
                templateUrl: 'about.html',
                controller: 'aboutCtrl'
            })
            .when('/pairs', {
                templateUrl: 'pairs.html',
                controller: 'pairsCtrl'
            })
            .when('/weather', {
                templateUrl: 'weather.html',
                controller: 'weatherCtrl'
            })
            .otherwise({
                redirectTo: "/"
            });
    }).run(function ($rootScope) {
        $rootScope.isItDropped = false;
        $rootScope.copyrightYear = new Date().getFullYear();
        $rootScope.ExcepHover = false;
    })
}());