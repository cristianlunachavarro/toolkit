import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getCsvList } from "../../api/csvApi";

const SearchInput = () => {
  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState("");
  const [cleanText, setCleanText] = useState(false);

  const handleTextInput = (e) => {
    const value = e.target.value;
    setTextInput(value);
  };

  const handleResetTextInput = () => {
    setCleanText(true);
    setTextInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = useCallback(() => {
    dispatch(getCsvList(textInput));
  }, [textInput, dispatch]);

  useEffect(() => {
    if (cleanText) {
      dispatch(getCsvList());
    }
    setCleanText(false);
  }, [cleanText, dispatch, handleSubmit]);

  return (
    <div className="input-group mx-auto w-75 mt-5">
      <input
        value={textInput}
        type="text"
        className="form-control"
        placeholder="Escriba el nombre del archivo"
        onChange={handleTextInput}
        onKeyDown={handleKeyPress}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={handleSubmit}
      >
        Enviar
      </button>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={handleResetTextInput}
      >
        Reset
      </button>
    </div>
  );
};

export default SearchInput;
