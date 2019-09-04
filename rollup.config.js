import typescript from 'rollup-plugin-typescript2'

export default {
  input: './lib/index.ts',
  output: {
    file: './dist/index.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    typescript(),
  ]
}
