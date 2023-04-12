import React, { Component } from 'react';
import {
    View, ImageBackground,
    StyleSheet, ActivityIndicator, FlatList, TouchableOpacity,
    Image, Text, Dimensions, ToastAndroid, Pressable, ScrollView,
} from 'react-native';
import { Icon } from "react-native-elements";
import { RFValue } from 'react-native-responsive-fontsize';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';

//Global Style Import
const styles = require('../Components/Style.js');

const win = Dimensions.get('window');

class CompletedOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            page: 1,
            load_more: false
        };
    }


    orderCard = ({ item }) => {
        return (
            <>
                {item.order_status == "success" || item.order_status == "out_for_delivery"   ?
                    <View style={{ borderBottomWidth: 1, borderColor: "#d3d3d3", paddingBottom: 10 }}>
                        <View style={{ flexDirection: "row", paddingTop: 10, marginLeft: 10, }}>
                            <View style={style.iconView}>
                                <Icon name="basket-outline" type="ionicon" color="white" size={20} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "85%" }}>
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.h3}>Order #{item.id}</Text>
                                    <Text style={[styles.h5, { color: "grey" }]} >
                                        {moment(item.timestamps).format("DD-MMM-YY hh:mm A")}
                                    </Text>
                                    {item.order_status == "success" ?
                                        <Text style={[styles.h4, { color: "green", fontWeight: "600" }]}>{item.order_status}</Text>
                                        :

                                        <Text style={[styles.h4, { color: "gray", fontWeight: "600" }]}>{item.order_status}</Text>
                                    }
                                </View>
                                <Text style={[styles.h3, { color: "#d93f11", fontWeight: "bold" }]}>₹ {item.total_amount}</Text>
                            </View>
                        </View>

                        <View style={{ alignSelf: "flex-end", flexDirection: "row", marginRight: 10, marginTop: 10 }}>
                            <Pressable style={style.button}  >
                                <Text style={[styles.p, { top: -2, color: "#0274bc" }]}>
                                    View Details
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => this.props.navigation.navigate("OrderTrack", { order_id: item.id })} style={[style.button, { marginLeft: 10 }]}>
                                <Text style={[styles.p, { top: -2, color: "#0274bc" }]}>
                                    Order Track
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    : null}
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                {/* View for Card component */}
                {this.state.isLoading ? (
                    <View>
                        <Loaders />
                    </View>
                ) : (
                    <View>
                        
                        <View style={{ borderBottomWidth: 1, borderColor: "#d3d3d3", paddingTop: 10 }}>
                            <View style={style.topView}>
                                <View>
                                    <Text style={[styles.h3, {fontSize: 17 }]}>Order Id: 218</Text>
                                    <Text style={[styles.h4, { color: "green", fontWeight: "600", }]}>
                                        Order Delivered
                                    </Text>
                                    
                                    <Text style={[styles.h4, { color: "grey" }]} >
                                            15 May, 11:10 am
                                        </Text>
                                </View>
                                <Text style={[styles.h3, { color: "#000", fontWeight: "bold" }]}>₹ 399</Text>
                            </View>
                            <View style={{ flexDirection: "row", paddingTop: 10, marginLeft: 10,alignItems:"center" }}>
                                    <Image
                                        source={require("../images/blueplant.jpg")}
                                        style={style.productImg} />
                                
                                    <View style={{ marginLeft: 10,width:"70%",paddingBottom:10,}}>
                                        <Text style={[styles.h3, { fontSize: 18,marginTop:-5 }]}>Elephant Bush</Text>
                                        <Text style={[styles.h4, { color: "grey" }]} >
                                            Qty: 4
                                        </Text>

                                </View>
                            </View>
                            <View style={{ alignSelf: "flex-end", flexDirection: "row", marginRight: 10,marginBottom:10, marginTop: -20 }}>
                                <Pressable style={style.button} onPress={()=>this.props.navigation.navigate("OrderDetails")}  >
                                    <Text style={[styles.p, { top: -2, color: "#fff" }]}>
                                        View Details
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style={{ borderBottomWidth: 1, borderColor: "#d3d3d3", paddingTop: 10 }}>
                            <View style={style.topView}>
                                <View>
                                    <Text style={[styles.h3, {fontSize: 17 }]}>Order Id: 364</Text>
                                    <Text style={[styles.h4, { color: "red", fontWeight: "600", }]}>
                                        Order Cancelled
                                    </Text>
                                    
                                    <Text style={[styles.h4, { color: "grey" }]} >
                                            Today, 11:10 am
                                        </Text>
                                </View>
                                <Text style={[styles.h3, { color: "#000", fontWeight: "bold" }]}>₹ 1500</Text>
                            </View>
                            <View style={{ flexDirection: "row", paddingTop: 10, marginLeft: 10,alignItems:"center" }}>
                                    <Image
                                        source={require("../images/plant.jpg")}
                                        style={style.productImg} />
                                
                                    <View style={{ marginLeft: 10,width:"70%",paddingBottom:10,}}>
                                        <Text style={[styles.h3, { fontSize: 18,marginTop:-5 }]}>Elephant Bush</Text>
                                        <Text style={[styles.h4, { color: "grey" }]} >
                                            Qty: 1
                                        </Text>

                                </View>
                            </View>
                            <View style={{ alignSelf: "flex-end", flexDirection: "row", marginRight: 10,marginBottom:10, marginTop: -20 }}>
                                <Pressable style={style.button} onPress={()=>this.props.navigation.navigate("OrderDetails")}  >
                                    <Text style={[styles.p, { top: -2, color: "#fff" }]}>
                                        View Details
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        {/* ) : (
                            <View style={{ alignItems: 'center', marginTop: 100, }}>
                                <Image
                                    source={require('../Images/noorder.png')}
                                    style={{ width: 400, height: 250 }}
                                />
                                <Text style={([styles.h3], { marginTop: 10 })}>
                                    No Orders Found
                                </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Category")}>
                                    <View style={[styles.buttonStyles, { marginTop: 30 }]}>
                                        <Text style={styles.buttonText}>Shop Now</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )} */}
                    </View>
                )}
                {this.state.load_more ?
                    <View style={{marginTop:10}}>
                        <ActivityIndicator size="large" color="#ff9933" />
                    </View>
                    :
                    null
                }
            </SafeAreaView>
        )
    }
}
export default CompletedOrders;

class Loaders extends Component {
    render() {
        return (
            <View>
                <SkeletonPlaceholder >
                    <View style={{ flexDirection: "row", marginTop: 20, height: 100 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: 50, height: 50, borderRadius: 50, }} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <View style={{ width: 320, height: 20, marginLeft: 10 }} />
                                </View>
                            </View>
                            <View style={{ width: 320, height: 20, marginLeft: 10, top: 5 }} />
                        </View>

                        <View style={{ flexDirection: "row", right:10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
                            <View style={styles.removeButton} />
                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20, height: 100 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: 50, height: 50, borderRadius: 50, }} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <View style={{ width: 320, height: 20, marginLeft: 10 }} />
                                </View>
                            </View>
                            <View style={{ width: 320, height: 20, marginLeft: 10, top: 5 }} />
                        </View>

                        <View style={{ flexDirection: "row", right:10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
                            <View style={styles.removeButton} />
                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20, height: 100 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: 50, height: 50, borderRadius: 50, }} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <View style={{ width: 320, height: 20, marginLeft: 10 }} />
                                </View>
                            </View>
                            <View style={{ width: 320, height: 20, marginLeft: 10, top: 5 }} />
                        </View>

                        <View style={{ flexDirection: "row", right:10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
                            <View style={styles.removeButton} />
                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20, height: 100 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: 50, height: 50, borderRadius: 50, }} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <View style={{ width: 320, height: 20, marginLeft: 10 }} />
                                </View>
                            </View>
                            <View style={{ width: 320, height: 20, marginLeft: 10, top: 5 }} />
                        </View>

                        <View style={{ flexDirection: "row", right:10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
                            <View style={styles.removeButton} />
                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20, height: 100 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: 50, height: 50, borderRadius: 50, }} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <View style={{ width: 320, height: 20, marginLeft: 10 }} />
                                </View>
                            </View>
                            <View style={{ width: 320, height: 20, marginLeft: 10, top: 5 }} />
                        </View>

                        <View style={{ flexDirection: "row", right:10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
                            <View style={styles.removeButton} />
                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20, height: 100 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: 50, height: 50, borderRadius: 50, }} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <View style={{ width: 320, height: 20, marginLeft: 10 }} />
                                </View>
                            </View>
                            <View style={{ width: 320, height: 20, marginLeft: 10, top: 5 }} />
                        </View>

                        <View style={{ flexDirection: "row", right:10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
                            <View style={styles.removeButton} />
                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>


                </SkeletonPlaceholder>

            </View>
        )
    }
}

const style = StyleSheet.create({
    button: {
        width: 100,
        padding: 5,
        // borderWidth: 1,
        // borderColor: "#d3d3d3",
        backgroundColor:"#637752",
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
    topView:{ flexDirection: "row",alignItems:"center",paddingBottom:5, justifyContent: "space-between",marginHorizontal:20,}
})
