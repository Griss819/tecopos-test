import {KeyboardTypeOptions, StyleSheet, TextInput} from "react-native";

export default function CustomTextInput({onChange, keyboardType = 'default'}: {onChange: (text: string) => void, keyboardType?: KeyboardTypeOptions}) {
  return (
    <TextInput
      style={styles.textInput}
      onChangeText={onChange}
      keyboardType={keyboardType}
    ></TextInput>
  )
}

const styles = StyleSheet.create({
  textInput: {
    minHeight: 20,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
    borderColor: 'gray',
  }
});
