import { program } from 'commander';
import inquirer from "inquirer";

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
    pkgInstall: false,
  }
  program
    .command('create')
    .option('-g, --git', 'git init', () => {
      extraOptions.git = true;
    })
    .option('-i, --install', 'yarn install', () => {
      extraOptions.pkgInstall = true;
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
    .argument('[name]', 'the name of the hook')
    .argument('[group]', 'the group of the hook')
    .action(async (name, group) => {
      // 询问的问题
      const questions = [];
      let answer = { name, group };
      if (!name) {
        questions.push({
          type: 'input',
          name: 'name',
          message: 'Please enter the name of the hook',
          validate: (value)=>{
            if (value) {
              if (value.startsWith('use')) {
                return true;
              }
              return 'name should start with ‘use’'
            }
            return 'name cannot be empty';
          }
        });
      }

      if (!group) {
        questions.push({
          type: 'input',
          name: 'group',
          message: 'Please enter the group name of the hook',
          validate: (value)=>{
            return value ? true: 'group cannot be empty';
          }
        });
      }

      if (questions.length > 0) {
        const _answer = await inquirer.prompt(questions);
        answer = { ...answer, ..._answer };
      }
      createHook(answer);
    })

  program.parse(args);
}
