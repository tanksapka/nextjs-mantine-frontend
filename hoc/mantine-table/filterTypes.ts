import { IdType, Row } from "react-table";

function stringFilterFn(
  rows: Array<Row>,
  columnIds: Array<IdType<string>>,
  filter: { operator: string; value?: string | number | Date }
): Array<Row> {
  const id = columnIds[0];
  let result = [];
  const { operator = "cont", value } = filter;
  switch (operator) {
    case "start":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? String(rowValue).toLowerCase().startsWith(String(value).toLowerCase()) : false;
      });
      break;
    case "end":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? String(rowValue).toLowerCase().endsWith(String(value).toLowerCase()) : false;
      });
      break;
    case "eq":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? String(rowValue).toLowerCase() === String(value).toLowerCase() : false;
      });
      break;
    case "not_eq":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? String(rowValue).toLowerCase() !== String(value).toLowerCase() : true;
      });
      break;
    case "cont":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? String(rowValue).toLowerCase().includes(String(value).toLowerCase()) : false;
      });
      break;
    case "not_cont":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? !String(rowValue).toLowerCase().includes(String(value).toLowerCase()) : true;
      });
      break;
    default:
      result = rows;
      break;
  }
  return result;
}
stringFilterFn.autoRemove = (val: boolean) => !val;

function numberFilterFn(
  rows: Array<Row>,
  columnIds: Array<IdType<string>>,
  filter: { operator: string; value?: string | number | Date }
): Array<Row> {
  const id = columnIds[0];
  let result = [];
  const { operator = "eq", value } = filter;
  switch (operator) {
    case "eq":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? Number(rowValue) === Number(value) : false;
      });
      break;
    case "not_eq":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? Number(rowValue) !== Number(value) : true;
      });
      break;
    case "gt":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? Number(rowValue) > Number(value) : false;
      });
      break;
    case "gteq":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? Number(rowValue) >= Number(value) : false;
      });
      break;
    case "lt":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? Number(rowValue) < Number(value) : false;
      });
      break;
    case "lteq":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? Number(rowValue) <= Number(value) : false;
      });
      break;
    default:
      result = rows;
      break;
  }
  return result;
}
numberFilterFn.autoRemove = (val: boolean) => !val;

function dateFilterFn(
  rows: Array<Row>,
  columnIds: Array<IdType<string>>,
  filter: { operator: string; value?: string | number | Date }
): Array<Row> {
  const id = columnIds[0];
  let result = [];
  const { operator = "eq", value } = filter;
  switch (operator) {
    case "eq":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? new Date(rowValue) === value : false;
      });
      break;
    case "not_eq":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue ? new Date(rowValue) !== value : true;
      });
      break;
    case "gt":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue && !!value ? new Date(rowValue) > new Date(value) : false;
      });
      break;
    case "gteq":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue && !!value ? new Date(rowValue) >= new Date(value) : false;
      });
      break;
    case "lt":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue && !!value ? new Date(rowValue) < new Date(value) : false;
      });
      break;
    case "lteq":
      result = rows.filter((row) => {
        const rowValue = row.values[id];
        return !!rowValue && !!value ? new Date(rowValue) <= new Date(value) : false;
      });
      break;
    default:
      result = rows;
      break;
  }
  return result;
}
dateFilterFn.autoRemove = (val: boolean) => !val;

const filterObject = {
  stringFilter: stringFilterFn,
  numberFilter: numberFilterFn,
  dateFilter: dateFilterFn,
};

export default filterObject;
