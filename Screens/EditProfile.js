import React, { Component } from 'react';
import {
    View, ImageBackground,
    StyleSheet, Pressable,
    Image, TouchableOpacity, Text, SafeAreaView, Dimensions, TextInput, ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


//Global Style Import
const style = require('../Components/Style.js');

class EditProfile extends Component {
    render() {
        return (

            <View style={[style.container, { paddingHorizontal: 20 }]}>
                {/* Header */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }} >
                    <Icon name="arrow-back-outline" onPress={() => this.props.navigation.goBack()} type="ionicon" />
                    <Text style={[style.headerText, { fontSize: 20 }]}>
                        Edit Profile
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>

                    <TextInput placeholder='Name' placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10,color:"#000", fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />
                    <TextInput placeholder='E-mail' placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10,color:"#000", fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />

                    <TextInput maxLength={10} keyboardType="numeric" placeholder='Phone' placeholderTextColor="#000" style={{ borderBottomWidth: 2,color:"#000", marginTop: 10, fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />
                    <TextInput secureTextEntry placeholder='Password' placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10,color:"#000", fontWeight: "bold", fontSize: 15, borderColor: "#d3d3d3" }} />


                    <TextInput secureTextEntry placeholder='Confirm Password' placeholderTextColor="#000" style={{ borderBottomWidth: 2, marginTop: 10, fontWeight: "bold", fontSize: 15,color:"#000", borderColor: "#d3d3d3" }} />

                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={[style.buttonStyles, { position: "relative", top: 40, }]}
                >
                    <Text style={style.buttonText}>Save</Text>
                </TouchableOpacity>

            </View>

        )
    }
}

export default EditProfile