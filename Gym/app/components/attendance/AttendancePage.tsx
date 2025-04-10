import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

type Props = {
  id: number;
  image: ImageSourcePropType;
  name: string;
  status?: "present" | "absent";
  onAttendanceChange: (id: number, status: "present" | "absent") => void;
};

const AttendancePage: React.FC<Props> = ({
  id,
  image,
  name,
  status,
  onAttendanceChange,
}) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.button,
              status === "present" && styles.activePresent,
            ]}
            onPress={() => onAttendanceChange(id, "present")}
          >
            <Text style={styles.buttonText}>Present</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              status === "absent" && styles.activeAbsent,
            ]}
            onPress={() => onAttendanceChange(id, "absent")}
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
    justifyContent:"space-between",
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    top:20
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
});









































































