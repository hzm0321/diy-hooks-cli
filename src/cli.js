import { program } from 'commander';

import pkg from '../package.json'
import createProject from "./create";
import createHook from "./hook";

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

  // 按组插入一个 hook
  program
    .command('hook')
    .description('create a new hook')
    .argument('<name>', 'the name of the hook')
    .argument('<group>', 'the group of the hook')
    .action((name, group) => {
      createHook(name, group);
    })

  program.parse(args);
}
