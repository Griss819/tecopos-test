import {Slot} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAvoidingView} from "react-native";
import UserContextProvider from "@/contexts/userContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  },[]);

  return (
    <SafeAreaProvider>
      <UserContextProvider>
        <SafeAreaView>
          <KeyboardAvoidingView>
            <Slot></Slot>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </UserContextProvider>
    </SafeAreaProvider>
  )
}
