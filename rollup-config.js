import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/main.js",
  output: [
    {
      file: "dist/leaflet-roughcanvas.js",
      format: "umd",
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      babelHelpers: "bundled",
      exclude: /node_modules/,
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            useBuiltIns: "usage",
            corejs: 3,
            targets: {
              ie: "11",
            },
          },
        ],
      ],
    }),
    terser(),
    commonjs(),
    nodeResolve({
      browser: true,
    }),
  ],
};
