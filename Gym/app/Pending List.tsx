import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native"
import PendingListComponent from "./components/pendingList/PendingListComponent";
import axios from "axios";
import config from "./config";
import { format, parse } from "date-fns";


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
    profile_picture: string | number;
    member_name: string;
    duration: string;
    pending_amount: number;
};

const PendingList = () => {
    const [members, setMembers] = useState<Member[]>([]);


    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
          const response = await axios.get(`${config.BASE_URL}/memberships/pending/`);
          const pending = response.data.data;
      
          if (Array.isArray(pending)) {
            const updated = pending.map((item, index) => {
              const [startStr, endStr] = item.duration.split(" - ");
      
              const start = parse(startStr, "dd/MM/yyyy", new Date());
              const end = parse(endStr, "dd/MM/yyyy", new Date());
      
              const formattedDuration = `${format(start, "dd MMM yyyy")} - ${format(end, "dd MMM yyyy")}`;
      
              return {
                ...item,
                id: index + 1, // fallback if no ID in API
                profile_picture: item.profile_picture.startsWith("http")
                  ? item.profile_picture
                  : `${config.BASE_URL}${item.profile_picture}`,
                duration: formattedDuration
              };
            });
      
            setMembers(updated);
          } else {
            console.warn("Unexpected data format:", response.data);
            setMembers([]);
          }
        } catch (error) {
          console.error("Failed to fetch plans:", error);
        }
      };
      
    return (
        <View style={styles.containers}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}
            >
                {members.map((item) => (
                    <PendingListComponent
                        key={item.id}
                        id={item.id}
                        image={item.profile_picture}
                        name={item.member_name}
                        pendingAmount={item.pending_amount}
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
        paddingTop: 50,
        backgroundColor: "#ffffff"
    },
    scrollView: {
        marginBottom: 10,
    }
})