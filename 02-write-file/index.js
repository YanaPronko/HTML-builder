const { stdin: input, stdout: output } = process;
const path = require("path");
const fs = require("fs");
const readline = require("readline");

fs.writeFile(path.join(__dirname, "answer.txt"), "", err => {
  if (err) {
    console.error(err.mesage);
  }
});

const rl = readline.createInterface({ input, output });
rl.question("Hello! Type some joke\n", (answer) => {
  fs.appendFile(
    path.join(__dirname, 'answer.txt'), `${answer + "\n"}`,
    err => {
      if (err) throw err;
       if (answer === "exit") {
         process.exit();
       }
      console.log('Файл был изменен');
    });
});
rl.on("line", line => {
  fs.appendFile(path.join(__dirname, "answer.txt"), `${line+"\n"}`, (err) => {
    if (err) throw err;
    if (line === "exit") {
      process.exit();
    }
    console.log("Файл был изменен");
  });
});

process.on('exit', () => {
  output.write('Удачи в изучении Node.js!');
  rl.close();
});
process.on("SIGINT", () => {
  output.write("Удачи в изучении Node.js!");
  rl.close();
});



