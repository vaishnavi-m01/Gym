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
  Alert,
  Modal,
} from "react-native";
import ProfileMember from "./components/members/ProfileMember";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Linking } from "react-native";
import { AppState } from "react-native";
import { useRef } from "react";

import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import config from "./config";

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
const plans = [
  { name: "One Month", amount: 1000, duration: "30 days" },
  { name: "3 Month", amount: 2300, duration: "90 days" },
  { name: "6 Month", amount: 4300, duration: "180 days" },
];

const AddMembership = () => {
  const navigation = useNavigation();
  const [plan, setPlan] = useState("One Month");
  const [planName, setPlanName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState("");
  const [amountReceived, setAmountReceived] = useState("");

  const [date, setDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [membershipData, setMembershipData] = useState<any>(null);
  const { id } = useLocalSearchParams();
  const [member, setMember] = useState<any>(null);
  const appState = useRef(AppState.currentState);

  console.log("memberIdddd" ,id)
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/members/${id}`);
        setMember(response.data.data);
      } catch (error) {
        console.error("Error fetching member:", error);
      }
    };

    if (id) fetchMember();
  }, [id]);


  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setPickerVisible(false);
  };

  const handleSubmit = async () => {
    if (!plan || !paymentMethod || !amountReceived) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setModalVisible(true);

      const payload = {
        member: member[0],
        plan,
        paymentMethod,
        discount,
        amountReceived,
        startDate: date.toISOString().split("T")[0],
      };

      const response = await axios.post(
        "https://your-api.com/memberships",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Success:", response.data);
        Alert.alert("Success", "Membership added successfully!");
      } else {
        Alert.alert("Error", "Unexpected server response.");
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Submission failed!"
      );
    } finally {
      setIsSubmitting(false);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/members/${id}/`);
        setMembershipData(response.data);
      } catch (error) {
        console.error("Error fetching membership:", error);
      }
    };

    fetchMembership();
  }, []);

  const getEndDate = () => {
    if (!membershipData) return "";

    const start = new Date(membershipData.startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + membershipData.durationDays);

    return end.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleSendWhatsApp = () => {
    const phoneNumber = "6385542771"; // replace with dynamic number
    const message = `Hello Vaishu,
  Your membership to 8 months was successfully added and will expire on 01 Jun 2025.
  Amount: ₹5,000
  Paid: ₹5,000.00
  Balance: ₹0.00
  Thank you.`;

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("WhatsApp not installed!");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  // const handleSendWhatsApp = () => {
  //   if (!membershipData) return;

  //   const phoneNumber = membershipData.phoneNumber;
  //   const name = membershipData.name;
  //   const plan = membershipData.plan;
  //   const endDate = getEndDate();
  //   const amount = membershipData.amount;
  //   const paid = membershipData.paid;
  //   const balance = (amount - paid).toFixed(2);

  //   const message = `Hello ${name},\n\nYour membership to ${plan} was successfully added and will expire on ${endDate}.\n\nAmount: ₹${amount}\nPaid: ₹${paid.toFixed(2)}\nBalance: ₹${balance}\n\nThank you.`;

  //   const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  //   Linking.canOpenURL(url)
  //     .then(supported => {
  //       if (supported) {
  //         Linking.openURL(url);
  //       } else {
  //         Alert.alert('Error', 'WhatsApp not installed on your device');
  //       }
  //     })
  //     .catch(err => console.error("WhatsApp Error:", err));
  // };
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // User is back in the app, close modal
        setModalVisible(false);
        navigation.navigate("Member Details" as never);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {member && (
          <ProfileMember
            key={member.id}
            id={member.id}
            profile_picture={member.profile_picture}
            name={member.name}
            phone_number={member.phone_number}
            gender={member.gender}
            status={member.status}
          />
        )}

    

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
              {plans.map((item, index) => (
                <View key={index}>
                  <View style={styles.radioButton}>
                    <RadioButton value={item.name} />
                    <Text style={styles.radioText}>{item.name}</Text>
                  </View>
                  <Text style={styles.amount}>
                    {" "}
                    ₹{item.amount} - {item.duration}
                  </Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>

          <View style={styles.paymentContainer}>
            <Text style={styles.text}>Discount</Text>
            <Text style={styles.text}>Amount received</Text>
          </View>
          <View style={styles.paymentSubContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputbox}
                placeholderTextColor="gray"
                value={discount}
                onChangeText={setDiscount}
              />{" "}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputbox}
                placeholderTextColor="gray"
                value={amountReceived}
                onChangeText={setAmountReceived}
                keyboardType={"number-pad"}
              />{" "}
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
              <View style={styles.radioOption}>
                <RadioButton value="Cash" />
                <Text style={styles.radioText}>Cash</Text>
              </View>

              <View style={styles.leftspacer} />

              <View style={styles.radioOption}>
                <RadioButton value="UPI" />
                <Text style={styles.radioText}>UPI</Text>
              </View>
            </View>

            <View style={styles.radioButton}>
              <View style={styles.radioOption}>
                <RadioButton value="Credit card" />
                <Text style={styles.radioText}>Credit card</Text>
              </View>

              <View style={styles.spacer} />

              <View style={styles.radioOption}>
                <RadioButton value="Debit card" />
                <Text style={styles.radioText}>Debit card</Text>
              </View>
            </View>

            <View style={styles.radioOptions}>
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
        {/* <TouchableOpacity style={styles.sumbitButton} onPress={handleSubmit}>
          <Text style={styles.buttontext}>Confirm</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.sumbitButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttontext}>Confirm</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Send Message?</Text>
            <Text style={styles.messageTitle}>
              Your message would look like this
            </Text>

            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>To:</Text>
              <Text style={styles.phoneNumber}>+919876543210</Text>
            </View>
            <Text style={styles.title}>Message</Text>
            <View style={styles.messageSubContainer}>
              <Text style={styles.memberName}>Hello Vaishu,</Text>
              <Text style={styles.message}>
                Your membership to 8 months was successfully added and will
                expire on 01 Jun 2025.
              </Text>
              <View style={styles.AmmountContainer}>
                {" "}
                <Text style={styles.message}>Amount: ₹5,000 </Text>
                <Text style={styles.message}>Paid: ₹5,000.00 </Text>
                <Text style={styles.message}>Balance: ₹0.00 </Text>
                <Text style={styles.thankYouText}>Thank you </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.sendMessageButton}
              onPress={handleSendWhatsApp}
            >
              <Text style={styles.buttontext}>Send message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* {membershipData && (
        <>
          <Text style={styles.phoneNumber}>{membershipData.phoneNumber}</Text>

          <Text style={styles.title}>Message</Text>
          <View style={styles.messageSubContainer}>
            <Text style={styles.memberName}>Hello {membershipData.name},</Text>
            <Text style={styles.message}>
              Your membership to {membershipData.plan} was successfully added and will expire on {getEndDate()}.
            </Text>

            <View style={styles.AmmountContainer}>
              <Text style={styles.message}>Amount: ₹{membershipData.amount}</Text>
              <Text style={styles.message}>Paid: ₹{membershipData.paid.toFixed(2)}</Text>
              <Text style={styles.message}>
                Balance: ₹{(membershipData.amount - membershipData.paid).toFixed(2)}
              </Text>
              <Text style={styles.thankYouText}>Thank you</Text>
            </View>
            <TouchableOpacity style={styles.sendMessageButton} onPress={handleSendWhatsApp}>
              <Text style={styles.buttontext}>Send message</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
 */}
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
    fontWeight: 600,
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
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOptions: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    fontSize: 14,
    fontWeight: 600,
  },

  radioLeftText: {
    display: "flex",
    fontSize: 14,
    fontWeight: 600,
  },
  spacer: {
    flex: 0.2,
  },
  leftspacer: {
    flex: 0.3,
  },
  amount: {
    marginLeft: 34,
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
    padding: 10,
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
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

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 700,
    fontFamily: "Jost",
    lineHeight: 30,
    paddingLeft: 10,
  },
  messageText: {
    fontSize: 17,
    fontWeight: 700,
    fontFamily: "Jost",
    lineHeight: 40,
  },
  messageTitle: {
    fontFamily: "Jost",
    paddingLeft: 10,
  },
  messageContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 11,
    marginTop: 30,
    marginBottom: 30,
    gap: 10,
  },
  phoneNumber: {
    borderWidth: 1,
    borderColor: "#E2E3E8",
    backgroundColor: "#E2E3E8",
    color: "#111827",
    fontWeight: 600,
    fontFamily: "Jost",
    borderRadius: 5,
    padding: 10,
  },
  messageSubContainer: {
    borderWidth: 1,
    borderColor: "#E2E3E8",
    backgroundColor: "#E2E3E8",
    borderRadius: 5,
    padding: 20,
    margin: 10,
    width: "95%",
    paddingBottom: 45,
  },
  memberName: {
    fontFamily: "Jost",
    lineHeight: 40,
    marginBottom: 20,
    fontWeight: 600,
    fontSize: 16,
  },
  message: {
    fontFamily: "Jost",
    fontWeight: 600,
    fontSize: 15,
  },
  thankYouText: {
    marginTop: 30,
  },
  AmmountContainer: {
    marginTop: 10,
  },
  sendMessageButton: {
    borderWidth: 1,
    borderColor: "#1B1A18",
    backgroundColor: "#1B1A18",
    borderRadius: 4,
    width: "50%",
    padding: 13,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
