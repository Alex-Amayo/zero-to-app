import HashableImageSouceConverter from "./HashableImageSourceConverter/HashableImageSourceConverter";
export default class DifferenceHashBuilder {
    private generator;
    private dHashConverter;
    constructor(dHashConverter?: HashableImageSouceConverter | null, document?: Document);
    build(url: URL, hashSize?: number): Promise<import("./Hash").default>;
}
