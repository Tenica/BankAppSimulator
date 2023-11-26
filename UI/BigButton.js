import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";



const BigButton = ({children, onPress, style}) => {
    return (  <Pressable
        style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
        onPress={onPress}
      >
        <View >
        {children}
        </View>
        </Pressable> );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: Colors.primary600,
        justifyContent: 'center'
    },
    pressed: {
        opacity: 0.5,
      }
   
})
 
export default BigButton;

