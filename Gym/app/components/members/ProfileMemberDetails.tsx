import { AntDesign, Entypo } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Image, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import EditMembers from "./EditMembers";
import { useState } from "react";
import config from "@/app/config";
import { Modal } from "react-native";



type members = {
    id: number;
    profile_picture: string | number;
    name: string;
    phone_number: string;
    gender: string;
    date_of_birth:string
    status: string | undefined;
    blood_group:string;
    address:string;
    notes:string;
};
const ProfileMemberDetails = ({ id, profile_picture, name, phone_number, gender, status,date_of_birth,blood_group,address,notes }: members) => {

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [modelVisible, setModelVisible] = useState(false)

 console.log("dob",date_of_birth)

    return (
        <TouchableOpacity onPress={() => setModelVisible(true)}>
            <View style={style.container}>
                <View style={style.subcontainer}>
                    <Image
                        source={
                            typeof profile_picture === "string"
                                ? { uri: `${config.BASE_URL}/${profile_picture}` }
                                : profile_picture
                        }
                        style={style.image}
                    />

                    <View style={style.textContainer}>
                        <View style={style.numberNameRow}>
                            <Text style={style.name}>{name}</Text>
                            <View style={style.iconContainer}>
                                <AntDesign
                                    name="delete"
                                    size={22}
                                    color="#F34E3A"
                                    style={style.deletIcon}
                                />
                                <EditMembers id={id} visible={editModalVisible} onClose={() => setEditModalVisible(false)} />

                            </View>

                        </View>
                        <Text style={style.phoneNumber}>{phone_number}</Text>
                    </View>
                </View>

                <View style={style.bottomContainer}>
                    {status && (

                        <View style={style.statusContainer}>
                            <Entypo
                                name="dot-single"
                                size={25}
                                color={status === "Active" ? "#1EAF5B" : "#FFA500"}
                                style={style.dot}
                            />
                            <Text style={style.statusText}>{status}</Text>
                        </View>

                    )}
                    <Text style={style.plan}>{gender}</Text>

                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modelVisible}
                onRequestClose={() => setModelVisible(false)}
            >
                <View style={style.modalOverlay}>

                    <View style={style.modalContent}>
                        <View style={style.bottomLine}></View>

                        <Text style={style.modalText}>Member Info</Text>
                        <View style={style.modelSubcontainer}>
                            <Text>Gender</Text>
                            <Text>Joining date</Text>
                        </View>
                        <View style={style.modelSubcontainer}>
                            <Text style={style.text}>{gender || "--"}</Text>
                            <Text style={style.text}>Joining date</Text>
                        </View>

                        <View style={style.modelSubcontainer}>
                            <Text>DOB</Text>
                            <Text>Blood Group</Text>
                        </View>
                        <View style={style.modelSubcontainer}>
                            <Text style={style.text}>{date_of_birth.split("-").reverse().join("-") || ""}</Text>
                            <Text style={style.text}>{blood_group || "--"}</Text>
                        </View>
                        

                        <Text style={style.title}>Address</Text>
                        <Text style={style.text}>{address || "--"}</Text>

                        <Text style={style.title}>Notes</Text>
                        <Text style={style.text}>{notes || "--"}</Text>

                    </View>
                </View>
            </Modal>


        </TouchableOpacity>



    );
};

export default ProfileMemberDetails;

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: 160,
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#E5E6EA",
        margin: 5,
        padding: 20,
        borderRadius: 13,
    },
    subcontainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF"
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 25,
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
        color: "#000000",
        fontFamily: "Jost",
        fontSize: 16,
        fontWeight: "bold",
        top: 8
    },
    phoneNumber: {
        color: "#555",
        fontSize: 14,
        marginTop: 2,
    },
    plan: {
        backgroundColor: "#eff0f4",
        marginTop: 20,
        borderRadius: 15,
        fontSize: 14,
        fontFamily: "Jost",
        padding: 10,
        fontWeight: "700",
        color: "black",
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,

    },
    status: {
        padding: 10,
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: "#E8F7F0",
        color: "black",
    },
    dot: {
        fontSize: 20,
    },
    statusContainer: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        backgroundColor: "#eff0f4",
        marginTop: 20,
        borderRadius: 15,
        fontFamily: "Jost",
        padding: 10,
        fontWeight: "700",
        color: "black",
    },
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: 8,
    },

    activeStatus: {
        backgroundColor: "#eff0f4",
    },
    inactiveStatus: {
        backgroundColor: "#eff0f4",
    },
    statusText: {
        fontWeight: "700",
        color: "black",
        alignItems: "center",
        fontSize: 14,
    },
    deletIcon: {
        top: 2,
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
        marginTop: 25,
        fontSize: 16,
        fontWeight: 700,
        fontFamily: "Jost",
        lineHeight: 40,
        paddingLeft: 10,
        bottom:4
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
        borderRadius: 50

    },
    modelSubcontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 40,
        marginLeft: 10,
    },
    text:{
        color: "#111827",
        fontWeight: "700",
        fontSize:16,
        top:5,
        fontFamily: "Jost",
        marginBottom:30,
        alignSelf: "flex-start",

    },
    title:{
        marginLeft:10
    }


});
