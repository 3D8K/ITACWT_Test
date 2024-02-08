import { Filter } from "@/components";
import { Row as TRow } from "react-table";
import { convertDate } from "@/utils";

interface TableColumn {
  Header: string;
  accessor: string;
  style: string;
  Filter?: typeof Filter;
  editable: boolean;
  Cell?: ({ row }: { row: TRow<object> }) => JSX.Element;
}

export const TableColumns: TableColumn[] = [
  {
    Header: "Name",
    accessor: "name",
    style: "p-1 w-3/4 flex gap-2",
    Filter: Filter,
    editable: true,
  },
  {
    Header: "Status",
    accessor: "active",
    style: "p-1 w-1/6",
    editable: false,
    Cell: ({ row }) => <> {row.values.active ? "Active" : "Disabled"}</>,
  },
  {
    Header: "Created",
    accessor: "createdAt",
    style: "p-1 w-1/6",
    editable: false,
    Cell: ({ row }) => <>{convertDate(row.values.createdAt)}</>,
  },
  {
    Header: "Edit",
    accessor: "editable",
    style: "p-1 w-1/12",
    editable: false,
  },
];
