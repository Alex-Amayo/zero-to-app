/**
 * Copyright © 2023 650 Industries.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on the community asset persisting for Metro but with base path and web support:
 * https://github.com/facebook/react-native/blob/d6e0bc714ad4d215ede4949d3c4f44af6dea5dd3/packages/community-cli-plugin/src/commands/bundle/saveAssets.js#L1
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
    persistMetroAssetsAsync: ()=>persistMetroAssetsAsync,
    copyInBatchesAsync: ()=>copyInBatchesAsync,
    filterPlatformAssetScales: ()=>filterPlatformAssetScales
});
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
const _metroAssetLocalPath = require("./metroAssetLocalPath");
const _log = require("../log");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function cleanAssetCatalog(catalogDir) {
    const files = _fs().default.readdirSync(catalogDir).filter((file)=>file.endsWith(".imageset"));
    for (const file of files){
        _fs().default.rmSync(_path().default.join(catalogDir, file));
    }
}
async function persistMetroAssetsAsync(assets, { platform , outputDirectory , baseUrl , iosAssetCatalogDirectory , files  }) {
    if (outputDirectory == null) {
        _log.Log.warn("Assets destination folder is not set, skipping...");
        return;
    }
    let assetsToCopy = [];
    // TODO: Use `files` as below to defer writing files
    if (platform === "ios" && iosAssetCatalogDirectory != null) {
        // Use iOS Asset Catalog for images. This will allow Apple app thinning to
        // remove unused scales from the optimized bundle.
        const catalogDir = _path().default.join(iosAssetCatalogDirectory, "RNAssets.xcassets");
        if (!_fs().default.existsSync(catalogDir)) {
            _log.Log.error(`Could not find asset catalog 'RNAssets.xcassets' in ${iosAssetCatalogDirectory}. Make sure to create it if it does not exist.`);
            return;
        }
        _log.Log.log("Adding images to asset catalog", catalogDir);
        cleanAssetCatalog(catalogDir);
        for (const asset of assets){
            if (isCatalogAsset(asset)) {
                const imageSet = getImageSet(catalogDir, asset, filterPlatformAssetScales(platform, asset.scales));
                writeImageSet(imageSet);
            } else {
                assetsToCopy.push(asset);
            }
        }
        _log.Log.log("Done adding images to asset catalog");
    } else {
        assetsToCopy = [
            ...assets
        ];
    }
    const batches = {};
    async function write(src, dest) {
        if (files) {
            const data = await _fs().default.promises.readFile(src);
            files.set(dest, {
                contents: data,
                targetDomain: platform === "web" ? "client" : undefined
            });
        } else {
            batches[src] = _path().default.join(outputDirectory, dest);
        }
    }
    for (const asset1 of assetsToCopy){
        const validScales = new Set(filterPlatformAssetScales(platform, asset1.scales));
        for(let idx = 0; idx < asset1.scales.length; idx++){
            const scale = asset1.scales[idx];
            if (validScales.has(scale)) {
                await write(asset1.files[idx], (0, _metroAssetLocalPath.getAssetLocalPath)(asset1, {
                    platform,
                    scale,
                    baseUrl
                }));
            }
        }
    }
    if (!files) {
        await copyInBatchesAsync(batches);
    }
}
function writeImageSet(imageSet) {
    _fs().default.mkdirSync(imageSet.baseUrl, {
        recursive: true
    });
    for (const file of imageSet.files){
        const dest = _path().default.join(imageSet.baseUrl, file.name);
        _fs().default.copyFileSync(file.src, dest);
    }
    _fs().default.writeFileSync(_path().default.join(imageSet.baseUrl, "Contents.json"), JSON.stringify({
        images: imageSet.files.map((file)=>({
                filename: file.name,
                idiom: "universal",
                scale: `${file.scale}x`
            })),
        info: {
            author: "expo",
            version: 1
        }
    }));
}
function isCatalogAsset(asset) {
    return asset.type === "png" || asset.type === "jpg" || asset.type === "jpeg";
}
function getImageSet(catalogDir, asset, scales) {
    const fileName = getResourceIdentifier(asset);
    return {
        baseUrl: _path().default.join(catalogDir, `${fileName}.imageset`),
        files: scales.map((scale, idx)=>{
            const suffix = scale === 1 ? "" : `@${scale}x`;
            return {
                name: `${fileName + suffix}.${asset.type}`,
                scale,
                src: asset.files[idx]
            };
        })
    };
}
function copyInBatchesAsync(filesToCopy) {
    const queue = Object.keys(filesToCopy);
    if (queue.length === 0) {
        return;
    }
    _log.Log.log(`Copying ${queue.length} asset files`);
    return new Promise((resolve, reject)=>{
        const copyNext = (error)=>{
            if (error) {
                return reject(error);
            }
            if (queue.length) {
                // queue.length === 0 is checked in previous branch, so this is string
                const src = queue.shift();
                const dest = filesToCopy[src];
                copy(src, dest, copyNext);
            } else {
                resolve();
            }
        };
        copyNext();
    });
}
function copy(src, dest, callback) {
    _fs().default.mkdir(_path().default.dirname(dest), {
        recursive: true
    }, (err)=>{
        if (err) {
            callback(err);
            return;
        }
        _fs().default.createReadStream(src).pipe(_fs().default.createWriteStream(dest)).on("finish", callback);
    });
}
const ALLOWED_SCALES = {
    ios: [
        1,
        2,
        3
    ]
};
function filterPlatformAssetScales(platform, scales) {
    const whitelist = ALLOWED_SCALES[platform];
    if (!whitelist) {
        return scales;
    }
    const result = scales.filter((scale)=>whitelist.includes(scale));
    if (!result.length && scales.length) {
        // No matching scale found, but there are some available. Ideally we don't
        // want to be in this situation and should throw, but for now as a fallback
        // let's just use the closest larger image
        const maxScale = whitelist[whitelist.length - 1];
        for (const scale of scales){
            if (scale > maxScale) {
                result.push(scale);
                break;
            }
        }
        // There is no larger scales available, use the largest we have
        if (!result.length) {
            result.push(scales[scales.length - 1]);
        }
    }
    return result;
}
function getResourceIdentifier(asset) {
    const folderPath = getBaseUrl(asset);
    return `${folderPath}/${asset.name}`.toLowerCase().replace(/\//g, "_") // Encode folder structure in file name
    .replace(/([^a-z0-9_])/g, "") // Remove illegal chars
    .replace(/^assets_/, ""); // Remove "assets_" prefix
}
function getBaseUrl(asset) {
    let baseUrl = asset.httpServerLocation;
    if (baseUrl[0] === "/") {
        baseUrl = baseUrl.substring(1);
    }
    return baseUrl;
}

//# sourceMappingURL=persistMetroAssets.js.map