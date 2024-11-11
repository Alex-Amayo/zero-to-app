export interface EventEntry {
    name: string;
    payload: any;
}
export declare function createEventLogger(): {
    events: EventEntry[];
    logEvent: (name: string) => (event: unknown) => void;
};
export declare function getEventsNames(events: EventEntry[]): string[];
export declare function lastEventPayload(events: EventEntry[], name: string): any;
