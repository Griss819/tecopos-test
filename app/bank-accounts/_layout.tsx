import {View, StyleSheet, Dimensions} from "react-native";
import {Slot} from "expo-router";
import CustomHeader from "@/components/ui/CustomHeader";

export default function TabLayout() {
  const { height: deviceHeight } = Dimensions.get("window");

  return (
    <View style={[styles.container, { maxHeight: deviceHeight }]}>
      <CustomHeader />
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
  },
});
