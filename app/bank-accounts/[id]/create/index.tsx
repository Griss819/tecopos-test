import {FlatList, StyleSheet, View} from "react-native";
import CustomButton from "@/components/ui/CustomButton";
import {router, useLocalSearchParams} from "expo-router";
import CustomText from "@/components/ui/CustomText";
import Spacer from "@/components/ui/Spacer";
import {useEffect, useState} from "react";
import bankAccountService, {BankAccountDto, BankTransactionDto} from "@/api/bankAccountService";
import {FormError, isEmailValid, isRequired, sanitizeFloat} from "@/lib/validation-functions";
import CustomTextInput from "@/components/ui/CustomTextInput";
import CustomFormControl from "@/components/ui/CustomFormControl";
import {CustomSelect} from "@/components/ui/CustomSelect";

export const operationTypes = [
  { label: 'Depósito', value: 'deposit' },
  { label: 'Retiro', value: 'withdraw' },
];

export default function Create() {
  const { id } = useLocalSearchParams();

  const [bankAccount, setBankAccount] = useState<BankAccountDto>();
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<'withdraw' | 'deposit'>();
  const [formErrors, setFormErrors] = useState<Record<string, FormError>>({});

  useEffect(() => {
    const fn = async () => {
      try {
        setIsLoading(true);
        console.log("ID: ", id)
        const response = await bankAccountService.getBankAccounts();

        if (response) {
          console.log(response);
          setBankAccount(response.filter(bankAccount => bankAccount.id == parseInt(id.toString() ?? '0'))[0]);
        }

        setIsLoading(false);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fn();
  }, []);

  const handleSubmit = async () => {
    let errors: Record<string, FormError> = {};

    // Name
    errors = { ...errors, ...isRequired('name', name, errors) };

    // Amount
    errors = { ...errors, ...isRequired('amount', amount, errors) };

    // Type
    errors = { ...errors, ...isRequired('type', type, errors) };

    setFormErrors(errors);
    console.log(errors);
    if (Object.keys(errors).length > 0) return;

    const newTransaction: BankTransactionDto = {
      name,
      type: type ?? 'withdraw',
      createdAt: new Date(Date.now()),
      amount: parseFloat(amount),
      bankAccountId: parseInt(id.toString()),
      id: 0
    }

    try {
      setIsLoading(true);
      await bankAccountService.addBankTransaction(newTransaction)
      router.replace(`/bank-accounts/${id}`)
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.bankAccountsContainer}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20}}>
        <CustomButton name={'Atrás'} type={'secondary'} onClick={() => router.replace(`/bank-accounts/${id}`)} />
        <View>
          <CustomText fontSize={18} fontWeight={'bold'}>Añadir operación</CustomText>
          <CustomText fontSize={14} color={'gray'}>{bankAccount?.name}</CustomText>
        </View>
      </View>
      <Spacer></Spacer>
      <CustomFormControl label={'Nombre'} formError={formErrors.name ? formErrors.name.message : null}>
        <CustomTextInput
          onChange={(value: string) => {
            setName(value);
          }}
        ></CustomTextInput>
      </CustomFormControl>
      <Spacer></Spacer>
      <CustomFormControl label={'Cantidad'} formError={formErrors.amount ? formErrors.amount.message : null}>
        <CustomTextInput
          keyboardType={'numeric'}
          onChange={(value: string) => {
            let v = parseFloat(sanitizeFloat(value));
            console.log(v)
            setAmount(v.toString());
          }}
        ></CustomTextInput>
      </CustomFormControl>
      <Spacer></Spacer>
      <CustomFormControl label={'Tipo'} formError={formErrors.type ? formErrors.type.message : null}>
        <CustomSelect
          options={operationTypes}
          selected={type}
          onSelect={(item) => { setType(item.value);}}
        />
      </CustomFormControl>
      <CustomFormControl label={'Tipo'} formError={formErrors.type ? formErrors.type.message : null}>
        <CustomSelect
          options={operationTypes}
          selected={type}
          onSelect={(item) => { setType(item.value);}}
        />
      </CustomFormControl>
      <Spacer height={20}></Spacer>
      <CustomButton disabled={isLoading} name={'Añadir operación'} onClick={handleSubmit}></CustomButton>
    </View>
  )
}
const styles = StyleSheet.create({
  bankAccountsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    borderRadius: 15,
  },
  list: {
    gap: 10
  }
});
