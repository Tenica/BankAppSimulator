
import { StyleSheet, View } from "react-native";
import FirstPanel from "../components/FirstPanel";
import SecondPanel from "../components/SecondPanel";
import { useNavigation } from '@react-navigation/native'
import { useContext } from "react";
import { AuthContext } from "../store/auth";
import Loading from "./Loading";








const Dashboard = () => {
    const authCtx = useContext(AuthContext);
    const isLoading = authCtx.isLoading
    const navigation = useNavigation();

    function navigateHandler() {
        navigation.navigate("Pay&Transfer")
       
      }

    return (
        <View style={styles.container}>
       {isLoading ?  <Loading /> : <View><SecondPanel sendDataToParent={navigateHandler}/>
        <FirstPanel /></View>  }
        </View>
             
       
          );
}

const styles = StyleSheet.create({
    container: {
       flex: 3,
       backgroundColor: '#F0EAD6'
      },
})
 
export default Dashboard;