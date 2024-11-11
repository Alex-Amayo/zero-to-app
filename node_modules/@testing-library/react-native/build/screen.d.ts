import { RenderResult } from './render';
interface Screen extends RenderResult {
    isDetached?: boolean;
}
export declare let screen: Screen;
export declare function setRenderResult(renderResult: RenderResult): void;
export declare function clearRenderResult(): void;
export {};
