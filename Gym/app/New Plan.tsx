import { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

const NewPlan = () => {
  const [planName, setPlanName] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}> Plan Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputbox}
            onChangeText={setPlanName}
            placeholder="Enter plan name"
          />
        </View>
        <Text style={styles.text}> Plan amount</Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputbox} placeholder="Enter email" />
        </View>
        <Text style={styles.text}> Plan amount</Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputbox} placeholder="Enter email" />
        </View>
      </View>
      <TouchableOpacity style={styles.sumbitButton}>
        <Text style={styles.buttontext}>Confirm</Text>
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
  },
  text: {
    fontFamily: "Jost",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 50,
    paddingLeft: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: "100%",
    marginBottom: 10,
    paddingLeft: 5,
  },
  inputbox: {
    flex: 1,
    fontSize: 17,
    color: "#62707D",
    fontFamily: "Jost",
    fontWeight: 600,
    paddingLeft: 15,
    padding: 20,
  },
  sumbitButton: {
    backgroundColor: "#1B1A18",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginTop: 20,
    marginBottom: 30,
  },

  buttontext: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: 18,
  },
});
