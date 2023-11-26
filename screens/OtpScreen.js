import { Button, View, TextInput, Text, Alert , StyleSheet, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { useContext, useState } from "react";

import * as yup from "yup";
import { AuthContext } from "../store/auth";
import LoginButton from "../UI/LoginButton";
import Colors from "../constants/Colors";


const validationSchema = yup.object().shape({
  otp: yup
    .string()
    .required("Please enter the OTP")
    .matches(/^[0-9]{4}$/, "OTP must be a 4-digit number"),
});



const OtpScreen = ({ route }) => {
  const authCtx = useContext(AuthContext);
  const [progress, setProgress] = useState(0)
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [hideBar, setHideBar] = useState(false);
  const [otp, setOTP] = useState('')
  const token = authCtx.token;
  const id = authCtx.id;

  const {
    itemReceiversName,
    itemSendersName,
    itemAmount,
    itemDescription,
    itemAccount,
  } = route.params;

  const unhideProgressBarHandler = async () => {
   
    const data = {
      otpNumber: otp,
    }

    const otpJSON = JSON.stringify(data);

    try {
      const response = await fetch(
        `https://southcreekwoodbank.com/wallet/post-otp/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: otpJSON,
        }
      );
      const result = await response.json();
      const message = await result.message;
      if (message.includes('sent')) {
        progressBarHandler(message)
       return Alert.alert('Message', message)
      } else {
        Alert.alert('Message', message)
      }
      
        
       
     
      
      console.log("OTP", message)
    } catch {
      console.error("Error submitting form pimpi:", error);
    }
    
    setHideBar(true)
  }

  const progressBarHandler = (text) => {
    if (progress < 100) {
      setProgress(progress + 25)
      return Alert.alert('Message', text)
    } else if (progress === 100) {
      setProgress(progress - 100)
      setHideBar(false);
    }
  }

  const goToReceiptPageHandler = (rName, sName, accountNumber, amount, description) => {
    navigation.navigate("ReceiptPage", {  
      itemReceiversName: rName, 
      itemSendersName: sName,
      itemAmount: amount,
      itemAccount: accountNumber,
      itemDescription: description,
    } )
  }

 

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setOTP(values.otp)


    
      const data = {
        receiversName: itemReceiversName,
        sendersName: itemSendersName,
        amount: itemAmount,
        accountNumber: itemAccount,
        description: itemDescription 
      }

      const toJSON = JSON.stringify(data)
     
      try {
        const response = await fetch(
          `https://southcreekwoodbank.com/wallet/pending-transaction/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: toJSON,
          }
        );
        const result = await response.json();
        const message = await result.message;
        if (message.includes('OTP')) {
         
          unhideProgressBarHandler()
          return;
        } 
        console.log("Form submitted successfully!", message);
        goToReceiptPageHandler(data.sendersName, data.receiversName, data.accountNumber, data.amount, data.description);
      } catch (error) {
        Alert.alert('Error', 'There was an error while submitting the form.');
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
        resetForm()
      }
  
     
    

    console.log(values);
   
  };

  const getColor = () => {
      if(progress < 40) {
        return '#ff0000'
      } else if (progress < 70) {
        return '#ffa500'
      } else {
        return "#2ecc71"
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
      <Text style={styles.header}>Kindly enter your OTP (One-Time-Password), in the form below:</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.textHeader}>Sender Name: </Text>{itemSendersName}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.textHeader}>Beneficiary Name: </Text>{itemReceiversName}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.textHeader}>Sender Name: </Text>{itemAmount}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.textHeader}>Item Description: </Text>{itemDescription}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.textHeader}>Amount: </Text>{itemAccount}</Text>
        </View>

        <Formik
          initialValues={{ otp: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.form}>
              <TextInput
                placeholder="Enter OTP"
                onChangeText={handleChange("otp")}
                value={values.otp}
                keyboardType="numeric"
                maxLength={4}
                style={styles.input}
              />

          
              <View style={styles.loginContainer}>
              {loading ? <ActivityIndicator style={styles.loader} size="large" color="#0000ff" /> : 
              <LoginButton onPress={handleSubmit}>
              <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Make Payment</Text>
              </View>
              </LoginButton>}
              </View>
              

              {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}
            </View>
          )}

        </Formik>
       {hideBar && <View style={styles.progressBarContainer}>
           <View style={styles.progressBar}>
           <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: getColor() }]}></View>
           </View>
           <Text style={styles.progressLabel}>{progress}%</Text>
           
        </View>}
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EAD6",
  },
  formContainer: {
    marginVertical: 20,
    padding: 10,
    marginHorizontal: 9,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  textContainer: {
    marginHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 0.9,
  },
  textHeader: {
    fontWeight: 'bold'
 },
 header: {
   paddingTop: 20,
   textAlign: 'center',
   fontWeight: "bold"
 },
 form: {
  marginHorizontal: 20,
  paddingVertical: 25,
 },
 error: {
  color: 'red',
  textAlign: 'center',
  fontStyle: 'italic'
 },
 input: {
   backgroundColor: '#E1D9D1',
   opacity: 0.5,
   width: '100%',
   height: 40,
   marginBottom: 10,
   paddingHorizontal: 10,
   borderRadius: 5
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
},
 progressBar: {
   width: '100%',
   height: 30,
   borderWidth: 0,
   borderRadius: 10,
   backgroundColor: '#E1D9D1',
   marginBottom: 10
 },
 progressBarFill: {
  height: '100%',
  borderRadius: 10,
  backgroundColor: 'green'
 },
 progressLabel: {
  marginTop: 10,
  fontSize: 24,
  fontWeight: "bold",
  color: '#444444'
 }, 
 loginContainer: {
  justifyContent: "center",
  alignItems: "center",
},


});

export default OtpScreen;


