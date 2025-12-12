import {Button, StyleSheet, View} from "react-native";
import {useUser} from "@/hooks/useUser";
import CustomButton from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import {Ionicons} from "@expo/vector-icons";

export default function CustomHeader() {
  const {user, logout} = useUser();

  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
        <Ionicons name={'person'} color={'gray'} size={24}></Ionicons>
        <CustomText fontWeight={'bold'} fontSize={20}>{user?.name}</CustomText>
      </View>
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
    borderBottomWidth: 2,
    borderColor: "lightgray"
  }
});
