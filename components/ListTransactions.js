import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BigButton from "../UI/BigButton";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";





const ListTransactions = ({data}) => {
  

  const navigation = useNavigation();
  
const renderItem = ({ item }) => {
  const itemTitle = item.receiversName.toUpperCase();
  
  const goToReceiptPageHandler = () => {
    navigation.navigate("ReceiptPage", {  
      itemReceiversName: item.receiversName, 
      itemSendersName: item.sendersName,
      itemAmount: item.amount,
      itemDescription: item.description,
      itemAccount: item.accountNumber
    } )
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-outline" size={25} color="#000" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>{itemTitle}</Text>
          <Text style={styles.accountNumber}>{item.accountNumber}</Text>
        </View>

        <BigButton style={styles.button} onPress={goToReceiptPageHandler}>
          <Text style={styles.buttonText}>Manage</Text>
        </BigButton>
      </View>
    
    </View>
  );
};

  return (
   
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            flexGrow: 1,
            }}
      />
     
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  iconContainer: {
    width: '10%',
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#FAF9F6",
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginVertical: 10,
    paddingVertical: 12
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary600,
  },
  textContainer: {
  width: '67%' 
  },
  accountNumber: {
    fontSize: 13
  },
  buttonText: {
   textAlign: 'center',
   fontWeight: '500',
   color: Colors.primary600
  }
});

export default ListTransactions;
