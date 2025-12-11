import {Platform, StyleSheet, View} from "react-native";
import {ReactNode} from "react";

export default function CustomCard({children} : { children: ReactNode }) {
  return (
    <View style={[styles.cardContainer, shadowStyle]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
  }
});
const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  android: {
    elevation: 6,
  },
});
