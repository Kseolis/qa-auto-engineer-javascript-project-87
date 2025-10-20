#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/diff.js';

program
  .name('gendiff')
  .usage('[options] <filepath1> <filepath2>')
  .version('1.0.1')
  .option('-f, --format <type>', 'output format (default: stylish)')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    try {
      const format = options?.format ?? 'stylish';
      const result = genDiff(filepath1, filepath2, format);

      console.log(result);
    }
    catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
