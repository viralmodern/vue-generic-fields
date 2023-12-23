export let EventsPubSub = () => {
  let events = {}
  function subscribe(eventName, fn) {
    events[eventName] = events[eventName] || []
    events[eventName].push(fn)
  }
  function unsubscribe(eventName, fn) {
    if (events[eventName]) {
      for (let i = 0; i < events[eventName].length; i++) {
        if (events[eventName][i] === fn) {
          events[eventName].splice(i, 1)
          break
        }
      }
    }
  }
  function emit(eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach((fn) => fn(data))
    }
  }
  return {
    subscribe,
    unsubscribe,
    emit,
  }
}
export class ObservablePubSub {
  constructor(options) {
    this.events = []
  }
  subscribe(f) {
    this.events.push(f)
  }
  unsubscribe(f) {
    this.events = this.events.filter((subscriber) => subscriber !== f)
  }
  emit(data) {
    this.events.forEach((observer) => observer(data))
  }
}
