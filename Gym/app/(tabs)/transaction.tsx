import { StyleSheet, View } from "react-native";
import Transactions from "../components/transaction/Transactions";
import { ScrollView } from "react-native";
import { Text } from "react-native";

const datas = [
  {
    id: 1,
    name: "hari",
    image: require("../../assets/images/member1.png"),
    plan: "3 months",
    amount: 1000,
    duration: "10 Nov 2025 - 07 Feb 2026 ",
    paymentType: "Cash"
  },
  {
    id: 2,
    name: "priya",
    image: require("../../assets/images/member1.png"),
    plan: "5 months",
    duration: "10 Nov 2025 - 07 Feb 2026",
    amount: 2000,
    paymentType: "Cash"

  },
  {
    id: 3,
    name: "vaishu",
    image: require("../../assets/images/member1.png"),
    plan: "6 months",
    duration: "10 Nov 2025 - 07 Feb 2026",
    amount: 2000,
    paymentType: "Cash"

  },
  {
    id: 4,
    name: "pavi",
    image: require("../../assets/images/member1.png"),
    plan: "8 months",
    duration: "10 Nov 2025 - 07 Feb 2026",
    amount:8000,
    paymentType: "UPI"

  },
  {
    id: 5,
    name: "rasiga",
    image: require("../../assets/images/member1.png"),
    plan: "One months",
    duration: "10 Nov 2025 - 07 Feb 2026",
    amount:9500,
    paymentType: "UPI"

  },
];
type Member = {
  id: number;
  image: string;
  name: string;
  amount: number;
  duration: string;
  plan: string;
  paymentType: string;
};

export default function Transaction() {
  return(
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
    <Text style={styles.title}>Transaction</Text>

       {datas.map((item) => (
                <Transactions
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  amount={item.amount}
                  plan={item.plan}
                  duration={item.duration}
                  paymentType={item.paymentType}
                />
              ))}
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#ffffff",
    flex: 1,
    padding:10,
    paddingTop:50,
    marginBottom: 60
  },
  title:{
    padding:10,
    fontWeight:800,
    lineHeight:50,
    fontSize:20,
    paddingTop:30,
    paddingLeft:18
  }
  
});
