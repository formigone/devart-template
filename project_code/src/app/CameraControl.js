goog.provide("app.CameraControl");

/**
 *
 * @param THREE.PerspectiveCamera camera
 * @param Object<string, {x, y, z}> positions Positions the camera at the given position (followed by a lookAt)
 * @param ctrl
 * @constructor
 */
app.CameraControl = function(camera, positions, ctrl) {
    /** @private */
    this.camera = camera;

    /** @private */
    this.positions = positions;

    /** @private */
    this.ctrl = goog.dom.getElement(ctrl);

    /** @private */
    this.ctrls = document.querySelectorAll("#" + ctrl + " button");

    /** @private */
    this.currPosition = this.ctrls[0].getAttribute("data-target");

    this.init();
};

app.CameraControl.prototype.init = function() {
    var self = this;

    goog.events.listen(this.ctrl, goog.events.EventType.CLICK, function(e) {
        e.preventDefault();

        var btn = e.target;
        self.currPosition = btn.getAttribute("data-target");

        goog.array.forEach(self.ctrls, function(_btn, index, arr) {
            _btn.classList.remove("active");
        });

        btn.classList.add("active");

        self.update();
    });
};

app.CameraControl.prototype.update = function() {
    this.camera.position = this.positions[this.currPosition];
    this.camera.lookAt(this.positions.target);
};
