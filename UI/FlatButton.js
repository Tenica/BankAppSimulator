import { Pressable, StyleSheet } from 'react-native';



function FlatButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
    
        {children}
    
    </Pressable>
  );
}


export default FlatButton;

const styles = StyleSheet.create({
    
    pressed: {
      opacity: 0.5,
    }
  });