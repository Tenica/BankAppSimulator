import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { AuthContext } from "../../store/auth";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../UI/card";
import LoginButton from "../../UI/LoginButton";
import Colors from "../../constants/Colors";
import Loading from "../../screens/Loading";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const isLoading = authCtx.isLoading;
  const handleLogin = () => {
    // Perform your login logic here using the 'email' and 'password' values
    console.log("Email:", email);
    console.log("Password:", password);
    authCtx.onLogin(email, password);
  };

  return (
    <View style={styles.container}>
    {isLoading ? <Loading /> : <Card style={styles.inputContainer}>
        <Text>{authCtx.message}</Text>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            style={styles.textInputContainer}
          />
        </View>

        <View  style={styles.textContainer}>
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            autoCapitalize="none"
            autoCompleteType="password"
            style={styles.textInputContainer}
          />
        </View>
        <View>
        <LoginButton onPress={handleLogin}>
        <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>Login</Text>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        </View>
        </LoginButton>
        </View>
      </Card>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28282B',
  },
  inputContainer: {
    flexDirection: 'column',
    backgroundColor: "#F5F1ED",
    marginTop: 200,
    marginHorizontal: 5,
    paddingVertical: 40,
    borderRadius: 5,
  },
  textInputContainer: {
    width: '95%',
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 16,
    borderColor: "#E1D9D1",
    borderWidth: 1,
    marginBottom: 15,
  },
  textContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
 buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
 },
  buttonText: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 10
  }
});
export default Login;
