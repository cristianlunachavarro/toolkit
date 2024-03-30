const express = require("express");
const cors = require("cors");
const { listFormattedFiles, listRawFiles } = require("./controllers");

const app = express();
const port = 3000;

app.use(cors());

app.get("/files/data/:fileName", listFormattedFiles);
app.get("/files/data", listFormattedFiles);
app.get("/files/list", listRawFiles);

app.listen(port, () => {
  console.log(`Conected to por ${port}`);
});

module.exports = app;
