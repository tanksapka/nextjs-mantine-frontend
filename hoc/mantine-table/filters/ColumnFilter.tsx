import { HeaderGroup } from "react-table";

export default function ColumnFilter({ column }: { column: HeaderGroup<object> }): JSX.Element {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search: <input value={filterValue || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  );
}
