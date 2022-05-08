import axios from "axios";
import { PeopleRawType } from "../types/people";

async function getPeople(page: number = 0, pageSize: number = 20): Promise<PeopleRawType> {
  const url = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  const res = await axios.get(`${url}/people?page=${page}&page_size=${pageSize}`);
  return await res.data;
}

export { getPeople };
