import React, { useEffect, useState } from "react";
import { View, FlatList, Alert, Text, StyleSheet } from "react-native";
import axios from "axios";
import config from "./config";
import BirthdayMembers from "./components/birthdayMember/BirthDayMembers";

type Member = {
    id: number;
    name: string;
    profile_picture: string;
    phone_number: string;
};

const BirthdayMemberList = () => {
    const [birthdayMembers, setBirthdayMembers] = useState<Member[]>([]);

    const handleFetchMembers = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/birthdays/`);
            setBirthdayMembers(response.data.members);
        } catch (error) {
            console.error("Fetch Error:", error);
            Alert.alert("Error", "Could not fetch birthday members");
        }
    };

    useEffect(() => {
        handleFetchMembers();
    }, []);

    if (birthdayMembers.length === 0) {
        return <Text style={{ textAlign: "center", marginTop: 20 }}>No birthdays today.</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={birthdayMembers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BirthdayMembers
                        name={item.name}
                        profile_picture={`${config.BASE_URL}${item.profile_picture}`}
                        phone_number={item.phone_number}
                    />
                )}
            />
        </View>

    );
};

export default BirthdayMemberList;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    }
})