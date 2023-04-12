import React, { Component, useState } from 'react';
import {
    View, Text, ScrollView, Image, Pressable,
    TextInput, Button, StyleSheet, TouchableOpacity, BackHandler, ImageBackground, ActivityIndicator
} from 'react-native';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Header, Icon } from 'react-native-elements';
import Toast from 'react-native-simple-toast'


//Global Style Import
const styles = require('../Components/Style.js');

const win = Dimensions.get('window');

class NewAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            f_name: "",
            l_name: "",
            contact: "",
            pinCode: "",
            city: "",
            state: "",
            address: "",
            mail: "",
            isLoading: false,

        }
    }

    add_address = () => {
        this.setState({isLoading:true})
        var form = new FormData();
        form.append("module", "userupdatebillingaddress");
        form.append("user_id", global.id);
        form.append("first_name", this.state.f_name);
        form.append("last_name", this.state.l_name);
        form.append("address", this.state.address);
        form.append("city", this.state.city);
        form.append("state", this.state.state);
        form.append("postcode", this.state.pinCode);
        form.append("email", this.state.mail);
        form.append("phone", this.state.contact);
        // form.append("password", this.state.password);
        // console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                console.warn(json)
                if(json.status){
                    Toast.show("Address added successfully");
                    this.props.navigation.goBack();
                }
                else{
                    Toast.show("Failed to add address");

                }
                // this.setState({ toptrend: json })
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                this.setState({ isLoading: false })
            });
    }
    render() {
        return (
            <View style={styles.container}
            >

                {/* header */}
                {/* Header */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }} >
                    <Icon name="arrow-back-outline" onPress={() => this.props.navigation.goBack()} type="ionicon" />
                    <Text style={[styles.headerText, { fontSize: 20 }]}>
                        Add Address
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                    </View>
                </View>
                <ScrollView >

                    {/* Component for address fields  */}
                    <View style={{ paddingHorizontal: 10 }}>

                        <TextInput placeholder='First Name'
                            value={this.state.f_name}
                            onChangeText={(e) => this.setState({ f_name: e })}
                            placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, color: "#000", fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />

                        <TextInput placeholder='Last Name'
                            value={this.state.l_name}
                            onChangeText={(e) => this.setState({ l_name: e })} placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, color: "#000", fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />

                        <TextInput placeholder='Street address'
                            value={this.state.address}
                            onChangeText={(e) => this.setState({ address: e })} placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, color: "#000", fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />

                        <TextInput placeholder='Town/City'
                            value={this.state.city}
                            onChangeText={(e) => this.setState({ city: e })} placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, color: "#000", fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />

                        <TextInput placeholder='State'
                            value={this.state.state}
                            onChangeText={(e) => this.setState({ state: e })} placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, fontWeight: "bold", color: "#000", fontSize: 15, borderColor: "#d3d3d3" }} />
                        {/* <TextInput placeholder='' placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} /> */}




                        <TextInput placeholder='Pin'
                            value={this.state.pinCode}
                            onChangeText={(e) => this.setState({ pinCode: e })} keyboardType='numeric' maxLength={6} placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, fontWeight: "bold", fontSize: 15, color: "#000", borderColor: "#d3d3d3" }} />

                        <TextInput maxLength={10}
                            value={this.state.contact}
                            onChangeText={(e) => this.setState({ contact: e })} keyboardType="numeric" placeholder='Phone' placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, fontWeight: "bold", fontSize: 15, color: "#000", borderColor: "#d3d3d3" }} />
                        <TextInput placeholder='Email'
                value={this.state.mail}
                onChangeText={(e)=>this.setState({mail:e})} placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, color: "#000", fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />



                    </View>
                    {this.state.isLoading ?
                        <View style={{marginTop:20}}>
                            <ActivityIndicator size='large' color='#637752' />
                        </View> :
                        <Pressable onPress={() => this.add_address()} style={[style.buttonStyles, { marginTop: 30 }]} >
                            <Text style={styles.buttonText}>
                                Add Address
                            </Text>
                        </Pressable>
                    }
                </ScrollView>

            </View>
        )
    }
}

export default NewAddress

const style = StyleSheet.create({
    card: {
        backgroundColor: "white",
        width: win.width,
        padding: 10
    },
    textInput: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#d3d3d3",
        borderRadius: 3,
        marginBottom: 15
    },
    buttonStyles: {
        backgroundColor: "#637752",
        width: Dimensions.get("window").width / 1.5,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 15,
        elevation: 2,
        // position:"absolute",
        // bottom:0,
        // top: 435,
        // right:-30
    },
})

