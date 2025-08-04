/** @format */
// app\(authenticated)\webgputest\WebGPUTest.tsx
"use client";
import cellShader from "./cell.wgsl";
import React, { useEffect, useState, useRef } from "react";
import useWebGPUInfo from "@/hooks/useWebGPUInfo";
import useGPUInfo from "@/hooks/useGPUInfo";

const GRID_SIZE = 64;
// const GRID_SIZE = 8192;
// const GRID_SIZE = 16384;

export default function WebGPUTest() {
    const { supported, adapterName, adapter, loading, error } = useWebGPUInfo();
    const { name } = useGPUInfo();
    const [device, setDevice] = useState<GPUDevice | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Once we have an adapter, request a device
    useEffect(() => {
        if (adapter && !device) {
            adapter
                .requestDevice()
                .then(setDevice)
                .catch((err) =>
                    console.error("Failed to create GPUDevice:", err)
                );
        }
    }, [adapter, device]);

    // When device is ready, configure canvas & do a clear pass
    useEffect(() => {
        if (!device || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("webgpu");
        if (!ctx) {
            console.error("Failed to get WebGPU context");
            return;
        }

        const format = navigator.gpu.getPreferredCanvasFormat();
        ctx.configure({ device, format });

        const encoder = device.createCommandEncoder();

        // Explicitly typed to satisfy GPURenderPassColorAttachment
        const colorAttachment: GPURenderPassColorAttachment = {
            view: ctx.getCurrentTexture().createView(),
            clearValue: [0, 0.5, 0.7, 1],
            loadOp: "clear",
            storeOp: "store",
        };

        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [colorAttachment],
        };

        const vertices = new Float32Array([
            //   X,    Y,
            -0.8,
            -0.8, // Triangle 1 (Blue)
            0.8,
            -0.8,
            0.8,
            0.8,

            -0.8,
            -0.8, // Triangle 2 (Red)
            0.8,
            0.8,
            -0.8,
            0.8,
        ]);

        const vertexBuffer = device.createBuffer({
            label: "Cell vertices",
            size: vertices.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });

        device.queue.writeBuffer(vertexBuffer, /*bufferOffset=*/ 0, vertices);

        const vertexBufferLayout: GPUVertexBufferLayout = {
            arrayStride: vertices.BYTES_PER_ELEMENT * 2,
            attributes: [
                {
                    shaderLocation: 0,
                    offset: 0,
                    format: "float32x2", // TS now knows this is GPUVertexFormat
                } as GPUVertexAttribute, // make sure TS treats it as the correct interface
            ],
        };

        const cellShaderModule = device.createShaderModule({
            label: "Cell shader",
            code: cellShader,
        });

        const cellPipeline = device.createRenderPipeline({
            label: "Cell pipeline",
            layout: "auto",
            vertex: {
                module: cellShaderModule,
                entryPoint: "vertexMain",
                buffers: [vertexBufferLayout],
            },
            fragment: {
                module: cellShaderModule,
                entryPoint: "fragmentMain",
                targets: [
                    {
                        format: format,
                    },
                ],
            },
        });

        // Create a uniform buffer that describes the grid.
        const uniformArray = new Float32Array([GRID_SIZE, GRID_SIZE]);
        const uniformBuffer = device.createBuffer({
            label: "Grid Uniforms",
            size: uniformArray.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        device.queue.writeBuffer(uniformBuffer, 0, uniformArray);

        const bindGroup = device.createBindGroup({
            label: "Cell renderer bind group",
            layout: cellPipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: { buffer: uniformBuffer },
                },
            ],
        });

        const pass = encoder.beginRenderPass(renderPassDescriptor);
        pass.setPipeline(cellPipeline);
        pass.setVertexBuffer(0, vertexBuffer);
        pass.setBindGroup(0, bindGroup); // New line!
        pass.draw(vertices.length / 2, GRID_SIZE * GRID_SIZE);
        pass.end();
        device.queue.submit([encoder.finish()]);
    }, [device]);

    if (loading) return <div>Loading WebGPU info…</div>;
    if (error) return <div>Error detecting WebGPU support</div>;
    if (!supported) return <div>WebGPU not supported</div>;

    return (
        <div>
            <div>WebGPU Test — {name}</div>
            <canvas
                ref={canvasRef}
                width={512}
                height={512}
            />
        </div>
    );
}
