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
