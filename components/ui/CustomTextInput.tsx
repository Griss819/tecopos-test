import {StyleSheet, TextInput} from "react-native";

export default function CustomTextInput({onChange}: {onChange: (text: string) => void}) {
  return (
    <TextInput style={styles.textInput} onChangeText={onChange} ></TextInput>
  )
}

const styles = StyleSheet.create({
  textInput: {
    minHeight: 20,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10
  }
});
