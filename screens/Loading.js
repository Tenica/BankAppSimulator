import { StyleSheet } from "react-native";
import { Text, View } from "react-native";



const Loading = () => {
    return (<View style={styles.container}>
        <Text style={styles.text}>.....Loading</Text>
        </View> );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }, 
})
 
export default Loading;