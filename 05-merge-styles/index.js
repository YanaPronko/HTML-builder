// const { readdir, stat} = require("fs/promises");
const fs = require("fs");
const path = require("path");
// const { pipeline } = require("stream/promises");

/* const srcPath = path.join(__dirname, "styles");


async function mergeStyles(sourcePath) {
  try {
    const targetPath = path.join(__dirname, "project-dist", "bundle.css");
    const sourceFilesArr = await readdir(sourcePath,);
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
      const input = fs.createReadStream(filePath);
      const output = fs.createWriteStream(targetPath);
      console.log(output);
      await pipeline(input, output, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
}

mergeStyles(srcPath); */
const srcPath = path.join(__dirname, "styles");
const targetPath = path.join(__dirname, "project-dist", "bundle.css");
let output = fs.createWriteStream(targetPath);

fs.readdir(srcPath, {withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  }
  for (let filePath of files) {
    if (filePath.isFile() && path.extname(filePath.name) == ".css") {
      let  input = fs.createReadStream(path.join(srcPath, filePath.name), "utf-8")
      let data = "";
      input.on("data", (chunk) => output.write((data += chunk)));
    }
   }
});



