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

    img.onload = function() {
        ctx.drawImage(img, 0, 0, self.size.width, self.size.height);
        pixels = ctx.getImageData(0, 0, self.size.width, self.size.height);

        for (var i = 0, len = pixels.data.length; i < len; i += 4) {
            grid[i] = (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
            total += grid[i];
        }

        total = total / grid.length;
        console.log(total);

        self.cb(grid);
    }

    img.src = url;
};
