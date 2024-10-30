import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwind from "tailwindcss";

export default defineConfig({
  server: {
    port: 4445,
  },
  plugins: [pluginReact()],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwind],
      },
    },
  },
});
