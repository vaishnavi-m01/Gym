import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Plan from "../components/plan/Plan";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import axios from "axios";
import config from "../config";

const datas = [
  {
    id: 1,
    planName: "3 months",
    duration: "30 Days - ₹2,000",
  },
  {
    id: 2,
    planName: "5 months",
    duration: "50 Days - ₹5,000",
  },
  {
    id: 3,
    planName: "6 months",
    duration: "180 Days - ₹6,000",
  },
  {
    id: 4,
    planName: "8 months",
    duration: "70 Days - ₹6,000",
  },
  {
    id: 5,
    planName: "One months",
    duration: "30 Days - ₹1,000",
  },
];

type Member = {
  id: number;
  plan_name: string;
  plan_amount: number;
  plan_duration_days: string;
};

export default function PlanDashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/plans/`);

      const plans = response.data.data;

      if (Array.isArray(plans)) {
        setMembers(plans);
      } else {
        console.warn("Unexpected data format:", response.data);
        setMembers([]);
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  const handleSubmit = () => {
    navigation.navigate("New Plan" as never);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Plans</Text>

        {members.length > 0 ? (
          members.map((item) => (
            <Plan
              key={item.id}
              id={item.id}
              planName={item.plan_name}
              amount={item.plan_amount}
              duration={item.plan_duration_days}
            />
          ))
        ) : (
          <Text style={styles.noData}>No plans found</Text>
        )}

        <TouchableOpacity style={styles.sumbitButton} onPress={handleSubmit}>
          <Text style={styles.buttontext}>Add new plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E5E6EA",
    paddingBottom: 80,
  },
  title: {
    padding: 8,
    paddingLeft: 26,
    fontFamily: "Jost",
    fontWeight: "500",
    color: "#111827",
    fontSize: 20,
    lineHeight: 30,
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
    fontSize: 16,
  },
  sumbitButton: {
    backgroundColor: "#1B1A18",
    borderWidth: 1,
    borderRadius: 10,
    width: "95%",
    padding: 10,
    marginTop: 20,
    margin: 10,
    marginBottom: 30,
  },
  buttontext: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
  },
});
