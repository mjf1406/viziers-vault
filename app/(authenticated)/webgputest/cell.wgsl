// cell.wgsl: Shader to render a grid of cells.
// Each cell is drawn as a quad (two triangles) whose
// position is computed per‐instance based on a uniform
// grid size.

struct VertexInput {
  @location(0) pos: vec2f,                // Base quad vertex in
                                          // normalized [-1,1] space.
  @builtin(instance_index) instance: u32, // Which cell we’re drawing.
};

struct VertexOutput {
  @builtin(position) pos: vec4f, // Clip‐space position.
  @location(0) cell: vec2f,      // Grid cell coords (x,y).
};

@group(0) @binding(0)
var<uniform> grid: vec2f;        // (columns, rows) of the grid.

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  // 1) Convert instance index → float for arithmetic.
  let i = f32(input.instance);

  // 2) Compute cell coords in [0,grid.x)×[0,grid.y):
  //    x = i % grid.x,   y = floor(i / grid.x)
  let cell = vec2f(i % grid.x, floor(i / grid.x));

  // 3) Normalize cell coords to [0,2) range for offset.
  let cellOffset = cell / grid * 2;

  // 4) Remap base quad ([–1,1] → [0,2] → [0,2]/grid → [–1,1]),
  //    then shift by cellOffset to place it in the right cell.
  let gridPos = (input.pos + 1) / grid - 1 + cellOffset;

  var output: VertexOutput;
  output.pos  = vec4f(gridPos, 0, 1); // z=0, w=1
  output.cell = cell;                 // pass to fragment
  return output;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  // Normalize cell coords to [0,1] range.
  let c = input.cell / grid;
  // Color each cell based on its (x,y) position:
  //   R = c.x,  G = c.y,  B = 1−c.x,  A = 1
  return vec4f(c, 1 - c.x, 1);
}