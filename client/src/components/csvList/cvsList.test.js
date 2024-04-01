import { render, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CsvList from "./index";
import csvReducer from "../../store/scvSlice";

import axios from "axios";
jest.mock("axios");

describe("CsvList component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        csvList: csvReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  });

  test("renders CsvList component", async () => {
    const mockData = {
      data: [
        {
          file: "test1.csv",
          lines: [{ text: "text1", number: "1", hex: "#FFFFFF" }],
        },
      ],
    };
    axios.get.mockResolvedValue(mockData);
    let getByTestId;

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      const { getByTestId: getByTestIdInternal } = render(
        <Provider store={store}>
          <CsvList />
        </Provider>
      );
      getByTestId = getByTestIdInternal;
    });

    await waitFor(() => {
      const csvListComponent = getByTestId("csv-list");
      expect(csvListComponent).toBeInTheDocument();
    });

    await waitFor(() => {
      const csvListComponent = getByTestId("csv-list-elements");
      expect(csvListComponent).toBeInTheDocument();
    });

    await waitFor(() => {
      const csvListComponent = getByTestId("csv-list-elements");
      expect(csvListComponent.querySelectorAll("tr").length).toEqual(1);
    });

    await waitFor(() => {
      const csvListComponent = getByTestId("csv-list-elements");
      const columns = csvListComponent.querySelectorAll("td");
      const data = mockData.data[0];
      /* eslint-disable*/
      expect(columns[0].innerHTML).toEqual(data.file);
      expect(columns[1].innerHTML).toEqual(data.lines[0].text);
      expect(columns[2].innerHTML).toEqual(data.lines[0].number);
      expect(columns[3].innerHTML).toEqual(data.lines[0].hex);
      /*eslint-enable*/
    });
  });

  test("render archivo sin linea", async () => {
    const mockData = {
      data: [
        {
          file: "test1.csv",
          lines: [],
        },
      ],
    };
    axios.get.mockResolvedValue(mockData);
    let getByTestId;

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      const { getByTestId: getByTestIdInternal } = render(
        <Provider store={store}>
          <CsvList />
        </Provider>
      );
      getByTestId = getByTestIdInternal;
    });

    await waitFor(() => {
      const csvListComponent = getByTestId("csv-list");
      expect(csvListComponent).toBeInTheDocument();
    });

    await waitFor(() => {
      const csvListComponent = getByTestId("data-mensaje-sinlineas");
      expect(csvListComponent).toBeInTheDocument();
    });
  });

  test("render archivo no existe", async () => {
    const mockData = {
      data: [],
    };
    axios.get.mockResolvedValue(mockData);
    let getByTestId;

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      const { getByTestId: getByTestIdInternal } = render(
        <Provider store={store}>
          <CsvList />
        </Provider>
      );
      getByTestId = getByTestIdInternal;
    });

    await waitFor(() => {
      const csvListComponent = getByTestId("csv-list");
      expect(csvListComponent).toBeInTheDocument();
    });

    await waitFor(() => {
      const csvListComponent = getByTestId("data-mensaje-noexiste");
      expect(csvListComponent).toBeInTheDocument();
    });
  });
});
