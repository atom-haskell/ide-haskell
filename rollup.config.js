import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import builtins from 'builtin-modules'

const extensions = ['.js', '.ts', '.tsx']

const plugins = [
  typescript({
    target: 'esnext',
  }),
  babel({
    extensions,
    babelHelpers: 'bundled',
    presets: [
      [
        '@babel/preset-env',
        {
          debug: true,
          targets: { electron: '4.2.7' },
          useBuiltIns: false,
        },
      ],
    ],
  }),
  resolve({ extensions, preferBuiltins: true }),
  commonjs({ extensions }),
  terser({
    ecma: 2017,
    warnings: true,
    output: {
      comments: false,
    },
  }),
]
export default [
  {
    input: 'src/ide-haskell.ts',
    output: [
      {
        file: 'dist/main.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    // loaded externally
    external: ['atom', 'atom-haskell-utils', ...builtins],
    plugins: plugins,
  },
]
