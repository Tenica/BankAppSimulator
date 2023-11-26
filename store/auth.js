import  React, {  useEffect, useState, useCallback} from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { currencySymbol } from "../util/helper-function";


export const AuthContext = React.createContext({
    isLoading: false,
    isLoggedIn: false,
    onAmount: () => {},
    onCurrencySymbol: () => {},
    onAccountNumber: () => {},
    onLogout: () => {},
    onLogin: (email, password) => {},
    onWalletId: (value) => {},
    onShowOrHidePayment: (value) => {},
    id: "",
    token: "",
    currencySymbol: '',
    firstName: "",
    lastName: "",
    image: "",
    walletId: '',
    amount: '',
    accountNumber: '',
    showOrHidePayments: '',
    error: "",
    message: "",
})


function AuthContextProvider({children}) {
    const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [token, setToken] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("")
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [walletId, setWalletId] = useState('');
  const [showOrHidePayments, setShowOrHidePayments] = useState('')

  function idHandler(id) {
    return setId(id);
  }



  function tokenHandler(token) {
    return setToken(token);
  }

  function accountNumberHandler(value) {
   return setAccountNumber(value)
  }

  function amountHandler(value) {
    return setAmount(value)
  }

  function currencySymbolHandler(value) {
    return setCurrencySymbol(value)
  }

 

    const walletIdHandler = (value) => {
        setWalletId(value);
    };

  const showOrHidePaymentsHandler = (value) => {
     return setShowOrHidePayments(value)
  }

  const setAutoLogout = useCallback((milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  }, []);

  //    useEffect hook!

  useEffect(() => {
    const getData = async () => {
      try {
        const token =  AsyncStorage.getItem("token");
        const expiryDate =  AsyncStorage.getItem("expiryDate");
        console.log("token store", token)
        if (!token || !expiryDate) {
          return;
        }

        if (new Date(expiryDate) <= new Date()) {
          logoutHandler();
          return;
        } 
        const id = await AsyncStorage.getItem("id");
        console.log("id store", id)
        const remainingMilliseconds =
          new Date(expiryDate).getTime() - new Date().getTime();
        tokenHandler(token);
        idHandler(id);
        setIsLoggedIn(true);
        setAutoLogout(remainingMilliseconds);
      } catch (e) {
        // read error
        console.log(e);
      }

      console.log("Done.");
    };

    getData();
    setIsLoading(false);
  }, [setAutoLogout]);

  const logoutHandler = async () => {
     AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("expiryDate");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("firstName");
    setIsLoggedIn(false);
    setToken("");
  };

  const loginHandler = async (email, password) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await fetch("https://southcreekwoodbank.com/auth/login-user", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message);
      
      const token = await result.token;
      const userId = await result.user?._id;
      const firstName = await result.user?.firstName;
      const lastName = await result.user?.lastName;
      const image = await result.user?.image;

      console.log("image", image);

      if (token && userId) {
        setIsLoggedIn(true);
        setToken(token);
        setId(userId);
        setFirstName(firstName);
        setLastName(lastName);
        setImage(image)
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("userId", userId);
        AsyncStorage.setItem("firstName", firstName);
        AsyncStorage.setItem("firstName", lastName);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        AsyncStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
     
      console.error("Error submitting form:", error);
      setError("Cannot Login!");
      
    }
  };
  return <AuthContext.Provider value={{
    isLoading: isLoading,
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler,
    onWalletId: walletIdHandler,
    onShowOrHidePayment: showOrHidePaymentsHandler,
    onAmount: amountHandler,
    onAccountNumber: accountNumberHandler,
    onCurrencySymbol: currencySymbolHandler,
    token: token,
    id: id,
    firstName: firstName,
    lastName: lastName,
    image: image,
    currencySymbol: currencySymbol,
    error: error,
    message: message,
    walletId: walletId,
    amount: amount,
    accountNumber: accountNumber,
    showOrHidePayments: showOrHidePayments
   
  }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;