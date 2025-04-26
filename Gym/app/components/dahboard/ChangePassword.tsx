import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import axios, { AxiosError } from "axios";

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (!old_password || !new_password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Both fields are required",
      });
      return;
    }

    try {
      const response = await axios.post("https://your-api.com/change-password", {
        old_password,
        new_password,
      });

      Toast.show({
        type: "success",
        text1: "Password Updated",
        text2: "Your password has been changed successfully",
      });

      // Close modal and reset fields
      setOpen(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      const error = err as AxiosError<any>;

      Toast.show({
        type: "error",
        text1: "Change Failed",
        text2: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.buttontext}>Change Password?</Text>
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.loginText}>Old Password</Text>
            <TextInput
              style={styles.input}
              value={old_password}
              onChangeText={setOldPassword}
              secureTextEntry
              placeholder="Enter old password"
            />

            <Text style={styles.loginText}>New Password</Text>
            <TextInput
              style={styles.input}
              value={new_password}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Enter new password"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
              <Text style={styles.buttonText}>Save changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    paddingRight: 30,
    paddingTop: 5,
  },
  buttontext: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    color: "#585858",
    textAlign: "center",
  },
  buttonText: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    marginTop: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    width: 300,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
  },
  loginText: {
    color: "black",
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "800",
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#1b1a18",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
    width: "80%",
  },
});
