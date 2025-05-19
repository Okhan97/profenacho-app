"use client";
import axios, { AxiosError } from "axios";
import { User } from "../types/types";

import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  isConnected: boolean;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  isConnected: false,
  user: null,
  refreshUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user-from-headers");
      const user = response.data.user as User;
      setUser(user);
      setIsConnected(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        setUserNotFound(true);
      }
      console.error("Error fetching User:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (userNotFound) {
    return null;
  }

  return (
    <UserContext.Provider value={{ isConnected, user, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
