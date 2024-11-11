"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEventLogger = createEventLogger;
exports.getEventsNames = getEventsNames;
exports.lastEventPayload = lastEventPayload;
function createEventLogger() {
  const events = [];
  const logEvent = name => {
    return event => {
      const eventEntry = {
        name,
        payload: event
      };
      events.push(eventEntry);
    };
  };
  return {
    events,
    logEvent
  };
}
function getEventsNames(events) {
  return events.map(event => event.name);
}
function lastEventPayload(events, name) {
  return events.filter(e => e.name === name).pop()?.payload;
}
//# sourceMappingURL=events.js.map