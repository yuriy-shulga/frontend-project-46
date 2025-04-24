import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import {
  describe, test, expect,
} from '@jest/globals'
import gendiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe('main functionality', () => {
  const stylishDiff = fs.readFileSync(getFixturePath('stylish.txt'), 'utf8')
  const plainDiff = fs.readFileSync(getFixturePath('plain.txt'), 'utf8')
  const jsonDiff = fs.readFileSync(getFixturePath('json.txt'), 'utf8')

  test.each([
    {
      filepath1: 'file1.json', filepath2: 'file2.json', format: 'stylish', expected: stylishDiff,
    },
    {
      filepath1: 'file1.yaml', filepath2: 'file2.yaml', format: 'stylish', expected: stylishDiff,
    },
    {
      filepath1: 'file1.yml', filepath2: 'file2.yml', format: 'stylish', expected: stylishDiff,
    },
    {
      filepath1: 'file1.json', filepath2: 'file2.json', format: 'plain', expected: plainDiff,
    },
    {
      filepath1: 'file1.yaml', filepath2: 'file2.yaml', format: 'plain', expected: plainDiff,
    },
    {
      filepath1: 'file1.yml', filepath2: 'file2.yml', format: 'plain', expected: plainDiff,
    },
    {
      filepath1: 'file1.json', filepath2: 'file2.json', format: 'json', expected: jsonDiff,
    },
    {
      filepath1: 'file1.yaml', filepath2: 'file2.yaml', format: 'json', expected: jsonDiff,
    },
    {
      filepath1: 'file1.yml', filepath2: 'file2.yml', format: 'json', expected: jsonDiff,
    },
  ])('$format format: $filepath1 $filepath2', ({
    filepath1, filepath2, format, expected,
  }) => {
    const file1 = getFixturePath(filepath1)
    const file2 = getFixturePath(filepath2)
    expect(gendiff(file1, file2, format)).toBe(expected)
  })
})

describe('borderline cases', () => {
  const json1 = getFixturePath('file1.json')
  const json2 = getFixturePath('file2.json')
  const stylishDiff = fs.readFileSync(getFixturePath('stylish.txt'), 'utf8')

  test('default format', () => {
    expect(gendiff(json1, json2)).toBe(stylishDiff)
  })

  test('wrong extension', () => {
    expect(() => gendiff(stylishDiff, json2, 'stylish')).toThrow()
  })

  test('wrong format', () => {
    expect(() => gendiff(json1, json2, 'style')).toThrow()
  })
})
