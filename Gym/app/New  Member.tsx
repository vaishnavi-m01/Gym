import { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useNavigation } from "expo-router";
import config from "./config";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Asset } from "expo-asset";
import { useMember } from "./context/MemberContext";
import { RootStackParamList } from "./navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type AddMembershipParams = {
  profile_picture: string;
  phone_number: string;
  status: string;
  gender: string;
};

type AddMembershipNav = NativeStackNavigationProp<RootStackParamList, "Add Membership">;



type FormErrors = {
  name?: string;
  phone_number?: string;
  email?: string;
  date_of_birth?: string;
  address?: string;
};

const NewMember = () => {
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const [gender, setGender] = useState("Male");
  const [blood_group, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const { setMember } = useMember();
  const navigation = useNavigation();
  const navigationById = useNavigation<AddMembershipNav>();




  const [showOptions, setShowOptions] = useState(false);
  const [isImagePicked, setIsImagePicked] = useState(false);


  const [profile_picture, setProfileImage] = useState<any>(
    require("../assets/images/member2.png")
  );
 
  

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (field: string, value: string) => {
    let errorMessage = "";

    switch (field) {
      case "name":
        if (!value.trim()) errorMessage = "Name is required.";
        break;
      case "phone":
        if (!value.match(/^\d{10}$/))
          errorMessage = "Phone number must be 10 digits";
        break;
      case "email":
        if (value && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
          errorMessage = "Invalid Email Format";
        break;
      case "dob":
        if (value && !value.match(/^\d{2}-\d{2}-\d{4}$/))
          errorMessage = "Date must be in DD-MM-YYYY format";
        break;

      case "address":
        if (value.length < 10)
          errorMessage = "Address must be at least 10 characters";
        break;
    }

    return errorMessage;
  };

  const validateForm = () => {
    let newErrors: FormErrors = {
      name: validateField("name", name),
      phone_number: validateField("phone", phone_number),
      // email: validateField("email", email),
      // date_of_birth: validateField("dob", date_of_birth),
      // address: validateField("address", address),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const formatDOBForBackend = (dob: string) => {
    if (!dob) return "";
    const [dd, mm, yyyy] = dob.split("-");
    return `${yyyy}-${mm}-${dd}`;
  };

  const pickImageFromGallery = async () => {
    setShowOptions(false);
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      
      setProfileImage({ uri: asset.uri });
      setIsImagePicked(true);          }
  };
  
  const pickImageFromCamera = async () => {
    setShowOptions(false);
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!result.canceled) {
      const asset = result.assets[0];
      const uri = asset.uri;
      
      setProfileImage({ uri: asset.uri });
      setIsImagePicked(true);       }
  };
  
  
  
  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please correct the form fields.");
      return;
    }
  
    const formData = new FormData();
  
    // Append fields
    if (name) formData.append("name", name);
    if (phone_number) formData.append("phone_number", phone_number);
    if (email) formData.append("email", email);
    if (date_of_birth) {
      formData.append("date_of_birth", formatDOBForBackend(date_of_birth));
    }
    if (blood_group) formData.append("blood_group", blood_group);
    if (gender) formData.append("gender", gender);
    if (address) formData.append("address", address);
    if (notes) formData.append("notes", notes);
  
    // ✅ If user picked image from camera/gallery
    if (isImagePicked && profile_picture?.uri) {
      const fileName = profile_picture.uri.split("/").pop();
      const fileType = fileName?.split(".").pop();
  
      formData.append("profile_picture", {
        uri: Platform.OS === "ios"
          ? profile_picture.uri.replace("file://", "")
          : profile_picture.uri,
        name: fileName || `photo.${fileType}`,
        type: `image/${fileType}`,
      } as any);
    } else {
      // ✅ Use local asset image if not picked from gallery/camera
      const asset = Asset.fromModule(require("../assets/images/member2.png"));
      await asset.downloadAsync(); // Make sure it's available
  
      const localUri = asset.localUri || asset.uri;
      const fileName = localUri.split("/").pop();
      const fileType = fileName?.split(".").pop();
  
      formData.append("profile_picture", {
        uri: localUri,
        name: fileName || `default.${fileType}`,
        type: `image/${fileType || "jpeg"}`,
      } as any);
    }
  
    try {
      const response = await axios.post(`${config.BASE_URL}/members/create/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const createdMember = response.data;
      setMember(createdMember);

      console.log("newMember",createdMember)
  
      Alert.alert("Success", "Member added successfully!");

      // (navigation.navigate as Function)('AddMembership', {
      //   profile_picture: profile_picture.uri,
      //   phone_number: phone_number,
      //   name: name,
      //   status: 'Active',
      //   gender: gender,
      // });

      // const { id } = route.params;
      console.log("Created member ID:", createdMember?.id);
      if (createdMember?.data?.id) {
        navigationById.navigate("Add Membership", { id: createdMember.data.id });
      }
          
      
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
  
      let errorMessage = "Failed to add member. Try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
  
      Alert.alert("Error", errorMessage);
    }
  };
  
  

  return (
    <ScrollView>
      <View style={styles.containers}>
        <View style={styles.subContainers}>
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
                <TouchableOpacity
                  onPress={pickImageFromGallery}
                  style={styles.optionButton}
                >
                  <MaterialIcons name="photo-library" size={20} color="black" />
                  <Text style={styles.optionText}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={pickImageFromCamera}
                  style={styles.optionButton}
                >
                  <MaterialIcons name="camera-alt" size={20} color="black" />
                  <Text style={styles.optionText}>Take Photo</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={styles.text}>
            Name <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputbox}
              placeholder="Enter name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErrors({ ...errors, name: validateField("name", text) });
              }}
            />
          </View>
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.text}>
            Number <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputbox}
              placeholder="9895xxxxxx"
              value={phone_number}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setErrors({
                  ...errors,
                  phone_number: validateField("phone", text),
                });
              }}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          {errors.phone_number && (
            <Text style={styles.errorText}>{errors.phone_number}</Text>
          )}

          <Text style={styles.text}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputbox}
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: validateField("email", text) });
              }}
              keyboardType="email-address"
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.text}>Date of Birth</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputbox}
              placeholder="DD-MM-YYYY"
              value={date_of_birth}
              onChangeText={(text) => {
                setDOB(text);
                setErrors({
                  ...errors,
                  date_of_birth: validateField("dob", text),
                });
              }}
            />
          </View>
          {errors.date_of_birth && (
            <Text style={styles.errorText}>{errors.date_of_birth}</Text>
          )}

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
              selectedValue={blood_group}
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
            multiline
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setErrors({ ...errors, address: validateField("address", text) });
            }}
          />
          {errors.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}

          <Text style={styles.text}>Notes</Text>
          <TextInput
            style={styles.textArea}
            placeholder={`1. Height: 170cm.\n2. Weight: 70kg.\n3. Admission No: 1234\n4. You can add any other notes here.`}
            multiline
            value={notes}
            onChangeText={setNotes}
          />

          <TouchableOpacity style={styles.sumbitButton} onPress={handleSubmit}>
            <Text style={styles.buttontext}>Add new membership</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewMember;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  subContainers: {
    // backgroundColor: "#f8f8f8",
    // elevation: 5,
  },

  profileContainer: {
    alignSelf: "center",
    position: "relative",
  },
  adminImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#E0E5E9",
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
  text: {
    fontFamily: "Jost",
    fontWeight: "700",
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
  },
  inputbox: {
    flex: 1,
    fontSize: 17,
    color: "#62707D",
    fontFamily: "Jost",
    fontWeight: "600",
    paddingLeft: 15,
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
  BloodPickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    width: "100%",
    alignSelf: "center",
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
    marginBottom: 20,
  },
  sumbitButton: {
    backgroundColor: "#1B1A18",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  buttontext: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
  },
  required: {
    color: "red",
  },
});
