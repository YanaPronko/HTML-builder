
const { readdir, mkdir } = require("fs/promises");
const {createReadStream, createWriteStream} = require("fs");
const path = require("path");
const { pipeline } = require("stream");

const srcPath = path.join(__dirname, "files");
const targetPath = path.join(__dirname, "files-copy");

async function createFolder() {
  try {
    const createDir = await mkdir(targetPath, { recursive: true });
    console.log(`created ${createDir}`);
  } catch (err) {
    console.error(err.message);
  }
}
createFolder();

async function copyFolder(sourcePath, targetPath) {
  try {
    const sourceFilesArr = await readdir(sourcePath);
    const sourceFilePathArr = sourceFilesArr.map((item) => path.join(sourcePath, item));
    for (let filePath of sourceFilePathArr) {
      const input = createReadStream(filePath);
      const pathToCopyFile = path.join(targetPath, path.basename(filePath));
      const output = createWriteStream(pathToCopyFile);
      // input.pipe(output);
      pipeline(input, output, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    }
  } catch(err) {
    console.log(err.message);
  }
}
copyFolder(srcPath, targetPath);