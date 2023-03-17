import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";



export default Home = () => {
    const navigation = useNavigation();

    const handleRegisterPress = () => {
        navigation.navigate("Register");
    };
    const handleLogInPress = () => {
        navigation.navigate("LogIn");
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={handleRegisterPress}>
                    <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogInPress}>
                    <Text>Log In</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}