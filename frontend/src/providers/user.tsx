"use client";
import { useQueryGetUserProfile } from "@/services/apis/useUser";
import React, { createContext, useState, useEffect, useContext } from "react";
import { UserData } from "@/constants/types/api/user/user";
import { TokenService } from "@/services/auth/tokenService";

interface UserContextValue {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  refetchUserData: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const token = TokenService.getToken();
  const {
    data: userData,
    refetch: refetchUserData,
    isRefetching,
  } = useQueryGetUserProfile(token ? true : false);
  useEffect(() => {
    console.log("User data fetched:", userData);
    console.log("token", token);
    if (userData) {
      setUser(userData);
    }
  }, [userData, token]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [isRefetching, userData]);

  return (
    <UserContext.Provider value={{ user, setUser, refetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
