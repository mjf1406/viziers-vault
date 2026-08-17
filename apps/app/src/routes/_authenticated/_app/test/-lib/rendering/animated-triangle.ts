import { d, std } from "typegpu";
import { getContext, root } from "../tgpu-root";

const timeUniform = root.createUniform(d.f32);

const pipeline = root.createRenderPipeline({
  primitive: { topology: "triangle-list" },
  vertex: ({ $vertexIndex: vid }) => {
    "use gpu";
    const positions = [d.vec2f(0.0, 0.5), d.vec2f(-0.5, -0.5), d.vec2f(0.5, -0.5)];

    const offset = d.vec2f(std.sin(timeUniform.$), std.cos(timeUniform.$)).mul(0.3);

    return { $position: d.vec4f(positions[vid].add(offset), 0, 1) };
  },
  fragment: () => {
    "use gpu";
    return d.vec4f(1, 0, 0, 1);
  },
});

let rafId: number | null = null;

function frame(timestamp: number) {
  timeUniform.write(timestamp / 1000);
  pipeline.withColorAttachment({ view: getContext() }).draw(3);
  rafId = requestAnimationFrame(frame);
}

export function executeTriangleAnimated() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(frame);
}

export function stopTriangleAnimated() {
  if (rafId === null) return;
  cancelAnimationFrame(rafId);
  rafId = null;
}
