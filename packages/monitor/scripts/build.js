import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import eslint from '@rollup/plugin-eslint'
import json from '@rollup/plugin-json'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
      {
        file: pkg.browser,
        name: 'Monitor',
        format: 'umd',
      },
    ],
    plugins: [resolve(), commonjs(), json(), typescript(), eslint()],
  },
]
