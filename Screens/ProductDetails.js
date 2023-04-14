import React, { Component } from 'react';
import {
    View, ScrollView,
    StyleSheet, Pressable, TextInput,
    Image, TouchableOpacity, Text, SafeAreaView, Dimensions, FlatList
} from 'react-native';
import Swiper from 'react-native-swiper';
import { RFValue } from "react-native-responsive-fontsize";
import { AirbnbRating, Icon, Rating } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment from 'moment';
import Toast from 'react-native-simple-toast'
import RenderHTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';

//Global Style Import
const style = require('../Components/Style.js');



class ProductDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: false,
            fav: false,
            indexSelected: 0,
            data: [],
            image:[],
            related: [],
            comments: [],
            description: [],
            imageslider:[]

        }
    }


    onSelect = indexSelected => {
        this.setState({ indexSelected });
    };
    renderItem = ({ item, index }) => (

        <View>
            <Image
                key={index}
                style={{ width: '100%', alignSelf: "center", height: '100%', marginTop: -20 }}
                resizeMode="contain"
                source={{ uri: item }}
            />

        </View>
    );

    componentDidMount = () => {
        // alert(global.id)
        //console.warn(this.props.route.params.image)
        // //console.warn(this.state.imageslider.length)
        this.product_detail(this.props.route.params.id);
    }

    product_detail = (id) => {
        var form = new FormData();
        form.append("module", "productdetail");
        form.append("user_id", global.id);
        form.append("product_id", id);
        // //console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                // console.log(id)
                //console.warn("detail", json[0].post_content)
                // let img = JSON.values(json[0].gallery)
                this.setState({ data: json[0], related: json[0].related, comments: json[0].comments, image: Object.values(json[0].gallery), description: json[0].post_content })
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                this.setState({ isLoading: false })
            });
    }


    goToTop = () => {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }



    render() {
        return (

            <View style={[style.container, { backgroundColor: "#fff" }]}>

                <ScrollView ref={(c) => { this.scroll = c }} showsVerticalScrollIndicator={false}>
                    {/* {this.state.image!="" ? */}
                    <View style={styles.carousel}>
                        <View>
                            <Carousel
                                autoplay
                                loop
                                layout="default"
                                data={this.state.image}
                                sliderWidth={width}
                                itemWidth={width}
                                renderItem={this.renderItem}
                                onSnapToItem={index => this.onSelect(index)}
                            />
                            {/* <Image source={{ uri: this.props.route.params.image }}
                                style={{ width: 200, alignSelf: "center", height: 300, marginTop: -20 }}
                                resizeMode="contain" /> */}
                            <View style={{
                                position: "absolute",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                                marginTop: 5,
                            }}>
                                <Text style={{ margin: 25, alignItems: "center", padding: 5, paddingLeft: 7, borderRadius: 60, opacity: 0.5, backgroundColor: "black", height: 37, width: 37 }}
                                    onPress={() => this.props.navigation.goBack()}>
                                    <Icon
                                        name='chevron-back-outline'
                                        size={22}
                                        color='#fff'
                                        type="ionicon"

                                    // style={{marginTop:5}} 
                                    />

                                </Text>
                                <Text style={{ margin: 25, alignItems: "center", padding: 5, paddingLeft: 7, borderRadius: 60, opacity: 0.5, backgroundColor: "black", height: 37, width: 37 }}
                                    onPress={() => this.props.navigation.navigate("MyCart")}>
                                    <Icon
                                        name='basket-outline'
                                        size={22}
                                        color='#fff'
                                        type="ionicon"

                                    // style={{marginTop:5}} 
                                    />

                                </Text>

                            </View>
                        </View>
                        <Pagination
                            inactiveDotColor="gray"
                            dotColor={'#000'}
                            activeDotIndex={this.state.indexSelected}
                            dotsLength={this.state.image.length}
                            animatedDuration={100}
                            inactiveDotScale={1}
                            dotStyle={{
                                width: 7,
                                height: 7, top: -110
                            }}
                        />
                        {/* <FlatList
                            horizontal={true}
                            data={this.state.data.gallery}
                            style={{ position: 'absolute', top: 420, left: -1 }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: 10
                            }}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity activeOpacity={0.9}>
                                    <View style={{
                                        width: 55,
                                        height: 55,
                                        marginRight: 10,
                                        borderRadius: 5,
                                        borderWidth: index === this.state.indexSelected ? 3 : 0.75,
                                        borderColor: index === this.state.indexSelected ? '#637752' : 'white'
                                    }}>
                                        <Image
                                            style={{
                                                width: 50,
                                                height: 50,
                                            }}
                                            source={item.src}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )} /> */}


                    </View>
                    {/* :
                    null} */}






                    {/* view for main component call */}
                    <View style={styles.mainContainer}>
                        <MainContainer data={this.state.data}
                            related={this.state.related}
                            comments={this.state.comments}
                            navigation={this.props.navigation}
                            product_detail={this.product_detail}
                            goTop={this.goToTop}
                            description={this.state.description}
                        />


                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default ProductDetails;
var width = Dimensions.get('window').width;
class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fav: false,
            isLoading: false,
            selectedValue: "",
            selectedValue2: "",
            pinCode: "",
            status: true,
            quantity: 1,
            rate: "",
            review: ""
        }
    }
    like = () => {
        if (this.state.fav == false) {
            this.setState({ fav: true })
        }
        else {
            this.setState({ fav: false })
        }
    }

    pluss = () => {
        var qty = this.state.quantity + 1
        this.setState({ quantity: qty })
    }

    minus = () => {
        if (this.state.quantity > 1) {
            var qty = this.state.quantity - 1
            this.setState({ quantity: qty })
        }

    }

    relatedProducts = ({ item }) => (

        <Pressable onPress={() => { this.props.goTop(), this.props.product_detail(item.ID) }}
        >
            <View style={[style.card1, { margin: 7 }]}>
                <View style={{ flexDirection: 'column' }}>
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={[style.recommendedImage, { height: 120, elevation: 5, width: 85, borderRadius: 20 }]}
                    />
                </View>
            </View>
        </Pressable>

    )

    similarProducts = ({ item }) => (
        <Pressable onPress={() => { this.props.goTop(), this.props.product_detail(item.ID) }}
        >
            <View style={[style.card1, { width: 120, margin: 7 }]}>
                <View style={{ flexDirection: 'column' }}>
                    <View>
                        <Image
                            source={{ uri: item.thumbnail }}
                            style={[style.recommendedImage, { height: 120, elevation: 5, width: 105, borderRadius: 20 }]}
                        />
                        {/* <Pressable style={{ position: "absolute", right: 22, top: 10 }}>
                            <Icon name="heart-outline" type='ionicon' size={18} />
                        </Pressable> */}
                    </View>
                    <View style={{ paddingLeft: 10, top: 5, paddingRight: 10 }}>
                        <Text style={[style.p, { fontWeight: 'bold', fontSize: 14, color: "#000000" }]}>
                            Rs. {item._price}
                        </Text>
                        <Text numberOfLines={2} style={[style.h5, { color: "#000000", fontSize: 12 }]}>
                            {item.post_title}
                        </Text>
                        {/* <Text style={[style.h5]}>Necklace</Text> */}
                    </View>
                </View>
            </View>
        </Pressable>
    )

    reviews = ({ item }) => (
        <View style={styles.review}>
            <Image
                source={require("../images/usermale.jpg")}
                style={{ height: 65, width: 65, borderRadius: 50 }} />
            <View style={{ marginLeft: 10 }}>
                <Text style={[style.h3, { fontWeight: "700", color: "#000" }]}>
                    {item.comment_author}
                </Text>
                <Text>
                    {moment
                        .utc(item.comment_date)
                        .local()
                        .startOf('seconds')
                        .fromNow()}


                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "#000", fontWeight: "700" }}>
                        {item.rating}
                    </Text>
                    <Rating
                        showRating={false}
                        startingValue={item.rating}
                        readonly={true}
                        imageSize={14}
                        style={{ marginLeft: 5, marginTop: 3 }}
                    />
                </View>
                <Text style={style.h4}>
                    Amazing Plant
                </Text>
            </View>
        </View>
    )

    // add wishlist
    addWishlist = (id) => {
        var form = new FormData();
        form.append("module", "useraddwishlist");
        form.append("user_id", global.id);
        form.append("prod_id", id);
        // //console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                //console.warn("add", json)
                Toast.show("Added to wishlist")
                this.props.product_detail();
                // this.setState({ potsforplant: json })
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                // this.setState({ isLoading: false })
            });
    }

    // add wishlist
    removeWishlist = (id) => {
        var form = new FormData();
        form.append("module", "userremovewishlist");
        form.append("user_id", global.id);
        form.append("product_id", id);
        // //console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                //console.warn("add", json)
                Toast.show("Removed from wishlist")
                this.props.product_detail();
                // this.setState({ potsforplant: json })
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                // this.setState({ isLoading: false })
            });
    }

    addReview = (id) => {
        var form = new FormData();
        form.append("module", "addproductreview");
        form.append("user_id", global.id);
        form.append("product_id", id);
        form.append("comment_content", this.state.review);
        form.append("rating", this.state.rate);

        // //console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                //console.warn("add", json)
                Toast.show("Review added.")
                this.props.product_detail();
                // this.setState({ potsforplant: json })
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                // this.setState({ isLoading: false })
            });
    }


    render() {
        return (
            <View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                    {/* View for name and ratings */}
                    <View style={{ width: 250 }}>
                        <Text style={[style.h3, { paddingTop: 20, fontSize: 19 }]}>
                            {this.props.data.post_title}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[style.h3, {
                                fontFamily: "Montserrat-SemiBold",
                                fontSize: 18, fontWeight: "bold", marginTop: 10
                            }]}>
                                ₹ {this.props.data._sale_price}
                            </Text>
                            <Text style={[style.h3, {
                                marginLeft: 20,
                                fontFamily: "Montserrat-SemiBold",
                                fontSize: 18, fontWeight: "600", marginTop: 10, textDecorationLine: "line-through"
                            }]}>
                                ₹ {this.props.data._regular_price}
                            </Text>
                        </View>
                    </View>


                    {/* view for heart */}
                    <View style={{ marginTop: 20 }}>
                        {this.props.data.wishlist ?
                            <Icon name="heart" type="ionicon" color="#000"
                                onPress={() => this.removeWishlist(this.props.data.ID)} />
                            :
                            <Icon name="heart-outline" type="ionicon" color="#000"
                                onPress={() => this.addWishlist(this.props.data.ID)} />}

                        <Text style={{ top: 15 }}>
                            <Rating
                                showRating={false}
                                startingValue={this.props.data._wc_average_rating}
                                readonly={true}
                                imageSize={15}
                                style={{ marginLeft: 10 }}
                            />
                        </Text>
                    </View>
                </View>

                {/* View for number of pieces */}
                <View style={{
                    flexDirection: 'row', width: "100%", marginTop: 10,
                    justifyContent: "space-between"
                }}>
                    <View style={{ width: "50%" }}>
                        <Text style={[styles.heading, { paddingLeft: 20, fontSize: 14, marginTop: 5 }]}>
                            Number of pieces
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: "30%", justifyContent: "space-evenly", right: 15, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.minus()} >
                            <Icon name="remove" type="ionicon" size={25} color="#000"
                                style={{ top: -2 }} />
                        </TouchableOpacity>

                        <View style={[styles.button, { backgroundColor: "#000" }]}>
                            <Text style={[style.h4, { alignSelf: "center", fontFamily: "Roboto-Medium", color: "#fff" }]}>
                                {this.state.quantity}
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => this.pluss()} >
                            <Icon name="add" type="ionicon" size={25} color="#000"
                                style={{ top: -2 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={{ marginLeft: 25 }}>

                    <Text style={{ fontSize: 18, fontWeight: "700", color: "black" }}>
                        Colors
                    </Text>
                    <View style={{ flexDirection: "row", paddingHorizontal: 10, marginTop: 5 }}>
                        <Icon name="ellipse" type="ionicon" size={25} />
                        <Icon name="ellipse" type="ionicon" size={25} color="#ff9933" style={{ marginLeft: 10 }} />
                        <Icon name="ellipse" type="ionicon" size={25} color="#326bf3" style={{ marginLeft: 10 }} />
                        <Icon name="ellipse" type="ionicon" size={25} color="brown" style={{ marginLeft: 10 }} />
                    </View>
                </View> */}
                <Pressable style={{ backgroundColor: "#637752", width: "40%", height: 45, borderRadius: 10, alignItems: "center", justifyContent: "center", alignSelf: "center", marginTop: 10 }}>
                    <Text style={style.buttonText}>
                        Add to cart
                    </Text>
                </Pressable>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 10, marginRight: 10, marginTop: 15, marginBottom: 10, alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "black" }}>
                        You may also like
                    </Text>

                    <Pressable onPress={() => this.props.navigation.navigate("Category")} style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "#000000" }} >Show all</Text>
                        <Icon name="chevron-forward-outline" type="ionicon" size={20} />
                    </Pressable>
                </View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={this.props.related}
                    renderItem={this.relatedProducts}
                    keyExtractor={item => item.id}
                />




                <View>
                    <Text style={[styles.heading, { paddingLeft: 20, marginTop: 5, fontSize: 18, color: "#000", }]}>
                        Product Contains
                    </Text>
                    <View style={{ alignSelf: "center", width: Dimensions.get('window').width / 1.1, marginTop: 25 }}>
                        {/* <WebView source={this.props.data.post_excerpt} /> */}

                        {/* <RenderHTML source={this.props.data.post_excerpt} /> */}
                        <View>
                            <RenderHtml
                                source={{ html: this.props.data.post_excerpt }}
                            />

                        </View>
                        {/* {this.props.data.post_excerpt?.replace(/<\/?[^>]+(>|$)/g, "")} */}

                    </View>
                </View>

                {/* View for description */}
                <View>
                    <Text style={[styles.heading, { paddingLeft: 20, marginTop: 10, fontSize: 18, color: "#000", }]}>
                        Description
                    </Text>
                    <View style={{ alignSelf: "center", width: Dimensions.get('window').width / 1.1, marginTop: 5 }}>

                        <RenderHtml
                            source={{ html: this.props.description }}
                        />

                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30, marginTop: 15, marginBottom: -12, alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "black" }}>
                        Similar Items
                    </Text>
                    {/* <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#000000" }} >Show all</Text>
                                <Icon name="chevron-forward-outline" type="ionicon" size={20} />
                            </View> */}
                </View>

                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={this.props.related}
                    renderItem={this.similarProducts}
                    keyExtractor={item => item.id}
                />

                {/* <View>
                    <Text style={[styles.heading, { paddingLeft: 20, marginTop: 10, fontSize: 18, color: "#000", }]}>
                        Vendor Info
                    </Text>
                    <View style={{ alignSelf: "center", width: Dimensions.get('window').width / 1.1, marginTop: 5 }}>
                        <Text style={[styles.text, { marginTop: 5, fontSize: 14, lineHeight: 22 }]} numberOfLines={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.

                        </Text>
                    </View>
                </View> */}

                {/* Review Section */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 30, marginTop: 10, marginBottom: -12, alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "black" }}>
                        Reviews
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    {this.props.comments != null ?
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={this.props.comments}
                            renderItem={this.reviews}
                            keyExtractor={item => item.id}
                        />
                        :
                        <Text style={{ marginLeft: 30, fontSize: 16 }}>
                            No reviews
                        </Text>}
                </View>
                <View style={{
                    marginHorizontal: 7,
                    marginVertical: 10,
                    padding: 10,
                    marginBottom: 50
                }}>

                    {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.review}>
                            <Image
                                source={require("../images/user.jpg")}
                                style={{ height: 65, width: 65, borderRadius: 50 }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={[style.h3, { fontWeight: "700", color: "#000" }]}>
                                    Olivia Porter
                                </Text>
                                <Text>2months ago</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ color: "#000", fontWeight: "700" }}>3.5</Text>
                                    <Rating
                                        showRating={false}
                                        readonly={true}
                                        imageSize={14}
                                        style={{ marginLeft: 5, marginTop: 3 }}
                                    />
                                </View>
                                <Text style={style.h4}>
                                    Very nice product, I love it.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.review}>
                            <Image
                                source={require("../images/usermale.jpg")}
                                style={{ height: 65, width: 65, borderRadius: 50 }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={[style.h3, { fontWeight: "700", color: "#000" }]}>
                                    John James
                                </Text>
                                <Text>3months ago</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ color: "#000", fontWeight: "700" }}>3.5</Text>
                                    <Rating
                                        showRating={false}
                                        readonly={true}
                                        imageSize={14}
                                        style={{ marginLeft: 5, marginTop: 3 }}
                                    />
                                </View>
                                <Text style={style.h4}>
                                    Amazing Plant
                                </Text>
                            </View>
                        </View>
                        <View style={styles.review}>
                            <Image
                                source={require("../images/user.jpg")}
                                style={{ height: 65, width: 65, borderRadius: 50 }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={[style.h3, { fontWeight: "700", color: "#000" }]}>
                                    Olivia Porter
                                </Text>
                                <Text>2months ago</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ color: "#000", fontWeight: "700" }}>3.5</Text>
                                    <Rating
                                        showRating={false}
                                        readonly={true}
                                        imageSize={14}
                                        style={{ marginLeft: 5, marginTop: 3 }}
                                    />
                                </View>
                                <Text style={style.h4}>
                                    Very nice product, I love it.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.review}>
                            <Image
                                source={require("../images/usermale.jpg")}
                                style={{ height: 65, width: 65, borderRadius: 50 }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={[style.h3, { fontWeight: "700", color: "#000" }]}>
                                    John James
                                </Text>
                                <Text>3months ago</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ color: "#000", fontWeight: "700" }}>3.5</Text>
                                    <Rating
                                        showRating={false}
                                        readonly={true}
                                        imageSize={14}
                                        style={{ marginLeft: 5, marginTop: 3 }}
                                    />
                                </View>
                                <Text style={style.h4}>
                                    Amazing Plant
                                </Text>
                            </View>
                        </View>
                    </ScrollView> */}
                    <View style={{ alignSelf: "flex-start" }}>
                        <Rating showRating={false} imageSize={20} startingValue={0} onFinishRating={(e) => this.setState({ rate: e })} style={{ marginLeft: 20, marginTop: 10 }} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                        <TextInput placeholder='Write your review..' value={this.state.review} onChangeText={(e) => this.setState({ review: e })} style={{ width: "85%", alignSelf: "center", borderWidth: 1, borderColor: "gray", borderRadius: 10, marginTop: 10, paddingLeft: 10, fontSize: 18 }}

                        />
                        <Pressable onPress={() => this.addReview(this.props.data.ID)}>
                            <Icon name="send" type="ionicon" style={{ marginLeft: 10 }} />
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 10, marginRight: 10, marginBottom: -12, alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: "700", color: "black" }}>
                            Related Products
                        </Text>
                        <Pressable onPress={() => this.props.navigation.navigate("Category")} style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: "#000000" }} >Show all</Text>
                            <Icon name="chevron-forward-outline" type="ionicon" size={20} />
                        </Pressable>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={this.props.related}
                            renderItem={this.similarProducts}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>





            </View>
        )
    }
}


//Internal Stylesheet
const styles = StyleSheet.create({
    slide1: {
        height: "100%",
        width: "100%",

    },
    slide2: {
        height: "100%",
        width: "100%",
        backgroundColor: "#fff"
    },
    slide3: {
        height: "100%",
        width: "100%",
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
    carousel: {
        width: Dimensions.get("window").width,
        borderRadius: 15,
        height: 480,
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: -5,
    },


    mainContainer: {
        height: "100%",
        // position:"absolute",
        // borderTopLeftRadius:50,
        // borderTopRightRadius:50, 
        width: "100%",
        // top:-30, 
        bottom: 0,
        backgroundColor: "#fff",
        flex: 1,
    },
    heartView: {
        shadowRadius: 50,
        shadowOffset: { width: 1, height: 1 },
        elevation: 2,
        height: 50,
        width: 50,
        backgroundColor: "#fff",
        justifyContent: "center",
        borderRadius: 50,
        marginTop: 10
    },
    heading: {
        fontSize: RFValue(13, 580),
        // fontFamily:"Raleway-Bold",
        fontFamily: "Montserrat-Medium",
        color: '#4a4b4d',
    },
    button: {
        // borderColor:"#bc3b3b",
        // borderWidth:1,
        borderRadius: 50,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center"

    },
    view: {
        borderColor: "#EBEBEB",
        borderWidth: 1,
        borderRadius: 5,
        width: Dimensions.get('window').width / 1.1,
        marginTop: 25,
        alignSelf: "center",
        paddingBottom: 5,

    },
    text: {
        // fontFamily:"Raleway-Regular",
        fontFamily: "Montserrat-Medium",
        color: "#222222",
        fontSize: RFValue(10, 580)
    },
    review: { flexDirection: "row", borderWidth: 1, borderColor: "#d3d3d3", padding: 10, borderRadius: 10, marginLeft: 10 }

})
