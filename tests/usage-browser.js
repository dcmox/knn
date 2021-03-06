(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.eucidianDistance = function (a, b, dimensions) {
    if (a.length !== b.length) {
        return null;
    }
    var sum = 0;
    for (var i = 0; i < dimensions; i++) {
        sum += Math.pow(a[i] - b[i], 2);
    }
    return Math.sqrt(sum);
};
exports.hammingDistance = function (a, b) {
    if (a.length !== b.length) {
        return null;
    }
    var d = 0;
    var i = a.length;
    while (i--) {
        if (a[i] !== b[i]) {
            d++;
        }
    }
    return d;
};
var KNearestNeighbor = /** @class */ (function () {
    function KNearestNeighbor(data, pt, k, classifiers) {
        if (k === void 0) { k = 3; }
        if (classifiers === void 0) { classifiers = [2, 3]; }
        this._results = [];
        this.data = data;
        this.pt = pt;
        this.k = k;
        this.classifiers = classifiers;
    }
    KNearestNeighbor.prototype.calculate = function () {
        var _this = this;
        this.data.forEach(function (point) {
            _this._results.push({ distance: exports.eucidianDistance(point, _this.pt, 2), result: point });
        });
        this._results = this._results.sort(function (a, b) {
            return a.distance < b.distance ? -1 : 1;
        }).slice(0, this.k);
        return this._results;
    };
    KNearestNeighbor.prototype.classify = function (n) {
        var tmp = [];
        this._results.forEach(function (r) {
            var match = tmp.find(function (res) { return res.result === r.result[n]; });
            if (match) {
                match.frequency++;
            }
            else {
                tmp.push({
                    frequency: 1,
                    result: r.result[n]
                });
            }
        });
        tmp = tmp.sort(function (a, b) { return a.frequency < b.frequency ? 1 : -1; });
        return tmp[0].result;
    };
    return KNearestNeighbor;
}());
exports.KNearestNeighbor = KNearestNeighbor;

},{}],2:[function(require,module,exports){
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

},{"../knn":1}]},{},[2]);
