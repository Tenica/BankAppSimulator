import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import Colors from "../constants/Colors";
import { dataArray } from "../constants/dummyFile";
import { Ionicons } from "@expo/vector-icons";
import useApiRequest from "../hook/useApiRequest";
import { AuthContext } from "../store/auth";
import { useContext, useEffect } from "react";
import FlatButton from "../UI/FlatButton";
import { useNavigation } from "@react-navigation/native";

const IconListTransaction = ({ data }) => {
  const authCtx = useContext(AuthContext);

  const navigation = useNavigation();

  const goToFormPageHandler = () => {
    navigation.navigate("FormPage");
  };



  const renderTransaction = ({ item }) => {
    const itemTitle = item.receiversName.toUpperCase().slice(0, 7);

    const goToReceiptPageHandler = () => {
      navigation.navigate("ReceiptPage", {
        itemReceiversName: item.receiversName,
        itemSendersName: item.sendersName,
        itemAmount: item.amount,
        itemDescription: item.description,
        itemAccount: item.accountNumber,
      });
    };

    return (
      <View>
      <FlatButton onPress={goToReceiptPageHandler}>
      <View style={styles.icon}>
      <Ionicons name="person-outline" size={25} color="black" />
    </View>
      
        
        <Text style={styles.iconText}>{itemTitle}</Text>
        </FlatButton>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.iconList}>
        <FlatButton onPress={goToFormPageHandler}>
          <View>
            <View style={styles.iconPlus}>
              <Ionicons name="person-add-outline" size={20} color="#Fff" />
            </View>
            <Text style={styles.iconPlusText}>Pay new</Text>
          </View>
        </FlatButton>

        {/* Add other components above the list if needed */}
        <View>
          <FlatList
            data={data}
            renderItem={renderTransaction}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Add other components below the list if needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconList: {
    flexDirection: "row",
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  icon: {
    width: 50,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 25,
    borderColor: "#E1D9D1",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  iconPlus: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary600,
    marginHorizontal: 5,
  },
  iconText: {
    textAlign: "center",
    fontSize: 10,
    color: Colors.primary600,
  },
  iconPlusText: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.primary600,
  },
});

export default IconListTransaction;
