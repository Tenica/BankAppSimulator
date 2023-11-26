import { StyleSheet, Text, View,  } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../UI/title";
import IconHeaderButton from "../UI/IconHeaderButton";
import { useNavigation } from "@react-navigation/native";
import FlatButton from "../UI/FlatButton";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth";
import { currencySymbol } from "../util/helper-function"

const PayAndTransfer = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext)

  const goBackToPreviousScreen = () => {
    navigation.goBack();
  };


  const sendMoneyToHandler = () => {
      navigation.navigate("Transfer");
 
  };

  const text = "Pay and transfer";
  return (
    <View style={styles.container}>
      <Title>
        <Text style={styles.titleText}>{text}</Text>
        <View style={styles.font}>
          <IconHeaderButton
            icon={"close-outline"}
            size={28}
            color={"black"}
            onPress={goBackToPreviousScreen}
          />
        </View>
      </Title>
      <View style={styles.list}>
        <View>
          <View style={styles.accountContainer}>
            <Text>From:</Text>
            <Text style={styles.contentTextHeader}>
              {" "}
              <Ionicons
                name="folder-open-outline"
                size={20}
                color={"#1f1f7a"}
              />{" "}
              Savings Account
            </Text>
          </View>
          <Text style={styles.contentAccount}>{authCtx.accountNumber}</Text>
          <Text style={styles.contentAmount}>{currencySymbol(authCtx.currencySymbol)}{authCtx.amount}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={28} color={"#1f1f7a"} />
      </View>
      <FlatButton onPress={sendMoneyToHandler}>
        <View style={styles.list}>
       <View>
         <View style={styles.accountContainer}>
              <Text>To:</Text>
                <Text style={styles.contentTextHeaderTwo}>Choose who to Pay</Text>
            </View>
            <Text style={styles.contentText}>or pay someone new</Text>
          </View> 
          <Ionicons
            name="chevron-forward-outline"
            size={28}
            color={"#1f1f7a"}
          />
        </View>
      </FlatButton>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EAD6",
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FAF9F6",
    marginBottom: 10,
    // Add shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    // Add elevation for Android (elevation will automatically create a shadow)
    elevation: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f1f7a",
    paddingLeft: 12,
  },
  contentText: {
    fontSize: 14,
    marginLeft: 36,
    paddingLeft: 24,
  },
  contentTextHeader: {
    color: "#1f1f7a",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 25,
  },
  contentTextHeaderTwo: {
    color: "#1f1f7a",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 30,
    paddingLeft: 12,
  },
  contentAmount: {
    fontWeight: "bold",
    fontSize: 16.5,
    marginLeft: 25,
    paddingLeft: 40,
  },
  contentAccount: {
    fontSize: 11.5,
    marginLeft: 25,
    paddingLeft: 40,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 15,
    borderWidth: 2,
    borderColor: "#fff",
    borderBottomColor: "rgba(192, 192, 192, 0.5)",
  },
  font: {
    marginLeft: 185,
  },
});

export default PayAndTransfer;












