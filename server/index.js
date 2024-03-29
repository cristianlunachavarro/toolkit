import express from "express";
import { listFormattedFiles, listRawFiles } from "./controllers/index.js";
const app = express();
const port = 3000;

app.get("/files/data", listFormattedFiles);
app.get("/files/list", listRawFiles);

app.listen(port);
