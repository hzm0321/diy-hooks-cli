import { program } from 'commander';

import pkg from '../package.json'
import createProject from "./create";

export function cli(args) {

  // 版本
  program
    .version(pkg.version, '-v, -V, --version', 'output the current version');

  // 创建的命令
  program
    .command('create')
    .description('create a new hooks library project')
    .argument('<name>', 'the name of the hooks library')
    .action((name) => {
      createProject(name);
    });

  program.parse(args);
}
