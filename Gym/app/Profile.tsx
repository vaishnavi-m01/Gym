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
import config from "./config";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [profile_picture, setProfileImage] = useState<any>(null);
  const [picture, setPicture] = useState<any>(null);

  const [showOptions, setShowOptions] = useState(false);
  const [_changePassword, setChangePassword] = useState<any[]>([]);

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

      console.log("image", profile_picture);

      if (profile_picture) {
        setProfileImage({ uri: `${config.BASE_URL}${profile_picture}` });
        console.log("profile", profile_picture);
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
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: false,
    });

    console.log("resu", result);
    setPicture(result);

    if (!result.canceled) {
      const image = result.assets[0];
      const fileType = image.uri.split(".").pop();

      setProfileImage({
        uri: image.uri,
        name: `profile.${fileType}`,
        type: `image/${fileType === "jpg" ? "jpeg" : fileType}`,
      });
    }

    console.log("imggg", profile_picture);
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
      base64: true, // we need base64 for conversion
    });

    if (!result.canceled) {
      const image = result.assets[0];
      const base64Data = image.base64;
      const fileType = image.uri.split(".").pop(); // e.g., jpg or png

      // Write the base64 image as a file in cache directory
      const fileUri = `${FileSystem.cacheDirectory}profile.${fileType}`;
      await FileSystem.writeAsStringAsync(fileUri, base64Data!, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setProfileImage({
        uri: fileUri,
        name: `profile.${fileType}`,
        type: `image/${fileType === "jpg" ? "jpeg" : fileType}`,
      });
    }
  };

  console.log("gallerys", profile_picture);

  const saveProfile = async () => {
    try {
      const formData = new FormData();
      let hasData = false;

      // Append basic fields if they exist
      if (email) {
        formData.append("email", email);
        hasData = true;
      }
      if (name) {
        formData.append("name", name);
        hasData = true;
      }
      if (phone_number) {
        formData.append("phone_number", phone_number);
        hasData = true;
      }

      // Handle profile picture
      if (profile_picture?.uri) {
        let imageUri = profile_picture.uri;
        let fileType = "";

        if (imageUri.startsWith("data:image")) {
          // Base64 image
          const match = imageUri.match(/^data:(image\/[a-zA-Z]+);base64,/);
          if (!match) {
            Alert.alert("Invalid image format");
            return;
          }

          const mimeType = match[1];
          fileType = mimeType.split("/")[1];

          formData.append("profile_picture", {
            uri: imageUri,
            name: `profile.${fileType}`,
            type: mimeType,
          } as any);
        } else {
          // Normal file URI
          fileType = imageUri.split(".").pop() || "jpg";

          formData.append("profile_picture", {
            uri: imageUri,
            name: `profile.${fileType}`,
            type: `image/${fileType === "jpg" ? "jpeg" : fileType}`,
          } as any);
        }

        hasData = true;
      }

      // Nothing to send
      if (!hasData) {
        Alert.alert("Nothing to update");
        return;
      }

      // Send to server
      const response = await axios.put(
        `${config.BASE_URL}/profile/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Success check
      if (response.data?.success) {
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Error", "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  console.log("output", profile_picture);

  // const saveProfile = async () => {
  //   try {
  //     const formData = new FormData();

  //     if (name) formData.append("name", name);
  //     if (email) formData.append("email", email);
  //     if (phone_number) formData.append("phone_number", phone_number);

  //     if (profile_picture?.uri) {
  //       const uriParts = profile_picture.uri.split("/");
  //       const fileName = uriParts[uriParts.length - 1];
  //       const fileType = fileName.includes(".")
  //         ? fileName.split(".").pop()
  //         : "jpg";

  //       formData.append("profile_picture", {
  //         uri: profile_picture.uri,
  //         name: fileName,
  //         type: `image/${fileType}`,
  //       } as any);
  //     }

  //     const response = await axios.put(
  //       `${config.BASE_URL}/profile/${id}/`,
  //       formData,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           // 'Content-Type': 'multipart/form-data', // optional: let axios set it
  //         },
  //       }
  //     );

  //     if (response.data.success) {
  //       Alert.alert("Success", "Profile updated successfully!");
  //     } else {
  //       Alert.alert("Error", "Failed to update profile.");
  //     }
  //   } catch (error) {
  //     console.error("Update error:", error);
  //     Alert.alert("Error", "Failed to update profile.");
  //   }
  // };

  // const handleSubmit = async () => {
  //   const requestData = {
  //     name,
  //     phone_number,
  //     email,
  //     profile_picture,
  //   };

  //   try {
  //     await axios.post(`${config.BASE_URL}/profile/`, requestData);
  //     Alert.alert("Success", "Member added successfully!");
  //     console.log("data", requestData);
  //   } catch (error: any) {
  //     console.error("API Error:", error.response?.data || error.message);

  //     let errorMessage = "Failed to add member. Try again.";
  //     if (error.response?.data?.message) {
  //       errorMessage = error.response.data.message;
  //     } else if (error.response?.data?.error) {
  //       errorMessage = error.response.data.error;
  //     }

  //     Alert.alert("Error", errorMessage);
  //   }
  // };

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
