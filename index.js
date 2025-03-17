const FILE_PATH = "./data.json";
const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const moment = require("moment");

// Change the working directory to where your local repository is located
const git = simpleGit();

const makeCommit = (n) => {
  if (n === 0) {
    git.push(["-u", "origin", "master"], (err, result) => {
      if (err) {
        console.error("Error pushing to remote:", err);
      } else {
        console.log("Pushed changes to remote repository");
      }
    });
    return;
  }

  const x = Math.floor(Math.random() * 55); // 0 to 54
  const y = Math.floor(Math.random() * 7);  // 0 to 6
  const DATE = moment()
    .subtract(0, "y")
    .subtract(1, "d")
    .subtract(x, "w")
    .subtract(y, "d")
    .format();

  const data = { date: DATE };
  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, () => {
    git.add([FILE_PATH])
      .commit(DATE, { "--date": DATE })
      .push(["-u", "origin", "main"], (err, result) => {
        if (err) {
          console.error("Error pushing to remote:", err);
        } else {
          console.log("Pushed changes to remote repository");
          makeCommit(n - 1);
        }
      });
  });
};

makeCommit(120);
