import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from "react-native"
import MembersPage from "./components/dahboard/MembersPage";
import ProfileMemberDetails from "./components/members/ProfileMemberDetails";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import { Linking } from "react-native";


import axios from "axios";
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


const MemberDetails = () => {

    const { id } = useLocalSearchParams();
    const [member, setMember] = useState<any>(null);
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");


    const navigation = useNavigation();
    const [modelVisible, setModelVisible] = useState(false);
    const [settlemodel, setSettleModel] = useState(false);
    const [whatsAppModel, setWhatsAppModel] = useState(false);


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



    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amount);

    const handleClick = () => {
        navigation.navigate("Add Membership" as never)
    }

    const handleSendWhatsApp = () => {
        const phoneNumber = member?.phone_number;
        const name = member.name;
        // const balance = (total - paid).toFixed(2);

        const message = `Hello ${name}\n\n Thank you for paying ₹3,000 towards
your balance settlement. Your current
balance is now ₹0 \n\n Thank you.`;

        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        Linking.canOpenURL(url)
            .then(supported => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'WhatsApp not installed on your device');
                }
            })
            .catch(err => console.error("WhatsApp Error:", err));
    };

    return (
        <ScrollView>
            <View style={styles.container} >
                {member && (
                    <ProfileMemberDetails
                        key={member.id}
                        id={member.id}
                        profile_picture={member.profile_picture}
                        name={member.name}
                        phone_number={member.phone_number}
                        gender={member.gender}
                        status={member.status}
                        date_of_birth={member.date_of_birth}
                        blood_group={member.blood_group}
                        address={member.address}
                        notes={member.notes}
                    />
                )}

                <View style={styles.paymentContainer}>
                    <TouchableOpacity style={styles.subContainers} onPress={() => setModelVisible(true)}>
                        <View>
                            <View style={styles.memberContents}>
                                <AntDesign name="pay-circle1" size={30} color="#F58E48" />
                                <Text style={styles.blanceText}>Balance</Text>
                            </View>
                            <Text style={styles.paymentStatus}>Fully Paid</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={styles.subContainers}>
                        <View style={styles.memberContents}>
                            <Text style={styles.blanceText}>Joined Date</Text>
                        </View>
                        <Text style={styles.joinedDate}>22 March 2025</Text>
                    </View>
                </View>

                <Text style={styles.text}>Memberships</Text>
                <View style={styles.membershipContainer}>
                    <View style={styles.membershipSubContainer}>
                        <Text style={styles.planText}>3month plan</Text>
                        <AntDesign name="arrowright" size={22} color="black" />
                    </View>
                    <View style={styles.durationContainer}>
                        <View style={styles.subDurationContainer}>
                            <Entypo
                                name="dot-single"
                                size={22}
                                color={"#1DAF60"}
                                style={styles.dotIcon}
                            />

                            <Text>Renewal due in 89 days</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={handleClick}>
                        <Text style={styles.buttonText}>Add Upcoming
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.transactionText}>Recent transaction</Text>
                <View style={styles.transactionContainer}>
                    <View style={styles.transactionSubContainer}>
                        <Text style={styles.title}>3month</Text>

                        <View style={styles.rightContainer}>
                            <Text style={styles.payementType}>UPI</Text>
                            <Text style={styles.amountText}>INR300</Text>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.durationText}>Duration: 18 Mar 2025 - 15 Jun 2025</Text>
                        <AntDesign name="arrowright" size={25} color="black" />

                    </View>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modelVisible}
                onRequestClose={() => setModelVisible(false)}
            >
                <View style={styles.modalOverlay}>

                    <View style={styles.modalContent}>
                        <View style={styles.bottomLine}></View>

                        <Text style={styles.modalText}>Balance</Text>
                        <View style={styles.modelSubcontainer}>
                            <Text style={styles.title}>Pending Amount</Text>
                            <Text>₹3,000</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => {
                                setModelVisible(false);
                                setSettleModel(true);
                            }}
                        >
                            <Text style={styles.buttonText}>Settle Balance</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={settlemodel}
                onRequestClose={() => setSettleModel(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.bottomLine}></View>
                        <Text style={styles.modalText}>Settle Balance</Text>

                        <Text style={styles.label}>Amount</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputbox}
                                placeholder="Enter email"
                                value={amount}
                                onChangeText={(text) => {
                                    setAmount(text);
                                }}
                                keyboardType="email-address"
                            />
                        </View>


                        <Text style={styles.paymentTitle}>Payment Method</Text>
                        <View>
                            <RadioButton.Group
                                onValueChange={(value) => setPaymentMethod(value)}
                                value={paymentMethod}
                            >
                                <View style={styles.radioOptions}>
                                    <RadioButton value="cash" />
                                    <Text style={styles.radioText}>Cash</Text>
                                </View>

                                <View style={styles.radioOptions}>
                                    <RadioButton value="upi" />
                                    <Text style={styles.radioText}>UPI</Text>
                                </View>

                                <View style={styles.radioOptions}>
                                    <RadioButton value="credit card" />
                                    <Text style={styles.radioText}>Credit card</Text>
                                </View>

                                <View style={styles.radioOptions}>
                                    <RadioButton value="Debit card" />
                                    <Text style={styles.radioText}>Debit card</Text>
                                </View>






                                <View style={styles.radioOptions}>
                                    <RadioButton value="Net Banking" />
                                    <Text style={styles.radioText}>Net Banking</Text>
                                </View>
                            </RadioButton.Group>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.cancelbutton} onPress={() => setSettleModel(false)}>
                                    <Text style={styles.cancelbuttonText}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.submitBtn} onPress={() => {
                                    setSettleModel(false);
                                    setWhatsAppModel(true);
                                }}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>

                            </View>



                        </View>
                    </View>
                </View>
            </Modal>


            {/* whatsapp message container */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={whatsAppModel}
                onRequestClose={() => setWhatsAppModel(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Send Message?</Text>
                        <Text style={styles.messageTitle}>
                            Your message would look like this
                        </Text>

                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>To:</Text>
                            <Text style={styles.phoneNumber}>+{member?.phone_number || "N/A"}</Text>
                        </View>
                        <Text style={styles.title}>Message</Text>
                        <View style={styles.messageSubContainer}>
                            <Text style={styles.memberName}> Hello vaishu,</Text>
                            <Text style={styles.message}>
                                Your membership to was successfully added and will
                                expire .
                            </Text>
                            <View style={styles.AmmountContainer}>
                                {" "}
                                {/* <Text style={styles.message}>Amount: {formatCurrency(planAmount)}</Text>
                          <Text style={styles.message}>Paid: {formatCurrency(parseFloat(amountReceived || "0"))}</Text>
                          <Text style={styles.message}>Balance: {formatCurrency(balanceAmount)}</Text> */}

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


        </ScrollView>
    )
}

export default MemberDetails

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingBottom: 60
    },
    subContainers: {

        borderWidth: 1,
        borderColor: "#E0E5E9",
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: "45%",
    },
    memberContents: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    blanceText: {
        fontSize: 19,
        fontFamily: "Jost",
        fontWeight: 600
    },
    paymentContainer: {
        display: "flex",
        flexDirection: "row"
    },
    paymentStatus: {
        fontSize: 17,
        fontFamily: "Jost",
        color: "#111827",
        fontWeight: 800,
        paddingLeft: 5,
        paddingTop: 10
    },
    joinedDate: {
        fontSize: 16,
        paddingTop: 15,
        color: "#111827",
        fontWeight: 800
    },
    text: {
        fontSize: 16,
        paddingTop: 15,
        color: "#111827",
        fontWeight: 700,
        paddingLeft: 13,
        marginBottom: 12
    },
    membershipContainer: {
        borderWidth: 1,
        borderColor: "#E0E5E9",
        padding: 15,
        margin: 10,
        borderRadius: 15,
        width: "90%",
    },
    planText: {
        color: "#111827",
        fontWeight: 500,
        fontSize: 16
    },
    membershipSubContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    durationContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#EFF0F4",
        padding: 5,
        borderRadius: 17,
        width: "70%",
        backgroundColor: "#EFF0F4",
    },
    subDurationContainer: {
        display: "flex",
        flexDirection: "row"
    },
    dotIcon: {
        fontWeight: 900,
    },
    submitButton: {
        backgroundColor: "#1B1A18",
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        padding: 10,
        marginTop: 40,
    },
    buttonText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 18,
    },
    cancelbuttonText: {
        textAlign: "center",
        color: "#1B1A18",
        fontWeight: "600",
        fontSize: 18,
    },
    transactionText: {
        marginTop: 20,
        padding: 5,
        paddingLeft: 15,
        fontWeight: 700,
        fontSize: 18,
        fontFamily: "Jost"
    },
    transactionContainer: {
        margin: 10,
        borderWidth: 1,
        borderColor: "#E0E5E9",
        borderRadius: 15,
        padding: 10,
        width: "90%"
    },
    transactionSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    title: {
        fontFamily: "Jost",
        fontWeight: 600,
        fontSize: 15,
        color: "#111827"
    },
    payementType: {
        borderWidth: 1,
        borderColor: "#E3E4E8",
        backgroundColor: "#E3E4E8",
        borderRadius: 15,
        width: 50,
        padding: 1,
        color: "#090A0E",
        textAlign: "center",
        fontWeight: 700,
    },
    rightContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 10
    },
    amountText: {
        fontSize: 16,
        fontWeight: 700,
        paddingTop: 0,
    },
    durationText: {
        padding: 10,
        paddingBottom: 3,
        color: "#666A75"
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalText: {
        marginTop: 25,
        fontSize: 17,
        fontWeight: 700,
        fontFamily: "Jost",
        lineHeight: 40,
        paddingLeft: 10,
        bottom: 4
    },
    messageText: {
        fontSize: 17,
        fontWeight: 700,
        fontFamily: "Jost",
        lineHeight: 40,
    },
    bottomLine: {
        alignSelf: "center",
        borderWidth: 2,
        borderColor: "#617085",
        backgroundColor: "#617085",
        width: 90,
        borderRadius: 50,
        fontWeight: 600

    },
    modelSubcontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 40,
        marginLeft: 10,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "#E0E5E9",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 18,
        width: "100%",
        marginBottom: 10,
        padding: 10
    },
    inputbox: {
        flex: 1,
        fontSize: 17,
        color: "#62707D",
        fontFamily: "Jost",
        fontWeight: "600",
        paddingLeft: 15,
    },
    label: {
        fontFamily: "Jost",
        fontWeight: "700",
        fontSize: 16,
        lineHeight: 50,
        paddingLeft: 5,
    },
    paymentTitle: {
        fontSize: 16,
        paddingLeft: 10,
        fontWeight: 600,
        paddingTop: 20,
        marginBottom: 10,
    },
    radioOptions: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    radioText: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: "Jost"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 6,
        gap: 10
    },
    cancelbutton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 10,
        width: "50%",
        padding: 10,
        marginTop: 40,
    },
    submitBtn: {
        backgroundColor: "#1B1A18",
        borderWidth: 1,
        borderRadius: 10,
        width: "50%",
        padding: 10,
        marginTop: 40,
    },

    messageContainer: {
        display: "flex",
        flexDirection: "row",
        margin: 11,
        marginTop: 30,
        marginBottom: 30,
        gap: 10,
    },
    messageTitle: {
        fontFamily: "Jost",
        paddingLeft: 10,
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
    buttontext: {
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: 600,
        fontSize: 18,
    },

})