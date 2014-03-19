goog.provide("app.ImpactSignal");

/**
 *
 * @constructor
 */
app.ImpactSignal = function (x, y, z, g, params) {
    /** @private */
    this.params = {
        x: x || 0,
        y: y || 0,
        z: z || 0,
        g: g || 0
    };

    var color = app.ImpactSignal.colorMap[params.color] || app.ImpactSignal.colors.RED;
    var tipColor = params.color + 2;
    tipColor = app.ImpactSignal.colorMap[tipColor] || app.ImpactSignal.colors.GREEN;
    var center = new THREE.Vector3();
    center.set(0, 0, 0);
    var pos = new THREE.Vector3();
    pos.set(this.params.x, this.params.y, this.params.z);
    pos.normalize();
    pos.multiplyScalar(23);

    var axis = new THREE.Vector3();
    axis.set(0, 1, 0);
    var angle = Math.PI / 5;
    var matrix = new THREE.Matrix4().makeRotationAxis( axis, angle );

    pos.applyMatrix4( matrix );

    this.geometry = new THREE.CubeGeometry(params.width || 0, params.width || 0, params.length || 0);
    this.material = new THREE.MeshPhongMaterial({color: color, shading: THREE.SmoothShading});
    this.obj = new THREE.Mesh(this.geometry, this.material);

    var tipGeo = new THREE.CylinderGeometry(0, params.width * 2, params.width * 5, 10, 10, false);
    var tipMat = new THREE.MeshPhongMaterial({color: tipColor, shading: THREE.SmoothShading});
    var tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.z = params.length * 0.5;
    tip.rotation.x = -1500;

    this.obj.add(tip);
    this.obj.position = pos;

    this.obj.lookAt(center);
};

app.ImpactSignal.colors = {
    YELLOW: 0,
    RED: 1,
    YELLOW_COMP: 2,
    RED_COMP: 3
};

app.ImpactSignal.colorMap = [
    0xffdf00,
    0xec0033,
    0xa69100,
    0x990021
];
