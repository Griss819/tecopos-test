import {Slot} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import UserContextProvider from "@/contexts/userContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { height: deviceHeight } = Dimensions.get("window");

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <UserContextProvider>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={[styles.rootContainer, { maxHeight: deviceHeight }]}>
              <Slot />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </UserContextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: '100%'
  },
  keyboardView: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  rootContainer: {
    height: '100%'
  },
});
