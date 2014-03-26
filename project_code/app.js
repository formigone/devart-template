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

    var go = function(){
        game.run();
        music.play();
    };

    var colors = {
        DEAD: 'rgba(10, 10, 10, 0.02)',
        LIVE: 'rgba(255, 0, 0, 0.05)',
        GONE: 'rgba(200, 0, 0, 0.005)'
    };

    var MAX_DARK_FADE = 0.02;
    var darkFade = 0.00;
    var darkFadeInc = 0.00005;

    var canvas = new app.Canvas(SIZE.width, SIZE.height);
    var _canvas = canvas.getElement();
    var board = null;
    var game = null;
    var music = new Audio('sound/hitman-2.mp3');

    var ctrl = {
        refresh: goog.dom.getElement('btn-refresh'),
        play: goog.dom.getElement('btn-play')
    };

    _canvas.width = SIZE.width * CELL_SIZE.width;
    _canvas.height = SIZE.height * CELL_SIZE.height;

    music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    ctrl.refresh.addEventListener('click', function(){
//        music.pause();
//        music.currentTime = 0;
        darkFade = 0.00;
        game.stop();
        canvas.clear();
        go();
    }, false);

    ctrl.play.addEventListener('click', function(){
        var attr = 'data-status';
        var STATUS = {
            playing: 'playing',
            paused: 'paused'
        };

        var status = this.getAttribute(attr);
        if (!status) {
            board = new app.Board(canvas, colors, CELL_SIZE);

            game = new app.GameLoop(23, {
                onUpdate: function(time) {
                    board.update();
                },
                onDraw: function(time) {
                    board.render();
                    if (darkFade < MAX_DARK_FADE) {
                        darkFade += darkFadeInc;
                        colors.DEAD = 'rgba(0, 0, 0, ' + darkFade + ')';
                    }
                }
            });

            this.setAttribute(attr, STATUS.playing);
            go();
        }

        if (status === STATUS.playing) {
            game.stop();
            this.setAttribute(attr, STATUS.paused);
        } else if (status == STATUS.paused) {
            game.run();
            this.setAttribute(attr, STATUS.playing);
        }
    }, false);

    canvas.bindTo(goog.dom.getElement('screen'));

//setTimeout(function(){
//    game.stop();
//    music.pause();
//}, 1500);
};

goog.exportSymbol('main', main);
