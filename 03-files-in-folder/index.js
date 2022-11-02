/* const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "secret-folder");

fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    const filePathArr = files.map((file) => path.join(folderPath, file));
    let res = [];
    filePathArr.forEach((filePath) => {
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
           res.push(
            `${path.basename(filePath, path.extname(filePath))}`,
            `${path.extname(filePath)}`,
            `${stats.size}b`
           );
          console.log(res.join("-"));
        }
      });
    });
});
 */
// ВОПРОС - как получіть результат наружу, а не в цікле

const { readdir, stat } = require("fs/promises");
const path = require("path");

async function readFolder() {
  const folderPath = path.join(__dirname, "secret-folder");
  try {
    const filesArr = await readdir(folderPath);
    const filePathArr = filesArr.map((item) => path.join(folderPath, item));

    filePathArr.forEach(async filePath => {

      const filesStat = await stat(filePath);
      if (filesStat.isFile()) {
        const stringRes = `
        ${path.basename(filePath, path.extname(filePath))} - ${(path.extname(filePath)).slice(1)} - ${filesStat.size}b`;
        console.log(stringRes);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

readFolder();