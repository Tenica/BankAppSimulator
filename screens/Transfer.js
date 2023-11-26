import { StyleSheet, View, TextInput, Text, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Title from "../UI/title";
import ListTransactions from "../components/ListTransactions";
import IconListTransaction from "../components/IconListTransaction";
import IconHeaderButton from "../UI/IconHeaderButton";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth";
import TransferForm from "../components/Auth/TransferForm";
import useApiRequest from "../hook/useApiRequest";





const Transfer = () => {
const navigation = useNavigation();
const [transferPage, setTransferPage] = useState(false);
const authCtx = useContext(AuthContext)
const showOrHideList = authCtx.showOrHidePayments
const walletId = authCtx.walletId
const token = authCtx.token;
console.log(walletId)
  const headers = {
    Authorization: `Bearer ${token}`,
  }

 const {data, isLoading, error, updateListHandler, update} =  useApiRequest(`https://southcreekwoodbank.com/wallet/get-user-pending-transactions/${walletId}`, "GET", headers)




const goToTransferScreenHandler = (value) => {
  setTransferPage(value)
}


    
    const goBackToPreviousScreen = () => {
        navigation.goBack();
      };
    
      const goBackToDashboardHandler = () => {
        navigation.navigate("Dashboard")
      }
  const text = "Send money to";


  
  return (
    <View style={styles.container}>
      <Title>
      <IconHeaderButton icon="chevron-back-outline" size={30} color="#1f1f7a" onPress={goBackToPreviousScreen}/>
        <Text style={styles.titleText}>{text}</Text>
        <View style={styles.font}>
        <IconHeaderButton icon="close-outline" size={30} color="#1f1f7a" onPress={goBackToDashboardHandler}/>
         
        </View>
      </Title>
      <View style={styles.panel}>
      {data.length >= 5 && <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Search account or payee name"
            keyboardType="ascii-capable"
          />
          <Ionicons name="search-outline" size={25} color="black" />
        </View>}
        {data.length !== 0 && <IconListTransaction data={data} formPage={goToTransferScreenHandler}/>}
     
      </View>
      {data.length !== 0 && <ListTransactions data={data}/>}
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary600} />
      ) : (data.length === 0  && <TransferForm setUpdate={updateListHandler}/>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
  },
  panel: {
    backgroundColor: "#FAF9F6",
  },
  inputContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    color: "black",
    height: 44,
    borderRadius: 5,
    width: "80%",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "#000",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary600,
    marginLeft: 10,
    paddingLeft: 2,
  },
  font: {
    marginLeft: 175,
  },
  
});

export default Transfer;





