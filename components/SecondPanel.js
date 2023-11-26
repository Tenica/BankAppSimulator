import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../UI/card";
import IconButton from "../UI/IconButton";



const SecondPanel = ({sendDataToParent}) => {

  const handleSendData = () => {
    sendDataToParent(); // Call the function passed from the parent
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
      <IconButton icon={"swap-horizontal-outline"} size={32} color={"white"} text={"Transfer"} onPress={handleSendData}/>
      <IconButton icon={"reader-outline"} size={32} color={"white"} text={"History"}/>
      <IconButton icon={"wallet-outline"} size={32} color={"white"} text={"Bill"}/>
      <IconButton icon={"mail-outline"} size={32} color={"white"} text={"Message"}/>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -40,
    marginHorizontal: 25,
  },
  contentContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  card: {
    backgroundColor: "#1f1f7a",
  },
  text: {
  color: '#fff',
  fontSize: 10,
  textAlign: "center"
  },
  TransactionText: {
    color: '#fff',
    fontSize: 7.2,
    textAlign: "center"
  }
});
export default SecondPanel;
