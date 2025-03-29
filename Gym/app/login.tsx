import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, ScrollView } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleRegister = () => {
    router.replace("/(tabs)");
  }

  // const handleRegister = async () => {
  //   if (!email || !password) {
  //     ToastAndroid.show("Please enter email and password!", ToastAndroid.SHORT);
  //     return;
  //   }
  //   try {
  //     const response = await axios.post("http://192.169.12/login", {
  //       email,
  //       password
  //     });
  //     ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
  //     router.replace("/(tabs)");
  //   }
  //   catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const errorMessage = error.response?.data?.message || "Login Failed! Try again.";
  //       ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
  //     } else {
  //       ToastAndroid.show("An unexpected error occurred.", ToastAndroid.SHORT);
  //     }
  //   }
  // };

  return (
    <ScrollView style={{
      backgroundColor: "#ffffff"
    }}>
      <View style={styles.container}>
        <ImageBackground
          source={require('@/assets/images/login.png')}
          style={styles.image}
        >
          {/* Text inside the image at the bottom */}
          <View style={styles.overlay}>
            <Text style={styles.text}>Hi, Welcome Back</Text>
            <Text style={styles.subText}>Login to your account</Text>

          </View>

        </ImageBackground>


        <View style={styles.loginContainer}>

          <Text style={styles.loginText}>Email</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
            <TextInput
              style={styles.inputbox}
              placeholder="Your email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <Text style={styles.loginText}>Password</Text>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="folder-key-outline" size={24} color="gray" style={styles.icon} />

            <TextInput
              style={styles.inputbox}
              placeholder="Your password"
              placeholderTextColor="gray"
              secureTextEntry={!showPassword} // Toggle visibility
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>


          <TextInput
            style={styles.inputbox}

          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>


        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ffffff"
  },
  image: {
    width: 360,
    height: 350,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    paddingLeft: 20,
    width: '100%',
    paddingBottom: 20,
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    // backgroundColor: "#f7f8f9"
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  loginContainer: {
    marginTop: 20,
  },
  loginText: {
    color: "black",
    paddingLeft: 20,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold"

  },
  button: {
    backgroundColor: "#1b1a18",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "90%",
    marginLeft: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: '90%',
    marginLeft: 20,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10, // Space between icon and input text
  },
  inputbox: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default LoginScreen;
