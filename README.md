# gendiff

Compares two configuration files and shows a difference

[![Actions Status](https://github.com/yuriy-shulga/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/yuriy-shulga/frontend-project-46/actions)
[![Actions Status](https://github.com/yuriy-shulga/frontend-project-46/actions/workflows/tests.yml/badge.svg)](https://github.com/yuriy-shulga/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/b8d8637f857e413cc216/maintainability)](https://codeclimate.com/github/yuriy-shulga/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b8d8637f857e413cc216/test_coverage)](https://codeclimate.com/github/yuriy-shulga/frontend-project-46/test_coverage)

## Installation

```
git clone https://github.com/Yuriy-Shulga/brain-games.git
cd gendiff
npm ci
npm link
```

## What file formats are supported?
- JSON
- YAML
- YML

## Examples

```js
gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format
  -h, --help           display help for command
```
### Input
#### file1.json
```js
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```
#### file2.json
```js
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```
### Output
#### stylish format
```
gendiff file1.json file2.json --format stylish

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
#### plain format
```
gendiff file1.json file2.json --format plain

Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```
#### json format
```
gendiff file1.json file2.json --format json

[{"key":"follow","status":"removed","value":false},{"key":"host","status":"unchanged","value":"hexlet.io"},{"key":"proxy","status":"removed","value":"123.234.53.22"},{"key":"timeout","status":"modified","value":[50,20]},{"key":"verbose","status":"added","value":true}]
```
#### default format (stylish format)
```
gendiff file1.json file2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
### Nested structure
#### file1.json
```js
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}
```
#### file2.json
```js
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
}
```
### Output
#### stylish format
```
gendiff file1.json file2.json -f stylish

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```