import { TableColumns } from "@/constants";
import { ITableRow } from "@/types";
import { useState, useEffect } from "react";
import { useModal } from ".";

interface Props {
  defaultValues: ITableRow;
  onSave: (data: ITableRow) => void;
}

export const EditModal: React.FC<Props> = ({ defaultValues, onSave }) => {
  const [formData, setFormData] = useState<ITableRow>(defaultValues);
  const [error, setError] = useState<string | null>(null);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const { closeModal } = useModal();

  useEffect(() => {
    const isDirty = Object.entries(formData).some(([key, value]) => {
      return defaultValues[key as keyof ITableRow] !== value;
    });
    setIsFormDirty(isDirty);
  }, [formData, defaultValues]);

  const handleInputChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({
        ...prevState,
        [key]: e.target.value,
      }));
    };

  const saveHandler = () => {
    const isEmpty = Object.values(formData).some((value) => value === "");
    if (isEmpty) {
      setError("All fields must be filled");
    } else {
      setError(null);
      onSave(formData);
      closeModal();
    }
  };

  return (
    <div className="w-96 min-h-40 pt-4 flex justify-center items-center flex-col gap-5">
      {TableColumns.filter((column) => column.editable).map((column) => (
        <div key={column.accessor} className="flex flex-col w-full">
          <label className="mb-2 text-gray-500">{column.Header}</label>
          <input
            id={column.accessor.toLowerCase()}
            type="text"
            value={formData[column.accessor.toLowerCase() as keyof ITableRow]}
            onChange={handleInputChange(column.Header.toLowerCase())}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      ))}
      {error && <div className="text-red-500">{error}</div>}
      <button
        onClick={saveHandler}
        className={`${
          isFormDirty ? "bg-slate-400" : "bg-gray-300"
        } text-white px-6 py-2 rounded-lg max-w-fit`}
        disabled={!isFormDirty}
      >
        Save
      </button>
    </div>
  );
};
