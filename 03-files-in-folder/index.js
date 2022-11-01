const fs = require("fs");
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

// ВОПРОС - как получіть результат наружу, а не в цікле


