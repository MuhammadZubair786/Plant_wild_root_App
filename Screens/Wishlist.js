import React, { Component } from 'react';
import {
    Text, View, ScrollView, ActivityIndicator,
    StyleSheet, Image, Dimensions,
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

class Wishlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            object: {},
            like: {},
            product: [],
            page: 1,
            load_more: false
        }
    }

    componentDidMount = () => {
        this.fetch_wishlist();
    }

    fetch_wishlist = () => {
        var form = new FormData();
        form.append("module", "userwishlist");
        form.append("user_id", global.id);
        // form.append("password", this.state.password);
        // console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                console.warn("wish",json)
                this.setState({ product: json })
                // if (!json.status) {
                //     this.setState({ product: [] })
                // }
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                this.setState({ isLoading: false })
            });
    }

    removeWishlist = (id) => {
        var form = new FormData();
            form.append("module", "userremovewishlist");
            form.append("user_id", global.id);
            form.append("prod_id", id);
            // console.warn(form)
            fetch(global.api, {
                method: 'POST',
                body: form,
            }).then((response) => response.json())
                .then((json) => {
                    console.warn("add" ,json)
                    Toast.show("Removed from wishlist")
                    this.fetch_wishlist();
                    // this.setState({ potsforplant: json })
                    return json;
                }).catch((error) => {
                    console.error(error);
                }).finally(() => {
                    // this.setState({ isLoading: false })
                });
     }
    card = ({ item }) => (
        <View style={style.card} >
            {/* View for Image */}
            <View style={{
                width: "27%", marginHorizontal: 7, marginBottom: 10, elevation: 1, shadowRadius: 20,
                shadowColor: "#f5f5f5",
                borderRadius: 10,
                // borderWidth: 1,
                borderColor: "#d3d3d3",
                shadowOffset: { width: 50, height: 50 },
            }}>

                {/* <View style={{ width: 60, position: "absolute", zIndex: 1, backgroundColor: "green", borderBottomEndRadius: 5, bottom: 0 }}>
                    <Text style={[styles.p, { fontWeight: "700", fontSize: RFValue(9, 580), color: "#fff", top: -2, left: 5 }]}>10% Off</Text>
                </View> */}


                <Image
                    source={{ uri: item.thumbnail }}
                    // source={{ uri: global.img_url + value.picture[0].src }}
                    style={style.productImg} />
            </View>
            {/* View for Content */}

            <View style={style.contentView}>
                {/* View for name */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                    {/* Text View */}
                    <View style={{ width: "100%", }}>
                        <View style={{ flexDirection: "row", width: "100%",  }}>
                            <View>
                                {/* <Text style={{ fontSize: RFValue(11, 580), top: 5, color: "grey" }}>
                                    Indoor
                                </Text> */}
                                <Text numberOfLines={2} style={[styles.h2, { top: 5,width:"60%", fontSize: RFValue(14, 580), fontWeight: "bold" }]}>
                                    {item.post_title}
                                </Text>
                            </View>

                            <TouchableOpacity onPress={()=>this.removeWishlist(item.ID)} style={{ padding: 5, backgroundColor: "#f5f5f5", borderRadius: 50, alignItems: "center", justifyContent: "center",position:"absolute",right:5, height: 30 }}
                            >
                                <MaterialCommunityIcons name="heart"
                                    color={'#000'}
                                    size={20} />
                            </TouchableOpacity>
                        </View>
                        {/* <Text style={[styles.h4, { fontSize: RFValue(11, 580), color: "red" }]}>Out of stock!</Text> */}
                        {/* } */}
                        <View style={{ flexDirection: "row" }} >
                            <Text style={[styles.h3, { fontSize: RFValue(12, 580), top: 5, color: "#222222" }]}>Rs. {item._price}/-</Text>

                            <Text style={[styles.h3, { fontSize: RFValue(12, 580), top: 5, left: 10, color: "gray", textDecorationLine: "line-through" }]}>Rs. {item._regular_price}/-</Text>

                        </View>
                    </View>
                </View>



            </View>
        </View>

    )


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#151415" }}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }} >
                        <Icon name="arrow-back-outline" onPress={() => this.props.navigation.goBack()} type="ionicon" />
                        <Text style={[styles.headerText, { fontSize: 20 }]}>
                            Wishlist
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        </View>
                    </View>

                    {this.state.isLoading ? (
                        <View style={{ marginTop: 200 }}>
                            {/* <Loaders /> */}
                            <ActivityIndicator size="large" color="#637752" />
                        </View>
                    ) : (
                        <>
                            {this.state.product.length>0 ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.product}
                                    renderItem={this.card}
                                    keyExtractor={item => item.id}
                                />
                                :
                                <Text style={[styles.h2,{alignSelf:"center",marginTop:180}]}>
                                    No product in wishlist
                                </Text>
                            }
                        </>
                    )}
                    {this.state.load_more ?
                        <ActivityIndicator size="large" color="#ff9933" />
                        :
                        null
                    }

                </View>
            </SafeAreaView>
        )
    }
}
export default Wishlist;

class Loaders extends Component {
    render() {
        return (
            <View>
                <SkeletonPlaceholder >
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: win.width / 3.5, height: 110, borderRadius: 10 }} />
                        </View>

                        <View>
                            <View style={{ flexDirection: "row", }}>
                                <View>
                                    <View style={{ width: 150, height: 15, marginLeft: 10, top: 5 }} />
                                    <View style={{ width: 250, height: 20, marginLeft: 10, top: 10 }} />
                                </View>

                                <View style={{ height: 20, width: 20, right: 20, bottom: 5 }}></View>
                            </View>
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 15 }} />
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 20 }} />
                        </View>


                        <View style={{ flexDirection: "row", marginLeft: 220, position: "absolute", bottom: 5 }}>
                            <View style={styles.removeButton} />

                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: win.width / 3.5, height: 110, borderRadius: 10 }} />
                        </View>

                        <View>
                            <View style={{ flexDirection: "row", }}>
                                <View>
                                    <View style={{ width: 150, height: 15, marginLeft: 10, top: 5 }} />
                                    <View style={{ width: 250, height: 20, marginLeft: 10, top: 10 }} />
                                </View>

                                <View style={{ height: 20, width: 20, right: 20, bottom: 5 }}></View>
                            </View>
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 15 }} />
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 20 }} />
                        </View>


                        <View style={{ flexDirection: "row", marginLeft: 220, position: "absolute", bottom: 5 }}>
                            <View style={styles.removeButton} />

                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>


                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: win.width / 3.5, height: 110, borderRadius: 10 }} />
                        </View>

                        <View>
                            <View style={{ flexDirection: "row", }}>
                                <View>
                                    <View style={{ width: 150, height: 15, marginLeft: 10, top: 5 }} />
                                    <View style={{ width: 250, height: 20, marginLeft: 10, top: 10 }} />
                                </View>

                                <View style={{ height: 20, width: 20, right: 20, bottom: 5 }}></View>
                            </View>
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 15 }} />
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 20 }} />
                        </View>


                        <View style={{ flexDirection: "row", marginLeft: 220, position: "absolute", bottom: 5 }}>
                            <View style={styles.removeButton} />

                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: win.width / 3.5, height: 110, borderRadius: 10 }} />
                        </View>

                        <View>
                            <View style={{ flexDirection: "row", }}>
                                <View>
                                    <View style={{ width: 150, height: 15, marginLeft: 10, top: 5 }} />
                                    <View style={{ width: 250, height: 20, marginLeft: 10, top: 10 }} />
                                </View>

                                <View style={{ height: 20, width: 20, right: 20, bottom: 5 }}></View>
                            </View>
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 15 }} />
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 20 }} />
                        </View>


                        <View style={{ flexDirection: "row", marginLeft: 220, position: "absolute", bottom: 5 }}>
                            <View style={styles.removeButton} />

                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: win.width / 3.5, height: 110, borderRadius: 10 }} />
                        </View>

                        <View>
                            <View style={{ flexDirection: "row", }}>
                                <View>
                                    <View style={{ width: 150, height: 15, marginLeft: 10, top: 5 }} />
                                    <View style={{ width: 250, height: 20, marginLeft: 10, top: 10 }} />
                                </View>

                                <View style={{ height: 20, width: 20, right: 20, bottom: 5 }}></View>
                            </View>
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 15 }} />
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 20 }} />
                        </View>


                        <View style={{ flexDirection: "row", marginLeft: 220, position: "absolute", bottom: 5 }}>
                            <View style={styles.removeButton} />

                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View style={{ marginLeft: 5 }}>
                            <View style={{ width: win.width / 3.5, height: 110, borderRadius: 10 }} />
                        </View>

                        <View>
                            <View style={{ flexDirection: "row", }}>
                                <View>
                                    <View style={{ width: 150, height: 15, marginLeft: 10, top: 5 }} />
                                    <View style={{ width: 250, height: 20, marginLeft: 10, top: 10 }} />
                                </View>

                                <View style={{ height: 20, width: 20, right: 20, bottom: 5 }}></View>
                            </View>
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 15 }} />
                            <View style={{ width: 50, height: 15, marginLeft: 10, top: 20 }} />
                        </View>


                        <View style={{ flexDirection: "row", marginLeft: 220, position: "absolute", bottom: 5 }}>
                            <View style={styles.removeButton} />

                            <View style={styles.moveToCartButton} />
                        </View>
                    </View>
                </SkeletonPlaceholder>

            </View>
        )
    }
}

const win = Dimensions.get('window');
const style = StyleSheet.create({
    header: {
        backgroundColor: "#ff9933",
        flexDirection: "row",
        padding: 10,
        height: 55,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    button: {
        width: 100,
        padding: 2,
        borderWidth: 1,
        borderColor: "#d3d3d3",
        borderRadius: 5,
        // shadowOffset: { width: 0, height: 0 },
        elevation: 0.5,
        shadowColor: "#d3d3d3",
        alignItems: "center"
    },
    filter: {
        alignSelf: "flex-end", flexDirection: "row", paddingLeft: 7, width: 80, borderWidth: 1, padding: 1, borderColor: "#d3d3d3", alignItems: "center", shadowRadius: 50, borderRadius: 5, shadowColor: "#f5f5f5", shadowOffset: { width: 1, height: 2 }, shadowOpacity: 0.25, elevation: 1,
    },
    card: {
        backgroundColor: "#fff",
        alignSelf: "center",
        width: Dimensions.get("window").width,
        top: 10,
        // paddingHorizontal:10,
        flexDirection: "row",
        marginBottom: 10,
        shadowRadius: 50,
        shadowOffset: { width: 50, height: 50 },
        borderBottomWidth: 1, borderColor: "#d3d3d3",
    },
    productImg: {
        height: 100,
        width: "100%",
        borderRadius: 10,
        // margin: 10,
        alignSelf: "center"
    },
    contentView: {
        flexDirection: "column", width: "68%", marginRight: 10, paddingBottom: 10,
    },
    textButton: {
        // fontFamily: "Raleway-SemiBold",
        fontSize: RFValue(9, 580),
        alignSelf: "center",
        color: "#fff",

        // marginLeft:-10

    }
})
