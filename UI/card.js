import { StyleSheet, View } from "react-native";



const Card = ({children, style}) => {
    return (
        <View style={[styles.cardContainer, style]}>
        
        {children}
    
        </View>  );
}


const styles = StyleSheet.create({
   cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
   }
})
export default Card;