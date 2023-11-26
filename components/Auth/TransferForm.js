import React, { useContext, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert, ActivityIndicator  } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Card from "../../UI/card";
import Colors from "../../constants/Colors";
import LoginButton from "../../UI/LoginButton";
import { AuthContext } from "../../store/auth";
import { useNavigation } from "@react-navigation/native";





const validationSchema = Yup.object().shape({
  senderName: Yup.string().required("Sender's Name is required"),
  receiverName: Yup.string().required("Receiver's Name is required").
  min(3, 'Receiver\'s Name must be at least 3 characters')
  .max(12, 'Receiver\'s Name can be at most 12 characters'),
  amount: Yup.number()
    .positive()
    .required("Amount is required")
    .positive("Amount must be positive"),
  accountNumber: Yup.string().required("Account Number is required"),
  description: Yup.string().max(15, 'Description can be at most 15 characters'),
});



const TransferForm = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const token = authCtx.token;
  const sendersName = authCtx.firstName;
  const id = authCtx.id;
   


  const goToReceiptPageHandler = (rName, sName, accountNumber, amount, description) => {
    navigation.navigate("ReceiptPage", {  
      itemReceiversName: rName, 
      itemSendersName: sName,
      itemAmount: amount,
      itemAccount: accountNumber,
      itemDescription: description,
    } )
  }

  const goToOTPPageHandler = (rName, sName, accountNumber, amount, description) => {
    navigation.navigate("OtpScreen", {  
      itemReceiversName: rName, 
      itemSendersName: sName,
      itemAmount: amount,
      itemAccount: accountNumber,
      itemDescription: description,
    } )
  }


    const handleSubmit = async (values, {resetForm}) => {
      setLoading(true);


      setTimeout(async () => {
      const data = {
        sendersName: values.senderName,
        receiversName: values.receiverName,
        amount: values.amount,
        accountNumber: values.accountNumber,
        description: values.description,
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
           Alert.alert('Message', message)
          return goToOTPPageHandler(data.sendersName, data.receiversName, data.accountNumber, data.amount, data.description)
        } 
        console.log("Form submitted successfully!", message);
        goToReceiptPageHandler(data.sendersName, data.receiversName, data.accountNumber, data.amount, data.description);
      } catch (error) {
        Alert.alert('Error', 'There was an error while submitting the form.');
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
  
      resetForm()
    }, 4000); // 2-second delay (adjust as needed)

   
    };
   


  return (
    <View style={styles.container}>
       <Formik
        initialValues={{
          senderName: "",
          receiverName: "",
          amount: "",
          accountNumber: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
          
          <Card style={styles.inputContainer}>
          <View style={styles.textContainer}>
          <TextInput
            style={styles.input}
            placeholder="Sender's Name"
            onChangeText={handleChange("senderName")}
            onBlur={handleBlur("senderName")}
            value={values.senderName}
          />
          </View>
          {touched.senderName && errors.senderName && (
            <Text style={styles.errorText}>{errors.senderName}</Text>
          )}

          <View style={styles.textContainer}>
          <TextInput
            style={styles.input}
            placeholder="Receiver's Name"
            onChangeText={handleChange("receiverName")}
            onBlur={handleBlur("receiverName")}
            value={values.receiverName}
          />
          </View>
          {touched.receiverName && errors.receiverName && (
            <Text style={styles.errorText}>{errors.receiverName}</Text>
          )}

          <View style={styles.textContainer}>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            onChangeText={handleChange("amount")}
            onBlur={handleBlur("amount")}
            value={values.amount}
            keyboardType="numeric"
          />
          </View>
          {touched.amount && errors.amount && (
            <Text style={styles.errorText}>{errors.amount}</Text>
          )}

          <View style={styles.textContainer}>
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            onChangeText={handleChange("accountNumber")}
            onBlur={handleBlur("accountNumber")}
            value={values.accountNumber}
            keyboardType="numeric"
          />
          </View>
          {touched.accountNumber && errors.accountNumber && (
            <Text style={styles.errorText}>{errors.accountNumber}</Text>
          )}
          <View style={styles.textContainer}>
            <TextInput
              style={styles.input}
              placeholder="Description"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
          </View>
          {loading ? <ActivityIndicator style={styles.loader} size="large" color="#0000ff" /> : <LoginButton onPress={handleSubmit}>  
        <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>Make Payment</Text>
        </View>
        </LoginButton>}
          </Card>
          </View>
        )}
      </Formik>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  errorText: {
    color: "red",
  },
  inputContainer: {
    flexDirection: 'column',
    backgroundColor: "#F5F1ED",
    marginTop: 20,
    marginHorizontal: 5,
    paddingVertical: 40,
    borderRadius: 5,
  },
  input: {
    width: "95%",
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 16,
    borderColor: "#E1D9D1",
    borderWidth: 1,
    marginBottom: 15,
  },
  textContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 10,
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

export default TransferForm;
