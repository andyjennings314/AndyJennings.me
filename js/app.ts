let app = angular.module('AJPortfolio', ['ngRoute',]);

app.config(function ($locationProvider ,$routeProvider) {
    $routeProvider
        .when('/', {
            template: '<home></home>'
        })
        .when('/portfolio', {
            template: '<portfolio></portfolio>'
        })
        .when('/about', {
            template: '<about></about>',
        })
        .when('/pairs', {
            template: '<pairs></pairs>'
        })
        .when('/weather', {
            template: '<weather></weather>'
        })
        .otherwise({
            redirectTo: "/"
        });
        
      $locationProvider.hashPrefix('');
}).run(function ($rootScope) {
    $rootScope.isItDropped = false;
});

angular.element(document).ready(function(){
  angular.bootstrap(document.body, ['AJPortfolio'])
});
