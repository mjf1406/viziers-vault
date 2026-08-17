const PNG_SIGNATURE = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
const CRC_TABLE = makeCrcTable();

function makeCrcTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
}

function crc32(parts: readonly Uint8Array[]): number {
  let crc = 0xffffffff;
  for (const data of parts) {
    for (let i = 0; i < data.length; i++) {
      crc = CRC_TABLE[(crc ^ data[i]!) & 0xff]! ^ (crc >>> 8);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function u32be(value: number): Uint8Array {
  return new Uint8Array([
    (value >>> 24) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 8) & 0xff,
    value & 0xff,
  ]);
}

function concatBytes(parts: readonly Uint8Array[]): Uint8Array {
  let length = 0;
  for (const part of parts) length += part.length;
  const out = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function pngChunk(type: string, data: Uint8Array): Uint8Array {
  const typeBytes = new Uint8Array(4);
  for (let i = 0; i < 4; i++) typeBytes[i] = type.charCodeAt(i);
  return concatBytes([u32be(data.length), typeBytes, data, u32be(crc32([typeBytes, data]))]);
}

function ihdrChunk(width: number, height: number): Uint8Array {
  const data = new Uint8Array(13);
  data.set(u32be(width), 0);
  data.set(u32be(height), 4);
  data[8] = 8;
  data[9] = 2;
  data[10] = 0;
  data[11] = 0;
  data[12] = 0;
  return pngChunk("IHDR", data);
}

export function readPngIhdr(png: Uint8Array): { width: number; height: number } | null {
  if (png.length < 24) return null;
  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (png[i] !== PNG_SIGNATURE[i]) return null;
  }
  const width = ((png[16]! << 24) | (png[17]! << 16) | (png[18]! << 8) | png[19]!) >>> 0;
  const height = ((png[20]! << 24) | (png[21]! << 16) | (png[22]! << 8) | png[23]!) >>> 0;
  return { width, height };
}

export class StreamingPngEncoder {
  readonly width: number;
  readonly height: number;
  private rowsWritten = 0;
  private readonly writer: WritableStreamDefaultWriter<BufferSource>;
  private readonly compressed: Promise<Uint8Array[]>;

  constructor(width: number, height: number) {
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) {
      throw new Error("PNG dimensions must be positive integers");
    }
    if (typeof CompressionStream === "undefined") {
      throw new Error("CompressionStream is unavailable");
    }
    this.width = width;
    this.height = height;
    const stream = new CompressionStream("deflate");
    this.writer = stream.writable.getWriter();
    this.compressed = collectStream(stream.readable);
  }

  async writeFullWidthRgbaStrip(rgba: Uint8Array, stripHeight: number): Promise<void> {
    if (stripHeight < 1) return;
    if (this.rowsWritten + stripHeight > this.height) {
      throw new Error("PNG encoder received more rows than IHDR height");
    }
    const expected = this.width * stripHeight * 4;
    if (rgba.length < expected) {
      throw new Error("RGBA strip is shorter than width × height");
    }
    const rowRgb = new Uint8Array(1 + this.width * 3);
    rowRgb[0] = 0;
    for (let y = 0; y < stripHeight; y++) {
      const rgbaOff = y * this.width * 4;
      let o = 1;
      for (let x = 0; x < this.width; x++) {
        const i = rgbaOff + x * 4;
        rowRgb[o++] = rgba[i]!;
        rowRgb[o++] = rgba[i + 1]!;
        rowRgb[o++] = rgba[i + 2]!;
      }
      await this.writer.write(rowRgb);
    }
    this.rowsWritten += stripHeight;
  }

  async finish(): Promise<Uint8Array> {
    if (this.rowsWritten !== this.height) {
      throw new Error("PNG encoder finished before all rows were written");
    }
    await this.writer.close();
    const idat = concatBytes(await this.compressed);
    return concatBytes([
      PNG_SIGNATURE,
      ihdrChunk(this.width, this.height),
      pngChunk("IDAT", idat),
      pngChunk("IEND", new Uint8Array(0)),
    ]);
  }
}

async function collectStream(readable: ReadableStream<Uint8Array>): Promise<Uint8Array[]> {
  const chunks: Uint8Array[] = [];
  const reader = readable.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value.slice());
  }
  return chunks;
}
