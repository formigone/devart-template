goog.provide('app.go');

goog.require('app.Canvas');
goog.require('app.Board');
goog.require('app.GameLoop');
goog.require('app.ImageProcessor');

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

    var go = function() {
        game.run();
        music.play();
    };

    /** @this {Element} */
    var toggleSound = function() {
        var attr = 'data-status';
        var volAttr = 'data-volume';
        var STATUS = {
            playing: 'playing',
            paused: 'paused'
        };

        var status = this.getAttribute(attr);
        var volume = this.getAttribute(volAttr);

        if (!status || status === STATUS.playing) {
            this.setAttribute(attr, STATUS.paused);
            this.setAttribute(volAttr, music.volume);
            this.children[0].classList.remove('glyphicon-volume-off');
            this.children[0].classList.add('glyphicon-volume-up');
            music.volume = 0;
        } else if (status == STATUS.paused) {
            this.setAttribute(attr, STATUS.playing);
            this.children[0].classList.remove('glyphicon-volume-up');
            this.children[0].classList.add('glyphicon-volume-off');
            music.volume = volume;
        }
    };

    /** @this {Element} */
    var play = function() {
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
            this.children[0].classList.remove('glyphicon-play');
            this.children[0].classList.add('glyphicon-pause');
            go();
        }

        if (status === STATUS.playing) {
            this.setAttribute(attr, STATUS.paused);
            this.children[0].classList.remove('glyphicon-pause');
            this.children[0].classList.add('glyphicon-play');
            game.stop();
        } else if (status == STATUS.paused) {
            this.setAttribute(attr, STATUS.playing);
            this.children[0].classList.remove('glyphicon-play');
            this.children[0].classList.add('glyphicon-pause');
            game.run();
        }
    };

    /** @this {Element} */
    var restart = function() {
        if (board) {
            darkFade = 0.00;
            game.stop();
            board = new app.Board(canvas, colors, CELL_SIZE);
            canvas.clear();
            go();
        } else {
            ctrl.play.click();
        }
    };

    /** @this {Element} */
    var getImage = function(e){
//        var g = [];
//        var rnd = parseInt(Math.random() * 100, 10) % 3 + 3;
//        var files = e.target.files;
//        var reader = new FileReader();
//        var img = null;
//
//        if (files && files[0]) {
//            reader.onload = function(eReader) {
//                img = eReader.target.result;
//
//                if (img) {
//                    // TODO: analyze image and create grid from it
//                    document.body.style.background = 'url(' + img + ')';
//                }
//            };
//
//            reader.readAsDataURL(files[0]);
//        }
//
//        if (!board) {
//            ctrl.play.click();
//        }
//
//        for (var i = 0, len = SIZE.width * SIZE.height; i < len; i++) {
//            g[i] = i % rnd == 0;
//        }
//
//        canvas.clear();
//        board.seed(g);
    };

    /** @this {Element} */
    var loopMusic = function() {
        this.currentTime = 0;
        this.play();
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
        play: goog.dom.getElement('btn-play'),
        sound: goog.dom.getElement('btn-toggle-sound'),
        pic: goog.dom.getElement('btn-picture')
    };

    var processor = new app.ImageProcessor(ctrl.pic, SIZE, function(grid){
        if (!board) {
            ctrl.play.click();
        }

//        for (var i = 0, len = SIZE.width * SIZE.height; i < len; i++) {
//            grid[i] = i % 3 == 0;
//        }

        canvas.clear();
        board.seed(grid);
    });

    _canvas.width = SIZE.width * CELL_SIZE.width;
    _canvas.height = SIZE.height * CELL_SIZE.height;

    music.addEventListener('ended', loopMusic, false);
    ctrl.refresh.addEventListener('click', restart, false);
    ctrl.play.addEventListener('click', play, false);
    ctrl.sound.addEventListener('click', toggleSound, false);

    canvas.bindTo(goog.dom.getElement('screen'));
};

goog.exportSymbol('main', main);
