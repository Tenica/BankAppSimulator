import { StyleSheet, View } from "react-native";



const Title = ({children}) => {
    return (<View style={styles.titleContainer}>
        {children}
        </View> );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#FAF9F6",
        marginBottom: 10,
        // Add shadow properties for iOS
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        // Add elevation for Android (elevation will automatically create a shadow)
        elevation: 5,
      },
      titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1f1f7a",
      }
})
 
export default Title;