import HashableImageSouceConverter from '../HashableImageSourceConverter';
import HashSource from '../../HashSource';
export default class ImageMagickConverter implements HashableImageSouceConverter {
    private document;
    constructor(document: Document);
    private extractExtension;
    private createImageFileSource;
    private convertImage;
    convert(source: HashSource): Promise<HTMLImageElement>;
}
