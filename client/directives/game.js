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