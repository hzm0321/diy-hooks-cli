## 介绍

这是使用 `diy-hooks-cli` 创建的自定义 React Hooks 库模板项目。

## 技术栈

- 文档库：[dumi](https://d.umijs.org/)
- 打包构建：[rollup](https://rollupjs.org/)
- 测试用例：[jest](https://jestjs.io/) + [@testing-library/react-hooks](https://react-hooks-testing-library.com/)

## 目录结构

```
    |-- .github
    |   |-- workflows                  // github ci
    |-- assets                         // 静态资源
    |-- docs                           // 文档编写目录
    |-- public                         // 可访问的静态资源地址
    |-- src
        |-- index.ts                   // 导出 hooks 使得编写的时候可以直接被全局引用
        |-- hooks                      // 此目录用于打包发布
            |-- src
                |-- index.ts           // 导出发布的 hooks
                |-- useMount
                    |-- index.ts       // 此 hooks 源码
                    |-- demo           // 案例演示，会被 docs 文件夹引用
                    |-- __tests__      // 此 hooks 测试用例

```

`如若改变目录结构，可参考 dumi 文档`

## 安装

```shell
$ yarn install
# or
$ npm install
```

## 启动

```shell
$ yarn start # 以开发模式本地启动
```
