import {Button, StyleSheet, View} from "react-native";
import {useUser} from "@/hooks/useUser";
import CustomButton from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";

export default function CustomHeader() {
  const {user, logout} = useUser();

  return (
    <View style={styles.headerContainer}>
      <CustomText fontWeight={'bold'} fontSize={20}>{user?.name}</CustomText>
      <CustomButton name={''} iconName={'log-out'} type={'secondary'} onClick={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  }
});
