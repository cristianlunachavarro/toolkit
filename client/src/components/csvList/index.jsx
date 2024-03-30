import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCsvList } from "../../api/csvApi";

const CsvList = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.csvList.list);

  useEffect(() => {
    dispatch(getCsvList());
  }, []);

  let index = 0;

  return (
    <div className="m-5">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="col-2">File Name</th>
            <th className="col-2">Text</th>
            <th className="col-2">Number</th>
            <th className="col-6">Hex</th>
          </tr>
        </thead>
        <tbody className="table-group-divider ">
          {list &&
            list.map((ele) =>
              ele.lines.map((line) => {
                index++;
                return (
                  <tr key={index}>
                    <td>{ele.file}</td>
                    <td>{line.text}</td>
                    <td>{line.number}</td>
                    <td>{line.hex}</td>
                  </tr>
                );
              })
            )}
        </tbody>
      </table>
    </div>
  );
};

export default CsvList;
