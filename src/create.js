import fs from 'fs';
import path from 'path';
import ncp from 'ncp';
import chalk from 'chalk';
import figlet from 'figlet';
import { promisify } from 'util';
import Listr from 'listr';
import execa from 'execa';

const access = promisify(fs.access);
const copy = promisify(ncp);

/**
 * 复制文件
 * @returns {Promise<*>}
 * @param from
 * @param to
 */
async function copyTemplateFile(from, to) {
  return copy(from, to, {
    clobber: false, // 同名文件不覆盖
  });
}

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
    return Promise.reject(new Error('Failed to initialize git'));
  }

  // 目标文件地址
  const to = `${process.cwd()}/${name}`;

  // 任务列表
  const tasks = new Listr([
    {
      title: `Create ${name} library`,
      task: () => copyTemplateFile(from, to),
    },
    {
      title: 'Initialize git',
      task: () => initGit(to),
      enabled: () => extraOptions.git,
    }]);

  // 执行任务
  await tasks.run();

  // 成功
  console.log(chalk.blue(figlet.textSync('diy-hooks-cli', {
    horizontalLayout: 'full'
  })));
  console.log(chalk.green(`${name} installed successfully`))
  console.log(`%s ${name} && %s install`, chalk.green('cd'), chalk.green('yarn'));

  return true;
};
