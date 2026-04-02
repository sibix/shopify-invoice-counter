export { Counter } from "./counter.js";

export default {
  async fetch(request, env) {
    const id = env.COUNTER.idFromName("global-counter");
    const obj = env.COUNTER.get(id);

    return obj.fetch(request);
  }
};
