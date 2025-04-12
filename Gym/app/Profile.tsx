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

type ImageFile = {
  uri: string;
  // name: string;
  // type: string;
};

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null); // Updated to store URI for image
  // const [profile_picture, setProfilePicture] = useState<ImageFile | null>(null); // Storing the file for upload
  const [profile_picture, setImage] = useState<any>(null);

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
        setProfileImage(`${config.BASE_URL}${profile_picture}`);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // const pickImage = async () => {
  //   setShowOptions(false); // 🔁 Immediately close options

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     base64: false,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const asset = result.assets[0];

  //     const uri = asset.uri;
  //     const base64 = asset.base64!;
  //     let fileExt = uri.split(".").pop()?.toLowerCase() || "jpg";
  //     let mimeType = `image/${fileExt === "jpg" ? "jpeg" : fileExt}`;

  //     // Fallback MIME type check for some Android URIs
  //     if (!mimeType.includes("/")) mimeType = "image/jpeg";

  //     const fileName = `profile.${fileExt}`;

  //     if (Platform.OS === "web") {
  //       const res = await fetch(uri);
  //       const blob = await res.blob();
  //       const file = new File([blob], fileName, { type: mimeType });
  //       setProfileImage(file);
  //     } else {
  //       const fileUri = FileSystem.cacheDirectory + fileName;
  //       await FileSystem.writeAsStringAsync(fileUri, base64, {
  //         encoding: FileSystem.EncodingType.Base64,
  //       });

  //       setProfileImage({
  //         uri: fileUri,
  //         name: fileName,
  //         type: mimeType,
  //       });
  //     }
  //   }
  // };

  // const pickImage = async () => {
  //   setShowOptions(false); // Close the options immediately

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //     base64: false,
  //   });

  //   if (!result.canceled && result.assets?.length > 0) {
  //     const image = result.assets[0];

  //     // Update UI immediately
  //     setProfileImage(image.uri);

  //     const fileType = image.uri.split(".").pop();
  //     const mimeType = `image/${fileType === "jpg" ? "jpeg" : fileType}`;

  //     const file: ImageFile = {
  //       uri: image.uri,
  //       // name: `profile.${fileType}`,
  //       // type: mimeType,
  //     };

  //     setProfilePicture(file); 

  //     console.log("profileee",profile_picture)
  //   }
  // };

  // console.log("state", profile_picture);

  // const openCamera = async () => {
  //   const permission = await ImagePicker.requestCameraPermissionsAsync();
  //   if (!permission.granted) {
  //     alert("Camera permission required!");
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //     base64: false,
  //   });

  //   if (!result.canceled && result.assets?.length > 0) {
  //     const image = result.assets[0];
  //     const fileType = image.uri.split(".").pop();
  //     const mimeType = `image/${fileType === "jpg" ? "jpeg" : fileType}`;
  //     const fileName = `profile.${fileType}`;

  //     // Update UI immediately
  //     setProfileImage(image.uri);

  //     const file: ImageFile = {
  //       uri: image.uri,
  //       // name: fileName,
  //       // type: mimeType,
  //     };

  //     setProfilePicture(file); // Save the file for upload
  //   }
  // };

  // const saveProfile = async () => {
  //   const formData = new FormData();
  //   formData.append("email", email);
  //   formData.append("name", name);
  //   formData.append("phone_number", phone_number);
  
  //   if (profile_picture) {
  //     const uri = profile_picture.uri;
  
  //     try {
  //       const response = await fetch(uri); 
  //       const blob = await response.blob();
  
  //       const fileExtension = uri.split('.').pop()?.toLowerCase() || "jpeg";
  //       const mimeType = `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`;
  
  //       formData.append("profile_picture", {
  //         uri,
  //         name: `profile.${fileExtension}`,
  //         type: mimeType,
  //       } as any); 
  //     } catch (err) {
  //       console.error("Error converting image to blob:", err);
  //     }
  //   }
  
  //    console.log("formData",formData)
  //   try {
  //     const response = await axios.put(`${config.BASE_URL}/profile/${id}`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  
  //     const imgPath = response.data.profile_picture;
  //     const fullUrl = `${config.BASE_URL}/${imgPath}`;
  //     setProfileImage(fullUrl);
      
  //   } catch (error) {
  //     console.error("Failed to update profile:", error);
  //   }
  // };

  const pickImage = async () => {
    setShowOptions(false)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selected = result.assets[0];
      setImage(selected);
    }
  };

   console.log("stateee",profile_picture)
  

  const openCamera = async () => {
    setShowOptions(false)
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selected = result.assets[0];
      setImage(selected);
    }


  };



  const saveProfile = async () => {
    if (!profile_picture) {
      Alert.alert('Error', 'Please select an image first.');
      return;
    }

    try {
      // Step 1: Prepare image file
      const fileName = profile_picture.uri.split('/').pop() || 'image.jpg';
      const match = /\.(\w+)$/.exec(fileName);
      const extension = match?.[1] || 'jpg';
      const fileType = `image/${extension}`;

      let file: any;

      if (Platform.OS === 'web') {
        const response = await fetch(profile_picture.uri);
        const blob = await response.blob();
        file = new File([blob], fileName, { type: fileType });
      } else {
        file = {
          uri: profile_picture.uri,
          name: fileName,
          type: fileType,
        };
      }

      const formData = new FormData();
      formData.append('file', file);

      // Step 2: Upload image file to server
      const uploadResponse = await axios.post('http://192.168.1.10:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const uploadedFileName = uploadResponse.data.filename || fileName;

      // Step 3: Construct public image path
      const imagePath = `https://192.194.8/images/${uploadedFileName}`;

      // Step 4: Send profile update with image path
      const profileData = {
        name,
        email,
        phone_number,
        profile_picture: imagePath,
      };

      const response = await axios.put('http://192.168.1.10:8000/profile/2', profileData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Profile updated:', response.data);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error: any) {
      console.error('❌ Failed to update profile:', error.message);
      Alert.alert('Error', 'Failed to update profile. Check server logs.');
    }
  };
  
  

  return (
    <View style={styles.containers}>
      <View style={styles.profileContainer}>
        {profileImage && (
          <Image source={{ uri: profileImage }} style={styles.adminImg} />
        )}
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
