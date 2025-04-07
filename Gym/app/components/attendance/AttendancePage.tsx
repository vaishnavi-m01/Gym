import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import EditMembers from "../members/EditMembers";
import { useState } from "react";

type members = {
  id: number;
  image: string | number;
  name: string;
  plan: string;
  status: string | undefined;
};
const AttendancePage = ({ image, name, plan, status }: members) => {
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
              <AntDesign
                name="delete"
                size={20}
                color="#F34E3A"
                style={style.deletIcon}
              />
              {/* <FontAwesome5 name="edit" size={20} color="#1230B4" /> */}
              <EditMembers
                onChangePassword={handleChangePassword}
              ></EditMembers>
            </View>
          </View>
        </View>
      </View>

     
      </View>
  );
};

export default AttendancePage;

const style = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E5E6EA",
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    borderRadius: 18,
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

  deletIcon: {
    bottom: 5,
  },
});
