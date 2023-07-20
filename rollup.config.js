// rollup.config.js
import vue from "rollup-plugin-vue";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
export default {
  input: "src/components/index.js", // Path to your entry file
  output: {
    file: "dist/bundle.js", // Output file path and name
    format: "umd",
    name: "MyLibrary", // Replace with your library name
    globals: {
      vue: "Vue", // Specify external dependencies
    },
  },
  external: ["vue"], // Specify external dependencies
  plugins: [
    vue({
      css: false,
      template: {
        isProduction: true, // Enable production mode for template compilation
      },
    }),
    terser(),
    postcss({
      plugins: [
        autoprefixer(), // Autoprefixer for vendor prefixes
        cssnano(), // CSS minification
      ],
      extract: true, // Extract CSS to a separate file
      minimize: true, // Enable minification
      sourceMap: true, // Generate source maps for CSS
      modules: false, // Enable CSS Modules
      autoModules: false,
    }),
    resolve({
      extensions: [".js", ".vue"], // Specify the file extensions to resolve
    }),
    commonjs(), // Enable CommonJS module import
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
      runtimeHelpers: true,
    }),
  ],
};
