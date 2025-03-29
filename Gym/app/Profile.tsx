import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native"
import ChangePassword from "./components/home/ChangePassword";

const Profile = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [_reviews, setReviews] = useState<any[]>([]);


    const handleNewReview = (newReview: any) => {
        setReviews((prevReviews) => [newReview, ...prevReviews]);
      };
    return (
        <View style={styles.containers}>
            <Image source={require('@/assets/images/adminImg.png')} style={styles.adminImg} />

            <Text style={styles.loginText}>Name</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputbox}
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <Text style={styles.loginText}>Email</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputbox}
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <Text style={styles.loginText}>Phone</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputbox}
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <ChangePassword onNewReview={handleNewReview}></ChangePassword>
{/* 
             <TouchableOpacity style={styles.changePassword}>
             <Text>Change Password ?</Text>

             </TouchableOpacity> */}
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 15
    },
    adminImg: {
        height: 150,
        width: 150,
        marginTop: 10,
        alignSelf: "center",
        borderColor: "#76789b"
    },
    loginText: {
        color: "black",
        paddingLeft: 30,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 800
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#544C4C',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 6,
        width: '85%',
        marginLeft: 30,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 10, // Space between icon and input text
    },
    inputbox: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    changePassword:{
        alignSelf: "flex-end",
        paddingRight:30,
        paddingTop:5,
        fontFamily: "Roboto",
        fontSize:16,
        fontWeight: 500,
        color: "#585858"
    }

})