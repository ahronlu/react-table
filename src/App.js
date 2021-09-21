import { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";

export default function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await await (
        await fetch("https://restcountries.eu/rest/v2/all")
      ).json();
      setCountries(data);
    };
    getData();
  }, []);

  const data = useMemo(() => countries, [countries]);

  const columns = useMemo(
    () => [
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "capital",
        accessor: "capital",
      },
      {
        Header: "population",
        accessor: "population",
      },

      {
        Header: "area",
        accessor: "area",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
