import React, { Component } from 'react';
import {
    Text, View, ScrollView, ActivityIndicator,
    StyleSheet, Image, Dimensions, TextInput,
    TouchableOpacity, ImageBackground, FlatList, Pressable
} from 'react-native';
import {
    Icon, SearchBar
} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

//Global Style Import
const styles = require('../Components/Style.js');

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            query:"",
            isLoading:false
        }
    }
    componentDidMount() {

        this.textInputRef.focus();
    }

    search_product=(e)=>{
        this.setState({isLoading:true})
        var form = new FormData();
        form.append("module", "productsearch");
        form.append("user_id", global.id);
        form.append("search", e);
        console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                console.warn(json)
                // this.setState({data:json})
                let arr = json.map(item => {
                    item.cart = [];
                    return {...item};
                  });
                  this.setState({data: arr});
          
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                this.setState({isLoading:false})
            });
    }

    addToCart = (ind, item) => {
        let arr = this.state.data.map((key, index) => {
          if (ind == index) {
            key.cart.push(item);
            global.cart.push(item);
          }
          return {...key};
        });
        this.setState({data: arr});
        console.warn(ind, item);
      };

      addWishlist = id => {
        var form = new FormData();
        form.append('module', 'useraddwishlist');
        form.append('user_id', global.id);
        form.append('product_id', id);
        // console.warn(form)
        fetch(global.api, {
          method: 'POST',
          body: form,
        })
          .then(response => response.json())
          .then(json => {
            console.warn('add', json);
            Toast.show('Added to wishlist');
            this.search_product(this.state.query);
            // this.setState({ potsforplant: json })
            return json;
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            // this.setState({ isLoading: false })
          });
      };
    
      // add wishlist
      removeWishlist = id => {
        var form = new FormData();
        form.append('module', 'userremovewishlist');
        form.append('user_id', global.id);
        form.append('product_id', id);
        // console.warn(form)
        fetch(global.api, {
          method: 'POST',
          body: form,
        })
          .then(response => response.json())
          .then(json => {
            console.warn('add', json);
            Toast.show('Removed from wishlist');
            this.search_product(this.state.query);
            // this.setState({ potsforplant: json })
            return json;
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            // this.setState({ isLoading: false })
          });
      };
    
    productList = ({ item,index }) => (
        <View style={{ marginVertical: 15, marginHorizontal: 20 }} >
            <Pressable onPress={() => this.props.navigation.navigate("ProductDetails", { id: item.ID })} >
                <Image
                    source={{ uri: item.thumbnail }}
                    style={[style.recommendedImage, { height: 190, elevation: 5, width: 160, borderRadius: 20 }]}
                />
                {item.wishlist ?
                    <Pressable onPress={() => this.removeWishlist(item.ID)} style={{ position: "absolute", right: 18, top: 5, backgroundColor: "#d3d3d3", padding: 5, borderRadius: 50, elevation: 5 }}>
                        <Icon name="heart" type='ionicon' size={18} />
                    </Pressable>
                    :
                    <Pressable onPress={() => this.addWishlist(item.ID)} style={{ position: "absolute", right: 18, top: 5, backgroundColor: "#d3d3d3", padding: 5, borderRadius: 50, elevation: 5 }}>
                        <Icon name="heart-outline" type='ionicon' size={18} />
                    </Pressable>
                }
            </Pressable>
            {/* View for Content */}
            <View style={{ paddingLeft: 5, width: 150 }}>
                <Text style={[styles.h3, { fontWeight: "bold", marginTop: 5 }]}>
                    Rs. {item._regular_price}/-
                </Text>
                <Text numberOfLines={2} style={[styles.h3, { fontWeight: "600" }]}>
                    {item.post_title} {item.id}
                </Text>
            </View>
            {item.cart.length > 0 ? (
        <Pressable
          onPress={() => this.addToCart(index)}
          style={{
            borderColor: '#637752',
            borderWidth: 1,
            width: '70%',
            height: 35,
            borderRadius: 10,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text style={[styles.buttonText, {color: '#637752'}]}>
            Added to cart
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => this.addToCart(index, item)}
          style={{
            backgroundColor: '#637752',
            width: '70%',
            height: 35,
            borderRadius: 10,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </Pressable>
      )}
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                {/* Header */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }} >
                    <Icon name="arrow-back-outline" onPress={() => this.props.navigation.goBack()} type="ionicon" />
                    <Text style={[styles.headerText, { fontSize: 20 }]}>
                        Search Products
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                    </View>
                </View>
                <View>
                    <TextInput
                    onChangeText={(e)=>{this.search_product(e),this.setState({query:e})}}
                        autoFocus={true}
                        value={this.state.query}
                        ref={ref => (this.textInputRef = ref)} placeholder='Search Products' style={{ width: "95%", borderWidth: 2, borderRadius: 20, paddingLeft: 20, fontSize: 16, color: "#000", alignSelf: "center", borderColor: "#637752" }} />
                </View>
                {this.state.isLoading ? (
                    <View style={{ marginTop: 200 }}>
                        {/* <Loaders /> */}
                        <ActivityIndicator size="large" color="#637752" />
                    </View>
                ) : (
                    <View style={{ marginBottom: 20 }} >
                        {this.state.data.length>0 ?
                        <FlatList
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            renderItem={this.productList}
                            keyExtractor={item => item.id}
                        />
                        :
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text> No data</Text>
                            </View>
    }

                    </View>
                )}
            </View>
        )
    }
}
export default Search


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
        // alignSelf: "center",
        width: Dimensions.get("window").width / 2,
        top: 10,
        alignItems: "center",
        // paddingHorizontal:10,
        // flexDirection: "row",
        marginBottom: 10,
        shadowRadius: 50,
        shadowOffset: { width: 50, height: 50 },
        borderBottomWidth: 1, borderColor: "#d3d3d3",
    },
    productImg: {
        height: 120,
        width: "100%",
        margin: 10,
        alignSelf: "center"
    },
    contentView: {
        flexDirection: "column", width: "68%", marginRight: 10, paddingBottom: 10,
    },
    textButton: {
        // fontFamily: "Raleway-SemiBold",
        fontSize: RFValue(11, 580),
        alignSelf: "center",
        color: "#fff",

        // marginLeft:-10

    }
})