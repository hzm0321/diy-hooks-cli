import { program } from 'commander';

import pkg from '../package.json'
import createProject from "./create";

export function cli(args) {

  // 版本
  program
    .version(pkg.version, '-v, -V, --version', 'output the current version');

  // 创建的命令
  let extraOptions = {
    git: false,
  }
  program
    .command('create')
    .option('-g, --git', 'git init', () => {
      extraOptions.git = true;
    })
    .description('create a new hooks library project')
    .argument('<name>', 'the name of the hooks library')
    .action((name) => {
      createProject(name, extraOptions);
    });

  program.parse(args);
}
