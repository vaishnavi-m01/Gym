import { Text, View, StyleSheet } from "react-native"

const Members = () => {
    return (
        <View style={styles.containers}>
            <Text>Hi to all</Text>
        </View>
    )
}

export default Members

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    }

})