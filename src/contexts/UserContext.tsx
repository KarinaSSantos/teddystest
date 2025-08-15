import React, { createContext, useContext, useState } from "react";
import type { User } from "../types/user";

interface UserContextProps {
  username: string;
  setUsername: (name: string) => void;
  selectedClients: User[];
  addClientToSelection: (client: User) => void;
  removeClientFromSelection: (id: number) => void;
  clearSelection: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState("");
  const [selectedClients, setSelectedClients] = useState<User[]>([]);

  const addClientToSelection = (client: User) => {
    setSelectedClients((prev) => {
      if (!prev.some((c) => c.id === client.id)) return [...prev, client];
      return prev;
    });
  };

  const removeClientFromSelection = (id: number) => {
    setSelectedClients((prev) => prev.filter((c) => c.id !== id));
  };

  const clearSelection = () => setSelectedClients([]);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        selectedClients,
        addClientToSelection,
        removeClientFromSelection,
        clearSelection,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserProvider");
  return context;
};
