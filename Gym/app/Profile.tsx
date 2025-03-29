import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ChangePassword from "./components/home/ChangePassword";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [_reviews, setReviews] = useState<any[]>([]);

  const handleNewReview = (newReview: any) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };
  return (
    <View style={styles.containers}>
      <Image
        source={require("@/assets/images/adminImg.png")}
        style={styles.adminImg}
      />

      <Text style={styles.loginText}>Name</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputbox}
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
        />
      </View>

      <Text style={styles.loginText}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputbox}
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Text style={styles.loginText}>Phone</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputbox}
          placeholderTextColor="gray"
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <ChangePassword onNewReview={handleNewReview}></ChangePassword>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 15,
  },
  adminImg: {
    height: 150,
    width: 150,
    marginTop: 10,
    alignSelf: "center",
    borderColor: "#76789b",
  },
  loginText: {
    color: "black",
    paddingLeft: 30,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 800,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 6,
    width: "85%",
    marginLeft: 30,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10, // Space between icon and input text
  },
  inputbox: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1b1a18",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "60%",
    marginLeft: 20,
    alignItems: "center",
    alignSelf: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
