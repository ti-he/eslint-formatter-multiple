const { writeFileSync } = require("fs");
const { dirname, resolve } = require("path");
const { sync: mkdirp } = require("mkdirp");
const { ESLint } = require("eslint");

const eslint = new ESLint();

module.exports = async function (results) {
  const config = JSON.parse(process.env.ESLINT_MULTI_FORMATTER_CONFIG);

  if (!config) {
    console.error("Unable to find a config for eslint-formatter-multiple.");
    return false;
  }

  for (const formatterConfig of config.formatters || []) {
    const formatter = await eslint.loadFormatter(formatterConfig.name);
    const formatterResult = formatter.format(results);
    if (formatterConfig.output === "console") {
      console.log(formatterResult);
    } else if (formatterConfig.output === "file") {
      const filePath = resolve(process.cwd(), formatterConfig.path);
      try {
        mkdirp(dirname(filePath));
        writeFileSync(filePath, formatterResult);
      } catch (ex) {
        console.error("There was a problem writing the output file:\n%s", ex);
        return false;
      }
    }
  }
};
