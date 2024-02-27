const fs = require("fs-extra");

const folderCoppys = [
  {
    sourceDirectory: "views",
    targetDirectory: "dist/views",
  },
  {
    sourceDirectory: "public",
    targetDirectory: "dist/public",
  },
];

for (const item of folderCoppys) {
  fs.copy(item.sourceDirectory, item.targetDirectory, (err) => {
    if (err) {
      console.log("err");
    } else {
      console.log("coppy success");
    }
  });
}
