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
    size = size || /** @type {app.Board.CellSize} */ ({});

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

/** @typedef {{x: number, y: number}} */
app.Board.Position

app.Board.prototype.init = function() {
    for (var i = 0, len = this.size.width * this.size.height; i < len; i++) {
        this.grid[i] = new app.Cell(Math.random() * 100 > 75);
    }
};

/**
 *
 */
app.Board.prototype.update = function() {
    var pos = {};
    var neighbors = 0;

    for (var i = 0, len = this.size.width * this.size.height; i < len; i++) {
        pos = this.getXY(i);
        neighbors = this.countNeighbors(pos.x, pos.y);

        if (this.grid[i].state.curr) {
            if (neighbors != 2 && neighbors != 3) {
                this.grid[i].state.next = 0;
            }
        } else {
            if (neighbors === 3) {
                this.grid[i].state.next = 1;
            }
        }
    }

    for (var i = 0, len = this.size.width * this.size.height; i < len; i++) {
        this.grid[i].state.last = this.grid[i].state.curr;
        this.grid[i].state.curr = this.grid[i].state.next;
    }
};

/**
 *
 */
app.Board.prototype.render = function() {
    var pos = {};
    var color = '';
    var rnd = parseInt(Math.random() * 23, 10) - 8;

    for (var i = 0, len = this.size.width * this.size.height; i < len; i++) {
        pos = this.getXY(i);
        color = this.grid[i].state.curr ? this.colors.LIVE : this.colors.DEAD;
        this.canvas.draw(pos.x * this.cellSize.width, pos.y * this.cellSize.height, this.cellSize.width, this.cellSize.height, color);

        if (this.grid[i].state.last && !this.grid[i].state.curr) {
            this.canvas.draw(pos.x * this.cellSize.width, pos.y * this.cellSize.height, this.cellSize.width, this.cellSize.height + rnd, this.colors.GONE);
        }

//        if (this.grid[i].state.next) {
//            this.canvas.draw(pos.x * this.cellSize.width, pos.y * this.cellSize.height, this.cellSize.width, this.cellSize.height * 2.5, this.colors.DEAD);
//        }

        this.canvas.draw(pos.x * this.cellSize.width * 1.5, pos.y * this.cellSize.height * 1.5, this.cellSize.width * 0.5, this.cellSize.height * 0.5, 'rgba(255, 255, 255, 0.0025)');
//        this.canvas.draw(pos.x * this.cellSize.width * 1.5, pos.y * this.cellSize.height * 1.5, this.cellSize.width * 0.5, this.cellSize.height * rnd, 'rgba(0, 0, 0, 0.0025)');
    }
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
app.Board.prototype.countNeighbors = function(x, y) {
    var total = 0;
    var dir = {
        up: y > 0,
        down: y < this.size.height - 1,
        left: x > 0,
        right: x < this.size.width - 1
    };


    if (dir.up) {
        total += this.cellAt(x, y - 1).state.curr;
    }

    if (dir.down) {
        total += this.cellAt(x, y + 1).state.curr;
    }

    if (dir.left) {
        total += this.cellAt(x - 1, y).state.curr;
    }

    if (dir.right) {
        total += this.cellAt(x + 1, y).state.curr;
    }
    if (dir.up && dir.left) {
        total += this.cellAt(x - 1, y - 1).state.curr;
    }

    if (dir.up && dir.right) {
        total += this.cellAt(x + 1, y - 1).state.curr;
    }

    if (dir.down && dir.left) {
        total += this.cellAt(x - 1, y + 1).state.curr;
    }

    if (dir.down && dir.right) {
        total += this.cellAt(x + 1, y + 1).state.curr;
    }

    return total;
};

/**
 *
 * @param {number} i
 * @returns {app.Board.Position}
 */
app.Board.prototype.getXY = function(i) {
    var x = i % this.size.width;

    return {
        x: x,
        y: (i - x) / this.size.width
    };
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {app.Cell}
 */
app.Board.prototype.cellAt = function(x, y) {
    return this.grid[this.size.width * y + x];
};
