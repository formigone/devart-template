goog.provide('app.go');

goog.require('app.Canvas');
goog.require('app.Board');

goog.require('goog.dom');

var main = function () {
    var SIZE = {
        width: 700,
        height: 450
    };

    var canvas = new app.Canvas(SIZE.width, SIZE.height);
    var board = new app.Board(canvas);

    canvas.bindTo(goog.dom.getElement('screen'));
    board.render();
};

goog.exportSymbol('main', main);
