
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

type BirthdayMemberProps = {
    name: string;
    profile_picture: string;
    phone_number: string;
};

const BirthdayMembers = ({ name, profile_picture, phone_number }: BirthdayMemberProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Image
                    source={{ uri: profile_picture }}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <View style={styles.numberNameRow}>
                        <Text style={styles.name}>{name}</Text>
                    </View>
                    <Text style={styles.phoneNumber}>{phone_number}</Text>
                </View>

            </View>

        </View>
    );
};

export default BirthdayMembers;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 130,
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderColor: "#E5E6EA",
        margin: 5,
        marginLeft: 20,
        marginRight: 20,
        padding: 20,
        borderRadius: 13,
    },
    subcontainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    numberNameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    phoneNumber: {
        fontSize: 14,
        color: "#555",
    },
});
