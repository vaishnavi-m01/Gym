import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "expo-router";
import axios from "axios";
import MembersPage from "../components/dahboard/MembersPage";

// Dummy fallback data
const datas = [
  {
    id: 1,
    image: require("../../assets/images/member1.png"),
    name: "Hari",
    phoneNumber: "+929876543210",
    plan: "No Plan",
  },
  {
    id: 2,
    image: require("../../assets/images/member2.png"),
    name: "Surya",
    phoneNumber: "+929876543210",
    plan: "One month",
    status: "Active",
  },
  {
    id: 3,
    image: require("../../assets/images/member3.png"),
    name: "sanjay",
    phoneNumber: "+929876543210",
    plan: "One month",
    status: "Inactive",
  },
];

type Member = {
  id: number;
  image: string | number;
  name: string;
  phoneNumber: string;
  plan: string;
  status?: "Active" | "Inactive";
};

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://192.168.1.8:8001/members/");

      if (Array.isArray(response.data)) {
        setMembers(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch members.");
       setMembers(datas); 
    } finally {
      setLoading(false);
    }
  };

  const getFilteredMembers = () => {
    const query = searchQuery.toLowerCase();
  
    return members
      .filter((member) => filter === "All" || member.status === filter)
      .filter((member) =>
        member.name.toLowerCase().includes(query) ||
        member.phoneNumber.toLowerCase().includes(query) ||
        member.plan.toLowerCase().includes(query)
      );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Members</Text>

      <View style={styles.header}>
        <Searchbar
          placeholder="Search.."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("New  Member" as never)}
        >
          <Text style={styles.addButtonText}> + </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        {["All", "Active", "Inactive"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filter === status && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(status as "All" | "Active" | "Inactive")}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === status && styles.activeFilterButtonText,
              ]}
            >
              {status} Members
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="black" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.members}>
            Showing {getFilteredMembers().length} members
          </Text>

          {getFilteredMembers().length > 0 ? (
            getFilteredMembers().map((item) => (
              <MembersPage
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                phoneNumber={item.phoneNumber}
                plan={item.plan}
                status={item.status}
              />
            ))
          ) : (
            <Text style={styles.emptyMessage}>No members found.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#ffffff",
  },
  title: {
    paddingLeft: 25,
    fontWeight: "700",
    paddingTop: 20,
    fontSize: 20,
    fontFamily: "Jost",
  },
  header: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  searchbar: {
    width: "70%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1A18",
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 25,
    fontWeight: "700",
    color: "white",
  },
  buttons: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  filterButton: {
    borderRadius: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
  },
  activeFilterButton: {
    backgroundColor: "#000000",
  },
  filterButtonText: {
    color: "#000000",
    fontSize: 12,
  },
  activeFilterButtonText: {
    color: "white",
  },
  loader: {
    marginTop: 20,
  },
  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  scrollView: {
    marginBottom: 80,
  },
  members: {
    fontFamily: "Jost",
    color: "#000000",
    fontWeight: "900",
    paddingTop: 30,
    paddingLeft: 25,
    fontSize: 18,
    marginBottom: 10,
  },
});
