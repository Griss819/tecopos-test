import {Pressable, StyleSheet, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import CustomText from "@/components/ui/CustomText";

export default function CustomButton(
  {name, disabled, onClick, iconName, type = 'primary'} :
  {name: string, disabled?: boolean, onClick?: () => void, iconName?: any, type?: 'primary' | 'secondary'}
) {
  return (
    <Pressable style={[styles.button, type == 'primary' ? styles.primary : styles.secondary]} disabled={disabled} onPress={onClick}>
      {iconName && <Ionicons name={iconName} size={24} color={type == 'primary' ? 'white' : 'gray'} />}
      {name && <CustomText fontWeight={'bold'} color={type == 'primary' ? 'white' : 'gray'}>{name}</CustomText>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  primary: {
    backgroundColor: '#70d3e1',
    borderColor: '#70d3e1',
  },
  secondary: {
    borderColor: 'gray'
  }
});
