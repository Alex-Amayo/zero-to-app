import { Point, Size } from '../../types';
/**
 * Other options for constructing a scroll event.
 */
export type ScrollEventOptions = {
    contentSize?: Size;
    layoutMeasurement?: Size;
};
/**
 * Experimental values:
 * - iOS: `{"contentInset": {"bottom": 0, "left": 0, "right": 0, "top": 0}, "contentOffset": {"x": 0, "y": 5.333333333333333}, "contentSize": {"height": 1676.6666259765625, "width": 390}, "layoutMeasurement": {"height": 753, "width": 390}, "zoomScale": 1}`
 * - Android: `{"contentInset": {"bottom": 0, "left": 0, "right": 0, "top": 0}, "contentOffset": {"x": 0, "y": 31.619047164916992}, "contentSize": {"height": 1624.761962890625, "width": 411.4285583496094}, "layoutMeasurement": {"height": 785.5238037109375, "width": 411.4285583496094}, "responderIgnoreScroll": true, "target": 139, "velocity": {"x": -1.3633992671966553, "y": -1.3633992671966553}}`
 */
export declare const ScrollViewEventBuilder: {
    scroll: (offset?: Point, options?: ScrollEventOptions) => {
        nativeEvent: {
            contentInset: {
                bottom: number;
                left: number;
                right: number;
                top: number;
            };
            contentOffset: {
                y: number;
                x: number;
            };
            contentSize: {
                height: number;
                width: number;
            };
            layoutMeasurement: {
                height: number;
                width: number;
            };
            responderIgnoreScroll: boolean;
            target: number;
            velocity: {
                y: number;
                x: number;
            };
        };
        currentTarget?: unknown;
        target?: unknown;
        bubbles?: boolean | undefined;
        cancelable?: boolean | undefined;
        defaultPrevented?: boolean | undefined;
        eventPhase?: number | undefined;
        isTrusted?: boolean | undefined;
        preventDefault?: (() => void) | undefined;
        isDefaultPrevented?: (() => boolean) | undefined;
        stopPropagation?: (() => void) | undefined;
        isPropagationStopped?: (() => boolean) | undefined;
        persist?: (() => void) | undefined;
        timeStamp?: number | undefined;
        type?: string | undefined;
    };
};
