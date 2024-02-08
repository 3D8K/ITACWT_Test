import { useAsyncDebounce } from "react-table";

interface FilterProps {
  column: {
    filterValue: string | number;
    setFilter: (value?: string | number) => void;
  };
}

export function Filter({ column: { filterValue, setFilter } }: FilterProps) {
  const onChange = useAsyncDebounce((value: string) => {
    setFilter(value || undefined);
  }, 100);

  return (
    <input
      value={filterValue || ""}
      className="rounded px-1 text-slate-500 font-normal"
      onChange={(e) => {
        onChange(e.target.value.toLocaleLowerCase());
      }}
      placeholder={`Search`}
    />
  );
}
