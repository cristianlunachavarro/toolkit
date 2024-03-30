import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getCsvList } from "../../api/csvApi";

const SearchInput = () => {
  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState("");

  const handleTextInput = (e) => {
    const value = e.target.value;
    setTextInput(value);
  };

  const handleResetTextInput = () => {
    setTextInput("");
  };

  const handleSubmit = useCallback(() => {
    dispatch(getCsvList(textInput));
  }, [textInput, dispatch]);

  useEffect(() => {
    if (textInput === "") {
      handleSubmit();
    }
  }, [textInput, handleSubmit]);

  return (
    <div className="input-group mx-auto w-75 mt-5">
      <input
        value={textInput}
        type="text"
        className="form-control"
        placeholder="Recipient's username"
        aria-label="Recipient's username with two button addons"
        onChange={handleTextInput}
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
