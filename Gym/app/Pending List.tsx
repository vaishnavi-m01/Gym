import { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native"
import PendingListComponent from "./components/pendingList/PendingListComponent";

const datas = [
    {
        id: 1,
        image: require("../assets/images/member2.png"),
        name: "Hari",
        duration: "10 Nov 2025 - 07 Feb 2026",
        pendingAmount: 2700
    }, 
    {
        id: 2,
        image: require("../assets/images/member2.png"),
        name: "Surya",
        duration: "10 Nov 2025 - 07 Feb 2026",
        pendingAmount: 2700

    },
    {
        id: 3,
        image: require("../assets/images/member2.png"),
        name: "sanjay",
        duration: "10 Nov 2025 - 07 Feb 2026",
        pendingAmount: 2700


    },
    {
        id: 4,
        image: require("../assets/images/member2.png"),
        name: "Sankari",
        duration: "10 Nov 2025 - 07 Feb 2026",
        pendingAmount: 2700

    },
    {
        id: 5,
        image: require("../assets/images/member2.png"),
        name: "Vaishu",
        duration: "10 Nov 2025 - 07 Feb 2026",
        pendingAmount: 2700

    },
    {
        id: 6,
        image: require("../assets/images/member2.png"),
        name: "Rasiga",
        duration: "10 Nov 2025 - 07 Feb 2026",
        pendingAmount: 2700
    },
    {
        id: 7,
        image: require("../assets/images/member2.png"),
        name: "Pavi",
        duration: "10 Nov 2025 - 07 Feb 2026",
        pendingAmount: 2700

    },
    {
        id: 8,
        image: require("../assets/images/member2.png"),
        name: "Madhavi",
        duration: "10 Nov 2025 - 07 Feb 2026",
        pendingAmount: 2700

    }
];
type Member = {
    id: number;
    image: string | number;
    name: string;
    duration: string;
    pendingAmount: number;
};
const PendingList = () => {
    const [members, setMembers] = useState<Member[]>([]);

    return (
        <View style={styles.containers}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}
            >
                {datas.map((item) => (
                    <PendingListComponent
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        pendingAmount={item.pendingAmount}
                        duration={item.duration}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default PendingList

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        padding: 10,
        paddingTop:50,
        backgroundColor: "#ffffff"
    },
    scrollView: {
        marginBottom: 10,
    }
})