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

class OngoingOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            page: 1,
            load_more: false
        };
    }

    componentDidMount =()=>{
        this.my_orders();
    }

    my_orders = () => {
        var form = new FormData();
        form.append("module", "userorders");
        form.append("user_id", global.id);
        // form.append("password", this.state.password);
        console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                console.warn("order", json)
                this.setState({ data: json })
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                this.setState({ isLoading: false })
            });
    }

    orderCard = ({ item }) => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: "#d3d3d3", paddingTop: 10 }}>
                            <View style={style.topView}>
                                <View>
                                    <Text style={[styles.h3, {fontSize: 17 }]}>Order Id: 985</Text>
                                    <Text style={[styles.h4, { color: "green", fontWeight: "600", }]}>
                                        Order Confirmed
                                    </Text>
                                    
                                    <Text style={[styles.h4, { color: "grey" }]} >
                                            Today, 11:10 am
                                        </Text>
                                </View>
                                <Text style={[styles.h3, { color: "#000", fontWeight: "bold" }]}>₹ 1500</Text>
                            </View>
                            <View style={{ flexDirection: "row", paddingTop: 10, marginLeft: 10,alignItems:"center" }}>
                                    <Image
                                        source={{uri:item.image}}
                                        style={style.productImg} />
                                
                                    <View style={{ marginLeft: 10,width:"70%",paddingBottom:10,}}>
                                        <Text style={[styles.h3, { fontSize: 18,marginTop:-5 }]}>
                                            {item.title}
                                        </Text>
                                        <Text style={[styles.h4, { color: "grey" }]} >
                                            Qty: 1
                                        </Text>

                                </View>
                            </View>
                            <View style={{ alignSelf: "flex-end", flexDirection: "row", marginRight: 10,marginBottom:10, marginTop: -20 }}>
                                <Pressable style={style.button} onPress={()=>this.props.navigation.navigate("OrderDetails")}   >
                                    <Text style={[styles.p, { top: -2, color: "#fff" }]}>
                                        View Details
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
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
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={this.orderCard}
                    keyExtractor={item => item.id}
                />
                )}
                {this.state.load_more ?
                    <View style={{ marginTop: 10 }}>
                        <ActivityIndicator size="large" color="#ff9933" />
                    </View>
                    :
                    null
                }
            </SafeAreaView>
        )
    }
}
export default OngoingOrders;

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

                        <View style={{ flexDirection: "row", right: 10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
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

                        <View style={{ flexDirection: "row", right: 10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
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

                        <View style={{ flexDirection: "row", right: 10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
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

                        <View style={{ flexDirection: "row", right: 10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
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

                        <View style={{ flexDirection: "row", right: 10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
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

                        <View style={{ flexDirection: "row", right: 10, top: 60, alignSelf: "flex-end", position: "absolute", bottom: 0 }}>
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
    topView:{ flexDirection: "row",alignItems:"center",paddingBottom:5, justifyContent: "space-between",marginHorizontal:20 }
})
