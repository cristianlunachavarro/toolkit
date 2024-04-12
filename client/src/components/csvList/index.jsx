import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCsvList } from "../../api/csvApi/index.js";

const CsvList = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.csvList.list);

  const sortedList = [...list].sort((a, b) => {
    const fileANum = parseInt(a.file.match(/\d+/));
    const fileBNum = parseInt(b.file.match(/\d+/));
    if (isNaN(fileANum) && isNaN(fileBNum)) {
      return a.file.localeCompare(b.file);
    }
    if (isNaN(fileANum)) return 1;
    if (isNaN(fileBNum)) return -1;
    return fileANum - fileBNum;
  });

  const hasLines = useMemo(() => {
    return list.some((l) => l?.lines?.length > 0);
  });
  useEffect(() => {
    dispatch(getCsvList());
  }, []);

  if (list.length === 0)
    return (
      <div className="m-5" data-testid="csv-list">
        <div
          className="alert alert-light"
          role="alert"
          data-testid="data-mensaje-noexiste"
        >
          No existen archivos con ese nombre
        </div>
      </div>
    );
  if (!hasLines)
    return (
      <div className="m-5" data-testid="csv-list">
        <div
          className="alert alert-light"
          role="alert"
          data-testid="data-mensaje-sinlineas"
        >
          Este archivo no tiene lineas o esta dañado
        </div>
      </div>
    );

  return (
    <div className="m-5" data-testid="csv-list">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="col-2">File Name</th>
            <th className="col-2">Text</th>
            <th className="col-2">Number</th>
            <th className="col-6">Hex</th>
          </tr>
        </thead>
        <tbody className="table-group-divider" data-testid="csv-list-elements">
          {sortedList &&
            sortedList.map((ele) =>
              ele.lines.map((line, idx) => {
                return (
                  <tr key={`${ele}-${idx}`}>
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
