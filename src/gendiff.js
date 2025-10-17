#!/usr/bin/env node

import { program } from 'commander';
import genDiff from './diff.js';

program
  .usage('[options] <filepath1> <filepath2>')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format (default: stylish)')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    const format = options?.format ?? 'stylish';
    genDiff(filepath1, filepath2, format);
  })
  .parse(process.argv);