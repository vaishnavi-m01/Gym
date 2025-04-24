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
  BackHandler,
} from "react-native";
import ProfileMember from "./components/members/ProfileMember";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Linking } from "react-native";
import { AppState } from "react-native";
import { useRef } from "react";

import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import config from "./config";
import { useIsFocused } from "@react-navigation/native";

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

export type RootStackParamList = {
  "Member Details": { id: string };
};

type Member = {
  id: number;
  plan_name: string;
  plan_amount: number;
  plan_duration_days: string;
};

const AddMembership = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [plan, setPlan] = useState("One Month");
  const [planName, setPlanName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
  const [initialAmount, setInitialAmount] = useState("");

  const [planAmount, setPlanAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);

  const [date, setDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);

  const [membershipData, setMembershipData] = useState<any>(null);
  const { id } = useLocalSearchParams();
  const [member, setMember] = useState<any>(null);
  const appState = useRef(AppState.currentState);

  const [plans, setPlans] = useState<Member[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const isFocused = useIsFocused();

  const [editableMessage, setEditableMessage] = useState("");

  console.log("memberIdddd", id);
  console.log("planId", selectedPlanId);

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

  useEffect(() => {
    if (isFocused) {
      fetchPlans();
    }
  }, [isFocused]);

  useEffect(() => {
    if (modalVisible) {
      handleSubmit();
    }
  }, [modalVisible]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (modalVisible) {
          setModalVisible(false);
          return true; // prevent default behavior
        }
        return false;
      }
    );
    return () => backHandler.remove(); // cleanup
  }, [modalVisible]);

  const handleConfirmPress = () => {
    setApiCalled(false);
    setModalVisible(true);
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/plans/`);

      const plans = response.data.data;

      if (Array.isArray(plans)) {
        setPlans(plans);
      } else {
        console.warn("Unexpected data format:", response.data);
        setPlans([]);
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    setPickerVisible(false);
  };

  const handlePlanChange = (selectedPlanName: string) => {
    setPlan(selectedPlanName);

    const selected = plans.find((p) => p.plan_name === selectedPlanName);

    const amount = selected?.plan_amount || 0;
    setPlanAmount(amount);

    const discountValue = parseFloat(discount || "0");
    const received = amount - discountValue;
    setAmountReceived(received.toString());

    const balance = amount - discountValue - received;
    setBalanceAmount(balance);

    if (selected?.id) {
      setSelectedPlanId(selected.id);
    }
  };

  const handleDiscountChange = (value: string) => {
    setDiscount(value);
    const discountValue = parseFloat(value || "0");
    const received = planAmount - discountValue;
    setAmountReceived(received.toString());

    const balance = planAmount - discountValue - received;
    setBalanceAmount(balance);
  };

  const handleAmountReceivedChange = (value: string) => {
    setAmountReceived(value);
    const received = parseFloat(value || "0");
    const discountValue = parseFloat(discount || "0");
    const balance = planAmount - discountValue - received;
    setBalanceAmount(balance);
  };

  const handleSubmit = async () => {
    if (!selectedPlanId || !paymentMethod || !amountReceived) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        member: member.id,
        plan: selectedPlanId,
        discount: discount || 0,
        amount_received: amountReceived,
        payment_method: paymentMethod,
        initial_amount: initialAmount,
        blance:balanceAmount,
        Start_date: date.toISOString().split("T")[0],
      };

      console.log("payloadd", payload);

      const response = await axios.post(
        `${config.BASE_URL}/membership/create/`,
        payload
      );

      console.log("responseee", payload);
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
    const selected = plans.find((p) => p.plan_name === plan);
    const days = parseInt(selected?.plan_duration_days || "0");
    const end = new Date(date);
    end.setDate(end.getDate() + days);

    return end.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

  useEffect(() => {
    if (member && plan && planAmount) {
      const paid = parseFloat(amountReceived || "0");
      const discountValue = parseFloat(discount || "0");
      const balance = planAmount - discountValue - paid;

      const newMessage = `Hello ${member.name || "Member"},
        
    Your membership to ${plan} was successfully added and will expire on ${getEndDate()}.
    
    Amount: ${formatCurrency(planAmount)}
    Discount: ${formatCurrency(discountValue)}
    Paid: ${formatCurrency(paid)}
    Balance: ${formatCurrency(balance)}
    
    Thank you.`;

      setEditableMessage(newMessage);
    }
  }, [member, plan, discount, amountReceived, planAmount]);

  const handleSendWhatsApp = () => {
    const phoneNumber = member?.phone_number;
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      editableMessage
    )}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "WhatsApp not installed on your device");
        }
      })
      .catch((err) => console.error("WhatsApp Error:", err));
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        setModalVisible(false);

        navigation.navigate("Member Details", {
          id: Array.isArray(id) ? id[0] : id,
        });
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
            <RadioButton.Group onValueChange={handlePlanChange} value={plan}>
              {plans.map((item, index) => (
                <View key={index}>
                  <View style={styles.radioButton}>
                    <RadioButton value={item.plan_name} />
                    <Text style={styles.radioText}>{item.plan_name}</Text>
                  </View>
                  <Text style={styles.amount}>
                    {" "}
                    ₹{item.plan_amount} - {item.plan_duration_days} days
                  </Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>

          <Text style={styles.InitialAmount}>Initial amount</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Initial Amount"
              keyboardType="numeric"
              value={initialAmount}
              onChangeText={setInitialAmount}
              // onChangeText={handleDiscountChange}
            />
          </View>

          <View style={styles.paymentContainer}>
            <Text style={styles.text}>Discount</Text>
            <Text style={styles.text}>Amount received</Text>
          </View>
          <View style={styles.paymentSubContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter Discount"
                keyboardType="numeric"
                value={discount}
                onChangeText={handleDiscountChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Amount Received"
                keyboardType="numeric"
                value={amountReceived}
                onChangeText={handleAmountReceivedChange}
              />
            </View>
          </View>
        </View>
        {amountReceived !== "" && (
          <Text
            style={{
              marginTop: 5,
              marginRight: 50,
              fontWeight: "bold",
              alignSelf: "flex-end",
              color: balanceAmount === 0 ? "green" : "red",
            }}
          >
            Balance: ₹{balanceAmount.toFixed(2)}
          </Text>
        )}

        <Text style={styles.paymentTitle}>Payment Method</Text>
        <View>
          <RadioButton.Group
            onValueChange={(value) => setPaymentMethod(value)}
            value={paymentMethod}
          >
            <View style={styles.radioButton}>
              <View style={styles.radioOption}>
                <RadioButton value="cash" />
                <Text style={styles.radioText}>Cash</Text>
              </View>

              <View style={styles.leftspacer} />

              <View style={styles.radioOption}>
                <RadioButton value="upi" />
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
          minimumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setPickerVisible(false)}
        />
        {/* <TouchableOpacity style={styles.sumbitButton} onPress={handleSubmit}>
          <Text style={styles.buttontext}>Confirm</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.sumbitButton}
          onPress={() => {
            setModalVisible(true);
          }}
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
              <Text style={styles.phoneNumber}>
                +{member?.phone_number || "N/A"}
              </Text>
            </View>
            <Text style={styles.title}>Message</Text>
            <View style={styles.messageSubContainer}>
              <TextInput
                style={styles.textArea}
                multiline
                value={editableMessage}
                onChangeText={setEditableMessage}
                textAlignVertical="top"
              />
            </View>
            <TouchableOpacity
              style={styles.sendMessageButton}
              onPress={handleSendWhatsApp}
            >
              <Text style={styles.buttontext}>Send message</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.editButton} onPress={() => setShowEdit(!showEdit)}>
              <Text style={styles.buttontext}>{showEdit ? "Done" : "Edit"}</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
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
    fontWeight: 800,
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
  InitialAmount: {
    fontSize: 16,
    fontWeight: 600,
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 10,
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
  textArea: {
    borderRadius: 8,
    fontSize: 16,
    minHeight: 160,
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 10,
  },
});
