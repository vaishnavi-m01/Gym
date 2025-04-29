import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import ExpiringDays from "./components/expiringDay/ExpiringDays";
import config from "./config";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

type Member = {
  id: number;
  profile_picture: string;
  member_name: string;
  duration: string;
};

const ExpiringDay = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const navigation = useNavigation<any>();
  const { id } = useLocalSearchParams();
  
  useEffect(() => {
    const fetchExpiringMembers = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/membership/expiring-today/`);
        const data = response.data.data;
        const formatted = data.map((item: any, index: number) => ({
          id: index + 1,
          profile_picture: item.profile_picture.startsWith("http")
            ? item.profile_picture
            : `${config.BASE_URL}${item.profile_picture}`,
          member_name: item.member_name,
          duration: item.duration,
        }));
    
        setMembers(formatted);
    } catch (error) {
        console.error("Failed to fetch expiring members:", error);
      }
    };

    fetchExpiringMembers();
  }, []);


  const handleClick = (id: number) => {
    navigation.navigate("Member Details", { id }); 
    console.log("expiringggg",id)
  };

  return (
    <View style={styles.containers}>
      {/* <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {members.map((item) => (
          <ExpiringDays
            key={item.id}
            id={item.id}
            image={item.profile_picture} 
            name={item.member_name}
            duration={item.duration}
          />
        ))}
      </ScrollView> */}

      <FlatList
        data={members}
        style={styles.scrollView}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleClick(item.id)}>
           <ExpiringDays
            key={item.id}
            id={item.id}
            image={item.profile_picture} 
            name={item.member_name}
            duration={item.duration}
          />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ExpiringDay;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    marginBottom: 10,
  },
});
