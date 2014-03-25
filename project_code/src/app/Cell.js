goog.provide('app.Cell');

/**
 *
 * @param {boolean=} current
 * @constructor
 */
app.Cell = function(current) {
    this.state = {
        curr: current || false,
        last: false,
        next: false
    };
};
