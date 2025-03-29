import { Text, View, StyleSheet } from "react-native"

const Leads = () => {
    return (
        <View style={styles.containers}>
            <Text>Hi to all</Text>
        </View>
    )
}

export default Leads

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    }

})