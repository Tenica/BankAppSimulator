import { Text, View, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../store/auth";
import { useContext, useEffect, useState } from "react";
import FlatButton from "../UI/FlatButton";

const Header = () => {
    const authCtx = useContext(AuthContext)
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();
    
        let greetingText = '';
    
        if (currentHour >= 5 && currentHour < 12) {
          greetingText = 'Good Morning';
        } else if (currentHour >= 12 && currentHour < 18) {
          greetingText = 'Good Afternoon';
        } else {
          greetingText = 'Good Evening';
        }
    
        setGreeting(greetingText);
      }, []);




    return (<View style={styles.container}>
        <View style={styles.circle}>
       {authCtx.image === null ? <Ionicons name="person-outline" size={40} color="#FFF7EF" /> : <Image
        style={styles.image}
        source={{
          uri: `https://southcreekwoodbank.com/${authCtx.image}`,
        }}
      />}
        </View>
        <View style={styles.contentContainer}>
        <Text style={styles.salute}>{greeting},</Text>
        <Text style={styles.name}>{authCtx.firstName.toUpperCase()} {authCtx.lastName.toUpperCase()}</Text>
        </View>
       
        <View style={styles.signOut}>
        <FlatButton onPress={authCtx.onLogout}>
        <Ionicons name="log-out-outline" size={32} color="#fff" />
       
        </FlatButton>
       
        </View>
       
       
        </View>  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#4040bf'
    }, 
    circle: {
            marginTop: 70,
            marginLeft: 16,
            width: 50,
            height: 50,
            borderRadius: 25, 
            backgroundColor: '#D7CFC7',
            alignContent: 'center',
            paddingHorizontal: 5
    },
    contentContainer: {
       marginHorizontal: 20,
       marginVertical: 40,
       paddingTop: 30,
      
    },
    salute: {
      fontSize: 15,
      paddingBottom: 6,
      marginBottom: 10,
      color: '#fff'
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#fff'
    },
    signOut: {
        marginRight: 50,
        marginVertical: 40,
        paddingTop: 30,
        paddingLeft: 60,
       
       
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 18
    }
    
})
 
export default Header;




