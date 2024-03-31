const fetch = require("node-fetch");

const ENDPOINTS = {
  LIST: "https://echo-serv.tbxnet.com/v1/secret/files",
  INSTANCE: (name) => `https://echo-serv.tbxnet.com/v1/secret/file/${name}`,
};
const token = "Bearer aSuperSecretKey";

const processFileByName = (name) => {
  const route = ENDPOINTS.INSTANCE(name);
  return fetch(route, {
    headers: {
      authorization: token,
    },
  })
    .then((file) => file.text())
    .then((data) => {
      const response = {
        file: name,
        lines: [],
      };
      const lines = data.split("\n");
      for (let i = 0; i < lines.length; i++) {
        try {
          const [, text, number, hex] = lines[i].split(",");
          if (
            lines[i].includes('"status":404') ||
            lines[i].includes('"status":500')
          )
            break;
          if (!text?.trim() || !number?.trim() || !hex?.trim()) continue;
          response.lines.push({ text, number, hex });
        } catch {
          continue;
        }
      }
      return response;
    })
    .catch((err) => {
      console.log(err);
      return {
        file: name,
        lines: [],
      };
    });
};

const getAllFiles = (processed = true, filename = undefined) => {
  return fetch(ENDPOINTS.LIST, {
    headers: {
      authorization: token,
    },
  })
    .then((resp) => resp.json())
    .then(async (data) => {
      if (processed) {
        const items = [];
        for (let i = 0; i < data.files.length; i++) {
          if (filename && filename !== data.files[i]) continue;
          items.push(await processFileByName(data.files[i]));
        }
        return items;
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

module.exports = {
  getAllFiles,
  ENDPOINTS,
  token,
};
