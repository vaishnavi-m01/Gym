import axios from "axios";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

const NewPlan = () => {
  const [planName, setPlanName] = useState("");
  const [planeAmount, setPlanAmount] = useState("");
  const [duration, setDuratioin] = useState("");

  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("Add  Membership" as never)
  }

  // Inside component
  // const handleClick = async () => {
  //   if (!planName || !planeAmount || !duration) {
  //     alert("Please fill all fields");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("https://your-api.com/plans", {
  //       planName,
  //       amount: Number(planeAmount),
  //       duration,
  //     });

  //     if (response.status === 201 || response.status === 200) {
  //       alert("Plan created successfully!");
  //       navigation.navigate("Add Membership" as never);
  //     } else {
  //       alert("Something went wrong!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error creating plan");
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Plan Name</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.inputbox}
          onChangeText={setPlanName}
          value={planName}
          placeholder="Enter plan name"
        />
      </View>

      <Text style={styles.label}>Plan Amount</Text>

      <View style={styles.inputRow}>
        <TextInput style={styles.inputbox} placeholder="Enter  amount"
          onChangeText={setPlanAmount}
          value={planeAmount}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>Duration</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.inputbox} placeholder="Enter duration"
          onChangeText={setDuratioin}
          value={duration} />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleClick}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    padding: 20,
    marginTop: 30
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: "100%",
    marginBottom: 10,
  },
  label: {
    padding: 15,
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
  },
  inputbox: {
    flex: 1, // Takes up remaining space
    fontSize: 17,
    color: "#62707D",
    fontWeight: "400",
    paddingVertical: 10,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: "#1B1A18",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
  },
});
