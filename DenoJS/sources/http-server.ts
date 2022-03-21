import { serve } from "https://deno.land/std/http/server.ts";

let msg = new TextEncoder().encode("hello");

async function main() {
  let s = serve(":8000");
  
  for await (let req of s) {
    console.log("got a request");

    req.respond({ body: msg });
  }
}

main();