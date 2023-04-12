import React, { Component } from 'react';
import {
    View, ImageBackground,
    StyleSheet, Pressable, Modal,
    Image, TouchableOpacity, Text, SafeAreaView, Dimensions, TextInput, ScrollView, ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import OTPTextView from 'react-native-otp-textinput';
import Toast from 'react-native-simple-toast'
import { AuthContext } from '../AuthContextProvider.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Global Style Import
const style = require('../Components/Style.js');

class SignUp extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            otpInput: "",
            name: "",
            mail: "",
            password: "",
            c_password: "",
            contact: "",
            isloading: false
        }
    }

    sendOtp = () => {
        if (this.state.name == "" || this.state.mail == "" || this.state.password == "" || this.state.password == "" || this.state.c_password == "" || this.state.contact == "") {
            Toast.show("All fields are required!")
        }
        else if (this.state.password != this.state.c_password) {
            Toast.show("Password does not match")
        }
        else {
            this.setState({isloading:true})
            var form = new FormData();
            form.append("module", "sendotp");
            form.append("phone", this.state.contact);
            // form.append("password", this.state.password);
            // console.warn(form)
            fetch(global.api, {
                method: 'POST',
                body: form,
            }).then((response) => response.json())
                .then((json) => {
                    this.setState({ visible: true })
                    return json;
                }).catch((error) => {
                    console.error(error);
                }).finally(() => {
                    this.setState({ isloading: false })
                });
        }
    }

    otp_verify = () => {
        var form = new FormData();
        form.append("module", "validateotp");
        form.append("phone", this.state.contact);
        form.append("otp", this.state.otpInput);
        // console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                console.warn(json)
                // this.setState({ visible: false })
                this.register();
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                // this.setState({ isloading: false })
            });
    }

    register=()=>{
        var form = new FormData();
        form.append("module", "registerprocess");
        form.append("phone", this.state.contact);
        form.append("first_name", this.state.name);
        form.append("last_name", this.state.name);
        form.append("email", this.state.mail);
        form.append("password", this.state.password);
        form.append("username", this.state.name);

        // console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                console.warn("user registration",json)
                if(json.status){
                this.setState({ visible: false })
                // this.context.login()
                const data={'token':"Bearer "+json.token,'user_id':json.user_id,"use_type":"done"}
                AsyncStorage.setItem('@auth_login', JSON.stringify(data));
                this.context.login("done");
                Toast.show("User Registered successfully Successfully")
                global.id = json.user_id
                }
               
                // this.register();
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                // this.setState({ isloading: false })
            });

    }

    render() {
        return (

            <View style={[style.container, { paddingHorizontal: 20 }]}>

                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
                    <Icon onPress={() => this.props.navigation.goBack()} name="close" type="ionicon" size={27} color="#000" />
                    <Text onPress={() => this.props.navigation.navigate("Welcome")} style={[style.h3, { fontWeight: "700" }]}>
                        Sign In
                    </Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={style.h1}>
                        Sign Up
                    </Text>
                </View>
                <View style={{ marginTop: 15 }}>

                    <TextInput placeholder='Name'
                        value={this.state.name}
                        onChangeText={(e) => this.setState({ name: e })}
                        placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3", color: "#000", }} />

                    <TextInput placeholder='E-mail'
                        value={this.state.mail}
                        onChangeText={(e) => this.setState({ mail: e })} placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, color: "#000", fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />

                    <TextInput secureTextEntry placeholder='Password'
                        value={this.state.password}
                        onChangeText={(e) => this.setState({ password: e })} placeholderTextColor="#000" style={{ borderBottomWidth: 2, color: "#000", marginTop: 10, fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />


                    <TextInput secureTextEntry placeholder='Confirm Password'

                        value={this.state.c_password}
                        onChangeText={(e) => this.setState({ c_password: e })} placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, fontWeight: "bold", fontSize: 15, color: "#000", borderColor: "#d3d3d3" }} />


                    <TextInput maxLength={10} keyboardType="numeric"
                        value={this.state.contact}
                        onChangeText={(e) => this.setState({ contact: e })} placeholder='Phone' placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, fontWeight: "bold", fontSize: 15, color: "#000", borderColor: "#d3d3d3" }} />
                </View>
                {this.state.isloading ?

                    <View style={{marginTop:20}} >
                        <ActivityIndicator size="large" color="#637752" />
                    </View>
                    :
                    <TouchableOpacity onPress={() => this.sendOtp()} style={[style.buttonStyles, { position: "relative", color: "#000", top: 40, }]}
                    >
                        <Text style={style.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                }
                <Modal visible={this.state.visible} transparent >
                    <View style={{ alignSelf: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#d3d3d3", elevation: 3, marginTop: 180, height: 250, borderRadius: 10 }} >


                        <View style={{ alignItems: 'center' }}>
                            <Text style={[style.h3, { marginTop: 20 }]}>
                                Enter OTP we have sent to {this.state.contact}
                            </Text>
                            {/* OTP TextInput */}
                            <OTPTextView
                                ref={(e) => (this.input1 = e)}
                                containerStyle={styles.textInputContainer}
                                handleTextChange={(text) => this.setState({ otpInput: text })}
                                inputCount={4}
                                textInputStyle={styles.roundedTextInput}
                                keyboardType="numeric"

                            />


                            <TouchableOpacity
                                onPress={() => {this.otp_verify() }}
                                style={[style.buttonStyles, { position: "relative", marginTop: 30, width: "55%" }]}>
                                <Text style={[style.buttonText, { color: '#fff' }]}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                            {/* <Text
                                    style={[styles.p, { top: 90, color: "#d93f11", fontWeight: "bold", marginBottom: 10 }]}
                                    onPress={() => this.props.navigation.navigate('Home')}>
                                    Back To Home
                                </Text> */}
                        </View>
                    </View>
                </Modal>

            </View>

        )
    }
}

export default SignUp

const styles = StyleSheet.create({
    textInputContainer: {
        marginBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        marginTop: 30
        // top:100,
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: "#FAFAFA",
        fontFamily: "Montserrat-Regular"
    }


})