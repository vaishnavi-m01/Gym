import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import EditMembers from "../members/EditMembers";
import { useState } from "react";

type members = {
  id: number;
  image: string | number;
  name: string;
  number: string;
  phoneNumber: string;
  plan: string;
  status: string | undefined;
};
const MembersPage = ({
  image,
  name,
  number,
  phoneNumber,
  plan,
  status,
}: members) => {
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
          <View
           style={style.numberNameRow}>
            <Text style={style.name}>{name}</Text>
            <Text style={style.number}>{number}</Text>
            <View style={style.iconContainer}>
              <AntDesign name="delete" size={22} color="#F34E3A" style={style.deleteIcon} />
              {/* <FontAwesome5 name="edit" size={20} color="#1230B4" /> */}
              <EditMembers onChangePassword={handleChangePassword} ></EditMembers>
            </View>

          </View>
          <Text style={style.phoneNumber}>{phoneNumber}</Text>
        </View>


      </View>

      <View style={style.bottomContainer}>
        <Text style={style.plan}>{plan}</Text>
        {status && (
          <View
            style={[
              style.status,
              status === "Active" ? style.activeStatus : style.inactiveStatus,
            ]}
          >
            <View style={style.statusContainer}>
              <Entypo
                name="dot-single"
                size={25}
                color={status === "Active" ? "#1EAF5B" : "#FFA500"}
                style={style.dot}
              />
              <Text style={style.statusText}>{status}</Text>
            </View>

          </View>
        )}
      </View>
    </View>
  );
};

export default MembersPage


const style = StyleSheet.create({
  container: {
    width: "90%",
    height: 130,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#E5E6EA",
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    borderRadius: 13,
  },
  subcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  numberNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  number: {
    color: "gray",
    fontSize: 14,
    fontWeight: "bold",
  },
  name: {
    color: "#000000",
    fontFamily: "Jost",
    fontSize: 16,
    fontWeight: "bold",
  },
  phoneNumber: {
    color: "#555",
    fontSize: 14,
    marginTop: 2,
  },
  plan: {
    marginTop: 20
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  status: {
    padding: 5,
    marginTop: 10,
    paddingLeft: 10,
    width: "40%",
    borderRadius: 15,
    backgroundColor: "#E8F7F0",
    color: "black",
    textAlign: "center",
    fontWeight: "700",
  },
  dot: {
    fontSize: 20,
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 3,
    alignContent: "center",
    paddingLeft: 10

  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 8,
    marginRight: 95,
    width: 600,
    position: "fixed"
  },
  deleteIcon:{
    paddingTop: 0,
    paddingRight:30,
  },
  activeStatus: {
    backgroundColor: "#E8F7F0",
  },
  inactiveStatus: {
    backgroundColor: "#FFE5E5",
  },
  statusText: {
    fontWeight: "700",
    color: "black",
    textAlign: "center",
    alignSelf: "center",
  },


});
