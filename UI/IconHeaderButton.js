import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const IconHeaderButton = ({ icon, color, size, onPress}) => {
    return ( <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
        >
        <Ionicons name={icon} color={color} size={size} />
        </Pressable>
         );
}
 
const styles = StyleSheet.create({
    pressed: {
      opacity: 0.7,
    },
  });

export default IconHeaderButton;

