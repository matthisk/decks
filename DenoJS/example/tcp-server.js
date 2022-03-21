const { listen } = Deno;

let msg = new TextEncoder().encode("Hello");

async function main() {
  const socket = listen("tcp", ":8000");

  while(true) {
    let conn = await socket.accept();
    conn.write(msg);
    Deno.copy(conn, conn);
  }
}

main();