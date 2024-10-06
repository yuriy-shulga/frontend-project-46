#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import gendiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const data1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
    const data2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
    const obj1 = JSON.parse(data1);
    const obj2 = JSON.parse(data2);
    console.log(gendiff(obj1, obj2));
  });

program.parse();
