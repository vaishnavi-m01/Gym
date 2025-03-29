import React from "react";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import MembersPage from "../components/home/MembersPage";

const datas = [
  {
    id: 1,
    image: require("../../assets/images/member1.png"),
    name: "Hari",
    number: "#RRRE0003",
    phoneNumber: "+929876543210",
    plan: "No Plan",
  },
  {
    id: 2,
    image: require("../../assets/images/member2.png"),
    name: "Surya",
    number: "#RRRE0002",
    phoneNumber: "+929876543210",
    plan: "One month",
    status: "Active",
  },
  {
    id: 3,
    image: require("../../assets/images/member3.png"),
    name: "sanjay",
    number: "#RRRE0003",
    phoneNumber: "+929876543210",
    plan: "One month",
    status: "Inactive",
  },
];
export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");

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
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}> + </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.membersButton}>
            <Text style={styles.buttonText}>All members</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activeMembersButton}>
            <Text style={styles.activeText}>Active members</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activeMembersButton}>
            <Text style={styles.activeText}>Inactive members</Text>
          </TouchableOpacity>
        </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.members}>Showing 3 members</Text>
        {datas.map((item) => (
          <MembersPage
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            number={item.number}
            phoneNumber={item.phoneNumber}
            plan={item.plan}
            status={item.status}
          />
        ))}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    paddingLeft: 25,
    fontWeight: 700,
    lineHeight: 90,
    fontSize: 20,
    fontFamily: "Jost",
  },
  header: {
    paddingLeft: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  searchbar: {
    width: "70%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  addButton: {
    fontSize: 25,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#1B1A18",
    color: "white",
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  addButtonText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 700,
    color: "white",
  },
  buttons: {
    paddingTop: 20,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    gap: 3,
  },
  membersButton: {
    borderRadius: 30,
    padding: 10,
    // width: "30%",
    textAlign: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
  },
  buttonText: {
    color: "#000000",
  },
  activeMembersButton: {
    borderRadius: 30,
    padding: 10,
    textAlign: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#000000",
  },
  activeText: {
    color: "white",
  },
  members: {
    fontFamily: "Jost",
    color: "#000000",
    fontWeight: 900,
    paddingTop: 30,
    paddingLeft: 25,
    fontSize: 18,
  },
  scrollView:{
    marginBottom:80
  }
});
