<div align="center">
<h1>diy-hooks-cli</h1>
   <a href="https://www.npmjs.com/package/diy-hooks-cli">
      <img src="https://img.shields.io/npm/v/diy-hooks-cli.svg" alt="npm package" />
   </a>
   <a href="https://www.npmjs.com/package/diy-hooks-cli">
      <img src="https://img.shields.io/npm/dm/diy-hooks-cli.svg" alt="npm downloads" />
   </a>
   <a href="https://www.npmjs.com/package/diy-hooks-cli">
      <img src="https://img.shields.io/npm/l/diy-hooks-cli.svg" alt="npm downloads" />
   </a>
   <a href="https://github.com/hzm0321/diy-hooks-cli">
      <img src="https://img.shields.io/github/stars/hzm0321/diy-hooks-cli?style=social" alt="npm downloads" />
   </a>
</div>

## 介绍

`diy-hooks-cli` 是一个自定义 React Hooks 库脚手架。

## 快速开始

### 安装

```shell
$ npm install diy-hooks-cli -g
```

### 创建一个 hooks 库

```shell
$ diy-hooks-cli create your-hooks # 创建你的 hooks 库前端项目
$ cd your-hooks # 查看生成的前端工程
```

`注: 会在当前终端目录下以传入的 hooks 库名称, 生成一个文件夹`

### 添加一个自定义 hook

在生成的 `hooks 库项目根目录`下执行

```shell
$ diy-hooks-cli hook useYourHook group # 在 group 分组下创建 useYourHook
```

在 `docs/group/` 目录下会创建 `useYourHook.md` 文件  
在 `src/` 目录下会创建 `useYourHook` 文件夹, 并生成基础的自定义 hook 模板

## 指令

| 指令名称              | 说明                                           |
| --------------------- | ---------------------------------------------- |
| `create <name>`       | 创建 hooks 库前端工程                          |
| `hook <name> <group>` | 在对应分组下创建一个 hook                      |
| `-help -h`            | 查看帮助信息                                   |
| `-version -v`         | 查看当前版本                                   |
| `--git -g`            | 创建 hooks 库前端工程后, 执行初始化 `git` 操作 |
| `--install -i`        | 创建 hooks 库前端工程后, 使用 `yarn` 安装依赖  |
