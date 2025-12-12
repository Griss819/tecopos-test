import {router} from "expo-router";
import CustomText from "@/components/ui/CustomText";
import Spacer from "@/components/ui/Spacer";
import {StyleSheet, View} from "react-native";
import CustomCard from "@/components/ui/CustomCard";

export default function BankAccountSkelleton() {
  return (
    <View style={styles.container}>
      <CustomCard>
        <View style={[styles.grayBg, {width: 100, height: 20}]}></View>
        <Spacer></Spacer>
        <View style={[styles.grayBg, {width: 200, height: 40}]}></View>
      </CustomCard>
      <CustomCard>
        <View style={[styles.grayBg, {width: 60, height: 20}]}></View>
        <Spacer></Spacer>
        <View style={[styles.grayBg, {width: 220, height: 40}]}></View>
      </CustomCard>
      <CustomCard>
        <View style={[styles.grayBg, {width: 120, height: 20}]}></View>
        <Spacer></Spacer>
        <View style={[styles.grayBg, {width: 280, height: 40}]}></View>
      </CustomCard>
      <CustomCard>
        <View style={[styles.grayBg, {width: 100, height: 20}]}></View>
        <Spacer></Spacer>
        <View style={[styles.grayBg, {width: 250, height: 40}]}></View>
      </CustomCard>
    </View>

  )
}

const styles = StyleSheet.create({
  grayBg: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  }
});
