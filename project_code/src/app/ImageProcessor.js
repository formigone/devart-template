goog.provide('app.ImageProcessor');

goog.require('app.Canvas');

/**
 * @param {Element} uploader
 * @param {Object.<number, number>} uploader
 * @param {Function} cb
 *
 * @constructor
 */
app.ImageProcessor = function(uploader, size, cb) {
    this.uploader = uploader;
    this.size = size;
    this.cb = cb;

    this.uploader.addEventListener('change', this.getImage.bind(this), false);
};

/**
 * @param {*} event
 * @this {Element}
 */
app.ImageProcessor.prototype.getImage = function(event) {
    var img = null;
    var grid = [];
    var files = event.target.files;
    var reader = new FileReader();
    var self = this;

    if (files && files[0]) {
        reader.onload = function(eReader) {
            img = eReader.target.result;

            if (img) {
                document.body.style.background = 'url(' + img + ') center 100%';
                self.process(img);
            }
        };

        reader.readAsDataURL(files[0]);
    }
};

app.ImageProcessor.prototype.process = function(url) {
    var grid = [];
    var canvas = new app.Canvas(this.size.width, this.size.height);
    var ctx = canvas.getDrawingContext();
    var img = new Image();
    var pixels = null;
    var self = this;
    var total = 0;
    var avg = 0;

    img.onload = function() {
        ctx.drawImage(img, 0, 0, self.size.width, self.size.height);
        pixels = ctx.getImageData(0, 0, self.size.width, self.size.height);

        for (var i = 0, len = pixels.data.length; i < len; i += 4) {
            grid[i] = pixels.data[i] * 0.299 + pixels.data[i + 1] * 0.587 + pixels.data[i + 2] * 0.11;
            total += grid[i];
        }

        avg = total / (grid.length / 3);

        for (i = 0, len = grid.length; i < len; i++) {
            grid[i] = grid[i] > avg;

            if (i % 23 > 20) {
                grid[i] = !grid[i];
            }

            if (i % 42 > 23) {
                grid[i] = true;
            }
        }

        self.cb(grid);
    }

    img.src = url;
};
