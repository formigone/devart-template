goog.provide("app.Simulation");

/**
 *
 * @constructor
 */
app.Simulation = function (data) {
    data = data || {};

    /** @private */
    this.objs = {};

    this.running = false;
    this.fps = data.fps || 60;
    this.onInit = data.onInit || goog.nullFunction;
    this.onResize = data.onResize || goog.nullFunction;
    this.onRender = data.onRender || goog.nullFunction;

    this.lastTime = 0;
    this.delay = 1000 / this.fps;

    this.resizeTimeout = data.resizeTimeout || 500;
    this.resizeTimer = null;
    this.init();
};

app.Simulation.prototype.onInit = goog.abstractMethod;
app.Simulation.prototype.onRender = goog.abstractMethod;
app.Simulation.prototype.onResize = goog.abstractMethod;

/**
 *
 */
app.Simulation.prototype.init = function() {
    window.addEventListener("resize", this.resize.bind(this));

    this.onInit();
};

/**
 *
 */
app.Simulation.prototype.resize = function () {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(this.onResize.bind(this), this.resizeTimeout);
};

/**
 *
 */
app.Simulation.prototype.run = function () {
    if (!this.running) {
        this.running = true;
        this.render(0);
    }
};

/**
 *
 */
app.Simulation.prototype.render = function (time) {
    if (time - this.lastTime >= this.delay) {
        this.onRender(time);
        this.lastTime = time;
    }

    requestAnimationFrame(this.render.bind(this));
};
