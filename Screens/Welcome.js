import React, { Component } from 'react';
import {
    View, ImageBackground,
    StyleSheet, Pressable,
    Image, TouchableOpacity, Text, SafeAreaView, Dimensions, TextInput, ActivityIndicator
} from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Toast from 'react-native-simple-toast'
import { AuthContext } from '../AuthContextProvider.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Global Style Import
const style = require('../Components/Style.js');

class Welcome extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            load: false,
            visible:false
        }
    }

    login = () => {
        if(this.state.email=="" || this.state.password==""){
            Toast.show("Enter details")
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

    eyeIcon =()=>{
        return(
            <>
            {this.state.visible ?
            <Pressable onPress={()=>this.setState({visible:!this.state.visible})} >
            <Icon name="eye-outline" type="ionicon" size={20} />
            </Pressable>
            :
            <Pressable onPress={()=>this.setState({visible:!this.state.visible})}>
            <Icon name="eye-off-outline" type="ionicon" size={20} />
            </Pressable>
    }
            </>
        )
    }
    render() {
        return (
            <View style={[style.container, { paddingHorizontal: 20 }]}>
                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
                    <Icon onPress={() => this.props.navigation.goBack()} name="close" type="ionicon" size={27} color="#000" />
                    <Text onPress={() => this.props.navigation.navigate("SignUp")} style={[style.h3, { fontWeight: "700" }]}>
                        Sign Up
                    </Text>
                </View>
                <View style={{ marginTop: 100 }}>
                    <Text style={style.h1}>
                        Welcome
                    </Text>
                    <Text style={style.h1}>
                        Back!
                    </Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Input
                        value={this.state.email}
                        onChangeText={(e) => this.setState({ email: e })}
                        placeholder='E-mail' placeholderTextColor="#000" style={{ color: "#000", marginTop: 10, fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />

                    <Input
                        value={this.state.password}
                        rightIcon={this.eyeIcon}
                        onChangeText={(e) => this.setState({ password: e })}
                        placeholder='Password' secureTextEntry={!this.state.visible} placeholderTextColor="#000" style={{  color: "#000", marginTop: 10, fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3", }} />
                </View>
                {this.state.load ?
                    <ActivityIndicator size="large" color="#637752" />
                    :
                    <TouchableOpacity onPress={() => this.login()} style={[style.buttonStyles, { position: "relative", top: 40, }]}
                    >
                        <Text style={style.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                }
                <Text onPress={() => this.props.navigation.navigate("ForgotPassword")} style={[style.h3, { textDecorationLine: "underline",  alignSelf: "center",top:220  }]} >
                    Forgot your password?
                </Text>
            </View>
        )
    }
}

export default Welcome