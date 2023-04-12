import {StyleSheet,Dimensions } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

module.exports =  StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#ffffff'
    },
    header: {
      backgroundColor: "#fff",
      flexDirection: "row",
      padding: 10,
      // height:45,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderBottomWidth:1,
      borderColor:"#d3d3d3"
    },
  
    headerText:{
      color:"#000",
      alignSelf:"center",
      fontSize:RFValue(14,580),
      // left:10,
      fontWeight:"500",
      // marginTop:5
    },
  
    h1: {
        // fontSize:32,
        fontSize:RFValue(26, 580),
        color:"#000",
        fontWeight:"bold",
        // fontFamily:"Playfair-Regular",
        fontFamily: "Tangerine-Bold",
      },

      h2: {
        // fontSize:24,
        fontSize:RFValue(18, 580),
        // fontFamily:"Raleway-SemiBold",
        fontFamily: "Montserrat-Regular",
        color:'#000'
      },

      h3: {
        // fontSize:18.72,
        fontSize:RFValue(14, 580),
        // fontFamily:"Raleway-SemiBold",
        fontFamily: "Raleway-Medium",
        color:'#000'
      },

      h4: {
        // fontSize:16,
        fontSize:RFValue(11, 580),
        color:"#000",
        // fontFamily:"Raleway-SemiBold",
        fontFamily: "Raleway-Regular",
        color:'#222222'
      },

      h5: {
        // fontSize:13.28,
        fontSize:RFValue(10, 580),
        // fontFamily:"Raleway-SemiBold",
        fontFamily: "Raleway-Regular",
        color:'#222222'
      },

      h6: {
        // fontSize:12,
        fontSize:RFValue(9, 580),
        // fontFamily:"Raleway-SemiBold",
        fontFamily: "Montserrat-MediumItalic",
        color:'#222222'
      },
      smallHeading:
      {
        // fontSize:15,
        fontSize:RFValue(11, 580),
        // fontFamily:"Raleway-SemiBold",
        fontFamily: "Montserrat-Regular",
      },
      small:
      {
        // fontSize:14,
        fontSize:RFValue(13, 580),
        // fontFamily:"Raleway-Regular",
        fontFamily: "Montserrat-Bold",
        color:'#5d5d5d',
        marginLeft:15
      },
      p:
      {
        // fontSize:15,
        fontSize:RFValue(11, 580),
        fontFamily: "Montserrat-Regular",
        marginTop:5,
        color:'#222222',
      },
      buttonStyles:{
        backgroundColor: "#637752",
        width: Dimensions.get("window").width / 1.5,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 15,
        elevation:2,
        position:"absolute",
        bottom:0,
        // top: 435,
        // right:-30
      },
      buttonText: {
        color: "#fff",
        // top:-2,
        fontWeight:"bold",
        fontSize: RFValue(13, 580),
        fontFamily: "Raleway-Medium",
    },
    minusButton:{
      backgroundColor:"#4A4B4D",
      borderRadius:10,
      padding:0,
      justifyContent:"center",
      width:50,
      marginTop:8,
      height:20
    },
    addQuantityButton:{
      backgroundColor:"#637752",
      borderRadius:20,
      padding:0,
      justifyContent:"center",
      width:50,
      marginTop:8,
      height:20
    },
    moveToCartButton:{ 
      width: 90,
      right:5,
      justifyContent:"center",
      backgroundColor: "#637752", 
      borderRadius: 5, 
      height: 27, 
      alignSelf: "flex-end", 
      alignItems: "center" 
    },
  
        
  });
