// import axios from "axios";
const { getList, setLoader } = require("../../store/scvSlice");
const axios = require("axios");

export const getCsvList =
  (fileName = "") =>
  (dispatch) => {
    dispatch(setLoader({ error: true }));
    axios
      .get(`http://localhost:3000/files/data/${fileName && fileName}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .then((data) => {
        dispatch(getList({ list: data }));
        dispatch(setLoader({ error: false }));
      })
      .catch((error) => {
        dispatch(setLoader({ error: false }));
        console.error("Error fetching data:", error);
      });
  };

const exports = { getCsvList };

export default exports;
