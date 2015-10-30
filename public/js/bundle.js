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
module.exports = [function(){
    return {
        replace : true,
        scope :{},
        template: "<canvas width=\"500\" height=\"500\"></canvas>",
        link: function (scope, element, attribute) {
            init();
            
            function init() {
                scope.stage = new createjs.Stage(element[0]);
                var circle = new createjs.Shape();
                circle.graphics.beginFill("red").drawCircle(0, 0, 50);
                circle.x = 100;
                circle.y = 100;
                scope.stage.addChild(circle);
                scope.stage.update();
            }
        }
    }
}];
},{}],5:[function(require,module,exports){
var app = angular.module('site');

app.directive('roomlist', require('./roomList.js'));
app.directive('game', require('./game.js'));
},{"./game.js":4,"./roomList.js":6}],6:[function(require,module,exports){
module.exports = ['socket', function(socket) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: function() {return 'partials/roomList.html?' +new Date()},
        link: function (scope, element, attribute) {
            //our room list code will go here
            scope.rooms = [{name:"Lobby"}, {name:"game room"}, {name:"another game room"}];
        }
    };
}]
},{}],7:[function(require,module,exports){
var app = angular.module('site');

app.factory('socket', require('./socket'));
},{"./socket":8}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
var site = angular.module('site', ['ngRoute']);

require('./controllers');
require('./directives');//this was added
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
},{"./controllers":2,"./directives":5,"./factories":7}]},{},[9]);
