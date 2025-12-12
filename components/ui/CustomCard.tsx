import {Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {ReactNode} from "react";

export default function CustomCard({children, onClick} : { children: ReactNode, onClick?: () => void }) {
  return (
    onClick ? (
      <TouchableOpacity style={styles.cardContainer} onPress={onClick}>
        {children}
      </TouchableOpacity>
    ) : (
      <View style={styles.cardContainer}>
        {children}
      </View>
    )
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "lightgray"
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
