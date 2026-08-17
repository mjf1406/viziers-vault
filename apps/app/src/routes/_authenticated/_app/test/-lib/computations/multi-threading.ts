import { d } from "typegpu";
import { root } from "../tgpu-root";

const valuesMutable = root.createMutable(d.arrayOf(d.u32, 16));

const program = root.createGuardedComputePipeline((x) => {
  "use gpu";
  // If the dispatch size might be larger than the buffer length, guard the array access inside the shader:
  if (x >= valuesMutable.$.length) {
    return;
  }
  valuesMutable.$[x]++;
});

export async function executeArray() {
  const threadCount = Math.floor(Math.random() * 16) + 1;
  program.dispatchThreads(threadCount); // threadCount is x that we declared in program = root.createGuardedComputePipeline((x) => { ... })
  console.log(`Dispatched ${threadCount} threads to increment values.`, await valuesMutable.read());

  return {
    threadCount,
    values: await valuesMutable.read(),
  };
}
