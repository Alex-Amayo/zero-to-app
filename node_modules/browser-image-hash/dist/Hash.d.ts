export default class Hash {
    readonly rawHash: string;
    constructor(rawHash: string);
    getHammingDistance(hash: Hash): number;
    toString(): string;
    private arrayChunk;
    private calcuateHexadecimal;
}
