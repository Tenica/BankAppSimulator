import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Title from "../UI/title";
import { PieChart, BarChart, YAxis } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const barChatData = {
  labels: ["Category 1", "Category 2", "Category 3"], // Labels for each bar
  datasets: [
    {
      data: [10, 20, 15], // Values for each bar
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color of the bars
    },
  ],
};


const data = [
  {
    name: "Success",
    count: 20, // Replace with your actual transaction count
    color: Colors.primary600,
    legendFontColor: "green",
    legendFontSize: 15,
  },
  {
    name: "Failed",
    count: 10, // Replace with your actual transaction count
    color: Colors.accent500,
    legendFontColor: "red",
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundColor: "transparent",
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const barChartConfig = {
  backgroundGradientFrom: "#FAF9F6",
  backgroundGradientTo: "#FAF9F6",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const Trends = () => {
  const text = "Send money to";
  return (
    <View style={styles.container}>
      <Title>
        <Ionicons name="chevron-back-outline" size={30} color="#1f1f7a" />
        <Text style={styles.titleText}>{text}</Text>
        <View style={styles.font}>
          <Ionicons name="close-outline" size={30} color="#1f1f7a" />
        </View>
      </Title>
      <View style={styles.panel}>
        <View>
          <PieChart
            data={data}
            width={300}
            height={200}
            chartConfig={chartConfig}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>

      <View style={styles.panel}>
        <View>
          <BarChart
            data={barChatData}
            width={screenWidth}
            height={200}
            chartConfig={barChartConfig}
            yAxisSuffix="T"
            fromZero
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
  },
  panel: {
    backgroundColor: "#FAF9F6",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary600,
    marginLeft: 10,
    paddingLeft: 2,
  },
  font: {
    marginLeft: 175,
  },
});

export default Trends;
