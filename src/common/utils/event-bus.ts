export type THandler = (...args: any[]) => void;

export class EventBus {
    private listeners: Record<string, THandler[]> = {};

    on(event: string, callback: THandler) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: THandler) {
        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback,
        );
    }

    emit(event: string, ...args: any[]) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
