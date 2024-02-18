import { EventEmitter } from "events";

class Emitter extends EventEmitter {
  static instance;

  constructor() {
    super();

    if (!Emitter.instance) {
      Emitter.instance = this;
    }
    return Emitter.instance;
  }
}


export default Emitter