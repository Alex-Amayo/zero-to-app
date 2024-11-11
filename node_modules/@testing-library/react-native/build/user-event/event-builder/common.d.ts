/**
 * Experimental values:
 * - iOS: `{"changedTouches": [[Circular]], "identifier": 1, "locationX": 253, "locationY": 30.333328247070312, "pageX": 273, "pageY": 141.3333282470703, "target": 75, "timestamp": 875928682.0450834, "touches": [[Circular]]}`
 * - Android: `{"changedTouches": [[Circular]], "identifier": 0, "locationX": 160, "locationY": 40.3636360168457, "pageX": 180, "pageY": 140.36363220214844, "target": 53, "targetSurface": -1, "timestamp": 10290805, "touches": [[Circular]]}`
 */
declare function touch(): {
    nativeEvent: {
        changedTouches: never[];
        identifier: number;
        locationX: number;
        locationY: number;
        pageX: number;
        pageY: number;
        target: number;
        timestamp: number;
        touches: never[];
    };
    currentTarget: {
        measure: () => void;
    };
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
export declare const CommonEventBuilder: {
    touch: typeof touch;
    responderGrant: () => {
        dispatchConfig: {
            registrationName: string;
        };
        nativeEvent: {
            changedTouches: never[];
            identifier: number;
            locationX: number;
            locationY: number;
            pageX: number;
            pageY: number;
            target: number;
            timestamp: number;
            touches: never[];
        };
        currentTarget: {
            measure: () => void;
        };
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
    responderRelease: () => {
        dispatchConfig: {
            registrationName: string;
        };
        nativeEvent: {
            changedTouches: never[];
            identifier: number;
            locationX: number;
            locationY: number;
            pageX: number;
            pageY: number;
            target: number;
            timestamp: number;
            touches: never[];
        };
        currentTarget: {
            measure: () => void;
        };
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
    /**
     * Experimental values:
     * - iOS: `{"eventCount": 0, "target": 75, "text": ""}`
     * - Android: `{"target": 53}`
     */
    focus: () => {
        nativeEvent: {
            target: number;
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
    /**
     * Experimental values:
     * - iOS: `{"eventCount": 0, "target": 75, "text": ""}`
     * - Android: `{"target": 53}`
     */
    blur: () => {
        nativeEvent: {
            target: number;
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
export {};
