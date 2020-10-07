import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/main.js",
  output: {
    file: "dist/leaflet-roughcanvas.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    getBabelOutputPlugin({
      presets: [
        [
          "@babel/preset-env",
          {
            modules: "umd",
            useBuiltIns: "usage",
            corejs: 3,
            targets: {
              ie: "11",
            },
          },
        ],
      ],
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          { useESModules: false, regenerator: true },
        ],
      ],
    }),
    terser(),
  ],
};
