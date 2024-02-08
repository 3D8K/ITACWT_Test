import { CSSProperties } from "react";
import { ITableRow } from "@/types";
import { useModal, EditModal } from "@/components";
import { Row as TRow } from "react-table";

export interface IRowProps {
  style: CSSProperties;
  row: TRow<any>;
  handler: (record: ITableRow) => void;
}

export const Row = ({ row, style, handler }: IRowProps) => {
  const { openModal } = useModal();
  const { id } = row.original;

  const EditButton = () => {
    return (
      <button
        className="bg-slate-200 px-3 py-1 rounded-xl m-auto transition-colors 
      hover:bg-slate-300 text-gray-500"
        onClick={() =>
          openModal(<EditModal defaultValues={row.original} onSave={handler} />)
        }
      >
        Edit
      </button>
    );
  };

  return (
    <tr
      className={`flex w-full even:bg-slate-100 odd:bg-white`}
      style={style}
      key={id}
    >
      {row.cells.map((cell) =>
        cell.column.id !== "editable" ? (
          <td {...cell.getCellProps()} className={cell.column.style}>
            {" "}
            {cell.render("Cell")}
          </td>
        ) : null
      )}
      <td className="flex justify-center w-1/12">{<EditButton />}</td>
    </tr>
  );
};
