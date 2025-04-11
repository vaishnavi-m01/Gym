import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, Text } from "react-native";

import EditPlan from "./EditPlan";

type members = {
  id: number;
  planName: string;
  amount: number;
  duration: string;
};
const Plan = ({ planName, amount, duration }: members) => {
  return (
    <View style={style.container}>
      <View style={style.subcontainer}>
        <View style={style.textContainer}>
          <View style={style.numberNameRow}>
            <Text style={style.name}>{planName}</Text>
            <View style={style.iconContainer}>
              <AntDesign
                name="delete"
                size={20}
                color="#F34E3A"
                style={style.deletIcon}
              />
              <EditPlan></EditPlan>
            </View>
          </View>
          <Text>
            {duration} - ₹{amount}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Plan;

const style = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E5E6EA",
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    borderRadius: 5,
  },
  subcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    color: "#B51C0C",
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
  sumbitButton: {
    backgroundColor: "#1B1A18",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginTop: 20,
    marginBottom: 30,
  },

  buttontext: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: 18,
  },
});
