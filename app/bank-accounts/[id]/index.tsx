import {Dimensions, FlatList, ScrollView, StyleSheet, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import CustomText from "@/components/ui/CustomText";
import Spacer from "@/components/ui/Spacer";
import {router, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import bankAccountService, {BankAccountDto, BankTransactionDto} from "@/api/bankAccountService";
import CustomButton from "@/components/ui/CustomButton";
import CustomCard from "@/components/ui/CustomCard";
import BankAccountSkelleton from "@/components/skelletons/BankAccountSkelleton";
import CustomDatepicker from "@/components/ui/CustomDatepicker";

export default function List() {
  const {id} = useLocalSearchParams();

  const [bankAccount, setBankAccount] = useState<BankAccountDto>();
  const [bankTransactions, setBankTransactions] = useState<BankTransactionDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const {height: deviceHeight} = Dimensions.get("window");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await bankAccountService.getBankAccounts();
      const responseTransactions = await bankAccountService.getBankTransactions();

      if (response && responseTransactions) {
        const account = response.find(
          (bankAccount) => bankAccount.id == parseInt(id.toString() ?? "0")
        );

        setBankAccount(account);

        setBankTransactions(
          responseTransactions.filter(
            (t) => t.bankAccountId == account?.id
          )
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTransactions = async () => {
    setBankTransactions(bankTransactions.filter(x =>
      new Date(x.createdAt).getTime() >= startDate.getTime() && new Date(x.createdAt).getTime() <= endDate.getTime()
    ))
  }

  const onDeleteTransaction = async (id: number) => {
    try {
      setIsLoading(true);
      await bankAccountService.deleteBankTransaction(id);
      await fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderTransactionItem = ({item, index}: { item: BankTransactionDto; index: number }) => {
    return (
      <CustomCard>
        <View style={{flexDirection: "row"}}>
          <View style={{flexDirection: "column"}}>
            <CustomText fontSize={18} fontWeight={"bold"}>
              {item.name}
            </CustomText>

            <CustomText fontSize={14} color={"gray"}>
              {new Date(item.createdAt).toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </CustomText>

            <Spacer/>

            {item.type === "deposit" && (
              <View style={{borderRadius: 10, paddingHorizontal: 10, backgroundColor: "#70d3e1"}}>
                <CustomText color={"white"} fontWeight={"bold"} fontSize={20}>
                  $ {item.amount}
                </CustomText>
              </View>
            )}

            {item.type === "withdraw" && (
              <View style={{borderRadius: 10, paddingHorizontal: 10, backgroundColor: "gray"}}>
                <CustomText color={"white"} fontWeight={"bold"} fontSize={20}>
                  - $ {item.amount}
                </CustomText>
              </View>
            )}
          </View>

          <View style={{marginLeft: "auto"}}>
            <CustomButton
              name={""}
              iconName={"trash"}
              type={"secondary"}
              onClick={() => onDeleteTransaction(item.id)}
            />
          </View>
        </View>
      </CustomCard>
    );
  };

  const styles = StyleSheet.create({
    root: {
    },
    bankAccountsContainer: {
      flexDirection: "column",
      padding: 20,
      borderRadius: 15,
      height: '100%',
    },
    list: {
      gap: 10,
    },
    filter: {
      flexDirection: "row",
      gap: 10,
      alignItems: 'center'
    }
  });

  return (
    <View style={styles.bankAccountsContainer}>
      <View style={{flexDirection: "row", alignItems: "center", gap: 20}}>
        <CustomButton
          name={"Atrás"}
          type={"secondary"}
          disabled={isLoading}
          onClick={() => router.replace(`/bank-accounts`)}
        />

        <View>
          <CustomText fontSize={18} fontWeight={"bold"}>
            Operaciones
          </CustomText>
          <CustomText fontSize={14} color={"gray"}>
            {bankAccount?.name}
          </CustomText>
        </View>
        <View style={{flexDirection: 'column', gap: 10, marginLeft: 'auto'}}>
          <CustomButton disabled={isLoading} name={''} type={'secondary'} onClick={fetchData} iconName={'reload'}></CustomButton>
        </View>
      </View>

      <Spacer/>
      <View style={styles.filter}>
        <CustomButton disabled={isLoading} name={''} type={'secondary'} onClick={filterTransactions} iconName={'funnel'}></CustomButton>

        <CustomDatepicker
          value={startDate}
          onChange={setStartDate}
        />
        <CustomText>-</CustomText>
        <CustomDatepicker
          value={endDate}
          onChange={setEndDate}
        />
      </View>
      <Spacer height={20}/>
      {!isLoading && bankTransactions.length == 0 && (
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Spacer height={40}></Spacer>
          <Ionicons name={'leaf'} color={'lightgray'} size={45}></Ionicons>
          <Spacer height={40}></Spacer>
          <CustomText>No se han encontrado transacciones</CustomText>
          <CustomText>asociadas a esta cuenta</CustomText>
          <Spacer height={40}></Spacer>
        </View>
      )}
      {!isLoading && (
        <FlatList
          data={bankTransactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item, index) => item.id.toString() ?? index.toString()}
          contentContainerStyle={styles.list}
        ></FlatList>
      )}
      {isLoading && (
        <BankAccountSkelleton></BankAccountSkelleton>
      )}

      <Spacer/>

      <View style={{flexDirection: "row", alignItems: "center", marginHorizontal: 'auto'}}>
        <CustomButton
          disabled={isLoading}
          name={"Añadir operación"}
          iconName={"add"}
          onClick={() => router.push(`/bank-accounts/${id}/create`)}
        />
      </View>
    </View>
  );
}
