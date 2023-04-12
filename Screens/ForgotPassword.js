import React, { Component } from 'react';
import {
    View, ImageBackground,
    StyleSheet, Pressable,
    Image, TouchableOpacity, Text, SafeAreaView, Dimensions, TextInput, ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


//Global Style Import
const style = require('../Components/Style.js');

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            load: false,
        }
    }
    forgot=()=>{
        if(this.state.email=="" ){
            Toast.show("Enter email")
        }
        else{
        this.setState({load:true})
        var form = new FormData();
        form.append("module", "userlogin");
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                console.warn(json)
                if (json.status) {
                    const data={'token':"Bearer "+json.token,'user_id':json.user_id,"use_type":"done"}
                    AsyncStorage.setItem('@auth_login', JSON.stringify(data));
                    this.context.login("done");
                    Toast.show("Logged-in Successfully")
                    global.id = json.user_id
                    // this.props.navigation.navigate("Home")
                }
                else {
                    Toast.show("Incorrect credentials")
                }
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                this.setState({ load: false })
            });
        }
    }
    render() {
        return (
            <View style={[style.container, { paddingHorizontal: 20 }]}>
                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
                    <Icon onPress={()=>this.props.navigation.goBack()}  name="close" type="ionicon" size={27} color="#000" />
                    <Text onPress={()=>this.props.navigation.navigate("SignUp")} style={[style.h3, { fontWeight: "700" }]}>
                        Sign Up
                    </Text>
                </View>
                <View style={{ marginTop: 50 }}>
                    <Text style={style.h1}>
                        Forgot
                    </Text>
                    <Text style={style.h1}>
                        Password
                    </Text>
                    <Text style={[style.h4,{marginTop:10,fontWeight:"600",letterSpacing:0.7}]}>
                    Please enter your email address. You will {"\n"}recieve a link to create a new password {"\n"}via email.
                    </Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <TextInput placeholder='E-mail' placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10,color:"#000", fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />
                </View>
                {this.state.load ?
                    <ActivityIndicator size="large" color="#637752" />
                    :
                <TouchableOpacity onPress={()=>this.forgot()} style={[style.buttonStyles, {position:"relative", top: 40, }]}
                >
                    <Text style={style.buttonText}>Send</Text>
                </TouchableOpacity>
    }
                
            </View>
        )
    }
}

export default ForgotPassword