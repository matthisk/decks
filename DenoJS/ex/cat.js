console.log(Deno.args);

const filename = Deno.args[1];

async function main() {
  const f = await Deno.open(filename);
  console.log(f);

  await Deno.copy(Deno.stdout, f);
  console.log(Deno.resources());
}

main();