import { AntDesign, Entypo } from "@expo/vector-icons";
import { Image, View, Text, StyleSheet } from "react-native";
import ProfileMember from "./components/members/ProfileMember";
import { useState } from "react";

const member = [{
  id: 1,
  image: require("../assets/images/admin.png"),
  name: "John Doe",
  phoneNumber: "+1234567890",
  plan: "Premium",
  status: "Active",
}];

type members = {
  id: number;
  image: string ;
  name: string;
  phoneNumber: string;
  plan: string;
  status: string | undefined;
};
const AddMembership = () => {
   const [members, setMembers] = useState<members[]>([]);
 
 
  return (
    <View style={styles.container}>
       {member.map((item) => (
          <ProfileMember
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            phoneNumber={item.phoneNumber}
            plan={item.plan}
            status={item.status}
          />
        ))}
    
    </View>
  );
};

export default AddMembership;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff"

  },
  
});

