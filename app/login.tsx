import {View, Text, StyleSheet} from "react-native";
import Spacer from "@/components/ui/Spacer";
import CustomCard from "@/components/ui/CustomCard";
import CustomText from "@/components/ui/CustomText";
import CustomFormControl from "@/components/ui/CustomFormControl";
import CustomTextInput from "@/components/ui/CustomTextInput";
import CustomButton from "@/components/ui/CustomButton";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";
import {useUser} from "@/hooks/useUser";
import {FormError, isEmailValid, isRequired} from "@/lib/validation-functions";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {login} = useUser();
  const [formErrors, setFormErrors] = useState<Record<string, FormError>>({});

  const handleSubmit = async () => {
    let errors: Record<string, FormError> = {};

    // Email
    errors = { ...errors, ...isRequired('email', email, errors) };
    errors = { ...errors, ...isEmailValid('email', email, errors) };

    // Password
    errors = { ...errors, ...isRequired('password', password, errors) };

    setFormErrors(errors);
    console.log(errors);
    if (Object.keys(errors).length > 0) return;

    await login(email, password);
  }

  return (
    <View style={styles.loginContainer}>
      <Spacer height={40}></Spacer>
      <CustomText fontSize={20}>Accede usando tus credenciales</CustomText>
      <Spacer height={40}></Spacer>
      <View style={styles.form}>
        <CustomFormControl label={'Correo'} formError={formErrors.email ? formErrors.email.message : null}>
          <CustomTextInput
            onChange={(value: string) => {
              setEmail(value);
            }}
          ></CustomTextInput>
        </CustomFormControl>
        <Spacer height={20}></Spacer>
        <CustomFormControl label={'Contraseña'} formError={formErrors.password ? formErrors.password.message : null}>
          <CustomTextInput
            onChange={(value: string) => {
              setPassword(value);
            }}
          ></CustomTextInput>
        </CustomFormControl>
        <Spacer height={30}></Spacer>
        <CustomButton onClick={handleSubmit} name={'Acceder'}></CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 40,
    height: '100%',
    width: '100%',
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: 350,
  }
});
