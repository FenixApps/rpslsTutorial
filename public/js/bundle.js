(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function($scope, socket) {
    console.log("in gameCtrl");
}
},{}],2:[function(require,module,exports){
var site = angular.module('site');

site.controller('siteCtrl', require('./siteCtrl'));
site.controller('gameCtrl', require('./gameCtrl'));
},{"./gameCtrl":1,"./siteCtrl":3}],3:[function(require,module,exports){
module.exports = function($scope){
    $scope.test = "[siteCtrl] testing if we wired everything right";
}
},{}],4:[function(require,module,exports){
var app = angular.module('site');

app.factory('socket', require('./socket'));
},{"./socket":5}],5:[function(require,module,exports){
module.exports = [
    '$rootScope', 
    function ($rootScope) {
        var socket = io.connect();
        console.log("socket created");
     
        return {
            on: function (eventName, callback) {
                function wrapper() {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                }
     
                socket.on(eventName, wrapper);
     
                return function () {
                    socket.removeListener(eventName, wrapper);
                };
            },
     
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if(callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            },
            close: function(){
              console.log("closing socket");
              socket.close();
            }
        };
    }
];
},{}],6:[function(require,module,exports){
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
},{"./controllers":2,"./factories":4}]},{},[6]);
