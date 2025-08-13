import { api } from "./axiosInstance";
import type { User } from "../types/user";

type GetUsersResponse = {
  clients: User[];
  totalPages: number;
  currentPage: number;
};

export async function apiCheckUserNameExists(name: string): Promise<boolean> {
  const limit = 100; 
  let page = 1;
  while (true) {
    const response = await api.get<{ clients: User[]; totalPages: number }>(
      `/users?page=${page}&limit=${limit}`
    );
    const users = response.data.clients;
    if (users.some((u) => u.name.toLowerCase() === name.toLowerCase())) {
      return true; 
    }
    if (page >= response.data.totalPages) break;
    page++;
  }
  return false;
}

export async function apiGetUsers(
  page = 1,
  limit = 5
): Promise<GetUsersResponse> {
  const res = await api.get(`/users?page=${page}&limit=${limit}`);
  return res.data as GetUsersResponse;
}

export async function apiCreateUser(payload: {
  name: string;
  salary: number;
  companyValuation: number;
}): Promise<User> {
  const res = await api.post("/users", payload);
  return res.data as User;
}

export async function apiGetUser(id: number): Promise<User> {
  const res = await api.get(`/users/${id}`);
  return res.data as User;
}

export async function apiUpdateUser(u: {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
}): Promise<User> {
  const { id, name, salary, companyValuation } = u;
  const res = await api.patch(`/users/${id}`, {
    name,
    salary,
    companyValuation,
  });
  return res.data as User;
}

export async function apiDeleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}
