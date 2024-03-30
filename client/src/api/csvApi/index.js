import axios from "axios";
import { getList, setLoader } from "../../store/scvSlice";

export const getCsvList =
  (fileName = "") =>
  (dispatch) => {
    dispatch(setLoader({ error: true }));
    axios(`http://localhost:3000/files/data/${fileName ? fileName : ""}`, {
      method: "GET",
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
