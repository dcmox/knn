"use strict";
exports.__esModule = true;
var knn_1 = require("../knn");
var getMapPoints = function (x, y) {
    var data = [
        [270, 10, 'School', 'Sober'],
        [100, 50, 'Restaurant', 'Sober'],
        [70, 170, 'Salon', 'Sober'],
        [250, 270, 'Bar', 'Drunk'],
        [50, 120, 'Club', 'Drunk'],
        [150, 230, 'School', 'Sober'],
        [150, 250, 'Park', 'Sober'],
        [200, 190, 'Club', 'Drunk'],
        [30, 50, 'Bar', 'Drunk'],
        [150, 110, 'Club', 'Drunk'],
        [70, 220, 'Laser Tag', 'Sober'],
        [200, 100, 'Restaurant', 'Sober'],
        [250, 150, 'Salon', 'Sober'],
    ];
    var testPoint = [x, y, '', ''];
    var knn = new knn_1.KNearestNeighbor(data, testPoint);
    var sim = knn.calculate().map(function (sim) { return sim.result; }); // similar pts
    var type = knn.classify(3); // classification
    var html = '';
    html += "<span title=\"" + testPoint[2] + " c: " + testPoint[0] + ", " + testPoint[1] + "\"\n        class=\"testPoint\" style=\"left:" + testPoint[0] + "px;top:" + testPoint[1] + "px;\"></span>";
    data.forEach(function (pt) {
        var cls = 'point';
        if (sim.some(function (s) { return s[0] === pt[0] && s[1] === pt[1]; })) {
            cls += ' nearest';
        }
        html += "<span title=\"" + pt[2] + " c: " + pt[0] + ", " + pt[1] + "\"\n        class=\"" + cls + "\" style=\"left:" + pt[0] + "px;top:" + pt[1] + "px;\">" + pt[2] + "</span>";
    });
    return { html: html, type: type };
};
var mapElement = document.getElementById('map');
var clsElement = document.getElementById('classification');
var displayMap = function (x, y) {
    if (mapElement !== null && clsElement !== null) {
        var result = getMapPoints(x, y);
        mapElement.innerHTML = result.html;
        clsElement.innerHTML = result.type;
    }
};
if (mapElement && clsElement) {
    var animationTimer_1 = setInterval(function () {
        var rngX = Math.round(Math.random() * mapElement.clientWidth);
        var rngY = Math.round(Math.random() * mapElement.clientHeight);
        displayMap(rngX, rngY);
    }, 800);
    mapElement.onclick = function (e) {
        clearInterval(animationTimer_1);
        var x = e.clientX - mapElement.offsetLeft;
        var y = e.clientY - mapElement.offsetTop;
        displayMap(x, y);
    };
    displayMap(150, 125);
}
