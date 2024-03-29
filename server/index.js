const express = require("express");
const { listFormattedFiles, listRawFiles } = require("./controllers");

const app = express();
const port = 3000;

app.get("/files/data", listFormattedFiles);
app.get("/files/list", listRawFiles);

app.listen(port, () => {
  console.log("Conected to por 3000");
});

module.exports = app;
