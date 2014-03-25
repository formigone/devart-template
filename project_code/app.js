goog.provide('app.go');

goog.require('app.Canvas');
goog.require('app.Board');

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

    var colors = {
        DEAD: 'rgba(10, 10, 10, 0.01)',
        LIVE: 'rgba(0, 255, 0, 0.05)',
        GONE: 'rgba(0, 150, 0, 0.02)'
    };

//    var colors = {
//        DEAD: 'rgba(10, 10, 10, 0.01)',
//        LIVE: 'rgba(255, 0, 0, 0.05)',
//        GONE: 'rgba(150, 0, 0, 0.02)'
//    };
//
    var iter = 0;
    var MAX_ITER = 10;

    var canvas = new app.Canvas(SIZE.width, SIZE.height);
    var board = new app.Board(canvas, colors, CELL_SIZE);

    canvas.element.width = SIZE.width * CELL_SIZE.width;
    canvas.element.height = SIZE.height * CELL_SIZE.height;
//    canvas.getDrawingContext().webkitImageSmoothingEnabled = 'smooth';

    canvas.bindTo(goog.dom.getElement('screen'));

    function up() {
        iter++;
        board.update();
        if (iter > MAX_ITER) {
//            canvas.clear();
            iter = 0;
        }

        board.render();
        setTimeout(up, 50);
    }

    up();
};

goog.exportSymbol('main', main);
