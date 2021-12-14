import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import dts from 'rollup-plugin-dts';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import * as path from 'path';

const pathResolve = (...args) => path.resolve(...args);

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pathResolve('./', pkg.main),
        format: 'amd',
      },
      {
        file: pathResolve('./', pkg.module),
        format: 'es',
      },
    ],
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectory: '/node_modules',
        },
      }),
      json(),
      babel({
        exclude: 'node_modules/**', // 只转译我们的源代码
      }),
      commonjs(),
      typescript(),
    ],
  },
  {
    // 生成 .d.ts 类型声明文件
    input: './src/index.ts',
    output: [
      {
        file: pathResolve('./', pkg.types),
        format: 'cjs',
      },
      {
        file: pathResolve('./', './es/index.d.ts'),
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
];
