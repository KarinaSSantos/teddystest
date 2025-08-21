// useUsers.test.tsx
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUsers } from "./useUsers";
import * as api from "../api/users";
import type { User } from "../types/user";

jest.mock("../api/users", () => ({
  apiGetUsers: jest.fn(),
  apiCreateUser: jest.fn(),
  apiUpdateUser: jest.fn(),
  apiDeleteUser: jest.fn(),
  apiCheckUserNameExists: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useUsers hook", () => {
  const mockUsers: User[] = [
    { id: 1, name: "Alice", salary: 1000, companyValuation: 5000 },
    { id: 2, name: "Bob", salary: 2000, companyValuation: 10000 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar usuários corretamente", async () => {
    (api.apiGetUsers as jest.Mock).mockResolvedValue({
      clients: mockUsers,
      totalPages: 1,
      currentPage: 1,
    });

    const { result } = renderHook(() => useUsers(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.usersQuery.isSuccess).toBe(true));
    expect(result.current.usersQuery.data?.clients).toHaveLength(2);
    expect(api.apiGetUsers).toHaveBeenCalledWith(1, 16);
  });

  it("deve criar usuário e invalidar query", async () => {
    (api.apiCreateUser as jest.Mock).mockResolvedValue(mockUsers[0]);

    const { result } = renderHook(() => useUsers(1), {
      wrapper: createWrapper(),
    });

    await result.current.createMutation.mutateAsync({
      name: "Alice",
      salary: 1000,
      companyValuation: 5000,
    });

    expect(api.apiCreateUser).toHaveBeenCalled();
  });

  it("deve atualizar usuário", async () => {
    (api.apiUpdateUser as jest.Mock).mockResolvedValue(mockUsers[1]);

    const { result } = renderHook(() => useUsers(1), {
      wrapper: createWrapper(),
    });

    await result.current.updateMutation.mutateAsync({
      id: 2,
      name: "Bob",
      salary: 2000,
      companyValuation: 10000,
    });

    expect(api.apiUpdateUser).toHaveBeenCalledWith({
      id: 2,
      name: "Bob",
      salary: 2000,
      companyValuation: 10000,
    });
  });

  it("deve deletar usuário", async () => {
    (api.apiDeleteUser as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useUsers(1), {
      wrapper: createWrapper(),
    });

    await result.current.deleteMutation.mutateAsync(1);

    expect(api.apiDeleteUser).toHaveBeenCalledWith(1);
  });

  it("deve deletar múltiplos usuários", async () => {
    (api.apiDeleteUser as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useUsers(1), {
      wrapper: createWrapper(),
    });

    await result.current.deleteMany([1, 2]);

    expect(api.apiDeleteUser).toHaveBeenCalledTimes(2);
    expect(api.apiDeleteUser).toHaveBeenCalledWith(1);
    expect(api.apiDeleteUser).toHaveBeenCalledWith(2);
  });

  it("deve verificar se nome de usuário existe", async () => {
    (api.apiCheckUserNameExists as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useUsers(1), {
      wrapper: createWrapper(),
    });

    const exists = await result.current.checkUserNameExists("Alice");

    expect(exists).toBe(true);
    expect(api.apiCheckUserNameExists).toHaveBeenCalledWith("Alice");
  });
});
