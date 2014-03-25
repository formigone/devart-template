goog.provide('app.GameLoop');

/**
 *
 * @param {number} fps
 * @param {Object} options
 * @constructor
 */
app.GameLoop = function(fps, options) {
    if (goog.isDefAndNotNull(options.onUpdate) && goog.isFunction(options.onUpdate)) {
        this.onUpdate = options.onUpdate;
    }

    if (goog.isDefAndNotNull(options.onDraw) && goog.isFunction(options.onDraw)) {
        this.onDraw = options.onDraw;
    }

    this.fps = fps;
    this.freq = 1000 / this.fps;
    this.delta = 0;
    this.lastTime = 0;
    this.running = false;

    this.init();
};

app.GameLoop.prototype.init = function() {
    this.onInit();
};

app.GameLoop.prototype.run = function() {
    if (!this.running) {
        this.running = true;
        this.go(0);
    }
};

app.GameLoop.prototype.stop = function() {
    this.running = false;
};

app.GameLoop.prototype.go = function(time) {
    if (this.running) {
        this.delta = time - this.lastTime;

        if (this.delta >= this.freq) {
            this.onUpdate(time);
            this.onDraw(time);

            this.lastTime = time;
        }
    }

    requestAnimationFrame(this.go.bind(this));
};

app.GameLoop.prototype.onUpdate = function(time) {
};

app.GameLoop.prototype.onDraw = function(time) {
};

app.GameLoop.prototype.onInit = function() {
};
