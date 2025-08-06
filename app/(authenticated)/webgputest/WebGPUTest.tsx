/** @format */
// WebGPUTest.tsx: Sets up WebGPU, loads the WGSL shader,
// and renders a GRID_SIZE × GRID_SIZE grid of colored cells.

"use client";

import cellShader from "./cell.wgsl";
import React, { useEffect, useState, useRef } from "react";
import useWebGPUInfo from "@/hooks/useWebGPUInfo";
import useGPUInfo from "@/hooks/useGPUInfo";

const GRID_SIZE = 64; // Number of columns and rows.

export default function WebGPUTest() {
    // Hook that detects WebGPU support and provides an adapter.
    // adapterName: human‐readable GPU name (not used below).
    const { supported, adapterName, adapter, loading, error } = useWebGPUInfo();
    const { name } = useGPUInfo(); // Browser‐reported GPU name.
    const [device, setDevice] = useState<GPUDevice | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 1) Once we have an adapter, request a GPUDevice.
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

    // 2) When device + canvas are ready, configure and draw.
    useEffect(() => {
        if (!device || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("webgpu");
        if (!ctx) {
            console.error("Failed to get WebGPU context");
            return;
        }

        // Configure the canvas with the GPUDevice and preferred format.
        const format = navigator.gpu.getPreferredCanvasFormat();
        ctx.configure({ device, format });

        // Prepare a single‐use render pass that clears the canvas.
        const colorAttachment: GPURenderPassColorAttachment = {
            view: ctx.getCurrentTexture().createView(),
            clearValue: [0, 0.5, 0.7, 1], // Background RGBA
            loadOp: "clear",
            storeOp: "store",
        };
        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [colorAttachment],
        };

        // Define vertices for one quad (two triangles).
        const vertices = new Float32Array([
            -0.8, -0.8, 0.8, -0.8, 0.8, 0.8, -0.8, -0.8, 0.8, 0.8, -0.8, 0.8,
        ]);

        // Create a GPU buffer for those vertices.
        const vertexBuffer = device.createBuffer({
            label: "Cell vertices",
            size: vertices.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        });
        device.queue.writeBuffer(vertexBuffer, 0, vertices);

        // Describe how the shader reads the vertex buffer.
        const vertexBufferLayout: GPUVertexBufferLayout = {
            arrayStride: vertices.BYTES_PER_ELEMENT * 2, // 2 floats per vertex
            attributes: [
                {
                    shaderLocation: 0, // @location(0) in WGSL
                    offset: 0,
                    format: "float32x2",
                } as GPUVertexAttribute,
            ],
        };

        // Compile the WGSL code into a GPUShaderModule.
        const cellShaderModule = device.createShaderModule({
            label: "Cell shader",
            code: cellShader,
        });

        // Create the render pipeline linking vertex + fragment stages.
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
                targets: [{ format }],
            },
        });

        // Create a uniform buffer holding (GRID_SIZE, GRID_SIZE).
        const uniformArray = new Float32Array([GRID_SIZE, GRID_SIZE]);
        const uniformBuffer = device.createBuffer({
            label: "Grid Uniforms",
            size: uniformArray.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });
        device.queue.writeBuffer(uniformBuffer, 0, uniformArray);

        // Bind that uniform buffer to @group(0) @binding(0) in the shader.
        const bindGroup = device.createBindGroup({
            layout: cellPipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: { buffer: uniformBuffer },
                },
            ],
        });

        // Encode commands: clear, set pipeline, draw, then submit.
        const encoder = device.createCommandEncoder();
        const pass = encoder.beginRenderPass(renderPassDescriptor);
        pass.setPipeline(cellPipeline);
        pass.setVertexBuffer(0, vertexBuffer);
        pass.setBindGroup(0, bindGroup);
        // Draw 6 vertices per instance, for GRID_SIZE² instances.
        pass.draw(vertices.length / 2, GRID_SIZE * GRID_SIZE);
        pass.end();
        device.queue.submit([encoder.finish()]);
    }, [device]);

    // Simple UI states while initializing.
    if (loading) return <div>Loading WebGPU info…</div>;
    if (error) return <div>Error detecting WebGPU support</div>;
    if (!supported) return <div>WebGPU not supported</div>;

    // Finally render the canvas and GPU name.
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
