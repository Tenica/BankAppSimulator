import { Pressable, StyleSheet, View, Text} from "react-native";
import { Ionicons } from '@expo/vector-icons';


function IconButton({ icon, color, size, onPress, text}) {
    return (
      <Pressable 
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
      <Ionicons name={icon} color={color} size={size} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </Pressable>
      
      
    );
  }

  const styles = StyleSheet.create({
    contentContainer: {
      justifyContent: "space-between",
      alignItems: "center",
      padding: 8,
      marginVertical: 4,
      marginHorizontal: 2,
      borderRadius: 4,
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    text: {
      color: '#fff',
      fontSize: 10,
      textAlign: "center"
      },
    pressed: {
      opacity: 0.7,
    },
  }); 
  
  export default IconButton;

