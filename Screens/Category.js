import React, { Component } from 'react';
import {
    Text, View, ScrollView, ActivityIndicator,
    StyleSheet, Image, Dimensions,
    TouchableOpacity, ImageBackground, FlatList
} from 'react-native';
import {
    Icon, SearchBar
} from 'react-native-elements';
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from 'react-native-safe-area-context';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Toast from 'react-native-simple-toast';

//Global StyleSheet Import
const styles = require('../Components/Style.js');
const data = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Indoor Plants',
        items: 120,
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Outdoor Plants',
        items: 60,
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Flowering Plants',
        items: 34,
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Seeds',
        items: 28
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Soil & Fertilizers',
        items: 74
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Pots',
        items: 40
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Gardening Tools',
        items: 81
    },
];
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            search: '',
        }
    }

    componentDidMount =()=>{
        // alert(global.id)
        this.fetch_category();
    }

    fetch_category=()=>{
        var form = new FormData();
        form.append("module", "catlist");
        form.append("user_id", global.id);
        // form.append("password", this.state.password);
        console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                console.warn(json)
                this.setState({data:json})
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                this.setState({isLoading:false})
            });
    }

    categoryListCard = ({ item }) => (
        <View>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Products",{id:item.term_id,name:item.name})}
            >

                <View style={{ flexDirection: "row",marginBottom:7,marginLeft:10,alignItems:"center",width:"100%",height:110 }}>
                    <View style={{width:"22%",}}>
                        {item.image==""?
                        <Image
                            source={require("../images/plant.jpg")}
                            style={[style.recommendedImage, { height: 110, elevation: 5, width: 85, borderRadius: 20 }]}
                        />
                        :
                        <Image
                            source={{uri:item.image}}
                            style={[style.recommendedImage, { height: 110, elevation: 5, width: 85, borderRadius: 20 }]}
                        />
    }
                    </View>
                    <View style={{flexDirection:"row",height:110,justifyContent:"space-between",width:"67%",alignItems:"center",borderBottomWidth:1,borderColor:"#d3d3d3",marginLeft:10}}>
                    <View>
                    <Text style={style.texxt}>
                        {item.name}
                    </Text>
                    <Text style={[styles.h4,{color:"gray"}]}>
                        {item.items} items
                    </Text>
                    </View>
                    <Icon name="chevron-forward-outline" type="ionicon" color="grey" size={20}
                    style={{ alignSelf: "center" }} />
                    </View>
                </View>
            </TouchableOpacity >


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
                            Categories
                        </Text>
                        <View></View>
                        
                    </View>

                    {/* <View>
                        <Text style={[styles.h3, { marginTop: 10, left: 15 }]}>Shop By Category</Text>
                    </View> */}

                    {this.state.isLoading ?
                        <View style={{marginTop:200}}>
                        {/* <Loaders /> */}
                        <ActivityIndicator size="large" color="#637752" />
                    </View>
                        :
                        // null
                        <View style={{marginBottom:120}}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            renderItem={this.categoryListCard}
                            keyExtractor={item => item.id}
                        />
                        </View>
                    }

                </View>
            </SafeAreaView>
        )
    }
}
export default Category;

const style = StyleSheet.create({
    header: {
        backgroundColor: "#ff9933",
        flexDirection: "row",
        padding: 10,
        height: 55,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    image: {
        height: 100,
        width: 100,
        alignSelf: "center",
        marginTop: 50
    },
    questView: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#d3d3d3",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    texxt: {
        fontSize: RFValue(13, 580),
        color: "#000",
        fontWeight: "bold",
        // fontFamily:"Roboto-Regular",
        // padding: 5,
        alignSelf: "center"
    },
    Icon: {
        height: 105,
        width: 75,
        alignSelf: "center",
        marginLeft: 5,
        borderRadius: 10
    },
    text: {
        fontSize: RFValue(15, 580),
        paddingHorizontal: 15,
        paddingTop: 10,
        fontWeight: "600",
        paddingBottom: 5
    }

})
