import { CSSProperties } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column as TColumn } from "react-table";
import { useTable, useFilters } from "react-table";
import { FixedSizeList } from "react-window";
import { ITableRow } from "@/types";
import { IRowProps } from ".";

interface IVirtualTableProps {
  columns: TColumn[];
  row: ({ row, style, handler }: IRowProps) => JSX.Element;
  data: ITableRow[];
  style?: CSSProperties;
  handler: (record: ITableRow) => void;
}

export const VirtualTable = ({
  columns,
  style,
  data,
  row,
  handler,
}: IVirtualTableProps) => {
  const { getTableProps, getTableBodyProps, rows, headers, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useFilters
    );

  return (
    <div className="bg-white rounded-md overflow-clip shadow-sm" style={style}>
      <table className="text-left w-full" {...getTableProps()}>
        <thead className="bg-slate-300 flex text-blue-900 w-full p-2">
          <tr className="flex w-full mb-2 font-extrabold">
            {headers.map((column) => (
              <th {...column.getHeaderProps()} className={column.style}>
                {column.render("Header")}
                {column.id === "name" ? (
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                ) : (
                  ""
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className="bg-grey-light flex w-full text-slate-500"
          style={{ height: "70vh" }}
          {...getTableBodyProps()}
        >
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                itemSize={50}
                itemCount={rows.length}
                width={width}
                overscanCount={10}
                itemData={rows}
              >
                {({ index, style }) => {
                  const rawRow = rows[index];
                  prepareRow(rawRow);
                  return row({ row: rawRow, style, handler });
                }}
              </FixedSizeList>
            )}
          </AutoSizer>
        </tbody>
      </table>
    </div>
  );
};
