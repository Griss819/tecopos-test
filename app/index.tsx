import {View, Text, StyleSheet} from "react-native";
import Spacer from "@/components/ui/Spacer";
import {Ionicons} from "@expo/vector-icons";
import CustomText from "@/components/ui/CustomText";

export default function Index() {
  return (
    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Spacer height={40}></Spacer>
      <Ionicons name={'shield'} color={'lightgray'} size={45}></Ionicons>
      <Spacer height={40}></Spacer>
      <CustomText>Account Shelter</CustomText>
      <CustomText>Todas tus cuentas en un solo sitio</CustomText>
      <Spacer height={40}></Spacer>
    </View>
  )
}
const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
});
