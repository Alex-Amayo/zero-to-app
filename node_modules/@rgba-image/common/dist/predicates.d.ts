import { GrayData } from './types';
export declare const isImageData: (imageData: any) => imageData is ImageData;
export declare const isGrayData: (grayData: any) => grayData is GrayData;
export declare const isRgbaStop: (stop: any) => stop is [number, number, number, number, number];
export declare const isRgbaUint32Stop: (stop: any) => stop is [number, number];
export declare const isChannelStop: (stop: any) => stop is [number, number];
