import fs from 'fs';
import path from 'path';
import ncp from 'ncp';
import chalk from 'chalk';
import figlet from 'figlet';
import { promisify } from 'util';
import Listr from 'listr';

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

export default async function createProject(name) {
  // 拷贝文件地址
  const from = path.resolve(__dirname, '../templates');
  // 目标文件地址
  const to = process.cwd();

  // 验证目录是否存在
  try {
    await access(from, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  // 任务列表
  const tasks = new Listr([
    {
      title: `create ${name} library`,
      task: () => copyTemplateFile(from, to),
    },
  ]);

  // 执行任务
  await tasks.run();

  // 成功
  console.log(chalk.blue(figlet.textSync(name, {
    horizontalLayout: 'full'
  })));

  return true;
};
