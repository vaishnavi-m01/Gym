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
import { useRoute } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(
    require("@/assets/images/adminImg.png")
  );
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/profile/`);

        // if (response.data.profileImage) {
        //   setProfileImage({ uri: response.data.profileImage });
        // }

        // console.log("idddd", response.data.id)
        const profile = response.data[0];

        if (profile) {
          setId(profile.id);
          console.log("id", profile.id);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleClicks = () => {
    if (id) {
      (navigation.navigate as Function)("Profile", { id: id });
      console.log("id", id);
    } else {
      console.warn("Profile ID not found yet!");
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.headerTitle}> Hi, Velladurai Pandian </Text>
          <TouchableOpacity onPress={handleClicks}>
            <Image source={profileImage} style={styles.adminImg} />
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
    fontWeight: 900,
    lineHeight: 90,
    color: "#111827",
    letterSpacing: 0.43,
  },
  adminImg: {
    height: 50,
    width: 50,
    marginTop: 20,
  },
  title: {
    height: 24,
    paddingLeft: 30,
    fontFamily: "Jost",
    letterSpacing: 0.34,
    fontWeight: 700,
    color: "#111827",
    fontSize: 20,
    marginBottom: 30,
  },
  DashboardContainer: {
    marginTop: 50,
  },
  scrollView: {
    marginBottom: 10,
  },
});
