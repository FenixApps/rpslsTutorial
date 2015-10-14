var site = angular.module('site', ['ngRoute']);

require('./controllers');
require('./factories');

site.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'pages/index.html',
            controller: 'siteCtrl'
        }).
        when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'siteCtrl'
        }).
        when('/game', {
            templateUrl: 'pages/game.html',
            controller: 'gameCtrl'
        })
}]);