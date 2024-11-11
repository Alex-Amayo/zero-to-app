export declare const EventBuilder: {
    Common: {
        touch: () => {
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
    ScrollView: {
        scroll: (offset?: import("../../types").Point, options?: import("./scroll-view").ScrollEventOptions) => {
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
    TextInput: {
        change: (text: string) => {
            nativeEvent: {
                text: string;
                target: number;
                eventCount: number;
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
        keyPress: (key: string) => {
            nativeEvent: {
                key: string;
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
        submitEditing: (text: string) => {
            nativeEvent: {
                text: string;
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
        endEditing: (text: string) => {
            nativeEvent: {
                text: string;
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
        selectionChange: ({ start, end }: import("../utils").TextRange) => {
            nativeEvent: {
                selection: {
                    start: number;
                    end: number;
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
        contentSizeChange: ({ width, height }: import("../../types").Size) => {
            nativeEvent: {
                contentSize: {
                    width: number;
                    height: number;
                };
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
};
