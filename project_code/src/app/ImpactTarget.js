goog.provide("app.ImpactTarget");

/**
 *
 * @constructor
 */
app.ImpactTarget = function (x, y, z, params) {
    /** @private */
    this.params = {
        x: x || 0,
        y: y || 0,
        z: z || 0
    };

    params.height = params.height || params.width;

    var rot = params.rot || true;
    var color = app.ImpactTarget.colorMap[params.color] || app.ImpactTarget.colors.RED;

    var center = new THREE.Vector3();
    var pos = new THREE.Vector3();
    pos.set(this.params.x, this.params.y, this.params.z);
    pos.normalize();
    pos.multiplyScalar(13);

    var axis = new THREE.Vector3();
    axis.set(0, 1, 0);
    var angle = Math.PI / 5;
    var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );

    pos.applyMatrix4( matrix );


    this.geometry = new THREE.CubeGeometry(params.width || 0, params.height || 0, params.length || 0);
    this.material = new THREE.MeshPhongMaterial({color: color, shading: THREE.SmoothShading});
    this.obj = new THREE.Mesh(this.geometry, this.material);

    this.obj.position = pos;

    if (rot) {
        this.obj.lookAt(center);
    }
};

app.ImpactTarget.colors = {
    YELLOW: 0,
    RED: 1
};

app.ImpactTarget.colorMap = [
    0xffdf00,
    0xec0033,
    0xa69100,
    0x990021
];
