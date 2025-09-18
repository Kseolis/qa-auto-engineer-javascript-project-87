#!/usr/bin/env node

import { program } from 'commander';

program
  .usage('[options] <filepath1> <filepath2>')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);

const { format, output } = program.opts();