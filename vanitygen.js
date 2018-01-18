const bitcoinjs = require("bitcoinjs-lib");
const ECPair = bitcoinjs.ECPair;

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
function isRegExp(what) {
    return what.constructor == RegExp;
}
function anyMatch(pair, filters) {
    var privateKey = pair.toWIF();
    var address = pair.getAddress();
    for (var filt in filters) {
        if (typeof (filt) == "string") {
            if (address.startsWith(filt)) {
                return true;
            }
        }
        else if (isRegExp(filt)) {
            if (address.match(filt)) {
                return true;
            }
        }
        else if (isFunction(filt)) {
            if (filt(address, privateKey)) {
                return true;
            }
        }
    }
    return false;
}
var generator = /** @class */ (function () {
    function generator() {
        this.mLimit = -1;
        this.mFinders = [];
    }
    generator.prototype.limit = function (l) {
        this.mLimit = l;
    };
    generator.prototype.addFinder = function (finder) {
        this.mFinders.push(finder);
    };
    generator.prototype.network = function (l) {
        this.mNetwork = l;
    };
    generator.prototype.nextMatch = function () {
        return new Promise((resolve, reject) => {
            while (true) {
                var key = ECPair.makeRandom({ network: this.mNetwork });
                var privateKey = key.toWIF();
                var address = key.getAddress();
                if (anyMatch(key, this.mFinders)) {
                    resolve({ address: address, privateKey: privateKey });
                }
            }
        });
    };
    return generator;
}());
module.exports = {
    generator: generator
};
