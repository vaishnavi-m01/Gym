import { useNavigation } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { Searchbar } from "react-native-paper"

const PotentialLeads = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Searchbar
                    placeholder="Search.."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchbar}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate("Create Lead" as never)}
                >
                    <Text style={styles.addButtonText}> + </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default PotentialLeads

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "#ffffff",
    },
    title: {
        paddingLeft: 25,
        fontWeight: "700",
        paddingTop: 20,
        fontSize: 20,
        fontFamily: "Jost",
    },
    header: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    searchbar: {
        width: "70%",
        height: 50,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1B1A18",
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    addButtonText: {
        fontSize: 25,
        fontWeight: "700",
        color: "white",
    },

})