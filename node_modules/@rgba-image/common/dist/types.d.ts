export declare type CreateImage = (width: number, height: number, data?: Uint8ClampedArray) => ImageData;
export declare type SourceToDest = (source: ImageData, dest: ImageData, sx?: number, sy?: number, sw?: number, sh?: number, dx?: number, dy?: number, dw?: number, dh?: number) => void;
export declare type Mutate = (dest: ImageData, dx?: number, dy?: number, dw?: number, dh?: number) => void;
export declare type MutateColor = (dest: ImageData, color: Iterable<number>, dx?: number, dy?: number, dw?: number, dh?: number) => void;
export interface GrayData extends ImageData {
}
export declare type PlotData = [number, number, number, number, number, number];
export declare type PlotUint32Data = [number, number, number];
export declare type Rgba = [number, number, number, number];
export declare type CompositeMode = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export declare type CompositeRgba = (sR: number, sG: number, sB: number, sA: number, dR: number, dG: number, dB: number, dA: number) => Rgba;
export declare type CompositeRgbaUint32 = (sR: number, sG: number, sB: number, sA: number, dR: number, dG: number, dB: number, dA: number) => number;
export declare type CompositeChannel = (source: number, dest: number) => number;
export declare type CompositeArg = CompositeMode | CompositeRgbaUint32;
export declare type MapRgba = (r: number, g: number, b: number, a: number) => Rgba;
export declare type MapRgbaUint32 = (r: number, g: number, b: number, a: number) => number;
export declare type MapChannel = (source: number) => number;
export declare type AdjustRgba = (r: number, g: number, b: number, a: number, amount: number) => Rgba;
export declare type AdjustRgbaUint32 = (r: number, g: number, b: number, a: number, amount: number) => number;
export declare type AdjustChannel = (source: number, amount: number) => number;
export declare type RgbaStop = [number, number, number, number, number];
export declare type RgbaUint32Stop = [number, number];
export declare type ChannelStop = [number, number];
