"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const execute_1 = require("./execute");
class ExecutionContextImpl {
    constructor(imageHome = _1.createImageHome()) {
        this.imageHome = imageHome;
    }
    async execute(configOrCommands) {
        const config = execute_1.asExecuteConfig(configOrCommands);
        config.inputFiles.forEach(f => {
            this.imageHome.register(f);
        });
        const inputFiles = await this.imageHome.getAll();
        const result = await _1.execute(Object.assign({}, config, { inputFiles }));
        result.outputFiles.forEach(f => {
            this.imageHome.register(f);
        });
        return result;
    }
    addFiles(files) {
        files.forEach(f => this.imageHome.register(f));
    }
    async getAllFiles() {
        return await this.imageHome.getAll();
    }
    async getFile(name) {
        return await this.imageHome.get(name);
    }
    async addBuiltInImages() {
        return this.imageHome.addBuiltInImages();
    }
    removeFiles(names) {
        return this.imageHome.remove(names);
    }
    static create(inheritFrom) {
        if (inheritFrom && !inheritFrom.imageHome) {
            throw new Error('Dont know how to inherit from other ExecutionContext implementation than this one');
        }
        return new ExecutionContextImpl(inheritFrom && inheritFrom.imageHome);
    }
}
function newExecutionContext(inheritFrom) {
    return ExecutionContextImpl.create(inheritFrom);
}
exports.newExecutionContext = newExecutionContext;
//# sourceMappingURL=executionContext.js.map