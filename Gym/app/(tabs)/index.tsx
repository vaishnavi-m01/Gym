import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Dashboard from "../components/dahboard/Dashboard";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import { useIsFocused, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [profile_picture, setProfileImage] = useState<{ uri: string } | null>(null);
  const [id, setId] = useState<string | null>(null);

  const { updatedImage } = (route.params as { updatedImage?: string }) || {};

  useEffect(() => {
    if (updatedImage && typeof updatedImage === "string") {
      const newImage = { uri: updatedImage };
      setProfileImage(newImage);
      AsyncStorage.setItem("profileImage", updatedImage); 
    }
  }, [updatedImage]);

  const loadStoredImage = async () => {
    const storedUri = await AsyncStorage.getItem("profileImage");
    if (storedUri) {
      setProfileImage({ uri: storedUri });
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/profile/`);
      const profile = response.data[0];
      if (profile) {
        setId(profile.id);

        if (!profile_picture) {
          setProfileImage({ uri: `${config.BASE_URL}${profile.profile_picture}` });
        }
      }
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadStoredImage();     
      fetchProfileData();    
    }
  }, [isFocused]);

  const handleClicks = () => {
    if (id) {
      (navigation.navigate as Function)("Profile", { id: id });
    } else {
      console.warn("Profile ID not found yet!");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.headerTitle}> Hi, Velladurai Pandian </Text>
          <TouchableOpacity onPress={handleClicks}>
            <Image
              source={
                profile_picture?.uri
                  ? { uri: profile_picture.uri }
                  : require("@/assets/images/adminImg.png")
              }
              style={styles.adminImg}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Dashboard</Text>
        <Dashboard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    backgroundColor: "#ffffff",
  },
  subContainer: {
    paddingTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  headerTitle: {
    textAlign: "left",
    alignSelf: "flex-start",
    alignContent: "flex-start",
    fontSize: 22,
    fontFamily: "Jost",
    fontWeight: "900",
    lineHeight: 90,
    color: "#111827",
    letterSpacing: 0.43,
  },
  adminImg: {
    height: 50,
    width: 50,
    marginTop: 20,
    borderRadius: 25,
  },
  title: {
    height: 24,
    paddingLeft: 30,
    fontFamily: "Jost",
    letterSpacing: 0.34,
    fontWeight: "700",
    color: "#111827",
    fontSize: 20,
    marginBottom: 30,
  },
  DashboardContainer: {
    marginTop: 50,
  },
});
