import React, { Component } from 'react';
import {
    View, ImageBackground,
    StyleSheet, Pressable,
    Image, TouchableOpacity, Text, SafeAreaView, Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


//Global Style Import
const style = require('../Components/Style.js');

class Skip extends Component {

    constructor(props) {
        super(props);
        this.state={
            status:false
        }
    }

    slide2 =()=>{
        // this.setState({status : !this.state.status})
        alert('hi')

    }

    render() {
        return (

            <View style={{ flex: 1, backgroundColor: "white" }}>

                {/* Main Slider */}
                <Swiper style={styles.wrapper}
                    showsButtons={false}
                    activeDotColor="#000"
                    dotColor='#fff'
                    paginationStyle={
                        { bottom: 50 }
                    }
                 autoplay={true}
                 loop={false}
                >
                    {/* Slide 1 */}
                    <View style={styles.slide1}>
                        <ImageBackground
                            source={require("../images/skip1.jpg")}
                            style={styles.slide1Image}>
                        </ImageBackground>
                    </View>

                    {/* Slide 2 */}
                    <View style={styles.slide2} >
                        <ImageBackground source={require("../images/skip2.jpg")}
                            style={styles.slide1Image}>
                        </ImageBackground>
                    </View>
                  

                    {/* Slide 3 */}
                    <View style={styles.slide3}>
                        <ImageBackground
                            source={require("../images/skip3.jpg")}
                            style={styles.slide1Image}>
                            <TouchableOpacity style={[styles.buttonStyles,{}]}
                                onPress={() => this.props.navigation.navigate("SignUp")}>
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonStyles,{backgroundColor:"#fff",bottom:85}]}
                                onPress={() => this.props.navigation.navigate("Welcome")}>
                                <Text style={[styles.buttonText,{color:"#637752"}]}>Login</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                </Swiper>
            </View>
        )
    }
}

export default Skip;


//Internal Stylesheet
const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"

    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    slide1Image: {
        height: "100%",
        width: "100%",

    },
    slide2Image: {
        height: "100%",
        width: "100%",
    },
    slide3Image: {
        height: "100%",
        width: "100%",
    },
    text: {
        top: 420,
        color: '#000',
        fontWeight:"600",
        fontSize: RFValue(28, 580),
        fontFamily: "DancingScript-Bold",
        alignSelf: 'center'
    },
    textSmall: {
        top: 440,
        color: '#4a4b4d',
        fontSize: RFValue(13, 580),
        fontFamily: "Montserrat-Regular",
        alignSelf: 'center',
    },
    text1: {
        top: 420,
        color: '#000',
        fontWeight:"600",
        fontSize: RFValue(28, 580),
        fontFamily: "DancingScript-Bold",
        alignSelf: 'center',
    },
    textSmall1: {
        top: 440,
        color: '#4a4b4d',
        fontSize: RFValue(13, 580),
        fontFamily: "Montserrat-Regular",
        alignSelf: 'center'
    },
    buttonStyles: {
        backgroundColor: "#637752",
        width: Dimensions.get("window").width / 1.5,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 15,
        elevation:2,
        // top: 470,
        position:"absolute",
        bottom:135
    },
    buttonText: {
        color: "#fff",
        fontWeight:"700",
        // top:-2,
        fontSize: RFValue(16, 580),
        fontFamily: "Raleway-Medium",
    }
})
