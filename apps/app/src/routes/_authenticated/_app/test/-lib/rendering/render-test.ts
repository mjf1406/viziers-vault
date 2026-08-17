import { d } from "typegpu";
import { getContext, root } from "../tgpu-root";
import { stopTriangleAnimated } from "./animated-triangle";

const pipeline = root.createRenderPipeline({
  primitive: { topology: "triangle-list" },
  vertex: ({ $vertexIndex: vid }) => {
    "use gpu";

    const positions = [d.vec2f(0.0, 0.5), d.vec2f(-0.5, -0.5), d.vec2f(0.5, -0.5)];

    const colors = [d.vec3f(1, 0, 0), d.vec3f(0, 1, 0), d.vec3f(0, 0, 1)];

    return { $position: d.vec4f(positions[vid], 0, 1), color: colors[vid] };
  },
  fragment: ({ color }) => {
    "use gpu";
    return d.vec4f(color, 1);
  },
});

export function executeTriangleVertices() {
  stopTriangleAnimated();
  pipeline.withColorAttachment({ view: getContext() }).draw(3);
}
