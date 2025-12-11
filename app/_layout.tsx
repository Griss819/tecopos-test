import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Slot, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import {SafeAreaProvider} from "react-native-safe-area-context";
import {KeyboardAvoidingView, SafeAreaView} from "react-native";
import UserContextProvider from "@/contexts/userContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  },[]);

  return (
    <UserContextProvider>
      <KeyboardAvoidingView>
        <Slot></Slot>
      </KeyboardAvoidingView>
    </UserContextProvider>
  )
}
