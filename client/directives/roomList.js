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