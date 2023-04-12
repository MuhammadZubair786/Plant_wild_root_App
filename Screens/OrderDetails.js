import React, { Component } from 'react';
import {
    Text, View, ScrollView, ActivityIndicator,
    StyleSheet, Image, Dimensions, Pressable,
    TouchableOpacity, ImageBackground, FlatList
} from 'react-native';
import {
    Icon, SearchBar
} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

//Global StyleSheet Import
const styles = require('../Components/Style.js');

class OrderDetails extends Component {
    render() {
        return (
            <View>
                {/* Header */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }} >
                    <Icon name="arrow-back-outline" onPress={() => this.props.navigation.goBack()} type="ionicon" />
                    <Text style={[styles.headerText, { fontSize: 20 }]}>
                        Order Details
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                    </View>
                </View>
                <ScrollView>
                    <View style={{ paddingTop: 10 }}>
                        <View style={style.topView}>
                            <View>
                                <Text style={[styles.h3, { fontSize: 17 }]}>Order Id: 364</Text>
                                <Text style={[styles.h4, { color: "green", fontWeight: "600", }]}>
                                    Out for delivery
                                </Text>
                                <Text style={[styles.h4, { color: "grey" }]} >
                                    Today, 11:10 am
                                </Text>
                            </View>
                            <Text style={[styles.h3, { color: "#000", fontWeight: "bold" }]}>₹ 840/-</Text>
                        </View>
                        <View style={{ flexDirection: "row", paddingTop: 10, marginLeft: 10, alignItems: "center", borderBottomWidth: 1, borderColor: "#d3d3d3", paddingBottom: 10 }}>
                            <Image
                                source={require("../images/blueplant.jpg")}
                                style={style.productImg} />

                            <View style={{ marginLeft: 10, width: "70%", paddingBottom: 10, }}>
                                <Text style={[styles.h3, { fontSize: 18, marginTop: -5 }]}>Elephant Bush</Text>
                                <Text style={[styles.h4, { color: "grey" }]} >
                                    Qty: 1
                                </Text>
                                <Text style={[styles.h3, { fontSize: 15, marginTop: 5 }]}> ₹ 350/-</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", paddingTop: 10, marginLeft: 10, alignItems: "center", borderBottomWidth: 1, borderColor: "#d3d3d3", paddingBottom: 10 }}>
                            <Image
                                source={require("../images/plant.jpg")}
                                style={style.productImg} />

                            <View style={{ marginLeft: 10, width: "70%", paddingBottom: 10, }}>
                                <Text style={[styles.h3, { fontSize: 18, marginTop: -5 }]}>Hibiscus</Text>
                                <Text style={[styles.h4, { color: "gray" }]} >
                                    Qty: 2
                                </Text>
                                <Text style={[styles.h3, { fontSize: 15, marginTop: 5 }]}> ₹ 400/-</Text>
                            </View>
                        </View>
                        {/* Order Track */}
                        <View style={{ marginHorizontal: 20, marginTop: 10, borderBottomWidth: 1, borderColor: "#d3d3d3", paddingBottom: 20 }} >
                            <Text style={[styles.h3, { fontWeight: "700", fontSize: 18 }]}>
                                Delivery details:
                            </Text>
                            <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                                <Icon name="ellipse" type="ionicon" size={15} color="green" />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.h3}>
                                        Order Confirmed
                                    </Text>
                                    <Text style={[styles.h4, { color: "gray" }]} >
                                        18 May,22 06:00pm
                                    </Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                                <Icon name="ellipse" type="ionicon" size={15} color="green" />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.h3}>
                                        Out for delivery
                                    </Text>
                                    <Text style={[styles.h4, { color: "gray" }]} >
                                        19 May,22 12:00pm
                                    </Text>
                                </View>

                            </View>
                        </View>
                        {/* Price Section */}
                        <View style={{ marginHorizontal: 20, marginTop: 10 }} >
                            <Text style={[styles.h3, { fontWeight: "700", fontSize: 18 }]}>
                                Price Details:
                            </Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", top: 10 }}>
                                <Text style={styles.h3}>
                                    Total MRP
                                </Text>
                                <Text style={[styles.h3, {}]}>
                                    ₹  750/-
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", top: 15 }}>
                                <Text style={styles.h3}>
                                    GST
                                </Text>
                                <Text style={[styles.h3, {}]}>
                                    ₹  50/-
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", top: 20, borderBottomWidth: 1, paddingBottom: 10, borderColor: "#d3d3d3" }}>
                                <Text style={styles.h3}>
                                    Shipping charge
                                </Text>
                                <Text style={[styles.h3, {}]}>
                                    ₹  40/-
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                                <Text style={styles.h2}>
                                    Total
                                </Text>
                                <Text style={[styles.h2, { fontWeight: "700" }]}>
                                    ₹  840/-
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginHorizontal: 20, marginTop: 10 }} >
                            <Text style={[styles.h3, { fontWeight: "700", fontSize: 18 }]}>
                                Payment mode:
                            </Text>
                            <Text style={[styles.h3, { marginTop: 5 }]}>
                                Cash on Delivery
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

        )
    }
}
export default OrderDetails

const style = StyleSheet.create({
    button: {
        width: 100,
        padding: 2,
        // borderWidth: 1,
        // borderColor: "#d3d3d3",
        backgroundColor: "#637752",
        borderRadius: 5,
        // shadowOffset: { width: 0, height: 0 },
        elevation: 1,
        shadowRadius: 50,
        shadowColor: "#f5f5f5",
        shadowOffset: { width: 50, height: 50 },
        alignItems: "center"
    },
    iconView: {
        backgroundColor: "#d93f11",
        marginTop: 10,
        padding: 10,
        width: 40,
        height: 40,
        borderRadius: 100
    },
    productImg: {
        height: 70,
        width: 70,
        borderRadius: 100,
        // margin: 10,
        alignSelf: "center"
    },
    topView: { flexDirection: "row", alignItems: "center", paddingBottom: 5, justifyContent: "space-between", marginHorizontal: 20, }
})