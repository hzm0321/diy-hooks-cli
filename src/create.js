import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import figlet from 'figlet';
import { promisify } from 'util';
import Listr from 'listr';
import execa from 'execa';
import { projectInstall} from "pkg-install";

import { copyFile } from "./utils";

const access = promisify(fs.access);

/**
 * git 初始化
 * @returns {Promise<never>}
 * @param cwd
 */
async function initGit(cwd) {
  const result = await execa('git', ['init'], {
    cwd,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
}

export default async function createProject(name, extraOptions) {
  // 拷贝文件地址
  const from = path.resolve(__dirname, '../templates/diy-hooks-template');

  // 验证目录是否存在
  try {
    await access(from, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  // 创建目标目录
  const result = await execa('mkdir', [name], {
    cwd: process.cwd(),
  });

  if (result.failed) {
    return Promise.reject(new Error('Failed to mkdir'));
  }

  // 目标文件地址
  const to = `${process.cwd()}/${name}`;

  // 任务列表
  const tasks = new Listr([
    {
      title: `Create ${name} library`,
      task: () => copyFile(from, to),
    },
    {
      title: 'Initialize git',
      task: () => initGit(to),
      enabled: () => extraOptions.git,
    },
    {
      title: 'Install dependencies',
      task: () => projectInstall({
        prefer: 'yarn',
        cwd: to,
      }),
      skip: ()=> !extraOptions.pkgInstall ? '默认跳过依赖安装': undefined,
    },
    ]);

  // 执行任务
  await tasks.run();

  // 成功
  console.log(chalk.blue(figlet.textSync('diy-hooks-cli', {
    horizontalLayout: 'full'
  })));
  console.log(chalk.green(`${name} installed success`))
  console.log(`%s ${name}`, chalk.green('cd'));
  if (!extraOptions.pkgInstall) {
    console.log(`%s install`,  chalk.green('yarn'));
  }
  console.log(`%s start`, chalk.green('yarn'));
  console.log('If you want to create a hook, you can execute the following instructions')
  console.log(`%s hook useMyFirstHook group`,  chalk.green('diy-hooks-cli'));
  return true;
};
