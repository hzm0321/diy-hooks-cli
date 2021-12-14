import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/diy-hooks',
  publicPath: '/diy-hooks/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  resolve: {
    includes: ['docs'],
  },
  title: 'diy-hooks',
  favicon: './logo.svg',
  logo: './logo.svg',
  outputPath: 'docs-dist',
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  theme: {
    '@primary-color': '#0840f8',
    '@c-primary': '#0840f8',
  },
  // more config: https://d.umijs.org/config
});
