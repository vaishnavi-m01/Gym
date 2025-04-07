import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Searchbar } from "react-native-paper"
import MembersPage from "./components/dahboard/MembersPage";
import AttendancePage from "./components/attendance/AttendancePage";

const datas = [
    {
        id: 1,
        image: require("../assets/images/member2.png"),
        name: "Hari",
        plan: "No Plan",
    },
    {
        id: 2,
        image: require("../assets/images/member2.png"),
        name: "Surya",
        plan: "One month",
        status: "Active",
    },
    {
        id: 3,
        image: require("../assets/images/member2.png"),
        name: "sanjay",
        plan: "One month",
        status: "Inactive",
    },
    {
        id: 4,
        image: require("../assets/images/member2.png"),
        name: "Sankari",
        plan: "No Plan",
    },
    {
        id: 5,
        image: require("../assets/images/member2.png"),
        name: "Vaishu",
        plan: "No Plan",
    },
    {
        id: 6,
        image: require("../assets/images/member2.png"),
        name: "Rasiga",
        plan: "No Plan",
    },
    {
        id: 7,
        image: require("../assets/images/member2.png"),
        name: "Pavi",
        plan: "No Plan",
    },
    {
        id: 8,
        image: require("../assets/images/member2.png"),
        name: "Madhavi",
        plan: "No Plan",
    },
];
type Member = {
    id: number;
    image: string | number;
    name: string;
    phoneNumber: string;
    plan: string;
    status?: "Present" | "Absent";
};

const Attendance = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<"Attendance" | "Present" | "Absent">("Attendance");
    const [members, setMembers] = useState<Member[]>([]);



    return (
        <View style={styles.containers}>
            <Searchbar
                placeholder="Search.."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchbar}
            />

            <View style={styles.buttons}>
                {["Attendance", "Present", "Absent"].map((status) => (
                    <TouchableOpacity
                        key={status}
                        style={[
                            styles.filterButton,
                            filter === status && styles.activeFilterButton,
                        ]}
                        onPress={() => setFilter(status as "Attendance" | "Present" | "Absent")}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === status && styles.activeFilterButtonText,
                            ]}
                        >
                            {status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}
            >
                {datas.map((item) => (
                    <AttendancePage
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        plan={item.plan}
                        status={item.status}
                    />
                ))}
            </ScrollView>
        </View>

    )
}

export default Attendance

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        padding: 10,
        backgroundColor: "#ffffff"
    },
    searchbar: {
        margin: 10,
        width: "95%",
        height: 50,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
    },
    scrollView: {
        marginBottom: 10,
    },
    buttons: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom:30,
        gap: 10,
    },
    filterButton: {
        borderRadius: 30,
        padding: 10,
        borderWidth: 1,
        width: 100,
        borderColor: "#000000",
    },
    activeFilterButton: {
        backgroundColor: "#000000",
    },
    filterButtonText: {
        color: "#000000",
        fontSize: 12,
        textAlign: "center"
    },
    activeFilterButtonText: {
        color: "white",
    },
    loader: {
        marginTop: 20,
    },
    attendanceContainer: {
        display: "flex",
        flexDirection: "row"
    }

})