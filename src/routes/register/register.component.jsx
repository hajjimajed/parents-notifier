import { async } from "@firebase/util";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import { createAuthUserWithEmailAndPassword, createStudentDocumentFromAuth, createTeacherDocumentFromAuth } from "../../firebase/firebase";
import { useContext } from "react";
import { TeacherContext } from "../../contexts/teachers.context";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [verification, setVerification] = useState("");
    const [password, setPassword] = useState("");

    const { currentTeacher, setCurrentTeacher } = useContext(TeacherContext);

    const handleRegister = async () => {
        if (verification === 'a123bcd') {
            if (value === 'student') {
                try {
                    const { user } = await createAuthUserWithEmailAndPassword(email, password);
                    setCurrentTeacher(user);
                    await createStudentDocumentFromAuth(user, { username });
                } catch (error) {
                    if (error.code === 'auth/email-already-in-use') {
                        alert('email is already exist')
                    }
                    else {
                        console.log("user creation encountered an error", error);
                    }
                }
            }
            else {
                try {
                    const { user } = await createAuthUserWithEmailAndPassword(email, password);
                    await createTeacherDocumentFromAuth(user, { username });
                } catch (error) {
                    if (error.code === 'auth/email-already-in-use') {
                        alert('email is already exist')
                    }
                    else {
                        console.log("user creation encountered an error", error);
                    }
                }
            }
        }
        else {
            alert('Verify the verification code please !')
        }


    };

    const [value, setValue] = useState('student');

    const handleValueChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24 }}>Register</Text>
            <TextInput
                style={{ width: "80%", height: 40, borderWidth: 1, marginTop: 20 }}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={{ width: "80%", height: 40, borderWidth: 1, marginTop: 20 }}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <RadioButton.Group onValueChange={handleValueChange} value={value}>
                <View>
                    <Text>Student</Text>
                    <RadioButton value="student" />
                </View>
                <View>
                    <Text>Teacher</Text>
                    <RadioButton value="teacher" />
                </View>
            </RadioButton.Group>
            <TextInput
                style={{ width: "80%", height: 40, borderWidth: 1, marginTop: 20 }}
                placeholder="Verification Code"
                value={verification}
                onChangeText={setVerification}
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
                onPress={handleRegister}
            >
                <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}
