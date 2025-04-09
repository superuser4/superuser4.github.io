import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: path.resolve('src/main.js'),
  output: {
    file: path.resolve('public/bundle.js'),
    format: 'iife', // immediately-invoked function expression — suitable for browsers
    name: 'app',
    sourcemap: true,
  },
  plugins: [
    svelte(),
    css({ output: 'public/styles.css' }), // This will bundle your CSS into a separate file
    resolve(),
    commonjs(),
  ]
};
