import {useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {UserContext} from "@/contexts/userContext";

export function useUser()  {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within the context");
  }

  return context;
}
