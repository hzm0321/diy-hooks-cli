import arg from "arg";
import inquirer from "inquirer";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg({
      '--version': Boolean,
      '--site': Boolean,
      '-v': '--version',
      '-s': '--site'
    },
    {
      argv: rawArgs.slice(2)
    })

  return {
    ...args,
    operation: args._[0],
    name: args._[1],
  };
}

async function promptForMissingOptions(options) {
  let _options = { ...options };
  const { operation, name } = _options;

  const questions = [];
  // 执行创建操作
  if (operation === 'create') {
    if (!name) {
      console.log('请输入创建的工程名称')
      return false;
    }
    // 创建工程需要的参数
    if (_options['--site']) {
      _options.mode = 'site';
      delete (_options['--site']);
    } else {
      questions.push({
        type: 'list',
        name: 'mode',
        message: `请选择为 ${name} 创建的说明文档模式`,
        choices: ['doc', 'site'],
        default: 'doc',
      });
    }
    const answer = await inquirer.prompt(questions);
    _options = {
      ..._options,
      mode: _options.mode || answer.mode,
    }
  }

  return _options;
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options);
  if (options) {
    console.log(options);
  }
}