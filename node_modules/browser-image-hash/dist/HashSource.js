var HashSource = /** @class */ (function () {
    function HashSource(url, hashSize) {
        if (hashSize === void 0) { hashSize = 8; }
        this.url = url;
        this.hashSize = hashSize;
        this.width = hashSize + 1;
        this.height = hashSize;
    }
    HashSource.prototype.calculateArea = function () {
        return this.width * this.height;
    };
    return HashSource;
}());
export default HashSource;
