import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('plain', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  const yaml1 = getFixturePath('file1.yml');
  const yaml2 = getFixturePath('file2.yml');
  const yml1 = getFixturePath('file1.yaml');
  const yml2 = getFixturePath('file2.yaml');

  const expected = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
  expect(gendiff(json1, json2)).toEqual(expected);
  expect(gendiff(yaml1, yaml2)).toEqual(expected);
  expect(gendiff(yml1, yml2)).toEqual(expected);
});
