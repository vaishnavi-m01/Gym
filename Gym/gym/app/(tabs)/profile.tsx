import { Text, View,StyleSheet } from "react-native"

const Profile = () =>{
    return(
        <View style={style.container}>
            <Text>Hello world</Text>
        </View>
    )
}

export default Profile

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
})