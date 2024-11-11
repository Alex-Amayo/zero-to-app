"use strict";

const invariant = require("invariant");
class BatchProcessor {
  constructor(options, processBatch) {
    this._options = options;
    this._processBatch = processBatch;
    this._queue = [];
    this._timeoutHandle = null;
    this._currentProcessCount = 0;
    this._processQueue = this._processQueue.bind(this);
  }
  _onBatchFinished() {
    this._currentProcessCount--;
    this._processQueueOnceReady();
  }
  _onBatchResults(jobs, results) {
    invariant(results.length === jobs.length, "Not enough results returned.");
    for (let i = 0; i < jobs.length; ++i) {
      jobs[i].resolve(results[i]);
    }
    this._onBatchFinished();
  }
  _onBatchError(jobs, error) {
    for (let i = 0; i < jobs.length; ++i) {
      jobs[i].reject(error);
    }
    this._onBatchFinished();
  }
  _processQueue() {
    this._timeoutHandle = null;
    const { concurrency } = this._options;
    while (this._queue.length > 0 && this._currentProcessCount < concurrency) {
      this._currentProcessCount++;
      const jobs = this._queue.splice(0, this._options.maximumItems);
      this._processBatch(jobs.map((job) => job.item)).then(
        this._onBatchResults.bind(this, jobs),
        this._onBatchError.bind(this, jobs)
      );
    }
  }
  _processQueueOnceReady() {
    if (this._queue.length >= this._options.maximumItems) {
      clearTimeout(this._timeoutHandle);
      process.nextTick(this._processQueue);
      return;
    }
    if (this._timeoutHandle == null) {
      this._timeoutHandle = setTimeout(
        this._processQueue,
        this._options.maximumDelayMs
      );
    }
  }
  queue(item) {
    return new Promise((resolve, reject) => {
      this._queue.push({
        item,
        resolve,
        reject,
      });
      this._processQueueOnceReady();
    });
  }
  getQueueLength() {
    return this._queue.length;
  }
}
module.exports = BatchProcessor;
