import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Dashboard from './screens/Dashboard';
import Header from './components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Trends from './screens/Trends';
import PayAndTransfer from './screens/PayAndTransfer';
import Support from './screens/Support';
import { useContext } from 'react';
import AuthContextProvider, { AuthContext } from "./store/auth.js";
import Login from './components/Auth/Login';
import Transfer from './screens/Transfer';
import FormPage from './screens/FormPage';
import ReceiptPage from './screens/ReceiptPage';
import OtpScreen from './screens/OtpScreen';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();


const AuthStack = () => {
  return (<Login />)
}




const Home = () => {
  return (  <View style={styles.container}>
    <Header />
  <Dashboard />
    </View> );
}




const AuthenticatedStack = () => {

 return (<Tab.Navigator 
  screenOptions={{

    headerStyle: {
      height: 50,
      backgroundColor: '#000033'
    },
    headerTitle: '', // Remove the header title
  }}
  >
 
  <Tab.Screen name="Dashboard" 
  component={Home} 
  options={{
    tabBarIcon: ({ focused, color, size }) => (
      <Ionicons name="briefcase-outline" size={25} color={color} />
    ),
  }}
  />

  <Tab.Screen name="Trends" 
  component={Trends} 
  options={{
   
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="trending-up-outline" size={25} color={color} />
    ),
  }}
  />


  <Tab.Screen name="Pay&Transfer" 
  component={PayAndTransfer} 
   options={{
   tabBarStyle: {
     display: "none"
   },
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="swap-horizontal-outline" size={25} color={color}/>
    ),

  }}
  />

  <Tab.Screen name="Transfer" 
  component={Transfer} 
  options={{
    tabBarButton: () => null,
    tabBarStyle: {
      display: "none"
    },
    tabBarVisible: false,
  }}
  />

  <Tab.Screen name="FormPage" 
  component={FormPage} 
  options={{
    tabBarButton: () => null,
    tabBarStyle: {
      display: "none"
    },
    tabBarVisible: false,
  }}
  />

  <Tab.Screen name="OtpScreen" 
  component={OtpScreen} 
  options={{
    tabBarButton: () => null,
    tabBarStyle: {
      display: "none"
    },
    tabBarVisible: false,
  }}
  />

  <Tab.Screen name="ReceiptPage" 
  component={ReceiptPage} 
  options={{
    tabBarButton: () => null,
    tabBarStyle: {
      display: "none"
    },
    tabBarVisible: false,
  }}
  />

  
 

  <Tab.Screen name="Support" 
  component={Support} 
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="help-circle-outline" size={25} color={color} />
    ),
  }}
  />
  </Tab.Navigator>)
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isLoggedIn && <AuthStack />}
      {authCtx.isLoggedIn && <AuthenticatedStack />}
    </NavigationContainer>
  );
}


function Root() {
  const authCtx = useContext(AuthContext);

  return <Navigation />;
}

export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});
