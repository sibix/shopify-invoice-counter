export class Counter {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    const url = new URL(request.url);

    // Optional: simple auth
    const token = url.searchParams.get("token");
    if (token !== "YOUR_SECRET_TOKEN") {
      return new Response("Unauthorized", { status: 401 });
    }

    const now = new Date();
    const year = now.getFullYear().toString();

    let counters = await this.state.storage.get("counters") || {};

    if (!counters[year]) {
      counters[year] = 0;
    }

    counters[year] += 1;

    await this.state.storage.put("counters", counters);

    const number = counters[year].toString().padStart(4, "0");

    return new Response(
      JSON.stringify({
        invoice_number: `${year}-${number}`
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
