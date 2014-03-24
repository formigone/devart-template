goog.provide('app.Canvas');

goog.require('goog.dom');

/**
 *
 * @param {number} width
 * @param {number} height
 * @constructor
 */
app.Canvas = function(width, height) {
    /**
     * @private
     * @type {Element}
     */
    this.element = goog.dom.createDom('canvas', {
        width: width || 900,
        height: height || 400
    });

    /**
     * @private
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = this.element.getContext('2d');
};

/**
 *
 */
app.Canvas.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {string} color
 */
app.Canvas.prototype.draw = function(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
};

/**
 *
 * @returns {CanvasRenderingContext2D}
 */
app.Canvas.prototype.getDrawingContext = function() {
    return this.ctx;
};

/**
 *
 * @param {Node} panel
 */
app.Canvas.prototype.bindTo = function(panel){
    goog.dom.append(panel, this.element);
};
