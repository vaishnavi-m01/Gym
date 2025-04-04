import { AntDesign, Entypo } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";

type members = {
    id?: number;
    image: string | number;
    name: string;
    phoneNumber: string;
    plan: string;
    status: string | undefined;
};
const ProfileMember = ({ image, name, phoneNumber, plan, status }: members) => {


    return (
        <View style={style.container}>
            <View style={style.subcontainer}>
                <Image
                    source={typeof image === "string" ? { uri: image } : image}
                    style={style.image}
                />

                <View style={style.textContainer}>
                    <View style={style.numberNameRow}>
                        <Text style={style.name}>{name}</Text>
                        <View style={style.iconContainer}>
                        <AntDesign name="arrowright" size={22} color="black" />

                        </View>
                    </View>
                    <Text style={style.phoneNumber}>{phoneNumber}</Text>
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
                <Text style={style.plan}>{plan}</Text>

            </View>

        </View>
    );
};

export default ProfileMember;

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: 160,
        backgroundColor: "#ffffff",
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
        padding:10,
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
        padding:10,
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
   
});
