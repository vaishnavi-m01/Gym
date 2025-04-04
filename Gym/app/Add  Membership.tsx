import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import ProfileMember from "./components/members/ProfileMember";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const member = [
  {
    id: 1,
    image: require("../assets/images/admin.png"),
    name: "John Doe",
    phoneNumber: "+1234567890",
    plan: "Premium",
    status: "Active",
  },
];

type members = {
  id: number;
  image: string;
  name: string;
  phoneNumber: string;
  plan: string;
  status: string | undefined;
};
const AddMembership = () => {
  const [members, setMembers] = useState<members[]>([]);
  const navigation = useNavigation();
  const [plan, setPlan] = useState("One Month");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [date, setDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const navigate = useNavigation();

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setPickerVisible(false);
  };

  const handleSubmit = () =>{
    navigate.navigate("New Plan" as never)
  }

  return (
    <ScrollView>
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

        <View style={styles.subContainer}>
          <View style={styles.membersubContainers}>
            <Text style={styles.title}>Select Plan</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate("New Plan" as never)}
            >
              <Text style={styles.addButtonText}> + </Text>
            </TouchableOpacity>
          </View>
          <View>
            <RadioButton.Group onValueChange={setPlan} value={plan}>
              <View style={styles.radioButton}>
                <RadioButton value="One Month" />
                <Text style={styles.radioText}>One Month</Text>
              </View>
              <Text style={styles.amount}>₹1,000 - 30 days</Text>

              <View style={styles.radioButton}>
                <RadioButton value="3 Month" />
                <Text style={styles.radioText}>3 Month</Text>
              </View>

              <Text style={styles.amount}>₹2,300 - 90 days</Text>

              <View style={styles.radioButton}>
                <RadioButton value="6 Month" />
                <Text style={styles.radioText}>6 Month</Text>
              </View>
              <Text style={styles.amount}>₹2,300 - 90 days</Text>
            </RadioButton.Group>
          </View>

          <View style={styles.paymentContainer}>
            <Text style={styles.text}>Discount</Text>
            <Text style={styles.text}>Amount received</Text>
          </View>
          <View style={styles.paymentSubContainer}>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputbox} placeholderTextColor="gray" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputbox} placeholderTextColor="gray" />
            </View>
          </View>
        </View>
        <Text style={styles.paymentTitle}>Payment Method</Text>
        <View>
          <RadioButton.Group
            onValueChange={setPaymentMethod}
            value={paymentMethod}
          >
            <View style={styles.radioButton}>
              <RadioButton value="Cash" />
              <Text style={styles.radioText}>Cash</Text>
              <View style={styles.radioLeftText}>
                <RadioButton value="UPI" />
              </View>
              <Text style={styles.radioText}>UPI</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton value="Credit card" />
              <Text style={styles.radioText}>Credit card</Text>
              <View style={styles.radioLeftText}>
                {" "}
                <RadioButton value="Debit card" />
              </View>
              <Text style={styles.radioText}>Debit card</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton value="Net Banking" />
              <Text style={styles.radioText}>Net Banking</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Text style={styles.memberStartDateText}> Membership start date</Text>
        <Pressable
          style={styles.inputWrapper}
          onPress={() => setPickerVisible(true)}
        >
          <TextInput
            style={styles.input}
            editable={false}
            value={date.toLocaleDateString()}
            pointerEvents="none"
          />
          <Ionicons
            name="calendar"
            size={24}
            color="#666"
            style={styles.icon}
          />
        </Pressable>

        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="date"
          date={date}
          minimumDate={new Date()} // disables past dates
          onConfirm={handleConfirm}
          onCancel={() => setPickerVisible(false)}
        />
        <TouchableOpacity style={styles.sumbitButton}>
          <Text style={styles.buttontext}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddMembership;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  subContainer: {
    marginTop: 10,
  },
  membersubContainers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginRight: 30,
  },
  title: {
    fontSize: 16,
    fontFamily: "Jost",
    fontWeight: 700,
    paddingLeft: 12,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B1A18",
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },

  radioButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  radioText: {
    marginLeft: 15,
    fontSize: 14,
    fontWeight: 600,
  },
  radioLeftText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    fontSize: 14,
    fontWeight: 600,
  },

  amount: {
    marginLeft: 50,
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 12,
  },
  paymentTitle: {
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: 600,
    paddingTop: 20,
    marginBottom: 10,
  },
  paymentContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: 600,
  },
  paymentSubContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E0E5E9",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: "50%",
    marginBottom: 10,
    paddingLeft: 5,
  },
  inputbox: {
    fontSize: 17,
    color: "#62707D",
    fontFamily: "Jost",
    fontWeight: 600,
    paddingLeft: 15,
  },
  memberStartDateText: {
    marginTop: 30,
    fontFamily: "Jost",
    fontWeight: 800,
    color: "#111827",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
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
