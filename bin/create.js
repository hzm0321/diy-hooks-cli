#!/usr/bin/env node
require = require('esm')(module);

// 使用 require 去加载
require('../src/cli').cli(process.argv);
