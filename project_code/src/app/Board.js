goog.provide('app.Board');

goog.require('app.Cell');

/**
 *
 * @param {app.Canvas} canvas
 * @param {app.Board.Palette=} colors
 * @param {app.Board.CellSize=} size
 * @constructor
 */
app.Board = function(canvas, colors, size) {
    size = size || {};

    /**
     *
     * @type {app.Canvas}
     * @private
     */
    this.canvas = canvas;

    /**
     * @type {app.Board.Palette}
     * @private
     */
    this.colors = colors || {
        DEAD: '#cc0000',
        LIVE: '#00cc00',
        GONE: '#cccc00'
    };

    /**
     * @type {app.Board.CellSize}
     * @private
     */
    this.cellSize = {
        width: size.width || 10,
        height: size.height || 10
    };

    this.size = {
        width: this.canvas.width,
        height: this.canvas.height
    };

    /**
     * @type {Array.<app.Cell>}
     * @private
     */
    this.grid = [];

    this.init();
};

/** @typedef {{DEAD: string, LIVE: string, GONE: string}} */
app.Board.Palette;

/** @typedef {{width: number, height: number}} */
app.Board.CellSize

app.Board.prototype.init = function() {
    for (var i = 0, len = this.size.width * this.size.height; i < len; i++) {
        this.grid[i] = new app.Cell();
    }
};

app.Board.prototype.update = function() {
};

app.Board.prototype.render = function() {
};

app.Board.prototype.countNeighbors = function(x, y) {
};

app.Board.prototype.getXY = function(i) {
};
