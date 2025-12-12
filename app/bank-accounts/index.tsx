import {FlatList, StyleSheet, View} from "react-native";
import bankAccountService, {BankAccountDto} from "@/api/bankAccountService";
import {useEffect, useState} from "react";
import CustomCard from "@/components/ui/CustomCard";
import CustomText from "@/components/ui/CustomText";
import Spacer from "@/components/ui/Spacer";
import {Ionicons} from "@expo/vector-icons";
import CustomTextInput from "@/components/ui/CustomTextInput";
import {router} from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import BankAccountSkelleton from "@/components/skelletons/BankAccountSkelleton";

export default function BankAccounts() {
  const [bankAccounts, setBankAccounts] = useState<BankAccountDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await bankAccountService.getBankAccounts();
      console.log(response);
      if (response) setBankAccounts(response);

      setIsLoading(false);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const renderAccountItem = ({item, index} : {item: BankAccountDto, index: number}) => {
    return (
      <CustomCard onClick={() => {router.replace(`/bank-accounts/${item.id}`);}}>
        <CustomText fontSize={18} fontWeight={'bold'}>{item.name}</CustomText>
        <Spacer></Spacer>
        <View style={{borderRadius: 10, paddingHorizontal: 10, backgroundColor: '#70d3e1', width: 200}}>
          <CustomText color={'white'} fontWeight={'bold'} fontSize={20}>$ {item.amount}</CustomText>
        </View>
      </CustomCard>
    );
  }

  return (
    <View style={styles.bankAccountsContainer}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20}}>
        <Ionicons name={'wallet'} size={20}></Ionicons>
        <CustomText fontSize={18} fontWeight={'bold'}>Mis cuentas</CustomText>
        <View style={{flexDirection: 'column', gap: 10, marginLeft: 'auto'}}>
          <CustomButton disabled={isLoading} name={''} type={'secondary'} onClick={fetchData} iconName={'reload'}></CustomButton>
        </View>
      </View>
      <Spacer></Spacer>
      {!isLoading && (
        <FlatList
          data={bankAccounts}
          renderItem={renderAccountItem}
          keyExtractor={(item, index) => item.id.toString() ?? index.toString()}
          contentContainerStyle={styles.list}
        ></FlatList>
      )}
      {isLoading && (
        <BankAccountSkelleton></BankAccountSkelleton>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  bankAccountsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    borderRadius: 15,
    height: '100%',
  },
  list: {
    gap: 10
  }
});
