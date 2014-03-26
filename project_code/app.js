goog.provide('app.go');

goog.require('app.Canvas');
goog.require('app.Board');
goog.require('app.GameLoop');

goog.require('goog.dom');

var main = function() {
    var SIZE = {
        width: 100,
        height: 70
    };

    var CELL_SIZE = {
        width: 5,
        height: 5
    };

//    var colors = {
//        DEAD: 'rgba(0,   0, 0, 0.05)',
//        LIVE: 'rgba(0, 255, 0, 0.5)',
//        GONE: 'rgba(0, 100, 0, 0.05)'
//    };

    var colors = {
        DEAD: 'rgba(10, 10, 10, 0.02)',
        LIVE: 'rgba(255, 0, 0, 0.05)',
        GONE: 'rgba(200, 0, 0, 0.005)'
    };

    var canvas = new app.Canvas(SIZE.width, SIZE.height);
    var _canvas = canvas.getElement();
    var board = new app.Board(canvas, colors, CELL_SIZE);
    var game = null;
    var music = new Audio('sound/hitman-2.mp3');

    _canvas.width = SIZE.width * CELL_SIZE.width;
    _canvas.height = SIZE.height * CELL_SIZE.height;

    game = new app.GameLoop(23, {
        onUpdate: function(time) {
            board.update();
        },
        onDraw: function(time) {
            board.render();
        }
    });

    music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    canvas.bindTo(goog.dom.getElement('screen'));
    game.run();
setTimeout(function(){ game.stop(); }, 1000);
//    music.play();
};

goog.exportSymbol('main', main);
