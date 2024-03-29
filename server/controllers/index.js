import { getAllFiles } from "../utilities/index.js"

export const listFormattedFiles = async (req, res) => {
    const query = req.query.fileName
    const response = await getAllFiles(true, query)
    res.send(response)
}

export const listRawFiles = async (req, res) => {
    const response = await getAllFiles(false)
    res.send(response)
}

