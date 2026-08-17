import { d } from "typegpu";
import { root } from "../tgpu-root";

let incrementBy = 10;

const stateMutable = root.createMutable(d.struct({ counter: d.u32, incrementBy: d.u32 }), {
  counter: 0,
  incrementBy,
});

const program = root.createGuardedComputePipeline(() => {
  "use gpu";
  stateMutable.$.counter += stateMutable.$.incrementBy;
});

export async function execute() {
  incrementBy++;
  stateMutable.patch({ incrementBy });
  program.dispatchThreads();

  const state = await stateMutable.read();
  console.log(`counter: ${state.counter}, incrementBy: ${state.incrementBy}`);
}
