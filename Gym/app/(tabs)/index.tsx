import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dashboard from "../components/home/Dashboard";
import { useNavigation, useRouter } from "expo-router";


export default function HomeScreen() {
  const navigation = useNavigation();

  const handleClicks = () => {
    navigation.navigate("Profile" as never);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.headerTitle}> Hi, Velladurai Pandian </Text>
          <TouchableOpacity onPress={handleClicks}>
            <Image source={require('@/assets/images/adminImg.png')} style={styles.adminImg} />
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
    backgroundColor: "#ffffff"
  },
  subContainer: {
    paddingTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
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
    letterSpacing: 0.43
  },
  adminImg: {
    height: 50,
    width: 50,
    marginTop: 20
  },
  title: {
    height: 24,
    paddingLeft: 30,
    fontFamily: "Jost",
    letterSpacing: 0.34,
    fontWeight: 700,
    color: "#111827",
    fontSize: 20,
    marginBottom: 30
  },
  DashboardContainer: {
    marginTop: 50
  }
})