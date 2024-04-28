# eslint-formatter-multiple

A meta formatter for eslint that will output to multiple formats

## Install

`npm install --save-dev https://github.com/ti-he/eslint-formatter-multiple.git`

`yarn add --dev https://github.com/ti-he/eslint-formatter-multiple.git`

## Usage

Define a stringified env variable called `ESLINT_MULTI_FORMATTER_CONFIG`

```
  "eslint-formatter-multiple": {
    "formatters": [
      {
        "name": "stylish",
        "output": "console"
      },
      {
        "name": "checkstyle",
        "output": "file",
        "path": "eslint-checkstyle.xml"
      }
    ]
  }
```

Finally, add the `--format eslint-formatter-multiple` when calling the `eslint` command.
