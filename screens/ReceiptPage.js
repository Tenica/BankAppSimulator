import { useNavigation } from "@react-navigation/native";
import { Text, View, Button, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { useState } from "react";
import Card from "../UI/card";
import Colors from "../constants/Colors";
import BigButton from "../UI/BigButton";
import FlatButton from "../UI/FlatButton";

const ReceiptPage = ({ route }) => {
  const [selectedPrinter, setSelectedPrinter] = useState();
  const navigation = useNavigation();

  const {
    itemReceiversName,
    itemSendersName,
    itemAmount,
    itemDescription,
    itemAccount,
  } = route.params;

  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Transaction Receipt</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
          }
  
          .container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              width: 100vw
          }
  
          .bodyContainer {
              margin: 20px;
              
          }
  
          .headerContainer {
              margin: 27px 0;
          }
  
          .headerText {
              font-weight: bold;
              font-size: 25px;
              color: #1f1f7a;
          }
  
          .textContainer {
              border-bottom: 0.9px solid #000;
              padding: 30px
          }
  
          .text {
              padding: 15px 10px;
          }
  
          .textHeader {
              font-weight: bold;
          }
  
          .disclaimerBodyContainer {
              background-color:#1f1f7a;
              padding: 20px;
              border-radius: 10px;
              margin-top: 30px;
          }
  
          .disclaimerHeader {
              font-weight: bold;
              font-size: 16.8px;
              color: #fff;
          }
  
          .disclaimerBody {
              color: #fff;
              text-align: justify;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="bodyContainer">
              <div class="headerContainer">
                  <span class="headerText">Transaction Receipt</span>
              </div>
              <div class="textContainer">
                  <span class="text"><span class="textHeader">Sender Name: </span>${itemSendersName}</span>
              </div>
              <div class="textContainer">
                  <span class="text"><span class="textHeader">Receiver Name: </span>${itemReceiversName}</span>
              </div>
              <div class="textContainer">
                  <span class="text"><span class="textHeader">Beneficiary Amount: </span>${itemAmount}</span>
              </div>
              <div class="textContainer">
                  <span class="text"><span class="textHeader">Beneficiary Name: </span>${itemAccount}</span>
              </div>
              <div class="textContainer">
                  <span class="text"><span class="textHeader">Narration: </span>${itemDescription}</span>
              </div>
              <div class="disclaimerBodyContainer">
                  <div class="disclaimerHeader">
                      Disclaimer
                  </div>
                  <div class="disclaimerBody">
                      Please note that transactions may be subject to interruption, transmission blackout,
                      delayed transmission and incorrect data transmission. The Bank is not liable for malfunctions in
                      communications facilities not within its control that may affect the accuracy or timeliness of
                      messages and transactions you send. All transactions are subject to verification and our normal
                      fraud checks.
                  </div>
              </div>
          </div>
      </div>
  </body>
  </html>`;

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html,
     });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  const goBackToPreviousScreen = () => {
    navigation.goBack();
  };

  const sendMoneyToHandler = () => {
    navigation.navigate("Transfer");
  };

  const onPressLearnMore = () => {
    return exit();
  };
  return (
    <View style={styles.container}>
    
      <View style={styles.bodyContainer}>
      <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Transaction Receipt</Text>
    </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.textHeader}>Sender Name: </Text>{itemSendersName}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.textHeader}>Receiver Name: </Text>{itemReceiversName}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.textHeader}>Beneficiary Amount: </Text>{itemAmount}</Text>
        </View>

        <View style={styles.textContainer}>
        <Text style={styles.text}><Text style={styles.textHeader}>Beneficiary Name: </Text>{itemAccount}</Text>
      </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}><Text style={styles.textHeader}>Narration: </Text>{itemDescription}</Text>
        </View>

       
        <View style={styles.disclaimerBodyContainer}>
        <View style={styles.disclaimerHeaderContainer}>
        <Text style={styles.disclaimerHeader}>Disclaimer</Text>
        </View>
        <Text style={styles.disclaimerBody}>Please note that transactions may be subject to interruption, 
        transmission blackout, 
        delayed transmission and incorrect data transmission. The Bank is not liable for malfunctions in 
        communications facilities not within its control that may affect the accuracy or timeliness of 
        messages and transactions you send.All transactions are subject to verification and our normal 
        fraud checks</Text>
        </View>
       
      </View>

      <View style={styles.buttonContainer}>

      <FlatButton  onPress={print}>
      <View style={styles.bigButton}>
      <Text style={styles.buttonText}>Save PDF</Text>
      <Ionicons name="save-outline" size={25} color={'white'} />
      </View>
     
      </FlatButton>


      <FlatButton  onPress={printToFile}>
      <View style={styles.bigButton}>
      <Text style={styles.buttonText}>Share PDF</Text>
      <Ionicons name="share-social-outline" size={25} color={'white'} />
      </View>
       </FlatButton>
      </View>
      
     <View>
     <FlatButton  onPress={goBackToPreviousScreen}>
     <View style={styles.bigButton}>
     <Text style={styles.buttonText}>back</Text>
     </View>
     </FlatButton>

     </View>
  
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    marginHorizontal: 20,
    marginVertical: 50,
  },
  text: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  textHeader: {
     fontWeight: 'bold'
  },
  headerText: {
     fontWeight: 'bold',
     fontSize: 25,
     color: Colors.primary600
  },
  headerContainer: {
     marginVertical: 27
  },
  textContainer: {
    borderBottomWidth: 0.9,
  },
  disclaimerBodyContainer: {
    backgroundColor: Colors.primary600,
    padding: 20,
    borderRadius: 10,
    marginTop: 30
  },
  disclaimerHeader: {
    fontWeight: 'bold',
    fontSize: 16.8,
    color: '#fff'
  },
  disclaimerBody: {
    color: '#fff',
    textAlign:"justify"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  bigButton: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignContent: 'center',
   backgroundColor: Colors.primary600,
   paddingHorizontal: 20,
   paddingVertical: 10,
   borderRadius: 15
  }, 
  buttonText: {
     color: '#fff'
  },
  backButton: {

  }

});

export default ReceiptPage;
