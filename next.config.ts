/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.wgsl$/i,
            type: "asset/source",
        });
        return config;
    },

    turbopack: {
        rules: {
            "*.wgsl": {
                loaders: ["raw-loader"],
                as: "*.js",
            },
        },
    },
};

export default nextConfig;
