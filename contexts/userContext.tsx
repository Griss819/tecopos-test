import {createContext, ReactNode, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import authService from "@/api/authService";

export type User = {
  email: string;
  name: string;
};

export type UserData = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserData | null>(null);

export default function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fn = async() => {
      try {
        await new Promise((res) => setTimeout(res, 800));
        var token = await AsyncStorage.getItem("token");

        if (!token) router.replace('//login');
        else {
          const currentUser = await authService.login("fake-token-123");
          setUser(currentUser);

          router.replace('//bank-accounts');
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    fn();
  }, [])

  async function login(email: string, password: string) {
    try {
      await new Promise((res) => setTimeout(res, 800));
      if (email === "" || password === "") {
        throw new Error("Todos los campos son obligatorios");
      }
      await AsyncStorage.setItem("token", 'fake-token-123');

      const currentUser = await authService.login("fake-token-123");
      setUser(currentUser);
    }
    catch (error) {
      throw error;
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("token");
    router.replace('//login');
  }

  return (
    <UserContext.Provider value={{user, login, logout}}>
      {children}
    </UserContext.Provider>
  )
}
