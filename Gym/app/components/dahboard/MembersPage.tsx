import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

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
  return (
    <View style={style.container}>
      <View style={style.subcontainer}>
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={style.image}
        />
        <Text style={style.name}>{name}</Text>
        {/* <View style={style.phoneContainer}>
          <Text>ddf</Text>
        </View> */}
        <Text style={style.number}>{number}</Text>
        <AntDesign name="delete" size={20} color="#F34E3A" />
        <FontAwesome5
          name="edit"
          size={20}
          color="#1230B4"
        />
      </View>
      <View style={style.bottomContainer}>
        <Text style={style.plan}>{plan}</Text>

        <Text style={style.status}>
        <Entypo name="dot-single" size={20} color="#1EAF5B" style={style.dot} />

          {status}
        </Text>

      </View>
    </View>
  );
};

export default MembersPage;

const style = StyleSheet.create({
  container: {
    width: "90%",
    height: 120,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#E5E6EA",
    gap: 2,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    borderRadius: 13,
  },
  subcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    paddingLeft: 5,
    // borderRadius: "50%",
    width: 50,
    height: 50,
  },
  name: {
    color: "#000000",
    fontFamily: "Jost",
    fontSize: 15,
    // paddingTop: 10,
  },
  phoneContainer:{
    display: "none",
    flexDirection: "column"
  },
  number: {
    color: "gray",
    fontSize: 15,
    // paddingTop: 15,
  },
  // icon: {
  //   paddingTop: 10,
  // },
  plan: {
    marginTop: 10,
  },
  bottomContainer:{
    display:"flex",
    justifyContent:"space-between",
    flexDirection: "row"
  },
  status:{
      padding:5,
      width: "40%",
      borderRadius: 15,
      backgroundColor:"#E8F7F0",
      color: "black",
      textAlign: "center",
      fontWeight:"700"
  },
  dot:{
    fontSize: 20
  }
});
