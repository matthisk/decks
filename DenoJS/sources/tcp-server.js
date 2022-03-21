const { listen, copy } = Deno;

let msg = new TextEncoder().encode("hello");

async function main() {
  let s = listen("tcp", ":8000");

  while (true) {
    let socket = await s.accept();
    socket.write(msg);
    copy(socket, socket);
  }
}

main();