import { d } from "typegpu";
import { root } from "../tgpu-root";

const countMutable = root.createMutable(d.u32);

const incrementByOne = root.createGuardedComputePipeline(() => {
  "use gpu";
  const currentCount = countMutable.$;
  countMutable.$++;
  console.log("Current count:", currentCount);
});

export function incrementByOneFunction() {
  incrementByOne.dispatchThreads();
}
