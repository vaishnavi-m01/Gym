import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Searchbar } from "react-native-paper";
import moment from "moment";
import axios from "axios";
import AttendancePage from "./components/attendance/AttendancePage";
import Toast from "react-native-toast-message";
import config from "./config";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Map backend image strings to actual require() references
const imageMap: Record<string, any> = {
  "../assets/images/member2.png": require("../assets/images/member2.png"),
  "../assets/images/member3.png": require("../assets/images/member3.png"),
};

type Member = {
  id: number;
  name: string;
  profile_picture: string | number;
  membership_status?: "Active" | "Inactive";
  attendance_status?: "Present" | "Absent" | null; 
};


// const initialMembers: Member[] = [
//   {
//     id: 1,
//     image: "../assets/images/member2.png",
//     name: "Hari",
//   },
//   {
//     id: 2,
//     image: "../assets/images/member2.png",
//     name: "Surya",
//   },
//   {
//     id: 3,
//     image: "../assets/images/member2.png",
//     name: "Sanjay",
//   },
//   {
//     id: 4,
//     image: "../assets/images/member2.png",
//     name: "Sankari",
//   },
//   {
//     id: 5,
//     image: "../assets/images/member2.png",
//     name: "Vaishu",
//   },
// ];

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"Attendance" | "Present" | "Absent">("Attendance");
  const [attendanceData, setAttendanceData] = useState<Member[]>();
  const [members, setMembers] = useState<Member[]>([]);
  const isFocused = useIsFocused();

  const currentDate = moment().format("dddd, D MMMM YYYY");
  
  useEffect(() => {
    if (isFocused) {
      fetchMembers();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      loadFromStorageOrFetch();
    }
  }, [isFocused]);
  
  const loadFromStorageOrFetch = async () => {
    const today = moment().format("YYYY-MM-DD");
    const savedDate = await AsyncStorage.getItem("attendanceDate");
    const savedData = await AsyncStorage.getItem("attendanceData");
  
    if (savedDate === today && savedData) {
      setMembers(JSON.parse(savedData)); 
    } else {
      await fetchMembers(); // make sure this also sets attendance_status to null
    }
  };
  
  

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/members/`);
      const membersFromAPI = response.data.data;
  
      if (Array.isArray(membersFromAPI)) {
        const formattedMembers: Member[] = membersFromAPI.map((member: any) => ({
          id: member.id,
          name: member.name,
          profile_picture: member.profile_picture
          ? `${config.BASE_URL}${member.profile_picture}`
          : require("../assets/images/member2.png"),
        
          membership_status: member.status === "active" ? "Active" : "Inactive",
          attendance_status: null,

        }));
  
        setMembers(formattedMembers);
      } else {
        console.warn("Unexpected data format:", response.data);
        setMembers([]);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to fetch members.");
    }
  };
  



  const handleAttendance = async (member: number, newStatus: "Present" | "Absent") => {
    const updated = members.map((item) =>
      item.id === member ? { ...item, attendance_status: newStatus } : item
    );
    setMembers(updated);
    await AsyncStorage.setItem("attendanceData", JSON.stringify(updated));
    await AsyncStorage.setItem("attendanceDate", moment().format("YYYY-MM-DD"));
  
    try {
      const response = await axios.post(`${config.BASE_URL}/attendance/`, {
        member,
        status: newStatus,
      });
  
  
      Alert.alert(
        "Success",
        `${response.data?.member_name || 'Member'} marked as ${newStatus}`,
        [{ text: "OK" }]
      );
      
    } catch (error) {
      Alert.alert(
        "Error",
        "Error submitting attendance",
        [{ text: "OK" }]
      );
      console.error("API Error:", error);
    }
  };
  

  const filteredData = members.filter((member) => {
    const matchesFilter =
      filter === "Attendance" || member.attendance_status === filter;
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  
  


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

      <Text style={styles.dateText}>{currentDate}</Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredData.map((item) => (
        <AttendancePage
        key={item.id}
        id={item.id}
        image={
          item.profile_picture
            ? { uri: String(item.profile_picture) }
            : require("../assets/images/member2.png")
        }

        name={item.name}
        membership_status={item.membership_status}
        onAttendanceChange={(id, status) => handleAttendance(id, status)}
        />
      
        ))}
      </ScrollView>
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
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
    marginBottom: 30,
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
    textAlign: "center",
  },
  activeFilterButtonText: {
    color: "white",
  },
  dateText: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
});



























// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   ToastAndroid,
// } from "react-native";
// import { Searchbar } from "react-native-paper";
// import moment from "moment";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import AttendancePage from "./components/attendance/AttendancePage";

// // Map backend image string -> actual require()
// const imageMap = {
//   "../assets/images/member2.png": require("../assets/images/member2.png"),
//   "../assets/images/member3.png": require("../assets/images/member3.png"),
// };

// type Member = {
//   id: number;
//   image: string;
//   name: string;
//   plan: string;
//   status?: "present" | "absent";
// };

// const Attendance = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filter, setFilter] = useState("Attendance");
//   const [attendanceData, setAttendanceData] = useState([]);
//   const currentDate = moment().format("dddd, D MMMM YYYY");

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const savedDate = await AsyncStorage.getItem("attendanceDate");
//         const savedData = await AsyncStorage.getItem("attendanceData");
//         const today = moment().format("YYYY-MM-DD");

//         if (savedDate === today && savedData) {
//           setAttendanceData(JSON.parse(savedData));
//         } else {
//           const res = await axios.get("https://your-api.com/members");
//           setAttendanceData(res.data);

//           await AsyncStorage.setItem("attendanceDate", today);
//           await AsyncStorage.removeItem("attendanceData");
//         }
//       } catch (error) {
//         console.error("Error loading attendance:", error);
//         ToastAndroid.show("Failed to load attendance", ToastAndroid.SHORT);
//       }
//     };

//     fetchMembers();
//   }, []);

//   const handleAttendance = async (id, newStatus) => {
//     const updated = attendanceData.map((item) =>
//       item.id === id ? { ...item, status: newStatus } : item
//     );
//     setAttendanceData(updated);

//     try {
//       const selected = attendanceData.find((item) => item.id === id);

//       await axios.post("https://your-api.com/attendance", {
//         name: selected?.name ?? "",
//         status: newStatus,
//         date: new Date().toISOString(),
//       });

//       await AsyncStorage.setItem("attendanceData", JSON.stringify(updated));

//       ToastAndroid.show(
//         `${selected?.name}'s attendance marked as ${newStatus}`,
//         ToastAndroid.SHORT
//       );
//     } catch (error) {
//       ToastAndroid.show(`Error submitting attendance`, ToastAndroid.SHORT);
//       console.error("API Error:", error);
//     }
//   };

//   const filteredData = attendanceData
//     .filter((member) =>
//       filter === "Attendance" ? true : member.status === filter.toLowerCase()
//     )
//     .filter((member) =>
//       member.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//   return (
//     <View style={styles.containers}>
//       <Searchbar
//         placeholder="Search.."
//         onChangeText={setSearchQuery}
//         value={searchQuery}
//         style={styles.searchbar}
//       />

//       <View style={styles.buttons}>
//         {["Attendance", "Present", "Absent"].map((status) => (
//           <TouchableOpacity
//             key={status}
//             style={[
//               styles.filterButton,
//               filter === status && styles.activeFilterButton,
//             ]}
//             onPress={() => setFilter(status)}
//           >
//             <Text
//               style={[
//                 styles.filterButtonText,
//                 filter === status && styles.activeFilterButtonText,
//               ]}
//             >
//               {status}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Text style={styles.dateText}>{currentDate}</Text>

//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         {filteredData.map((item) => (
//           <AttendancePage
//             key={item.id}
//             id={item.id}
//             image={imageMap[item.image] ?? require("../assets/images/member2.png")}
//             name={item.name}
//             status={item.status}
//             onAttendanceChange={handleAttendance}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default Attendance;

// const styles = StyleSheet.create({
//   containers: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#ffffff",
//   },
//   searchbar: {
//     margin: 10,
//     width: "95%",
//     height: 50,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 10,
//   },
//   scrollView: {
//     marginBottom: 10,
//   },
//   buttons: {
//     paddingTop: 20,
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: 30,
//     gap: 10,
//   },
//   filterButton: {
//     borderRadius: 30,
//     padding: 10,
//     borderWidth: 1,
//     width: 100,
//     borderColor: "#000000",
//   },
//   activeFilterButton: {
//     backgroundColor: "#000000",
//   },
//   filterButtonText: {
//     color: "#000000",
//     fontSize: 12,
//     textAlign: "center",
//   },
//   activeFilterButtonText: {
//     color: "white",
//   },
//   dateText: {
//     color: "#000000",
//     fontSize: 17,
//     fontWeight: "bold",
//     marginLeft: 15,
//     marginBottom: 10,
//   },
// });