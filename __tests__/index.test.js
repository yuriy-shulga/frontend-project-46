import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('formatters', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  const yml1 = getFixturePath('file1.yml');
  const yml2 = getFixturePath('file2.yml');
  const yaml1 = getFixturePath('file1.yaml');
  const yaml2 = getFixturePath('file2.yaml');

  const stylishDiff = fs.readFileSync(getFixturePath('stylish.txt'), 'utf8');
  const plainDiff = fs.readFileSync(getFixturePath('plain.txt'), 'utf8');

  test('stylish', () => {
    expect(gendiff(json1, json2, 'stylish')).toBe(stylishDiff);
    expect(gendiff(yml1, yml2, 'stylish')).toBe(stylishDiff);
    expect(gendiff(yaml1, yaml2, 'stylish')).toBe(stylishDiff);
  });

  test('plain', () => {
    expect(gendiff(json1, json2, 'plain')).toBe(plainDiff);
    expect(gendiff(yml1, yml2, 'plain')).toBe(plainDiff);
    expect(gendiff(yaml1, yaml2, 'plain')).toBe(plainDiff);
  });
});
