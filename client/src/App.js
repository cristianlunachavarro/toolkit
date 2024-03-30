import "./App.css";

import CsvList from "./components/csvList";
import SearchInput from "./components/searchInput";
import Loader from "./components/loader";
import { useSelector } from "react-redux";

function App() {
  const error = useSelector((state) => state.csvList.error);

  return (
    <div className="m-2">
      <SearchInput />
      <CsvList />
      {error && <Loader />}
    </div>
  );
}

export default App;
