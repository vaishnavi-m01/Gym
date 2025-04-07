import { StyleSheet, View } from "react-native";

const datas = [
  {
    id: 1,
    planName: "3 months",
    duration: "10 Nov 2025 - 07 Feb 2026 ",
  },
  {
    id: 2,
    planName: "5 months",
    duration: "10 Nov 2025 - 07 Feb 2026",
  },
  {
    id: 3,
    planName: "6 months",
    duration: "10 Nov 2025 - 07 Feb 2026",
  },
  {
    id: 4,
    planName: "8 months",
    duration: "10 Nov 2025 - 07 Feb 2026",
  },
  {
    id: 5,
    planName: "One months",
    duration: "10 Nov 2025 - 07 Feb 2026",
  },
];
type Member = {
  id: number;
  name: string;
  amount: 
  
  
  
  number;
  duration: string;
  plan: string;
  paymentType: string;
};

export default function Transaction() {
  return <View></View>;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
