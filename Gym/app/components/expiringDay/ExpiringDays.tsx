import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import EditMembers from "../members/EditMembers";

type members = {
  id: number;
  image: string | number;
  name: string;
  duration: string;
};
const ExpiringDays = ({ image, name, duration }: members) => {
  const [_changePassword, setChangePassword] = useState<any[]>([]);

  const handleChangePassword = (changePassword: any) => {
    setChangePassword((prevPasswor) => [changePassword, ...prevPasswor]);
  };

  return (
    <View style={style.container}>
      <View style={style.subcontainer}>
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={style.image}
        />

        <View style={style.textContainer}>
          <View style={style.numberNameRow}>
            <Text style={style.name}>{name}</Text>
            <View style={style.iconContainer}>
              <TouchableOpacity style={style.ReminderButton}>
                <Image
                  source={require('../../../assets/images/ReminderIcon.png')}
                  style={style.icon}
                /> 
                <Text style={style.buttonText}>Send Reminder</Text>
              </TouchableOpacity>
              <AntDesign name="right" size={22} color="#717171" style={style.arrowIcon} />

            </View>
          </View>
          <Text style={style.durationText}>Duration: {duration}</Text>
        </View>
      </View>


    </View>
  );
};

export default ExpiringDays;

const style = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E5E6EA",
    margin: 5,
    padding: 10,
    borderRadius: 400,
    marginBottom: 15
  },
  subcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  numberNameRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 8,
  },

  name: {
    color: "#000000",
    fontFamily: "Jost",
    fontSize: 16,
    fontWeight: "bold",
  },


  dot: {
    fontSize: 20,
  },

  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 8,
  },

  icon: {
    width: 20,
    height:20
  },

  ReminderButton: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F5FFD4",
    backgroundColor: "#F5FFD4",
    padding: 5,
    gap: 10
  },
  buttonText:{
    color:"#666A75"
  },
  arrowIcon:{
    bottom:5
  },
  durationText:{
    paddingTop:7,
    fontSize:12,
    color:"#73767D"
  }
});
