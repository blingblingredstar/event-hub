type EventHandler = (args: unknown) => void;
type EventName = string;
type EventData = unknown;

class EventHub {
  #events = new Map<EventName, EventHandler[]>();

  on(eventName: EventName, eventHandler: EventHandler) {
    const handlers = this.#events.get(eventName);
    if (!handlers) {
      this.#events.set(eventName, [eventHandler]);
      return;
    }
    handlers.push(eventHandler);
  }

  emit(eventName: EventName, eventData?: EventData) {
    const handlers = this.#events.get(eventName);
    if (!handlers) return;
    handlers.forEach((eventHandler) => eventHandler(eventData));
  }

  off(eventName: EventName, targetHandler: EventHandler) {
    const handlers = this.#events.get(eventName) || [];
    this.#events.set(
      eventName,
      handlers.filter((handler) => handler !== targetHandler)
    );
  }
}

export default EventHub;
