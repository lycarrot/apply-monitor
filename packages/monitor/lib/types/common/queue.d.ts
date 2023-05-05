type Fn = () => void
declare class Queue {
  pending: boolean
  callbacks: Fn[]
  constructor()
  push(fn: Fn): void
  flushCallbacks(): void
  getCallbacks(): Fn[]
  clear(): void
}
export { Queue }
