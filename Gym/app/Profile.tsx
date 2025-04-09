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
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import config from "./config";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [profile_picture, setProfileImage] = useState<any>(null);

  const [showOptions, setShowOptions] = useState(false);
  const route = useRoute();
  const { id } = route.params as { id: string };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/profile/${id}`);
      const { name, email, phone_number, profile_picture } = response.data;
      setName(name);
      setEmail(email);
      setPhone(phone_number);
      if (profile_picture) {
        setProfileImage({ uri: `${config.BASE_URL}${profile_picture}` });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const pickImage = async () => {
    setShowOptions(false); // 🔁 Immediately close options
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const asset = result.assets[0];
  
      const uri = asset.uri;
      const base64 = asset.base64!;
      let fileExt = uri.split(".").pop()?.toLowerCase() || "jpg";
      let mimeType = `image/${fileExt === "jpg" ? "jpeg" : fileExt}`;
  
      // Fallback MIME type check for some Android URIs
      if (!mimeType.includes("/")) mimeType = "image/jpeg";
  
      const fileName = `profile.${fileExt}`;
  
      if (Platform.OS === "web") {
        const res = await fetch(uri);
        const blob = await res.blob();
        const file = new File([blob], fileName, { type: mimeType });
        setProfileImage(file);
      } else {
        const fileUri = FileSystem.cacheDirectory + fileName;
        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        setProfileImage({
          uri: fileUri,
          name: fileName,
          type: mimeType,
        });
      }
    }
  };
  
  
  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      const fileType = image.uri.split(".").pop();
      const fileName = `profile.${fileType}`;
      const mimeType = `image/${fileType === "jpg" ? "jpeg" : fileType}`;

      if (Platform.OS === "web") {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: mimeType });
        setProfileImage(file);
      } else {
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.writeAsStringAsync(fileUri, image.base64!, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setProfileImage({
          uri: fileUri,
          name: fileName,
          type: mimeType,
        });
      }
    }
  };

  const saveProfile = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("phone_number", phone_number);

    if (profile_picture) {
      if (Platform.OS === "web") {
        formData.append("profile_picture", profile_picture); 
      } else {
        formData.append("profile_picture", {
          uri: profile_picture.uri,
          name: profile_picture.name,
          type: profile_picture.type,
        } as any); 
      }
    }

    try {
      const res = await axios.put(`${config.BASE_URL}/profile/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Alert.alert("Success", "Profile updated successfully!");
    } catch (err: any) {
      console.error("Upload failed:", err.response?.data || err);
      Alert.alert("Upload failed", JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <View style={styles.containers}>
      <View style={styles.profileContainer}>
        <Image source={profile_picture} style={styles.adminImg} />
        <TouchableOpacity
          style={styles.cameraIcon}
          onPress={() => setShowOptions(!showOptions)}
        >
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
          value={phone_number}
          onChangeText={setPhone}
        />
      </View>

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
