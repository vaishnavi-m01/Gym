import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native"
import MembersPage from "./components/dahboard/MembersPage";
import ProfileMemberDetails from "./components/members/ProfileMemberDetails";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
const member = [
    {
        id: 1,
        image: require("../assets/images/admin.png"),
        name: "John Doe",
        phoneNumber: "+1234567890",
        plan: "Premium",
        status: "Active",
    },
];


const MemberDetails = () => {

    const navigation =  useNavigation();

    const handleClick = ()=>{
      navigation.navigate("Add  Membership" as never)
    }
    return (
        <ScrollView>
            <View style={styles.container} >
                {member.map((item) => (
                    <ProfileMemberDetails
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        phoneNumber={item.phoneNumber}
                        plan={item.plan}
                        status={item.status}
                    />
                ))}
                <View style={styles.paymentContainer}>
                    <View style={styles.subContainers}>
                        <View style={styles.memberContents}>
                            <AntDesign name="pay-circle1" size={30} color="#F58E48" />
                            <Text style={styles.blanceText}>Balance</Text>
                        </View>
                        <Text style={styles.paymentStatus}>Fully Paid</Text>
                    </View>

                    <View style={styles.subContainers}>
                        <View style={styles.memberContents}>
                            <Text style={styles.blanceText}>Joined Date</Text>
                        </View>
                        <Text style={styles.joinedDate}>22 March 2025</Text>
                    </View>
                </View>

                <Text style={styles.text}>Memberships</Text>
                <View style={styles.membershipContainer}>
                    <View style={styles.membershipSubContainer}>
                        <Text style={styles.planText}>3month plan</Text>
                        <AntDesign name="arrowright" size={22} color="black" />
                    </View>
                    <View style={styles.durationContainer}>
                        <View style={styles.subDurationContainer}>
                            <Entypo
                                name="dot-single"
                                size={22}
                                color={"#1DAF60"}
                                style={styles.dotIcon}
                            />

                            <Text>Renewal due in 89 days</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={handleClick}>
                        <Text style={styles.buttonText}>Add Upcoming
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.transactionText}>Recent transaction</Text>
                <View style={styles.transactionContainer}>
                    <View style={styles.transactionSubContainer}>
                        <Text style={styles.title}>3month</Text>

                        <View style={styles.rightContainer}>
                            <Text style={styles.payementType}>UPI</Text>
                            <Text style={styles.amountText}>INR300</Text>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.durationText}>Duration: 18 Mar 2025 - 15 Jun 2025</Text>
                        <AntDesign name="arrowright" size={25} color="black"  />

                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default MemberDetails

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingBottom:60
    },
    subContainers: {

        borderWidth: 1,
        borderColor: "#E0E5E9",
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: "45%",
    },
    memberContents: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    blanceText: {
        fontSize: 19,
        fontFamily: "Jost",
        fontWeight: 600
    },
    paymentContainer: {
        display: "flex",
        flexDirection: "row"
    },
    paymentStatus: {
        fontSize: 17,
        fontFamily: "Jost",
        color: "#111827",
        fontWeight: 800,
        paddingLeft: 5,
        paddingTop: 10
    },
    joinedDate: {
        fontSize: 16,
        paddingTop: 15,
        color: "#111827",
        fontWeight: 800
    },
    text: {
        fontSize: 16,
        paddingTop: 15,
        color: "#111827",
        fontWeight: 700,
        paddingLeft: 13,
        marginBottom: 12
    },
    membershipContainer: {
        borderWidth: 1,
        borderColor: "#E0E5E9",
        padding: 15,
        margin: 10,
        borderRadius: 15,
        width: "90%",
    },
    planText: {
        color: "#111827",
        fontWeight: 500,
        fontSize: 16
    },
    membershipSubContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    durationContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#EFF0F4",
        padding: 5,
        borderRadius: 17,
        width: "70%",
        backgroundColor: "#EFF0F4",
    },
    subDurationContainer: {
        display: "flex",
        flexDirection: "row"
    },
    dotIcon: {
        fontWeight: 900,
    },
    submitButton: {
        backgroundColor: "#1B1A18",
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        padding: 10,
        marginTop: 20,
    },
    buttonText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 18,
    },
    transactionText: {
        marginTop: 20,
        padding: 5,
        paddingLeft: 15,
        fontWeight: 700,
        fontSize: 18,
        fontFamily: "Jost"
    },
    transactionContainer: {
        margin: 10,
        borderWidth: 1,
        borderColor: "#E0E5E9",
        borderRadius: 15,
        padding: 10,
        width: "90%"
    },
    transactionSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    title: {
        fontFamily: "Jost",
        fontWeight: 600,
        fontSize: 15,
        color: "#111827"
    },
    payementType: {
        borderWidth: 1,
        borderColor: "#E3E4E8",
        backgroundColor: "#E3E4E8",
        borderRadius: 15,
        width: 50,
        padding: 1,
        color: "#090A0E",
        textAlign: "center",
        fontWeight: 700,
    },
    rightContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 10
    },
    amountText: {
        fontSize: 16,
        fontWeight: 700,
        paddingTop: 0,
    },
    durationText:{
        padding:10,
        paddingBottom: 3,
        color: "#666A75"
    }
})