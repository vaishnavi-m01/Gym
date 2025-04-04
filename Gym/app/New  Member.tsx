import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useNavigation } from "expo-router";

type FormErrors = {
  name?: string;
  phone_number?: string;
  email?: string;
  date_of_birth?: string;
  address?: string;
  password?: string;
  blood_group?: string;
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

  const navigation = useNavigation();

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (field: string, value: string) => {
    let errorMessage = "";

    switch (field) {
      // case "name":
      //   if (!value.match(/^[A-Za-z ]+$/))
      //     errorMessage = "Invalid Name (Only letters allowed)";
      //   break;
      case "phone":
        if (!value.match(/^\d{10}$/))
          errorMessage = "Phone number must be 10 digits";
        break;
      case "email":
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
          errorMessage = "Invalid Email Format";
        break;
      case "dob":
        if (!value.match(/^\d{2}-\d{2}-\d{4}$/))
          errorMessage = "Date must be in DD-MM-YYYY format";
        break;
      case "address":
        if (value.length < 10)
          errorMessage = "Address must be at least 30 characters";
        break;
      case "password":
        if (value.length < 6)
          errorMessage = "Password must be at least 6 characters";
        break;
      default:
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

  // const handleSubmit = async () => {
  //   if (!validateForm()) {
  //     Alert.alert("Validation Error", "Please fix errors before submitting.");
  //     return;
  //   }

  //   const requestData = {
  //     name,
  //     phone_number,
  //     email,
  //     date_of_birth,
  //     gender,
  //     blood_group,
  //     address,
  //     notes,
  //   };

  //   try {
  //     await axios.post("http://192.168.1.8:8001/members/create/", requestData);
  //     Alert.alert("Success", "Member added successfully!");
  //     console.log("data", requestData);

  //     navigation.navigate("AddMembership" as never);
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

  const handleSubmit =() =>{
    navigation.navigate("Add  Membership" as never);
  }

  return (
    <ScrollView>
      <View style={styles.containers}>
        <View style={styles.subContainers}>
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
            Number
            <Text style={styles.required}> *</Text>
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
          <Text style={styles.text}> Email</Text>
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
            multiline={true}
            numberOfLines={4}
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
            multiline={true}
            numberOfLines={4}
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
    backgroundColor: "#f8f8f8",
    elevation: 5,
    boxShadow: "#f8f8f8",
    shadowColor: "#f8f8f8",
    margin: 5,
  },
  text: {
    fontFamily: "Jost",
    fontWeight: 700,
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
    paddingLeft: 5,
  },
  inputbox: {
    flex: 1,
    fontSize: 17,
    color: "#62707D",
    fontFamily: "Jost",
    fontWeight: 600,
    paddingLeft: 15,
  },
  phoneContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 5,
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
  pickerStyle: {
    width: "30%",
  },
  mainPickerContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    gap: 3,
    marginRight: 20,
  },
  Numbertext: {
    fontFamily: "Jost",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 50,
    marginRight: 75,
  },
  codeInputContainer: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 6,
    width: "25%",
    marginBottom: 10,
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
    marginBottom: 20,
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
  },
  required: {
    color: "red",
    // fontSize: 16,
  },
});
