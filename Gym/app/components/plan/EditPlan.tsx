import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  BackHandler,
} from "react-native";
import Toast from "react-native-toast-message";



export default function EditPlan() {
  const [open, setOpen] = useState(false);
  const [planName, setPlanName] = useState("");
  const [planAmount, setPlanAmount] = useState("");
  const [planDuration, setPlanDuration] = useState("");


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (open) {
          setOpen(false);
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [open]);

  const handleSubmit = () => {
    if (!planName || !planAmount || !planDuration) {
      Alert.alert("Error", "All required fields must be filled!");
      return;
    }

    const userData = {
      id: Math.random(),
      planName,
      planAmount,
      planDuration,
    };

    Toast.show({ type: "success", text1: "Details Updated Successfully!" });
    setOpen(false);
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
          <FontAwesome5 name="edit" size={20} color="#1230B4" />
        </TouchableOpacity>

        <Modal visible={open} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Cancel (X) Button */}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setOpen(false)}
              >
                <FontAwesome5 name="times" size={20} color="black" />
              </TouchableOpacity>

              <ScrollView
                keyboardShouldPersistTaps="handled"
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.titleLabel}>Edit Plan </Text>
                <Text style={styles.label}>Plan Name</Text>
                <TextInput
                  style={styles.input}
                  value={planName}
                  onChangeText={setPlanName}
                />
                <Text style={styles.label}>Plan amount</Text>
                <TextInput
                  style={styles.input}
                  value={planAmount}
                  onChangeText={setPlanAmount}
                />

                <Text style={styles.label}>Plan duration in days</Text>
                <TextInput
                  style={styles.input}
                  value={planDuration}
                  onChangeText={setPlanDuration}
                />

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Update Details</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <Toast />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  button: { padding: 5 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  titleLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
    width: "90%",
    position: "relative",
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  mainPickerContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    gap: 3,
    marginRight: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    width: 120,
    alignSelf: "center",
    marginBottom: 10,
  },
  phoneinputContainer: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 6,
    width: "60%",
    marginBottom: 10,
  },
  text: {
    fontFamily: "Jost",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 50,
  },
  BloodPickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
  },
  inputbox: {
    flex: 1,
    fontSize: 17,
    color: "#62707D",
    fontFamily: "Jost",
    fontWeight: 600,
    paddingLeft: 15,
  },
  required: {
    color: "red",
    fontSize: 16,
  },
  cancelButton: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E0E5E9",
    borderRadius: 15,
    alignSelf: "center",
    marginBottom: 10,
  },
  picker: {
    width: 120,
  },
  phoneInput: {
    flex: 1,
  },

  radioContainer: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    padding: 10,
    width: "100%",
  },
  radioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 75,
    alignItems: "center",
  },
  radioButton: { flexDirection: "row", alignItems: "center" },
  radioText: { marginLeft: 5, fontSize: 14 },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#1B1A18",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16 },
  errorText: { color: "red", fontSize: 14, marginBottom: 5 },
});
