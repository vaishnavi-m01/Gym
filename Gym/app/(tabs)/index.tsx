import {
  Image,
  Modal,
  Pressable,
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
import { AntDesign, Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [profile_picture, setProfileImage] = useState<{ uri: string } | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
      (navigation.navigate as Function)("Profile", { id });
    } else {
      console.warn("Profile ID not found yet!");
    }
  };

  const goToMessageTemplate = () => {
    setModalVisible(false);
    (navigation.navigate as Function)("Message Templates"); 
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subContainer}>

          <Text style={styles.headerTitle}>Hi, Velladurai Pandian</Text>

          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
              <AntDesign name="setting" size={22} color="black" style={styles.icon} />
            </TouchableOpacity>
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
        </View>

        <Text style={styles.title}>Dashboard</Text>
        <Dashboard />

        
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <View style={styles.templaterow}>
                <Pressable onPress={goToMessageTemplate}>
                  <View style={styles.modalRow}>
                    <Feather name="message-circle" size={22} color="black" style={styles.modalIcon} />
                    <Text style={styles.modalItem}>Message Template</Text>
                  </View>
                </Pressable>

              </View>

              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    backgroundColor: "#ffffff",
    paddingTop: 30
  },
  subContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Jost",
    fontWeight: "900",
    color: "#111827",
    letterSpacing: 0.43,
  },
  adminImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  title: {
    paddingLeft: 30,
    fontFamily: "Jost",
    fontWeight: "700",
    color: "#111827",
    fontSize: 20,
    marginBottom: 30,
  },
  icon: {
    padding: 5,
    marginLeft: 2
  },
  modalIcon: {
    marginRight: 3,
  },
  iconButton: {
    marginRight: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "transparent",
  },

  templaterow: {
    display: "flex",
    flexDirection: "row"
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
  },
  modalView: {
    position: "absolute",
    top: 90,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalItem: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "#1E3A8A",
  },
  modalClose: {
    marginTop: 15,
    fontSize: 16,
    color: "#DC2626",
  },
});
