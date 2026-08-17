import { d } from "typegpu";
import { root } from "../tgpu-root";

const WIDTH = 8;
const HEIGHT = 6;

const valuesMutable = root.createMutable(d.arrayOf(d.arrayOf(d.u32, HEIGHT), WIDTH));

const program = root.createGuardedComputePipeline((x, y) => {
  "use gpu";
  valuesMutable.$[x][y]++;
});

export async function executeRectangle() {
  const dispatchWidth = Math.floor(Math.random() * WIDTH) + 1;
  const dispatchHeight = Math.floor(Math.random() * HEIGHT) + 1;
  program.dispatchThreads(dispatchWidth, dispatchHeight);
  console.log(
    `Dispatched ${dispatchWidth}x${dispatchHeight} threads to increment values.`,
    await valuesMutable.read(),
  );

  return {
    dispatchWidth,
    dispatchHeight,
    values: await valuesMutable.read(),
  };
}
