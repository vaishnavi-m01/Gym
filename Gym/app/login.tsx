import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, ScrollView } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter email and password!", ToastAndroid.SHORT);
      return;
    }
    router.replace("/(tabs)");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('@/assets/images/login.png')}
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Hi, Welcome Back</Text>
          <Text style={styles.subtitle}>Login to your account</Text>
        </View>
      </ImageBackground>

      <View style={styles.loginContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Your password"
            placeholderTextColor="gray"
            secureTextEntry={!showPassword}
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: 350,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
  },
  loginContainer: {
    padding: 20,
  },
  label: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "#1b1a18",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
