import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import * as api from "../api/users";
import type { User } from "../types/user";

type GetUsersResponse = {
  clients: User[];
  totalPages: number;
  currentPage: number;
};

type CreateUserPayload = {
  name: string;
  salary: number;
  companyValuation: number;
};

type UpdateUserPayload = CreateUserPayload & { id: number };

export function useUsers(page: number, limit = 16) {
  const queryClient = useQueryClient();

  const options: UseQueryOptions<GetUsersResponse, Error> = {
    queryKey: ["users", page, limit],
    queryFn: () => api.apiGetUsers(page, limit),
    placeholderData: (prev) => prev,
  };

  const usersQuery = useQuery<GetUsersResponse, Error>(options);

  const createMutation = useMutation<User, Error, CreateUserPayload>({
    mutationFn: (payload) => api.apiCreateUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Erro ao criar usuário:", error);
    },
  });

  const updateMutation = useMutation<User, Error, UpdateUserPayload>({
    mutationFn: (payload) => api.apiUpdateUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar usuário:", error);
    },
  });

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: (id) => api.apiDeleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Erro ao deletar usuário:", error);
    },
  });

  const deleteMany = async (ids: number[]) => {
    try {
      await Promise.all(
        ids.map(async (id) => {
          try {
            await api.apiDeleteUser(id);
          } catch (error) {
            console.error(`Erro ao deletar usuário ${id}:`, error);
          }
        }),
      );
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      console.error("Erro geral ao deletar múltiplos usuários:", error);
    }
  };

  const checkUserNameExists = async (name: string): Promise<boolean> => {
    return api.apiCheckUserNameExists(name);
  };

  return {
    usersQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    deleteMany,
    checkUserNameExists,
  };
}
