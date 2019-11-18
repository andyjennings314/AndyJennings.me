var app = angular.module('AJPortfolio', ['ngRoute',]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/home/home.html',
            controller: 'homeCtrl'
        })
        .when('/portfolio', {
            templateUrl: '/portfolio/portfolio.html',
            controller: 'portfolioCtrl'
        })
        .when('/about', {
            templateUrl: '/about/about.html',
            controller: 'aboutCtrl'
        })
        .when('/pairs', {
            templateUrl: '/pairs/pairs.html',
            controller: 'pairsCtrl'
        })
        .when('/weather', {
            template: '<weather></weather>'
        })
        .otherwise({
            redirectTo: "/"
        });
}).run(function ($rootScope) {
    $rootScope.isItDropped = false;
});

angular.element(document).ready(function(){
  angular.bootstrap(document.body, ['AJPortfolio'])
});