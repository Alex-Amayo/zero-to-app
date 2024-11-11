"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const p_map_1 = __importDefault(require("p-map"));
const misc_1 = require("./util/misc");
class ImageHomeImpl {
    constructor() {
        this.images = {};
        this.builtInImagesAdded = false;
    }
    get(name) {
        return this.images[name];
    }
    remove(names) {
        const result = [];
        Object.keys(this.images).forEach(name => {
            if (names.indexOf(name) !== -1) {
                result.push(this.images[name]);
                delete this.images[name];
            }
        });
        return result;
    }
    async getAll() {
        return await Promise.all(misc_1.values(this.images));
    }
    register(file, name = file.name) {
        const promise = _1.asInputFile(file);
        this.images[name] = promise;
        this.images[name].then(() => {
            promise.resolved = true;
        });
        return promise;
    }
    isRegistered(name, andReady = true) {
        return this.images[name] && (andReady && this.images[name].resolved);
    }
    async addBuiltInImages() {
        if (!this.builtInImagesAdded) {
            await p_map_1.default(await _1.getBuiltInImages(), img => this.register(img));
            this.builtInImagesAdded = true;
        }
    }
}
function createImageHome() { return new ImageHomeImpl(); }
exports.createImageHome = createImageHome;
//# sourceMappingURL=imageHome.js.map