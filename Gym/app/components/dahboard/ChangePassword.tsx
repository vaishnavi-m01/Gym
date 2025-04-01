import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message"; // Optional for better UI

type ShopCreateIconsProps = {
  onChangePassword: (review: any) => void;
};

export default function ChangePassword({ onChangePassword }: ShopCreateIconsProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (!name || !reviewText || rating === 0) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const newReview = {
      id: Math.random(),
      name,
      reviewText,
      rating,
      verified: false,
      date: new Date().toLocaleDateString(),
    };

    onChangePassword(newReview); // ✅ Instantly update UI

    fetch("https://your-api.com/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then(() => Toast.show({ type: "success", text1: "Review Submitted!" }))
      .catch(() => Toast.show({ type: "error", text1: "Submission Failed!" }));

    setOpen(false);
    setName("");
    setReviewText("");
    setRating(0);
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
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.loginText}>New Password</Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setOpen(false)}
              >
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
    fontWeight: 500,
    color: "#585858",
    textAlign: "center"
  },
  buttonText: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 500,
    color: "#FFFFFF",
    textAlign: "center"
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
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
    fontWeight: 800,
  },
  saveButton:{
    marginTop: 10,
    backgroundColor: "#1b1a18",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignContent: "center",
    alignSelf: "center",
    width: "80%"
  }
});
