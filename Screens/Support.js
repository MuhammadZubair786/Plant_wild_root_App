import React, { Component } from 'react';
import { Dimensions, TextInput } from 'react-native';
import {
    View, ImageBackground, FlatList,
    StyleSheet, Pressable, ScrollView, Linking,
    Image, Text, TouchableOpacity
} from 'react-native';
import { Icon, Header } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

//Global Style Import
const styles = require('../Components/Style.js');

const win = Dimensions.get('window');

class Support extends Component {
    constructor(props) {
        super(props);
    }

    renderLeftComponent() {
        return (
            <View style={{ flexDirection: "row", width: win.width / 2, }}>
                <Text style={{ top: 2 }}  >
                    <Icon name="chevron-back-outline" color="#222222" size={20} type="ionicon"
                        onPress={() => this.props.navigation.goBack()} />
                </Text>
                <Text style={[styles.headerHeadingText,
                ]}>Support</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: "#fafafa" }]}>
                {/* View for header component */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }} >
                    <Icon name="arrow-back-outline" onPress={() => this.props.navigation.goBack()} type="ionicon" />
                    <Text style={[styles.headerText, { fontSize: 20 }]}>
                        Support
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                    </View>
                </View>

                <ScrollView>

                    <SupportView />


                    {/* Mail View */}

                    <Mail />

                    {/* FAQ View */}
                    <FAQ navigation={this.props.navigation} />



                </ScrollView>
                {/* <Whatsapp /> */}
            </View>

        )
    }
}

// Support Top View

class SupportView extends Component {
    render() {
        return (
            <View style={{ backgroundColor: "#fff", flexDirection: "row", borderTopWidth: 2, borderColor: "#f5f5f5", padding: 10 }}>
                <View style={style.leftView}>
                    <Text style={[style.heading]}>Welcome to</Text>
                    <Text style={[style.heading]}>
                        Customer Support</Text>
                    <Text style={styles.h4}>
                        Please get in touch and we will be happy to help you.
                    </Text>
                </View>
                <View style={{ width: Dimensions.get("window").width / 2 }}>
                    <Image source={require("../images/support.png")}
                        style={{ width: 100, height: 140, alignSelf: "center" }} />
                </View>
            </View>
        )
    }
}

// FAQ VIew

class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }


    questionCard = ({ item }) => (
        <TouchableOpacity >
            <View style={style.questView} >
                <Text style={styles.h4}>
                    {item.faq_title}
                </Text>
                <Icon type="ionicon" name="chevron-forward-outline" />
            </View>
        </TouchableOpacity >
    );
    render() {
        return (
            <View style={{ marginTop: 10, backgroundColor: "#fff" }}>
                <Text style={[styles.heading, { color: "#637752",marginLeft:10 }]}>FAQ</Text>

                <TouchableOpacity >
                    <View style={style.questView} >
                        <Text style={styles.h4}>
                            How to order from an application?
                        </Text>
                        <Icon type="ionicon" name="chevron-forward-outline" />
                    </View>
                </TouchableOpacity >
                
                <TouchableOpacity >
                    <View style={style.questView} >
                        <Text style={styles.h4}>
                            Cash on delivery available?
                        </Text>
                        <Icon type="ionicon" name="chevron-forward-outline" />
                    </View>
                </TouchableOpacity >

                
                <TouchableOpacity >
                    <View style={style.questView} >
                        <Text style={styles.h4}>
                            How to track an order?
                        </Text>
                        <Icon type="ionicon" name="chevron-forward-outline" />
                    </View>
                </TouchableOpacity >
            </View>
        )
    }
}

// Mail View
class Mail extends Component {
    render() {
        return (
            <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 10 }}>
                <Text style={[styles.heading, { marginTop: 0, color: "#637752", marginLeft: 0 }]}>
                    Mail us
                </Text>
                <Text style={styles.h5} onPress={() => Linking.openURL('mailto:contact.wildroots@gmail.com')}>
                contact.wildroots@gmail.com
                </Text>
            </View>
        )
    }
}

// Whatsapp help
// class Whatsapp extends Component{

//     render(){
//         return(
//             <View style={style.add}>
//                 <Pressable onPress={()=>{Linking.openURL('whatsapp://send?text=Hello, Is it Kamal Jewellers support?&phone=+918755255052')}}>
//                     <Image source={require("../image/whatsapp.png")} style={{alignSelf:"center",width:45,height:45}} />
//                    <Text style={styles.h4}>WhatsApp Us</Text>
//                 </Pressable>
//             </View>
//         )
//     }
// }
export default Support;

const style = StyleSheet.create({
    heading: {
        color: "#637752",
        fontSize: RFValue(13, 580),
        fontFamily: "Raleway-SemiBold",
        // fontFamily: "Tangerine-Bold",
        // marginLeft:10
        // marginTop:45,
        // alignSelf:"center"
    },
    header: {
        fontSize: 20,
        marginLeft: 10,
        color: "black"
    },
    leftView: {
        flexDirection: "column",
        marginLeft: 10,
        marginTop: -15,
        alignSelf: "center",
        width: Dimensions.get("window").width / 2
    },

    questView: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#d3d3d3",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    add: {

        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        position: 'absolute',
        bottom: 50,
        right: 5,
        height: 50,
        borderRadius: 100,

    }

})
