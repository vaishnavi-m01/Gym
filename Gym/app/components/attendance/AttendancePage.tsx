import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

type AttendancePageProps = {
  id: number;
  image: any;
  name: string;
  membership_status?: "Active" | "Inactive";
  attendance_status?: "Present" | "Absent" | null; // <--- optional
  onAttendanceChange: (id: number, status: "Present" | "Absent") => void;
};

const AttendancePage: React.FC<AttendancePageProps> = ({
  id,
  image,
  name,
  membership_status,
  attendance_status: status,
  onAttendanceChange,
}) => {
  const [statuss, setStatus] = useState<"Present" | "Absent" | null>(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const todayKey = `attendance_${id}_${new Date().toISOString().split("T")[0]}`;

  useEffect(() => {
    const loadAttendance = async () => {
      const savedStatus = await AsyncStorage.getItem(todayKey);
      if (savedStatus === "Present" || savedStatus === "Absent") {
        setStatus(savedStatus);
      }
      
      // Disable buttons after 12:00 PM today
      const currentTime = moment();
      const noonTime = moment().set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
      if (currentTime.isAfter(noonTime)) {
        setButtonDisabled(true);
      }
    };
    loadAttendance();
  }, []);

  const handleAttendance = async (newStatus: "Present" | "Absent") => {
    await AsyncStorage.setItem(todayKey, newStatus);
    setStatus(newStatus);
    onAttendanceChange(id, newStatus);
  };

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            disabled={isButtonDisabled || statuss === "Present"} 
            style={[
              styles.button,
              statuss === "Present" && styles.activePresent,
              statuss !== "Present" && styles.inactiveButton,
              isButtonDisabled && styles.disabledButton, // Disable style after 12 PM
            ]}
            onPress={() => handleAttendance("Present")}
          >
            <Text style={styles.buttonText}>Present</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isButtonDisabled || statuss === "Absent"} // Disable if already marked or past 12 PM
            style={[
              styles.button,
              statuss === "Absent" && styles.activeAbsent,
              statuss !== "Absent" && styles.inactiveButton,
              isButtonDisabled && styles.disabledButton, // Disable style after 12 PM
            ]}
            onPress={() => handleAttendance("Absent")}
          >
            <Text style={styles.buttonText}>Absent</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AttendancePage;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E6EA",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    top: 20
  },
  buttons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 10,
    bottom: 12
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#ccc",
  },
  activePresent: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  activeAbsent: {
    backgroundColor: "#F44336",
    borderColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  inactiveButton: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
  disabledButton: {
    opacity: 0.6, 
  },
});
