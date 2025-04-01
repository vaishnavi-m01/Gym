import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ChangePassword from "./components/dahboard/ChangePassword";
import axios from "axios"; 

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(require("@/assets/images/adminImg.png"));
  const [showOptions, setShowOptions] = useState(false);
  const [_changePassword, setChangePassword] = useState<any[]>([]);

  useEffect(() => {
    fetchProfile(); // ✅ Fetch user profile data from API on component mount
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("https://api.example.com/profile"); // Replace with your API
      const { name, email, phone, profileImage } = response.data;
      setName(name);
      setEmail(email);
      setPhone(phone);
      if (profileImage) {
        setProfileImage({ uri: profileImage });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleChangePassword = (changePassword: any) => {
    setChangePassword((prevPasswor) => [changePassword, ...prevPasswor]);
  };

  const pickImage = async () => {
    setShowOptions(false);
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const openCamera = async () => {
    setShowOptions(false);
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const saveProfile = async () => {
    try {
      const response = await axios.put("https://api.example.com/profile", {
        name,
        email,
        phone,
        profileImage: profileImage.uri || "",
      });

      if (response.data.success) {
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Error", "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  return (
    <View style={styles.containers}>
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.adminImg} />
        <TouchableOpacity style={styles.cameraIcon} onPress={() => setShowOptions(!showOptions)}>
          <MaterialIcons name="photo-camera" size={24} color="white" />
        </TouchableOpacity>

        {showOptions && (
          <View style={styles.optionBox}>
            <TouchableOpacity onPress={pickImage} style={styles.optionButton}>
              <MaterialIcons name="photo-library" size={20} color="black" />
              <Text style={styles.optionText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera} style={styles.optionButton}>
              <MaterialIcons name="camera-alt" size={20} color="black" />
              <Text style={styles.optionText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.loginText}>Name</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputbox} placeholderTextColor="gray" value={name} onChangeText={setName} />
      </View>

      <Text style={styles.loginText}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputbox} placeholderTextColor="gray" value={email} onChangeText={setEmail} />
      </View>

      <Text style={styles.loginText}>Phone</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputbox} placeholderTextColor="gray" value={phone} onChangeText={setPhone} />
      </View>

      <ChangePassword onChangePassword={handleChangePassword} />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
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
  profileContainer: {
    alignSelf: "center",
    position: "relative",
  },
  adminImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#76789b",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "black",
    padding: 5,
    borderRadius: 20,
  },
  optionBox: {
    position: "absolute",
    bottom: -50,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  optionText: {
    marginLeft: 5,
    fontSize: 14,
    color: "black",
  },
  loginText: {
    color: "black",
    paddingLeft: 30,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "800",
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
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
