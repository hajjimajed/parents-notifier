import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { useState } from "react";
import { signInAuthWithEmailAndPassword } from "../../firebase/firebase";

import { useContext } from "react";
import { TeacherContext } from "../../contexts/teachers.context";

export default function LogIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { currentTeacher } = useContext(TeacherContext)

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthWithEmailAndPassword(email, password);
            alert('welcome back');
            alert(currentTeacher.username)
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password': alert("incorrect password");
                    break
                case 'auth/user-not-found': alert("incorrect email");
                    break
                default: alert(error);
            }
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {
                currentTeacher ? (
                    <Text>welcome back {currentTeacher.username}</Text>
                ) : (
                    <>
                        <Text style={{ fontSize: 24 }}>Log in</Text>
                        <TextInput
                            style={{ width: "80%", height: 40, borderWidth: 1, marginTop: 20 }}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={{ width: "80%", height: 40, borderWidth: 1, marginTop: 20 }}
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: "blue",
                                padding: 10,
                                borderRadius: 5,
                                marginTop: 20,
                            }}
                            onPress={handleSubmit}
                        >
                            <Text style={{ color: 'white' }}>Log In</Text>
                        </TouchableOpacity>
                    </>
                )
            }


        </View>
    )

}