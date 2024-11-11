export default class HashSource {
    readonly url: URL;
    readonly width: number;
    readonly height: number;
    readonly hashSize: number;
    constructor(url: URL, hashSize?: number);
    calculateArea(): number;
}
