const { getAllFiles } = require("../utilities");

const listFormattedFiles = async (req, res) => {
  const query = req.params.fileName;
  const response = await getAllFiles(true, query);
  res.status(200).json(response);
};

const listRawFiles = async (req, res) => {
  const response = await getAllFiles(false);
  res.send(response);
};

module.exports = {
  listFormattedFiles,
  listRawFiles,
};
