const { readdir, stat, copyFile } = require("fs/promises");
const { createReadStream, createWriteStream } = require("fs");
const path = require("path");
const { pipeline } = require('stream/promises');

const srcPath = path.join(__dirname, "styles");
const targetPath = path.join(__dirname, "project-dist", "bundle.css");

async function mergeStyles(sourcePath, targetPath) {
  try {
    const sourceFilesArr = await readdir(sourcePath, );
    const sourceFilePathArr = sourceFilesArr.map((item) =>
      path.join(sourcePath, item)
    );
    let onlyFiles = [];
    for (let pathFile of sourceFilePathArr) {
      const fileStat = await stat(pathFile);
      if (fileStat.isFile()) {
        onlyFiles.push(pathFile);
      }
    }
  const sourceCssPathArr = onlyFiles.filter((item) => path.extname(item) === ".css");


    for (let filePath of sourceCssPathArr) {
      const input = createReadStream(filePath);
      const output = createWriteStream(targetPath, {flags: "a"});
      await pipeline(input, output, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}
mergeStyles(srcPath, targetPath);