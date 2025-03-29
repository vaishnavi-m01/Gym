import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native"

const dashboardData = [
    { id: 1, image: require("../../../assets/images/totalMembers.png"), name: "Total Members", count: 14 },
    { id: 2, image: require("../../../assets/images/Attendance.png"), name: "Attendance", count: 10 },
    { id: 3, image: require("../../../assets/images/leads.png"), name: "Expiring Today", count: 4 },
    { id: 4, image: require("../../../assets/images/leads.png"), name: "Pending List", count: 2 },
    { id: 5, image: require("../../../assets/images/leads.png"), name: "Leads", count: 2 },

];
const Dashboard = () => {
    const navigation = useNavigation();
    const handleImgClick = (ImgName:string) =>{
        switch (ImgName) {
            case "Total Members":
              navigation.navigate("Members" as never);
              break;
            case "Attendance":
              navigation.navigate("Attendance" as never);
              break;
            case "Expiring Today":
              navigation.navigate("ExpiringDay" as never);
              break;
            case "Pending List":
              navigation.navigate("PendingList" as never);
              break;
              case "Leads":
                navigation.navigate("Leads" as never);
                break;
            default:
              console.warn("No screen available for this saree.");
          }

    }

    return (
        <View style={styles.container}>
            {dashboardData.map((item) => (
                <View style={styles.cardContainer}>
                    <TouchableOpacity style={styles.touchable} onPress={() => handleImgClick(item.name)}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.count}</Text>
                        <AntDesign name="right" size={18} color="gray" />
                    </TouchableOpacity>
                </View>
            ))}


        </View>
    )
}
export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    touchable: {
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "space-evenly", 
        width: "100%",
    },
    cardContainer: {
        display: "flex",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingVertical: 12,
        width: '90%',
        marginLeft: 20,
        marginBottom: 20,
        backgroundColor: 'black',
    },
    image: {
        paddingLeft: 10,
        height: 50,
        width: 50,
    },
    text: {
        fontSize: 16,
        fontFamily: "Jost",
        fontWeight: 900,
        color: "#FFFFFF"
    }
    
})