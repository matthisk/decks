import { serve } from "https://deno.land/std/http/server.ts";

async function main() {
  const body = new TextEncoder().encode("hello");

  for await (let req of serve(':8000')) {
    req.respond({ body });
  }
}

main();