export async function up(env) {
  // This tells Cloudflare to create the COUNTER Durable Object
  return env.COUNTER || null;
}

export async function down(env) {
  // Nothing to do on rollback
}

