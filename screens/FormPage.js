import { StyleSheet, View, TextInput, Text, ScrollView } from "react-native";
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





const FormPage = () => {
const navigation = useNavigation();
const [transferPage, setTransferPage] = useState(false);
const authCtx = useContext(AuthContext)


    
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
      </View>
     
      <TransferForm /> 
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

export default FormPage;
