import React from "react";
import { renderHook, act } from "@testing-library/react";
import { UserProvider, useUserContext } from "./UserContext";
import type { User } from "../types/user";

describe("UserContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <UserProvider>{children}</UserProvider>
  );

  it("deve lançar erro se usado fora do provider", () => {
    expect(() => renderHook(() => useUserContext())).toThrow(
      "useUserContext must be used within UserProvider",
    );
  });

  it("deve atualizar o username", () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    act(() => {
      result.current.setUsername("Karina");
    });

    expect(result.current.username).toBe("Karina");
  });

  it("deve adicionar um cliente na seleção", () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    const client: User = {
      id: 1,
      name: "Alice",
      salary: 2000,
      companyValuation: 10000,
    };

    act(() => {
      result.current.addClientToSelection(client);
    });

    expect(result.current.selectedClients).toHaveLength(1);
    expect(result.current.selectedClients[0].name).toBe("Alice");
  });

  it("não deve adicionar o mesmo cliente duas vezes", () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    const client: User = {
      id: 1,
      name: "Alice",
      salary: 2000,
      companyValuation: 10000,
    };

    act(() => {
      result.current.addClientToSelection(client);
      result.current.addClientToSelection(client);
    });

    expect(result.current.selectedClients).toHaveLength(1);
  });

  it("deve remover um cliente pelo id", () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    const client1: User = {
      id: 1,
      name: "Alice",
      salary: 2000,
      companyValuation: 10000,
    };
    const client2: User = {
      id: 2,
      name: "Bob",
      salary: 3000,
      companyValuation: 20000,
    };

    act(() => {
      result.current.addClientToSelection(client1);
      result.current.addClientToSelection(client2);
    });

    act(() => {
      result.current.removeClientFromSelection(1);
    });

    expect(result.current.selectedClients).toHaveLength(1);
    expect(result.current.selectedClients[0].id).toBe(2);
  });

  it("deve limpar toda a seleção", () => {
    const { result } = renderHook(() => useUserContext(), { wrapper });

    const client: User = {
      id: 1,
      name: "Alice",
      salary: 2000,
      companyValuation: 10000,
    };

    act(() => {
      result.current.addClientToSelection(client);
    });

    expect(result.current.selectedClients).toHaveLength(1);

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selectedClients).toHaveLength(0);
  });
});
