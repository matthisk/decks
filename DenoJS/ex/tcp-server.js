const { listen } = Deno;

const msg = new TextEncoder().encode("hello");

async function main() {
  const s = listen("tcp", ":8000");

  while (true) {
    const c = await s.accept();
    c.write(msg);
    Deno.copy(c, c);
  }
}

main();