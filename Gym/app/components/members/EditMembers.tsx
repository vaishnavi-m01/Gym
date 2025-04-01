import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Toast from "react-native-toast-message";

// Define types
type ShopCreateIconsProps = {
  onChangePassword: (data: any) => void;
};

export default function EditMembers({
  onChangePassword,
}: ShopCreateIconsProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedCode, setSelectedCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("Male");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (field: string, value: string) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = `${field} is required`;
    } else if (field === "phone" && value.length < 10) {
      errorMessage = "Invalid phone number";
    }
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const handleSubmit = () => {
    if (
      !name ||
      !phone ||
      !email ||
      !dob ||
      !gender ||
      !bloodGroup ||
      address
    ) {
      Alert.alert("Error", "All required fields must be filled!");
      return;
    }

    const userData = {
      id: Math.random(),
      name,
      phone,
      email,
      dob,
      gender,
      bloodGroup,
      address,
      date: new Date().toISOString(),
    };

    onChangePassword(userData);
    Toast.show({ type: "success", text1: "Details Updated Successfully!" });
    setOpen(false);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
          <FontAwesome5 name="edit" size={20} color="#1230B4" />
        </TouchableOpacity>

        <Modal visible={open} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.text}>Name (Required)</Text>
              <TextInput
                style={styles.inputbox}
                placeholder="Enter name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  validateField("name", text);
                }}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <Text style={styles.text}>Phone (Required)</Text>
              <View style={styles.phoneContainer}>
                <Picker
                  selectedValue={selectedCode}
                  onValueChange={(itemValue) => setSelectedCode(itemValue)}
                  style={styles.pickerStyle}
                >
                  <Picker.Item label="+91 (India)" value="+91" />
                  <Picker.Item label="+1 (USA)" value="+1" />
                </Picker>
                <TextInput
                  style={styles.inputbox}
                  placeholder="9895xxxxxx"
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    validateField("phone", text);
                  }}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              <Text style={styles.text}>Email</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputbox}
                  placeholder="Enter email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    validateField("email", text);
                  }}
                  keyboardType="email-address"
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.text}>Date of Birth</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputbox}
                  placeholder="YYYY-MM-DD"
                  value={dob}
                  onChangeText={setDOB}
                />
              </View>
              {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

              <Text style={styles.text}>Gender (Required)</Text>
              <View style={styles.radioContainer}>
                <RadioButton.Group onValueChange={setGender} value={gender}>
                  <View style={styles.radioRow}>
                    <View style={styles.radioButton}>
                      <RadioButton value="Male" />
                      <Text style={styles.radioText}>MALE</Text>
                    </View>
                    <View style={styles.radioButton}>
                      <RadioButton value="Female" />
                      <Text style={styles.radioText}>FEMALE</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>

              <Text style={styles.text}>Blood Group</Text>
              <View style={styles.BloodPickerContainer}>
                <Picker
                  selectedValue={bloodGroup}
                  style={styles.inputbox}
                  onValueChange={(itemValue) => setBloodGroup(itemValue)}
                >
                  <Picker.Item label="Please select" value="" />
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="B-" value="B-" />
                  <Picker.Item label="O+" value="O+" />
                  <Picker.Item label="O-" value="O-" />
                  <Picker.Item label="AB+" value="AB+" />
                  <Picker.Item label="AB-" value="AB-" />
                </Picker>
              </View>

              <Text style={styles.text}>Address</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Enter address"
                multiline={true}
                numberOfLines={4}
                value={address}
                onChangeText={setAddress}
              />
              {errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Update Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Toast />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    marginBottom: 50,
  },
  button: { padding: 10 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  text: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  inputbox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  phoneContainer: { flexDirection: "row", gap: 10 },
  pickerStyle: { width: 100 },
  submitButton: {
    backgroundColor: "#1B1A18",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 6,
    width: "100%",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
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
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    marginLeft: 5,
    fontSize: 14,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    width: 150,
    alignSelf: "center",
    marginBottom: 10,
  },
  BloodPickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    marginBottom: 10,
  },
  textArea: {
    height: 130,
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    padding: 10,
    paddingLeft: 15,
    textAlignVertical: "top",
    color: "#62707D",
    gap: 2,
  },

  notesText: {
    color: "#62707D",
    fontSize: 16,
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
  //   errorText: {
  //     color: "red",
  //     fontSize: 14,
  //     marginBottom: 5,
  //   },
});
