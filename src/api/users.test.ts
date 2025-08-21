import {
  apiCheckUserNameExists,
  apiGetUsers,
  apiCreateUser,
  apiGetUser,
  apiUpdateUser,
  apiDeleteUser,
} from "./users";
import { api } from "./axiosInstance";
import type { User } from "../types/user";

jest.mock("./axiosInstance", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("users API functions", () => {
  const mockUsers: User[] = [
    { id: 1, name: "Ricardo", salary: 1000, companyValuation: 5000 },
    { id: 2, name: "Bob", salary: 2000, companyValuation: 10000 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("apiCheckUserNameExists retorna true se usuário existe", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { clients: mockUsers, totalPages: 1 },
    });

    const exists = await apiCheckUserNameExists("Ricardo");
    expect(exists).toBe(true);
    expect(api.get).toHaveBeenCalledWith("/users?page=1&limit=100");
  });

  it("apiCheckUserNameExists retorna false se usuário não existe", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { clients: [], totalPages: 1 },
    });

    const exists = await apiCheckUserNameExists("charlie");
    expect(exists).toBe(false);
  });

  it("apiGetUsers retorna lista de usuários", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { clients: mockUsers, totalPages: 1, currentPage: 1 },
    });

    const res = await apiGetUsers(1, 5);
    expect(res.clients).toHaveLength(2);
    expect(api.get).toHaveBeenCalledWith("/users?page=1&limit=5");
  });

  it("apiCreateUser cria usuário", async () => {
    const payload = { name: "Charlie", salary: 3000, companyValuation: 15000 };
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: { id: 3, ...payload },
    });

    const res = await apiCreateUser(payload);
    expect(res.id).toBe(3);
    expect(api.post).toHaveBeenCalledWith("/users", payload);
  });

  it("apiGetUser retorna usuário pelo id", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockUsers[0] });

    const res = await apiGetUser(1);
    expect(res.name).toBe("Ricardo");
    expect(api.get).toHaveBeenCalledWith("/users/1");
  });

  it("apiUpdateUser atualiza usuário", async () => {
    const updatedUser = {
      id: 1,
      name: "Ricardo Updated",
      salary: 1200,
      companyValuation: 6000,
    };
    (api.patch as jest.Mock).mockResolvedValueOnce({ data: updatedUser });

    const res = await apiUpdateUser(updatedUser);
    expect(res.name).toBe("Ricardo Updated");
    expect(api.patch).toHaveBeenCalledWith("/users/1", {
      name: "Ricardo Updated",
      salary: 1200,
      companyValuation: 6000,
    });
  });

  it("apiDeleteUser deleta usuário", async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce(undefined);

    await apiDeleteUser(1);
    expect(api.delete).toHaveBeenCalledWith("/users/1");
  });
});
