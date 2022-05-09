import axios from "axios";
import { OrganizationsRawType } from "../types/organizations";

async function getOrganizations(page: number = 0, pageSize: number = 20): Promise<OrganizationsRawType> {
  const url = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
  const res = await axios.get(`${url}/organizations?page=${page}&page_size=${pageSize}`);
  return await res.data;
}

export { getOrganizations };
