import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('plain json', () => {
  const data1 = fs.readFileSync(`${getFixturePath('file1.json')}`, 'utf-8');
  const data2 = fs.readFileSync(`${getFixturePath('file2.json')}`, 'utf-8');
  const expected = fs.readFileSync(`${getFixturePath('resultPlain.txt')}`, 'utf-8');
  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);
  expect(gendiff(obj1, obj2)).toEqual(expected);
});
