/**
 * Copyright © 2023 650 Industries.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    persistMetroFilesAsync: ()=>persistMetroFilesAsync,
    getFilesFromSerialAssets: ()=>getFilesFromSerialAssets
});
function _chalk() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("chalk"));
    _chalk = function() {
        return data;
    };
    return data;
}
function _fs() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs"));
    _fs = function() {
        return data;
    };
    return data;
}
function _path() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("path"));
    _path = function() {
        return data;
    };
    return data;
}
function _prettyBytes() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("pretty-bytes"));
    _prettyBytes = function() {
        return data;
    };
    return data;
}
const _log = require("../log");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function persistMetroFilesAsync(files, outputDir) {
    if (!files.size) {
        return;
    }
    _fs().default.mkdirSync(_path().default.join(outputDir), {
        recursive: true
    });
    // Test fixtures:
    // Log.log(
    //   JSON.stringify(
    //     Object.fromEntries([...files.entries()].map(([k, v]) => [k, { ...v, contents: '' }]))
    //   )
    // );
    const assetEntries = [];
    const routeEntries = [];
    const remainingEntries = [];
    let hasServerOutput = false;
    for (const asset of files.entries()){
        hasServerOutput = hasServerOutput || asset[1].targetDomain === "server";
        if (asset[1].assetId) assetEntries.push(asset);
        else if (asset[1].routeId != null) routeEntries.push(asset);
        else remainingEntries.push(asset);
    }
    const groups = groupBy(assetEntries, ([, { assetId  }])=>assetId);
    const contentSize = (contents)=>{
        const length = typeof contents === "string" ? Buffer.byteLength(contents, "utf8") : contents.length;
        return length;
    };
    const sizeStr = (contents)=>{
        const length = contentSize(contents);
        const size = _chalk().default.gray`(${(0, _prettyBytes().default)(length)})`;
        return size;
    };
    if (routeEntries.length) {
        const plural = routeEntries.length === 1 ? "" : "s";
        _log.Log.log("");
        _log.Log.log(_chalk().default.bold`Exporting ${routeEntries.length} static route${plural}:`);
        for (const [, assets] of routeEntries.sort((a, b)=>a[0].length - b[0].length)){
            const id = assets.routeId;
            _log.Log.log("/" + (id === "" ? _chalk().default.gray(" (index)") : id), sizeStr(assets.contents));
        }
    }
    const assetGroups = [
        ...groups.entries()
    ].sort((a, b)=>a[0].localeCompare(b[0]));
    if (assetGroups.length) {
        const totalAssets = assetGroups.reduce((sum, [, assets])=>sum + assets.length, 0);
        const plural1 = totalAssets === 1 ? "" : "s";
        _log.Log.log("");
        _log.Log.log(_chalk().default.bold`Exporting ${totalAssets} asset${plural1}:`);
        for (const [assetId, assets1] of assetGroups){
            const averageContentSize = assets1.reduce((sum, [, { contents  }])=>sum + contentSize(contents), 0) / assets1.length;
            _log.Log.log(assetId, _chalk().default.gray(`(${[
                assets1.length > 1 ? `${assets1.length} variations` : "",
                `${(0, _prettyBytes().default)(averageContentSize)}`, 
            ].filter(Boolean).join(" | ")})`));
        }
    }
    const bundles = new Map();
    const other = [];
    remainingEntries.forEach(([filepath, asset])=>{
        if (!filepath.match(/_expo\/static\//)) {
            other.push([
                filepath,
                asset
            ]);
        } else {
            var ref;
            var ref1;
            const platform = (ref1 = (ref = filepath.match(/_expo\/static\/js\/([^/]+)\//)) == null ? void 0 : ref[1]) != null ? ref1 : "web";
            if (!bundles.has(platform)) bundles.set(platform, []);
            bundles.get(platform).push([
                filepath,
                asset
            ]);
        }
    });
    [
        ...bundles.entries()
    ].forEach(([platform, assets])=>{
        _log.Log.log("");
        const plural = assets.length === 1 ? "" : "s";
        _log.Log.log(_chalk().default.bold`Exporting ${assets.length} bundle${plural} for ${platform}:`);
        const allAssets = assets.sort((a, b)=>a[0].localeCompare(b[0]));
        while(allAssets.length){
            const [filePath, asset] = allAssets.shift();
            _log.Log.log(filePath, sizeStr(asset.contents));
            if (filePath.match(/\.(js|hbc)$/)) {
                // Get source map
                const sourceMapIndex = allAssets.findIndex(([fp])=>fp === filePath + ".map");
                if (sourceMapIndex !== -1) {
                    const [sourceMapFilePath, sourceMapAsset] = allAssets.splice(sourceMapIndex, 1)[0];
                    _log.Log.log(_chalk().default.gray(sourceMapFilePath), sizeStr(sourceMapAsset.contents));
                }
            }
        }
    });
    if (other.length) {
        _log.Log.log("");
        const plural2 = other.length === 1 ? "" : "s";
        _log.Log.log(_chalk().default.bold`Exporting ${other.length} file${plural2}:`);
        for (const [filePath, asset1] of other.sort((a, b)=>a[0].localeCompare(b[0]))){
            _log.Log.log(filePath, sizeStr(asset1.contents));
        }
    }
    // Decouple logging from writing for better performance.
    await Promise.all([
        ...files.entries()
    ].sort(([a], [b])=>a.localeCompare(b)).map(async ([file, { contents , targetDomain  }])=>{
        // NOTE: Only use `targetDomain` if we have at least one server asset
        const domain = hasServerOutput && targetDomain || "";
        const outputPath = _path().default.join(outputDir, domain, file);
        await _fs().default.promises.mkdir(_path().default.dirname(outputPath), {
            recursive: true
        });
        await _fs().default.promises.writeFile(outputPath, contents);
    }));
    _log.Log.log("");
}
function groupBy(array, key) {
    const map = new Map();
    array.forEach((item)=>{
        const group = key(item);
        var ref;
        const list = (ref = map.get(group)) != null ? ref : [];
        list.push(item);
        map.set(group, list);
    });
    return map;
}
function getFilesFromSerialAssets(resources, { includeSourceMaps , files =new Map() , platform  }) {
    resources.forEach((resource)=>{
        files.set(resource.filename, {
            contents: resource.source,
            originFilename: resource.originFilename,
            targetDomain: platform === "web" ? "client" : undefined
        });
    });
    return files;
}

//# sourceMappingURL=saveAssets.js.map