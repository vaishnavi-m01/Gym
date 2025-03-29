import { Text, View, StyleSheet } from "react-native"

const Attendance = () => {
    return (
        <View style={styles.containers}>
            <Text>Hi to all</Text>
        </View>
    )
}

export default Attendance

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    }

})