import { Text, View, StyleSheet, ScrollView } from "react-native"
import AttendancePage from "./components/attendance/AttendancePage"
import { useState } from "react";
import ExpiringDays from "./components/expiringDay/ExpiringDays";


const datas = [
    {
        id: 1,
        image: require("../assets/images/member2.png"),
        name: "Hari",
        duration: "10 Nov 2025 - 07 Feb 2026",
    },
    {
        id: 2,
        image: require("../assets/images/member2.png"),
        name: "Surya",
        duration: "10 Nov 2025 - 07 Feb 2026",
    },
    {
        id: 3,
        image: require("../assets/images/member2.png"),
        name: "sanjay",
        duration: "10 Nov 2025 - 07 Feb 2026",
    },
    {
        id: 4,
        image: require("../assets/images/member2.png"),
        name: "Sankari",
        duration: "10 Nov 2025 - 07 Feb 2026",
    },
    {
        id: 5,
        image: require("../assets/images/member2.png"),
        name: "Vaishu",
        duration: "10 Nov 2025 - 07 Feb 2026",
    },
    {
        id: 6,
        image: require("../assets/images/member2.png"),
        name: "Rasiga",
        duration: "10 Nov 2025 - 07 Feb 2026",
    },
    {
        id: 7,
        image: require("../assets/images/member2.png"),
        name: "Pavi",
        duration: "10 Nov 2025 - 07 Feb 2026",
    },
    {
        id: 8,
        image: require("../assets/images/member2.png"),
        name: "Madhavi",
        duration: "10 Nov 2025 - 07 Feb 2026",
    },
];
type Member = {
    id: number;
    image: string | number;
    name: string;
    duration: string;
};
const ExpiringDay = () => {
    const [members, setMembers] = useState<Member[]>([]);


    return (
        <View style={styles.containers}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}
            >
                {datas.map((item) => (
                    <ExpiringDays
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        duration={item.duration}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default ExpiringDay

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        padding: 10,
        backgroundColor: "#ffffff"
    },
    scrollView: {
        marginBottom: 10,
    },



})