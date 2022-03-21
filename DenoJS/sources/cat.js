console.log(Deno.args);

let filename = Deno.args[1];

async function main() {
  console.table(Deno.resources());
  const file = await Deno.open(filename);

  Deno.copy(Deno.stdout, file);
}

main();