import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";



const LoginButton = ({children, onPress}) => {
    return (  <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        onPress={onPress}
     
      >
    
        {children}
        </Pressable>);
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 14,
        paddingHorizontal: 6,
        borderRadius: 4,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor:Colors.primary600,
        width: 360,
    },
    pressed: {
        opacity: 0.7,
      },
      disabled: {
        backgroundColor: 'red'
      }
})
 
export default LoginButton;