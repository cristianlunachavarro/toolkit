import fetch from "node-fetch";

const ENDPOINTS = {
    LIST: "https://echo-serv.tbxnet.com/v1/secret/files",
    INSTANCE: (name) => `https://echo-serv.tbxnet.com/v1/secret/file/${name}`
}
const token = "Bearer aSuperSecretKey";

const processFileByName = (name) => {
    const route = ENDPOINTS.INSTANCE(name);
    console.log(route)
  return fetch(route, {
    headers: {
      authorization: token,
    },
  })
    .then(file => file.text())
    .then((data) => {
      const response = {
        file: name,
        lines: [],
      };
      const lines = data.split("\n");
      for (let i = 0; i < lines.length; i++) {
        try {
          const [, text, number, hex] = lines[i].split(",");
          if (!text?.trim() || !number?.trim() || !hex?.trim()) continue
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

export const getAllFiles = (processed = true) => {
  return fetch(ENDPOINTS.LIST, {
    headers: {
      authorization: token,
    },
  })
  .then(resp => resp.json())
  .then(async (data) => {
    if (processed) {
      const items = [];
      for (let i = 0; i < data.files.length; i++) {
        items.push(await processFileByName(data.files[i]));
      }
      return items;
    }

    return data;
  });
};
