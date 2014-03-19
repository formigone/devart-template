goog.provide("app.Dataset");

/**
 *
 * @constructor
 */
app.Dataset = function (offset, divi) {
    this.data = [];
    this.peak = 0;

    this.offset = offset || 512;
    this.divi = divi || (this.offset / 200);
};

app.Dataset.prototype.reset = function(){
    this.data = [];
    this.peak = 0;
};

/**
 *
 * @param {string} filename
 * @param {Function} cb
 */
app.Dataset.prototype.loadFromFile = function(filename, cb) {
    cb = cb || function(){};

    var self = this;
    var req = new XMLHttpRequest();
    req.onload = function() {
        self.parseCsv(req.responseText, cb);
    };

    req.open('GET', filename, true);
    req.send();
};

/**
 *
 * @param {string} data
 * @param {Function} cb
 */
app.Dataset.prototype.parseCsv = function(data, cb) {
    this.reset();

    var dataArr = data.split("\n");
    var tmpRow = [];
    var tmpMaxPeak = 0;
    var tmpCurrPeak = 0;
    var tmpVec3 = {};

    for (var i = 0, len = dataArr.length; i < len; i++) {
        tmpRow = dataArr[i].match(/\d+/g) || [];

        if (tmpRow.length == 3) {
            tmpVec3 = {
                x: (tmpRow[0] - this.offset) / this.divi,
                y: (tmpRow[1] - this.offset) / this.divi,
                z: (tmpRow[2] - this.offset) / this.divi
            };

            this.data.push(tmpVec3);

            tmpCurrPeak = this.getLength(tmpVec3.x, tmpVec3.y, tmpVec3.z);

            if (tmpCurrPeak > tmpMaxPeak) {
                tmpMaxPeak = tmpCurrPeak;
                this.peak = this.data.length - 1;
            }
        }
    }

    cb.apply(this);
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {number}
 */
app.Dataset.prototype.getLength = function(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
};
