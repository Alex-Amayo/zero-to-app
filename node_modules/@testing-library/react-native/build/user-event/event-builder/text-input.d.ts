import { Size } from '../../types';
import { TextRange } from '../utils/text-range';
export declare const TextInputEventBuilder: {
    /**
     * Experimental values:
     * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
     * - Android: `{"eventCount": 6, "target": 53, "text": "Tes"}`
     */
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
    /**
     * Experimental values:
     * - iOS: `{"eventCount": 3, "key": "a", "target": 75}`
     * - Android: `{"key": "a"}`
     */
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
    /**
     * Experimental values:
     * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
     * - Android: `{"target": 53, "text": "Test"}`
     */
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
    /**
     * Experimental values:
     * - iOS: `{"eventCount": 4, "target": 75, "text": "Test"}`
     * - Android: `{"target": 53, "text": "Test"}`
     */
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
    /**
     * Experimental values:
     * - iOS: `{"selection": {"end": 4, "start": 4}, "target": 75}`
     * - Android: `{"selection": {"end": 4, "start": 4}}`
     */
    selectionChange: ({ start, end }: TextRange) => {
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
    /**
     * Experimental values:
     * - iOS: `{"contentSize": {"height": 21.666666666666668, "width": 11.666666666666666}, "target": 75}`
     * - Android: `{"contentSize": {"height": 61.45454406738281, "width": 352.7272644042969}, "target": 53}`
     */
    contentSizeChange: ({ width, height }: Size) => {
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
