goog.provide('app.go');

goog.require('app.Canvas');
goog.require('goog.dom');

var main = function () {
    var SIZE = {
        width: 700,
        height: 450
    };

    var canvas = new app.Canvas(SIZE.width, SIZE.height);
    var ctx = canvas.getDrawingContext();

    canvas.bindTo(goog.dom.getElement('screen'));
    canvas.draw(0, 0, SIZE.width, SIZE.height, 'rgba(10, 10, 10, 0.75)');
    canvas.draw(200, 150, 50, SIZE.height * 0.25, '#ddd');
    canvas.draw(500, 100, 50, SIZE.height * 0.5, '#fff');

    ctx.fillStyle = '#c00';
    ctx.font = 'bold 23px monospace';
    ctx.fillText('Coming soon', 400, 400);
};

goog.exportSymbol('main', main);