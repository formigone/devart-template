goog.provide("app.go");

goog.require("app.Simulation");
goog.require("app.ImpactSignal");
goog.require("app.ImpactTarget");
goog.require("app.CameraControl");
goog.require("app.Dataset");

goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.events");

var rotation = function () {
    var calculateRotation = function () {
        var vecCg = new THREE.Vector3(
            goog.dom.getElement("cgX").value,
            goog.dom.getElement("cgY").value,
            goog.dom.getElement("cgZ").value
        );

        var vecHp = new THREE.Vector3(
            goog.dom.getElement("hpX").value,
            goog.dom.getElement("hpY").value,
            goog.dom.getElement("hpZ").value
        );

        var w;
        var res;
        var quat = new THREE.Quaternion();
        var vecAxis = vecHp.clone();

        vecCg.normalize();
        vecHp.normalize();
        vecAxis.cross(vecCg);

        w = Math.cos(0.5 * Math.acos(vecCg.dot(vecHp)));
        res = vecCg.length() * vecHp.length() * w * 2;

        quat.set(
            vecAxis.x /= res,
            vecAxis.y /= res,
            vecAxis.z /= res,
            w
        );

        updateOut(goog.dom.getElement("outQuat"), quat);
    };

    var updateOut = function (outEl, quat) {
        goog.dom.setTextContent(outEl, "<" + quat._x +
            ", " + quat._y +
            ", " + quat._z +
            ", " + quat._w + ">");
    }

    goog.events.listen(goog.dom.getElement("rotBtn"), goog.events.EventType.CLICK, calculateRotation);
    calculateRotation();
};

var graph = function () {
    var x = 712;
    var y = 312;
    var z = 112;

    var offset = 512;  // changed
    var divi = 512 / 200;
    x = (x - offset) / divi;
    y = (y - offset) / divi;
    z = (z - offset) / divi;

    var a = x * x + y * y + z * z;
    a = Math.sqrt(a);

    var value3 = 0;

    var dcolumn = [];
    var crows = [];
    var ccolumn = [];
    var counter = 0;
    var chart;
    var dataProvider;
    var ddataProvider;

    for (var i = 0; i < 999; i++) {
        dcolumn.push(i);
    }

    function loadCSV(file) {
        var req = new XMLHttpRequest();
        req.onload = function () {
            parseCSV(this.responseText);
        };

        req.open('GET', file, true);
        req.send();
    }

    function parseCSV(data) {
        var rows = data.split("\n");
        var drows = data.split("\n"); // added

        crows = rows;
        data = data.replace(/\r\n/g, "\n");
        data = data.replace(/\r/g, "\n");

        dataProvider = [];
        ddataProvider = [];

        for (var i = 0; i < rows.length; i++) {
            if (rows[i]) {
                var column = rows[i].split(",");

                for (var j = 0; j < column.length; j++) { //added g convert
                    column[j] = (column[j] - offset) / divi
                }

                var date = dcolumn[i];
                var value0 = column[0];
                var value1 = column[1];
                var value2 = column[2];

                column.length = 6;

                for (var l = 0; l < rows.length; l++) {
                    a = column[0] * column[0] + column[1] * column[1] + column[2] * column[2];
                    column[3] = Math.sqrt(a)
                }

                value3 = column[3];

                // purpose of 'fakeVals' is to keep chart from auto-scaling when different datasets are used
                var dataObject = {date: date, value0: value0, value1: value1, value2: value2, value3: value3, fakeVals: i % 2 == 0 ? -100 : 100};
                dataProvider.push(dataObject);
            }
        }

        var smoothie = new SmoothieChart({
            grid: {
                strokeStyle: 'rgb(125, 0, 0)',
                fillStyle: 'rgb(60, 0, 0)',
                lineWidth: 1,
                millisPerLine: 250,
                verticalSections: 12
            },
            labels: {
                fillStyle: 'rgb(60, 0, 0)'
            }
        });

        smoothie.addTimeSeries(line1, {strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth: 3 });
        smoothie.addTimeSeries(line2, { strokeStyle: 'rgb(255, 0, 255)', fillStyle: 'rgba(255, 0, 255, 0.3)', lineWidth: 3 });
        smoothie.streamTo(document.getElementById("graphView"), 1000);

        chart.dataProvider = dataProvider;
        chart.validateData();
    }

    function createChart() {
        chart = new AmCharts.AmSerialChart();
        chart.categoryField = "date";


        var fakeVals = new AmCharts.AmGraph();
        fakeVals.valueField = "fakeVals";
        fakeVals.lineThickness = 0;
        chart.addGraph(fakeVals);

        var graph0 = new AmCharts.AmGraph();
        graph0.valueField = "value0";
        graph0.type = "smoothedLine";
        graph0.lineThickness = 3;

        chart.addGraph(graph0);
        var graph = new AmCharts.AmGraph();
        graph.valueField = "value1";
        graph.type = "smoothedLine";
        graph.lineThickness = 3;

        chart.addGraph(graph);
        var graph2 = new AmCharts.AmGraph();
        graph2.valueField = "value2";
        graph2.type = "smoothedLine";
        graph2.lineThickness = 3;
        chart.addGraph(graph2);

        var graph3 = new AmCharts.AmGraph();
        graph3.valueField = "value3";
        graph3.type = "smoothedLine";
        graph3.fillAlpha = "[0.7]";
        graph3.filltoGraph = 1;
        graph3.lineThickness = 6;
        chart.addGraph(graph3);
        chart.write('chartView');
    }

    var ti = 0;
    var line1 = new TimeSeries();
    var line2 = new TimeSeries();
    var xval = 0.5;


    function coSS() {
        ccolumn = crows[ti++];
        xval = dcolumn[ti++];
        xval = -1 * xval;
        return (xval);
    }

    var timeoutReady = {
        line: true,
        xval: true
    };

    function render() {

        if (timeoutReady.line) {
            timeoutReady.line = false;

            setTimeout(function () {
                line1.append(new Date().getTime(), slowX());
                line2.append(new Date().getTime(), Math.random());
                timeoutReady.line = true;
            }, 300);
        }

        if (timeoutReady.xval) {
            timeoutReady.xval = false;
            setTimeout(function () {
                xval = -1 * slowX();
                timeoutReady.xval = true;
            }, 200);
        }

        requestAnimationFrame(render);
    }

    function slowX() {
        ccolumn = crows[ti];
        if (ccolumn[0]) {
            var xxval = ccolumn.split(",");
            var xval = (xxval[0] - offset) / divi;
            ti++;
        }

        ti++;
        if (ti > 59) {
            ti = 0
        }

        return (xval);
    }

    function loadDataset(filename) {
        createChart();
        loadCSV(filename);
        render(0);
    }

    var inEl = document.querySelector("#inputFiles");
    inEl.addEventListener("change", function (event) {
        var i = this.selectedIndex;

        if (i > 0 && i < inEl.length) {
            var filename = "/hit-data/" + inEl[i].value + ".txt";
            loadDataset(filename);
        }
    });

    var upEl = document.querySelector("[name='locData']");
    upEl.addEventListener("change", function (event) {
        /** @type {FileList} */
        var filelist = event.target.files;

        /** @type {File} */
        var file = filelist[0];

        if (file.type == "text/plain") {
            var reader = new FileReader();

            reader.onload = function (event) {
                createChart();
                parseCSV(event.target.result);
                render(0);
            };

            reader.readAsText(file);
        }
    });
};

var helmetSym = function () {
    /**
     *
     * @returns {{WIDTH: number, HEIGHT: number}}
     */
    function getSize(el) {

        var VpSize = goog.dom.getViewportSize();
        var size = el.getClientRects();

        return {
            WIDTH: size[0].width - 30,
            HEIGHT: VpSize.height - 100
        };
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} g
     * @return string
     */
    function genMarkerId(x, y, z, g) {
        x = x < 0 ? 9999 + x : x;
        y = y < 0 ? 9999 + y : y;
        z = z < 0 ? 9999 + z : z;
        g = g < 0 ? 9999 + g : g;
        return x + "-" + y + "-" + z + "-" + g;
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} g
     */
    function setUiMarker(x, y, z, g) {
        var ID = genMarkerId(x, y, z, g);
        var tmpl = '<span>(' + x + ', ' + y + ', ' + z + ') @ ' + g + 'g</span>' +
            '<button class="pull-right btn btn-danger btn-xs" id="markerIndex_' + ID + '">Remove</button>';

        var html = goog.dom.createDom("li", {"class": "list-group-item", "id": "impactAt_" + x + "_" + y + "_" + z + "_" + g});
        html.innerHTML = tmpl;
        goog.dom.getElement("impactPoints").appendChild(html);
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} g
     */
    function setUiTargetMarker(x, y, z) {
        var ID = genMarkerId(x, y, z);
        var tmpl = '<span>(' + x + ', ' + y + ', ' + z + ') @ ' + '</span>' +
            '<button class="pull-right btn btn-danger btn-xs" id="targetMarkerIndex_' + ID + '">Remove</button>';

        var html = goog.dom.createDom("li", {"class": "list-group-item", "id": "impactAt_" + x + "_" + y + "_" + z});
        html.innerHTML = tmpl;
        goog.dom.getElement("impactPoints").appendChild(html);
    }

    var scene = new THREE.Scene();
    var view = goog.dom.getElement("view");
    var size = getSize(view);
    var camera = new THREE.PerspectiveCamera(45, size.WIDTH / size.HEIGHT, 1, 2000);

    var cameraCtrl = new app.CameraControl(camera, {
        target: new THREE.Vector3(0, 0, 0),
        front: new THREE.Vector3(55, 10, 60),
        back: new THREE.Vector3(-55, 0, -60),
        left: new THREE.Vector3(65, 0, -60),
        right: new THREE.Vector3(-70, 0, 60),
        top: new THREE.Vector3(1, 80, 1)
    }, "cameraCtrl");
    var paramCtrl = document.querySelectorAll("#inputParams input");
    var arrows = {};
    var targets = {};

    var sim = new app.Simulation({
        onInit: function () {
            var view = goog.dom.getElement("view");
            var size = getSize(view);
            var self = this;

            this.objs.camera = camera;

            this.objs.scene = scene;

            this.objs.renderer = new THREE.WebGLRenderer();
            this.objs.renderer.setSize(size.WIDTH, size.HEIGHT);
            this.objs.renderer.setClearColor(0xffffff, 1);

            var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
            hemiLight.color.setHSL(0.6, 1, 0.6);
            hemiLight.groundColor.setHSL(0.095, 1, 0.75);
            hemiLight.position.set(0, 500, 0);
            this.objs.scene.add(hemiLight);

            var dirLight = new THREE.DirectionalLight(0xffffff, 1);
            dirLight.color.setHSL(0.1, 1, 0.95);
            dirLight.position.set(-1, 1.75, 1);
            dirLight.position.multiplyScalar(50);
            this.objs.scene.add(dirLight);

            dirLight.castShadow = true;

            dirLight.shadowMapWidth = 2048;
            dirLight.shadowMapHeight = 2048;

            var d = 50;

            dirLight.shadowCameraLeft = -d;
            dirLight.shadowCameraRight = d;
            dirLight.shadowCameraTop = d;
            dirLight.shadowCameraBottom = -d;

            dirLight.shadowCameraFar = 3500;
            dirLight.shadowBias = -0.0001;
            dirLight.shadowDarkness = 0.35;

            view.appendChild(this.objs.renderer.domElement);
            this.controls = new THREE.OrbitControls(this.objs.camera, this.objs.renderer.domElement);

            this.objs.helmet;
            var loader = new THREE.OBJMTLLoader();
            loader.load("/models/helmet-05.obj", "/models/helmet-04.mtl", function (obj) {
                self.objs.helmet = obj;

                obj.position.set(0, 0, 0);
                obj.rotation.x += 1.5;
                obj.rotation.z -= 0.7;
                obj.rotation.y += 0.08;
                self.objs.scene.add(obj);

                cameraCtrl.update();
                self.run();
            });
        },
        onRender: function (time) {
            this.objs.renderer.render(this.objs.scene, this.objs.camera);
            this.controls.update();
        },
        onResize: function () {
            var size = getSize(view);
            this.objs.camera.aspect = size.WIDTH / size.HEIGHT;
            this.objs.camera.updateProjectionMatrix();

            this.objs.renderer.setSize(size.WIDTH, size.HEIGHT);
        }
    });

    function newArrow(x, y, z, g, width, len, markTarget) {
        markTarget = markTarget || false;
        var color = app.ImpactTarget.colors.RED;

        if (markTarget) {
            color = app.ImpactTarget.colors.YELLOW;
            var target = new app.ImpactTarget(
                23, 42, -23,
                {width: 5, length: 1, color: color}
            );
            var targetId = genMarkerId(x, y, z, 0);
            targets[targetId] = targets[targetId] || [];
            targets[targetId].push(target);

            scene.add(target.obj);
        } else {
            var target = new app.ImpactTarget(
                0, 0, 0,
                {width: 3, height: 1, length: 3, color: color, rot: false}
            );

            var targetId = genMarkerId(x, y, z, 0);
            targets[targetId] = targets[targetId] || [];
            targets[targetId].push(target);

            scene.add(target.obj);
        }

        var arrow = new app.ImpactSignal(x, y, z, g, {width: width, length: len, color: color});
        var arrowId = genMarkerId(x, y, z, g);
        setUiMarker(x, y, z, g);
        arrows[arrowId] = arrows[arrowId] || [];
        arrows[arrowId].push(arrow);

        scene.add(arrow.obj);
    };

    goog.events.listen(goog.dom.getElement("newArrow"), goog.events.EventType.CLICK, function (e) {
        var params = {};
        e.preventDefault();

        goog.array.forEach(paramCtrl, function (ctrl, index, arr) {
            params[ctrl.getAttribute("data-target")] = parseFloat(ctrl.value) || 0.0;
        });

        newArrow(params.x, params.y, params.z, params.g, params.cWidth, params.cLen);
    });

    goog.events.listen(goog.dom.getElement("impactPoints"), goog.events.EventType.CLICK, function (e) {
        e.preventDefault();

        var id = e.target.getAttribute("id");
        var vals = id.match(/(\d+)/g);
        var key = genMarkerId(vals[0], vals[1], vals[2], vals[3]);
        var el = goog.dom.getElement("impactAt_" + vals[0] + "_" + vals[1] + "_" + vals[2] + "_" + vals[3]);

        for (var i = 0, len = arrows[key].length; i < len; i++) {
            scene.remove(arrows[key][i].obj);
            el = goog.dom.getElement("impactAt_" + vals[0] + "_" + vals[1] + "_" + vals[2] + "_" + vals[3]);
            goog.dom.removeNode(el);
        }

        delete arrows[key];
    });

    var currentDatasetType = false;
    var dataset = new app.Dataset();
    var cbHitFromDataset = function () {
        var pt = this.data[this.peak];
        hitFromDataset(pt.x, pt.y, pt.z, 1);
    };

    var hitFromDataset = function (x, y, z, g, width, len) {
        width = width || 1;
        len = len || 15;

        newArrow(x, y, z, g, width, len, currentDatasetType);
        currentDatasetType = false;
    };

    var inEl1 = document.querySelector("#inputFilesHp");
    inEl1.addEventListener("change", arrowFromFile);

    var inEl2 = document.querySelector("#inputFilesCg");
    inEl2.addEventListener("change", arrowFromFile);

    function arrowFromFile(event) {
        var i = this.selectedIndex;
        var el = this;
        currentDatasetType = this.getAttribute("id") == "inputFilesHp";

        if (i > 0 && i < el.length) {
            var filename = "/hit-data/" + el[i].value + ".txt";
            dataset.loadFromFile(filename, cbHitFromDataset);
        }
    }

    var upEl = document.querySelector("[name='locData']");
    upEl.addEventListener("change", function (event) {
        /** @type {FileList} */
        var filelist = event.target.files;

        /** @type {File} */
        var file = filelist[0];

        if (file.type == "text/plain") {
            var reader = new FileReader();

            reader.onload = function (event) {
                dataset.parseCsv(event.target.result, cbHitFromDataset);
            };

            reader.readAsText(file);
        }
    });
};

var main = function (action) {
    switch (action) {
        case "helmet":
            helmetSym();
            break;
        case "graph":
            graph();
            break;
        case "rotation":
            rotation();
            break;
    }
};

goog.exportSymbol('main', main);