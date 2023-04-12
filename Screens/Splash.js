import React, { Component } from 'react';
import {
    Text,View,SafeAreaView,
    Image,ImageBackground,
    Dimensions,StyleSheet
} from 'react-native';

//Global Style Import
const styles = require('../Components/Style.js');

const win = Dimensions.get('window');

class Splash extends Component {
    
    constructor(props){
        super(props);
    }

    // componentDidMount =()=>{
    //     setTimeout(() => {
    //         this.props.navigation.navigate("Skip")   
    //     }, 2000);   }
    

    render() {
        return (
            <SafeAreaView style={[styles.container,{backgroundColor:"transparent"}]}>
                <View style={[styles.container,{alignItems:"center",justifyContent:"center"}]}>
                
                {/* background Image */}
                <ImageBackground source={require('../images/splash.jpg')} style={style.image} >

                    {/* logo image */}
                    {/* <Image source={require('../image/logo/logomain.png')} style={style.logo}/> */}
                </ImageBackground>
            </View>
            </SafeAreaView>
        )
    }
}

export default Splash;


//internal styling
const style=StyleSheet.create({
    logo:{
        height:50,
        width:Dimensions.get('window').width/2,
        alignSelf:"center",
        justifyContent:"flex-end",
        top:600,
        
    },
    text:{
        alignSelf:"center",
        top:450,
        fontFamily:"Roboto-SemiBold",
        alignContent:"flex-end"
    },
    image:{
        height:"100%",
        width:"100%",
    }
})
