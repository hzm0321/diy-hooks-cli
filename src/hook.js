import { promisify } from "util";
import fs from "fs";
import path from 'path';
import chalk from "chalk";
import execa from "execa";
import { copyFile } from "./utils";
import figlet from "figlet";
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";

const access = promisify(fs.access);

export default async function createHook(name, group) {
  try {
    // await createDocsGroup(name, group)
    // await createSrc(name);
    await addHookToIndex(name);
  } catch (e) {
    console.error(e)
  }
}

async function createDocsGroup(name, group) {
  // 判断当前目录下 docs 文件夹是否存在
  try {
    await access(path.resolve(process.cwd(), `./docs`), fs.constants.R_OK);
  } catch (err) {
    console.error('%s doc directory does not exist', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  // 判断 docs 目录下是否存在 group 名
  try {
    await access(path.resolve(process.cwd(), `./docs/${group}`), fs.constants.R_OK);
  } catch (err) {
    // 分组目录不存在默认创建
    // 创建目标目录
    const result = await execa('mkdir', [group], {
      cwd: `${process.cwd()}/docs`,
    });

    if (result.failed) {
      console.error('%s Failed to mkdir', chalk.red.bold('ERROR'));
      process.exit(1);
      return Promise.reject(new Error('Failed to mkdir'));
    }
  }

  // 新建文件
  const groupPath = `${process.cwd()}/docs/${group}`;
  const fileName = `${name}.md`;
  const hookResult = await execa('touch', [fileName], {
    cwd: groupPath,
  });

  if (hookResult.failed) {
    console.error('%s Failed to touch', chalk.red.bold('ERROR'));
    process.exit(1);
    return Promise.reject(new Error('Failed to touch'));
  }

  // 读取模板文件内容
  let data = fs.readFileSync(path.resolve(__dirname, '../templates/diy-hooks-template/docs/demo/useMount.md'), 'utf8');
  const regex = /useMount/g;
  data = data.replace(regex, name);

  // 写入文件
  fs.writeFileSync(`${groupPath}/${fileName}`, data);
}

async function createSrc(name) {
  // 新建文件
  const groupPath = `${process.cwd()}/src/hooks/src`;
  const groupResult = await execa('mkdir', [name], {
    cwd: groupPath,
  });

  if (groupResult.failed) {
    console.error('%s Failed to mkdir', chalk.red.bold('ERROR'));
    process.exit(1);
    return Promise.reject(new Error('Failed to mkdir'));
  }
  const from = path.resolve(__dirname, '../templates/diy-hooks-template/src/hooks/src/useMount');
  const to = `${groupPath}/${name}`;

  await copyFile(from, to)

  // 成功
  console.log(chalk.blue(figlet.textSync(name, {
    horizontalLayout: 'full'
  })));
  console.log(chalk.green(`${name} create successfully`))
}

async function addHookToIndex(name) {
  const from = path.resolve(__dirname, '../templates/diy-hooks-template/src/hooks/src/index.ts');
  // 读取模板文件内容
  let code = fs.readFileSync(from, 'utf8');

  const ast = parser.parse(code,{
    sourceType: "module",
  });
  traverse(ast, {
    enter(path) {
      console.log(path)
      if (
        path.node.type === "Identifier" &&
        path.node.name === "n"
      ) {
        path.node.name = "x";
      }
    }
  });
}
