class Queue {
  pending: Boolean;
  callbacks: any[];
  constructor() {
    this.pending = false;
    this.callbacks = [];
  }
  push(fn: () => void): void {
    if (typeof fn !== 'function') return;
    this.callbacks.push(fn);
    if (!this.pending) {
      this.pending = true;
      Promise.resolve().then(() => {
        this.flushCallbacks();
      });
    }
  }
  flushCallbacks(): void {
    this.pending = false;
    const copies = this.callbacks.slice();
    this.callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
  getCallbacks() {
    return this.callbacks;
  }
  clear() {
    this.callbacks = [];
  }
}

export { Queue };
