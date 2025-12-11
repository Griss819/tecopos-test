import {StyleSheet, View} from "react-native";
import {ReactNode} from "react";
import CustomText from "@/components/ui/CustomText";
import {Ionicons} from "@expo/vector-icons";

export default function CustomFormControl(
  {label, children, formError = null} :
  {label?: string,  children: ReactNode, formError?: string | null}
) {
  return (
    <View style={styles.formControl}>
      {label && (<CustomText>{label}</CustomText>)}
      {children}
      {formError && (
        <View style={styles.error}>
          <Ionicons name={'send'} color={'#ff3f3f'}></Ionicons>
          <CustomText color={'#ff3f3f'} fontWeight={'bold'}>{formError}</CustomText>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  formControl: {
    display: "flex",
    flexDirection: "column",
    gap: 5
  },
  error: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  }
});
