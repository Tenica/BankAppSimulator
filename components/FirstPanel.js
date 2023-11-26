import React, { useContext, useEffect, useState } from "react";
import Card from "../UI/card";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../store/auth";
import { currencySymbol } from "../util/helper-function"





const FirstPanel = () => {
  const authCtx = useContext(AuthContext);
  const [accountNumber, setAccountNumber] = useState("")
  const [currencyAmount, setCurrencyAmount] = useState("")
  const [accountType, setAccountType] = useState("");
  const [currencyType, setCurrencyType] = useState("")
  const cType = currencySymbol(currencyType)

  let load = true;

 
    const fetchWallet = async () => {
      const token = authCtx.token;
      const id = authCtx.id;
      console.log("id", id)
    
      try {
        if (authCtx.isLoggedIn === true) {
          const response = await fetch(`https://southcreekwoodbank.com/wallet/get-wallet/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          const message = await result.message;
          console.log("message", message[0]._id)
       
          setAccountNumber(message[0].accountNumber)
          setCurrencyAmount(message[0].currencyAmount)
          
          setCurrencyType(message[0].currencyType)    
          authCtx.onAccountNumber(accountNumber);
          authCtx.onAmount(currencyAmount)
          authCtx.onWalletId(message[0]._id)
          authCtx.onCurrencySymbol(currencyType)
          console.log("wallet", authCtx.walletId)
          setAccountType(message[0].accountType.toUpperCase())
        
        }
      } catch (error) {
        console.log("error", error);
      }
    };

   

    {load && fetchWallet()}
  
   

   

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.contentContainer}>
          <Text style={styles.amount}>{cType} {currencyAmount}</Text>
          <Text style={styles.name}>{authCtx.firstName} {authCtx.lastName}</Text>
          <Text style={styles.accountNumber}>Account No: {accountNumber}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.accountType}>
          {accountType.toUpperCase()}
          </Text>
          <View style={styles.bar}>
          <Ionicons name="bar-chart-outline" size={28} color="#fff" />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "19%",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  card: {
    backgroundColor:'#1f1f7a'
  },
  contentContainer: {
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 8
   
  },
  amount: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 9
  },
  name: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 1
  },
  accountNumber: {
    color: "#fff",
    fontSize: 11,
  },
  accountType: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 11
  }, 
  bar: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
  }
});

export default FirstPanel;
