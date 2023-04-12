import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-simple-toast';
import SwiperFlatList from 'react-native-swiper-flatlist';

const styles = require('../Components/Style.js');
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: [],
      new: [],
      toptrend: [],
      best: [],
      benefit: [],
      potsforplant: [],
      like: {},
    };
  }
  componentDidMount = () => {
    // alert(global.id)
    this.fetch_slider();
    this.fetch_new_arrivals();
    this.fetch_top_trends();
    this.fetch_best_sell('bestselling');
    this.fetch_plantsbybenefit();
    this.fetch_potsforplants();
  };

  fetch_slider = () => {
    var form = new FormData();
    form.append('module', 'slider');
    form.append('user_id', global.id);
    // form.append("password", this.state.password);
    // console.warn(form)
    fetch(global.api, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        console.warn('sliders', json);
        this.setState({slider: json});
        return json;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  renderItem = ({item}) => (
    <View style={style.child}>
      <Image
        source={{uri: item.image}}
        style={{width: Dimensions.get('window').width, height: '100%'}}
      />
    </View>
  );

  fetch_new_arrivals = () => {
    var form = new FormData();
    form.append('module', 'newarrival');
    form.append('user_id', global.id);
    // form.append("password", this.state.password);
    // console.warn(form)
    fetch(global.api, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        // console.warn( json)
        this.setState({new: json});
        return json;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  fetch_top_trends = () => {
    var form = new FormData();
    form.append('module', 'toptrends');
    form.append('user_id', global.id);
    // form.append("password", this.state.password);
    // console.warn(form)
    fetch(global.api, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        // console.warn( json)
        this.setState({toptrend: json});
        return json;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  fetch_best_sell = e => {
    var form = new FormData();
    form.append('module', e);
    form.append('user_id', global.id);
    // form.append("password", this.state.password);
    // console.warn(form)
    fetch(global.api, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        // console.warn("best", json)
        this.setState({best: json});
        return json;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  fetch_plantsbybenefit = () => {
    var form = new FormData();
    form.append('module', 'plantsbybenefits');
    form.append('user_id', global.id);
    // form.append("password", this.state.password);
    // console.warn(form)
    fetch(global.api, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        // console.warn('benefit', json);
        this.setState({benefit: json});
        return json;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  fetch_potsforplants = () => {
    var form = new FormData();
    form.append('module', 'potsforplants');
    form.append('user_id', global.id);
    // form.append("password", this.state.password);
    // console.warn(form)
    fetch(global.api, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        // console.warn('pots', json);
        this.setState({potsforplant: json});
        return json;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  // add wishlist
  addWishlist = id => {
    var form = new FormData();
    form.append('module', 'useraddwishlist');
    form.append('user_id', global.id);
    form.append('prod_id', id);
    // console.warn(form)
    fetch(global.api, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        // console.warn('add', json);
        Toast.show('Added to wishlist');
        this.fetch_new_arrivals();
        this.fetch_plantsbybenefit();
        this.fetch_potsforplants();
        this.fetch_top_trends();
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
    form.append('prod_id', id);
    // console.warn(form)
    fetch(global.api, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        // console.warn('add', json);
        Toast.show('Removed from wishlist');
        this.fetch_new_arrivals();
        this.fetch_plantsbybenefit();
        this.fetch_potsforplants();
        this.fetch_top_trends();
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

  slider = ({item}) => (
    <View>
      <ImageBackground
        source={require('../images/plantcare.jpg')}
        style={style.slide1Image}>
        <Text style={style.text}>Make yourself {'\n'}at home</Text>
        <Text style={style.textSmall}>We love clean design and natural </Text>
        <Text style={style.textSmall}>furniture solution.</Text>
        {/* <TouchableOpacity style={style.buttonstyle}
                                onPress={() =>this.slide2()}>
                                <Text style={style.buttonText}>Next</Text>
                            </TouchableOpacity> */}
      </ImageBackground>
    </View>
  );

  new = ({item}) => (
    <Pressable
      onPress={() =>
        this.props.navigation.navigate('ProductDetails', {id: item.ID,image:item.thumbnail},)
      }>
      <View style={[style.card1, {width: 120, margin: 7}]}>
        <View style={{flexDirection: 'column'}}>
          <View>
            <Image
              source={{uri: item.thumbnail}}
              style={[
                style.recommendedImage,
                {height: 120, elevation: 5, width: 105, borderRadius: 20},
              ]}
            />
            {item.wishlist ? (
              <Pressable
                onPress={() => this.removeWishlist(item.ID)}
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 5,
                  backgroundColor: '#d3d3d3',
                  padding: 5,
                  borderRadius: 50,
                  elevation: 5,
                }}>
                <Icon name="heart" type="ionicon" size={18} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => this.addWishlist(item.ID)}
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 5,
                  backgroundColor: '#d3d3d3',
                  padding: 5,
                  borderRadius: 50,
                  elevation: 5,
                }}>
                <Icon name="heart-outline" type="ionicon" size={18} />
              </Pressable>
            )}
          </View>
          <View style={{top: 5, paddingRight: 10}}>
            <Text
              style={[
                style.p,
                {fontWeight: 'bold', fontSize: 14, color: '#000000'},
              ]}>
              Rs. {item._regular_price}
            </Text>
            <Text
              numberOfLines={2}
              style={[style.h5, {color: '#000000', fontSize: 12}]}>
              {item.post_title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  top_trend = ({item}) => (
    <Pressable
      onPress={() =>
        this.props.navigation.navigate('ProductDetails', {id: item.ID,image:item.thumbnail},)
      }>
      <View style={[style.card1, {width: 120, margin: 7}]}>
        <View style={{flexDirection: 'column'}}>
          <View>
            <Image
              source={{uri: item.thumbnail}}
              style={[
                style.recommendedImage,
                {height: 120, elevation: 5, width: 105, borderRadius: 20},
              ]}
            />
            {item.wishlist ? (
              <Pressable
                onPress={() => this.removeWishlist(item.ID)}
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 5,
                  backgroundColor: '#d3d3d3',
                  padding: 5,
                  borderRadius: 50,
                  elevation: 5,
                }}>
                <Icon name="heart" type="ionicon" size={18} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => this.addWishlist(item.ID)}
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 5,
                  backgroundColor: '#d3d3d3',
                  padding: 5,
                  borderRadius: 50,
                  elevation: 5,
                }}>
                <Icon name="heart-outline" type="ionicon" size={18} />
              </Pressable>
            )}
          </View>
          <View style={{top: 5, paddingRight: 10}}>
            <Text
              style={[
                style.p,
                {fontWeight: 'bold', fontSize: 14, color: '#000000'},
              ]}>
              Rs. {item._regular_price}
            </Text>
            <Text
              numberOfLines={2}
              style={[style.h5, {color: '#000000', fontSize: 12}]}>
              {item.post_title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  best_selling = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 7,
        marginVertical: 3,
        marginLeft: 15,
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
      }}>
      <Image
        source={{uri: item.thumbnail}}
        style={[
          style.recommendedImage,
          {height: 120, elevation: 5, width: 105, borderRadius: 20},
        ]}
      />
      <View style={{marginLeft: 20, width: 200}}>
        <Text
          numberOfLines={2}
          style={[style.h5, {color: '#000000', fontSize: 14}]}>
          {item.post_title}
        </Text>
        <Text
          style={[
            style.p,
            {fontWeight: 'bold', fontSize: 14, marginTop: 10, color: '#000000'},
          ]}>
          Rs. {item._regular_price}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('ProductDetails', {id: item.ID,image:item.thumbnail},)
        }
        style={{
          width: 110,
          height: 30,
          backgroundColor: '#637752',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          alignSelf: 'flex-end',
          position: 'absolute',
          right: 10,
          bottom: 10,
        }}>
        <Text style={styles.buttonText}>Shop</Text>
      </TouchableOpacity>
    </View>
  );

  benefit = ({item}) => (
    <Pressable
      onPress={() =>
        this.props.navigation.navigate('ProductDetails', {id: item.ID,image:item.thumbnail},)
      }>
      <View style={[style.card1, {width: 120, margin: 7}]}>
        <View style={{flexDirection: 'column'}}>
          <View>
            <Image
              source={{uri: item.thumbnail}}
              style={[
                style.recommendedImage,
                {height: 120, elevation: 5, width: 105, borderRadius: 20},
              ]}
            />
            {item.wishlist ? (
              <Pressable
                onPress={() => this.removeWishlist(item.ID)}
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 5,
                  backgroundColor: '#d3d3d3',
                  padding: 5,
                  borderRadius: 50,
                  elevation: 5,
                }}>
                <Icon name="heart" type="ionicon" size={18} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => this.addWishlist(item.ID)}
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 5,
                  backgroundColor: '#d3d3d3',
                  padding: 5,
                  borderRadius: 50,
                  elevation: 5,
                }}>
                <Icon name="heart-outline" type="ionicon" size={18} />
              </Pressable>
            )}
          </View>
          <View style={{top: 5, paddingRight: 10}}>
            <Text
              style={[
                style.p,
                {fontWeight: 'bold', fontSize: 14, color: '#000000'},
              ]}>
              Rs. {item._price}
            </Text>
            <Text
              numberOfLines={2}
              style={[style.h5, {color: '#000000', fontSize: 12}]}>
              {item.post_title}
            </Text>
            {/* <Text style={[style.h5]}>Necklace</Text> */}
          </View>
        </View>
      </View>
    </Pressable>
  );

  pots_plant = ({item}) => (
    <Pressable
      onPress={() =>
        this.props.navigation.navigate('ProductDetails', {id: item.ID,image:item.thumbnail},)
      }>
      <View style={[style.card1, {width: 120, margin: 7}]}>
        <View style={{flexDirection: 'column'}}>
          <View>
            <Image
              source={{uri: item.thumbnail}}
              style={[
                style.recommendedImage,
                {height: 120, elevation: 5, width: 105, borderRadius: 20},
              ]}
            />
            {item.wishlist ? (
              <Pressable
                onPress={() => this.removeWishlist(item.ID)}
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 5,
                  backgroundColor: '#d3d3d3',
                  padding: 5,
                  borderRadius: 50,
                  elevation: 5,
                }}>
                <Icon name="heart" type="ionicon" size={18} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => this.addWishlist(item.ID)}
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 5,
                  backgroundColor: '#d3d3d3',
                  padding: 5,
                  borderRadius: 50,
                  elevation: 5,
                }}>
                <Icon name="heart-outline" type="ionicon" size={18} />
              </Pressable>
            )}
          </View>
          <View style={{top: 5, paddingRight: 10}}>
            <Text
              style={[
                style.p,
                {fontWeight: 'bold', fontSize: 14, color: '#000000'},
              ]}>
              Rs. {item._regular_price}
            </Text>
            <Text
              numberOfLines={2}
              style={[style.h5, {color: '#000000', fontSize: 12}]}>
              {item.post_title}
            </Text>
            {/* <Text style={[style.h5]}>Necklace</Text> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        {/* <StatusBar hidden /> */}
        <ScrollView>
          <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 80}}>
            <View style={{height: 270}}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  justifyContent: 'space-evenly',
                  width: 100,
                  position: 'absolute',
                  right: 15,
                  zIndex: 1,
                  top: 16,
                }}>
                {/* <Icon name="search" onPress={() => this.props.navigation.navigate("Discover")} color="#fff" type="ionicon" /> */}
                <Icon
                  name="basket-outline"
                  onPress={() => this.props.navigation.navigate('MyCart')}
                  color="#fff"
                  type="ionicon"
                />
              </View>
              {/* <Swiper style={style.wrapper}
                                showsButtons={false}
                                autoplay
                                activeDotColor="#fff"
                                dotColor='grey'
                                indicatorStyle={{}}
                                paginationStyle={
                                    { bottom: 20, left: -290, color: "#fff" }
                                }
                            //  autoplay={true}
                            > */}
              {/* Slide 1 */}

              <SwiperFlatList
                style={{flex: 1}}
                autoplay
                autoplayDelay={2}
                autoplayLoop
                index={0}
                showPagination
                keyExtractor={item => item.id}
                renderItem={this.renderItem}
                data={this.state.slider}
                paginationActiveColor="#637752"
                // paginationDefaultColor='#fff'
                paginationStyleItem={{
                  width: 7,
                  height: 7,
                  marginLeft: 0,
                  marginRight: 5,
                  marginTop: 12,
                  color: 'red',
                }}></SwiperFlatList>

              {/* </Swiper> */}
            </View>

            {/* New arrivals */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft:20,
                marginRight:10,
                marginBottom: -12,
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
                New Arrivals
              </Text>
              <Pressable
                onPress={() =>
                  this.props.navigation.navigate('ShowAll', {
                    name: 'New Arrivals',
                    module: 'newarrival',
                  })
                }
                style={{flexDirection: 'row',alignItems:"center"}}>
                <Text style={{color: '#000000'}}>Show all</Text>
                <Icon name="chevron-forward-outline" type="ionicon" size={20} />
              </Pressable>
            </View>
            <View style={{paddingLeft: 10, paddingTop: 20}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.new}
                renderItem={this.new}
                keyExtractor={item => item.id}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft:20,
                marginRight:10,
                marginBottom: -12,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
                Top Trends
              </Text>
              <Pressable
                onPress={() =>
                  this.props.navigation.navigate('ShowAll', {
                    name: 'Top Trends',
                    module: 'toptrends',
                  })
                }
                style={{flexDirection: 'row',alignItems:"center"}}>
                <Text style={{color: '#000000'}}>Show all</Text>
                <Icon name="chevron-forward-outline" type="ionicon" size={20} />
              </Pressable>
            </View>

            <View style={{paddingLeft: 10, paddingTop: 20}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.toptrend}
                renderItem={this.top_trend}
                keyExtractor={item => item.id}
              />
            </View>
            {/* Best Selling */}
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 30,
                marginBottom: 10,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{alignItems: 'center'}}>
                <Pressable
                  style={{
                    backgroundColor: '#637752',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: '700', color: '#fff'}}>
                    Best Selling
                  </Text>
                </Pressable>
                {/* <Pressable style={{backgroundColor:"#637752",padding:10,borderRadius:10}}> */}
                <Text onPress={()=>this.props.navigation.navigate("Category")} style={{fontSize: 16, marginLeft: 15, color: '#000'}}>
                  Recently added
                </Text>

                <Text onPress={()=>this.props.navigation.navigate("Category")}  style={{fontSize: 16, marginLeft: 15, color: '#000'}}>
                  Seeds
                </Text>

                <Text onPress={()=>this.props.navigation.navigate("Category")}  style={{fontSize: 16, marginLeft: 15, color: '#000'}}>
                  Flower Pots
                </Text>

                <Text onPress={()=>this.props.navigation.navigate("Category")}  style={{fontSize: 16, marginLeft: 15, color: '#000'}}>
                  Gardening Tools
                </Text>
              </ScrollView>
              {/* </Pressable> */}
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.best.slice(0, 4)}
              renderItem={this.best_selling}
              keyExtractor={item => item.id}
            />

            <Pressable
              onPress={() =>
                this.props.navigation.navigate('ShowAll', {
                  name: 'Best Selling',
                  module: 'bestselling',
                })
              }
              style={{
                flexDirection: 'row',
                alignItems:"center",
                alignSelf: 'flex-end',
                marginTop: 10,
                marginRight: 20,
              }}>
              <Text style={{color: '#000000'}}>Show all</Text>
              <Icon name="chevron-forward-outline" type="ionicon" size={20} />
            </Pressable>

            <View style={{marginTop: 15}}>
              {this.state.slider.length > 0 ? (
                <Image
                  source={{uri: this.state.slider[0].image}}
                  style={{
                    width: '90%',
                    height: 250,
                    borderRadius: 20,
                    alignSelf: 'center',
                  }}
                />
              ) : null}
            </View>

            {/* Plants By Location */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,
                marginBottom: -12,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
                Plants By Location
              </Text>
              <Pressable
                onPress={() => this.props.navigation.navigate('Products')}
                style={{flexDirection: 'row'}}>
                <Text style={{color: '#000000'}}>Show all</Text>
                <Icon name="chevron-forward-outline" type="ionicon" size={20} />
              </Pressable>
            </View>
            <View
              style={{
                marginHorizontal: 7,
                marginVertical: 10,
                padding: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetails')
                  }>
                  <View style={[style.card1, {width: 120, margin: 7}]}>
                    <View style={{flexDirection: 'column'}}>
                      <View>
                        <Image
                          source={require('../images/blueplant.jpg')}
                          style={[
                            style.recommendedImage,
                            {
                              height: 120,
                              elevation: 5,
                              width: 105,
                              borderRadius: 20,
                            },
                          ]}
                        />
                        <Pressable
                          style={{position: 'absolute', right: 22, top: 10}}>
                          <Icon name="heart-outline" type="ionicon" size={18} />
                        </Pressable>
                      </View>
                      <View style={{top: 5, paddingRight: 10}}>
                        <Text
                          style={[
                            style.p,
                            {
                              fontWeight: 'bold',
                              fontSize: 14,
                              color: '#000000',
                            },
                          ]}>
                          99,99 €
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={[style.h5, {color: '#000000', fontSize: 12}]}>
                          COTTON PUFF
                        </Text>
                        {/* <Text style={[style.h5]}>Necklace</Text> */}
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetails')
                  }>
                  <View style={[style.card1, {width: 120, margin: 7}]}>
                    <View style={{flexDirection: 'column'}}>
                      <View>
                        <Image
                          source={require('../images/plant.jpg')}
                          style={[
                            style.recommendedImage,
                            {
                              height: 120,
                              elevation: 5,
                              width: 105,
                              borderRadius: 20,
                            },
                          ]}
                        />
                        <Pressable
                          style={{position: 'absolute', right: 22, top: 10}}>
                          <Icon name="heart" type="ionicon" size={18} />
                        </Pressable>
                      </View>
                      <View style={{top: 5, paddingRight: 10}}>
                        <Text
                          style={[
                            style.p,
                            {
                              fontWeight: 'bold',
                              fontSize: 14,
                              color: '#000000',
                            },
                          ]}>
                          12,999 €
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={[style.h5, {color: '#000000', fontSize: 12}]}>
                          MUSICAL BEAR
                        </Text>
                        {/* <Text style={[style.h5]}>Necklace</Text> */}
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetails')
                  }>
                  <View style={[style.card1, {width: 120, margin: 7}]}>
                    <View style={{flexDirection: 'column'}}>
                      <View>
                        <Image
                          source={require('../images/crotonplant.jpg')}
                          style={[
                            style.recommendedImage,
                            {
                              height: 120,
                              elevation: 5,
                              width: 105,
                              borderRadius: 20,
                            },
                          ]}
                        />
                        <Pressable
                          style={{position: 'absolute', right: 22, top: 10}}>
                          <Icon name="heart-outline" type="ionicon" size={18} />
                        </Pressable>
                      </View>
                      <View style={{top: 5, paddingRight: 10}}>
                        <Text
                          style={[
                            style.p,
                            {
                              fontWeight: 'bold',
                              fontSize: 14,
                              color: '#000000',
                            },
                          ]}>
                          199,00 €
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={[style.h5, {color: '#000000', fontSize: 12}]}>
                          RIZO ARMCHAIR
                        </Text>
                        {/* <Text style={[style.h5]}>Necklace</Text> */}
                      </View>
                    </View>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetails')
                  }>
                  <View style={[style.card1, {width: 120, margin: 7}]}>
                    <View style={{flexDirection: 'column'}}>
                      <View>
                        <Image
                          source={require('../images/plant.jpg')}
                          style={[
                            style.recommendedImage,
                            {
                              height: 120,
                              elevation: 5,
                              width: 105,
                              borderRadius: 20,
                            },
                          ]}
                        />
                        <Pressable
                          style={{position: 'absolute', right: 22, top: 10}}>
                          <Icon name="heart" type="ionicon" size={18} />
                        </Pressable>
                      </View>
                      <View style={{top: 5, paddingRight: 10}}>
                        <Text
                          style={[
                            style.p,
                            {
                              fontWeight: 'bold',
                              fontSize: 14,
                              color: '#000000',
                            },
                          ]}>
                          12,999 €
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={[style.h5, {color: '#000000', fontSize: 12}]}>
                          MUSICAL BEAR
                        </Text>
                        {/* <Text style={[style.h5]}>Necklace</Text> */}
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetails')
                  }>
                  <View style={[style.card1, {width: 120, margin: 7}]}>
                    <View style={{flexDirection: 'column'}}>
                      <View>
                        <Image
                          source={require('../images/blueplant.jpg')}
                          style={[
                            style.recommendedImage,
                            {
                              height: 120,
                              elevation: 5,
                              width: 105,
                              borderRadius: 20,
                            },
                          ]}
                        />
                        <Pressable
                          style={{position: 'absolute', right: 22, top: 10}}>
                          <Icon name="heart-outline" type="ionicon" size={18} />
                        </Pressable>
                      </View>
                      <View style={{top: 5, paddingRight: 10}}>
                        <Text
                          style={[
                            style.p,
                            {
                              fontWeight: 'bold',
                              fontSize: 14,
                              color: '#000000',
                            },
                          ]}>
                          99,99 €
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={[style.h5, {color: '#000000', fontSize: 12}]}>
                          COTTON PUFF
                        </Text>
                        {/* <Text style={[style.h5]}>Necklace</Text> */}
                      </View>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetails')
                  }>
                  <View style={[style.card1, {width: 120, margin: 7}]}>
                    <View style={{flexDirection: 'column'}}>
                      <View>
                        <Image
                          source={require('../images/crotonplant.jpg')}
                          style={[
                            style.recommendedImage,
                            {
                              height: 120,
                              elevation: 5,
                              width: 105,
                              borderRadius: 20,
                            },
                          ]}
                        />
                        <Pressable
                          style={{position: 'absolute', right: 22, top: 10}}>
                          <Icon name="heart-outline" type="ionicon" size={18} />
                        </Pressable>
                      </View>
                      <View style={{top: 5, paddingRight: 10}}>
                        <Text
                          style={[
                            style.p,
                            {
                              fontWeight: 'bold',
                              fontSize: 14,
                              color: '#000000',
                            },
                          ]}>
                          199,00 €
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={[style.h5, {color: '#000000', fontSize: 12}]}>
                          RIZO ARMCHAIR
                        </Text>
                        {/* <Text style={[style.h5]}>Necklace</Text> */}
                      </View>
                    </View>
                  </View>
                </Pressable>
              </ScrollView>
            </View>

            {/* Plants By Location */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,
                marginBottom: -12,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
                Plants By Benefits
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 30,
                alignItems: 'center',
                marginTop: 30,
              }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{alignItems: 'center'}}>
                <Pressable
                  style={{
                    backgroundColor: '#637752',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: '700', color: '#fff'}}>
                    Air Purifying
                  </Text>
                </Pressable>
                {/* <Pressable style={{backgroundColor:"#637752",padding:10,borderRadius:10}}> */}
                <Text onPress={()=>this.props.navigation.navigate("Category")}  style={{fontSize: 16, marginLeft: 15, color: '#000'}}>
                  Croton Plants
                </Text>

                <Text onPress={()=>this.props.navigation.navigate("Category")}  style={{fontSize: 16, marginLeft: 15, color: '#000'}}>
                  Herb Plants
                </Text>
              </ScrollView>
              {/* </Pressable> */}
            </View>
            <View style={{paddingLeft: 20}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.benefit}
                renderItem={this.benefit}
                keyExtractor={item => item.id}
              />
            </View>

            {/* Pots for plants */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,
                marginBottom: -12,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
                Pots for plants
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 30,
                alignItems: 'center',
                marginTop: 30,
              }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{alignItems: 'center'}}>
                <Pressable
                  style={{
                    backgroundColor: '#637752',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: '700', color: '#fff'}}>
                    Air Purifying
                  </Text>
                </Pressable>
                {/* <Pressable style={{backgroundColor:"#637752",padding:10,borderRadius:10}}> */}
                <Text
                  onPress={() =>
                    this.props.navigation.navigate('Products', {
                      id: 20,
                      name: 'Croton Plants',
                    })
                  }
                  style={{fontSize: 16, marginLeft: 15, color: '#000'}}>
                  Croton Plants
                </Text>

                <Text  onPress={() =>
                    this.props.navigation.navigate('Products', {
                      id: 20,
                      name: 'Herb Plants',
                    })
                  } style={{fontSize: 16, marginLeft: 15, color: '#000'}}>
                  Herb Plants
                </Text>
              </ScrollView>
              {/* </Pressable> */}
            </View>
            <View style={{paddingLeft: 20}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.potsforplant}
                renderItem={this.pots_plant}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Home;

const style = StyleSheet.create({
  wrapper: {
    height: 280,
    // flex:1,
    // height:"150%"
  },
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide2: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide3: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide1Image: {
    height: '100%',
    width: '100%',
  },
  slide2Image: {
    height: '100%',
    width: '100%',
  },
  slide3Image: {
    height: '100%',
    width: '100%',
  },
  text: {
    top: 50,
    left: -70,
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'DancingScript-Bold',
    alignSelf: 'center',
  },
  textSmall: {
    top: 60,
    left: 30,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    // alignSelf: 'center',
  },
  text1: {
    top: 20,
    color: '#000',
    fontSize: 25,
    fontFamily: 'DancingScript-Bold',
    alignSelf: 'center',
  },
  textSmall1: {
    top: 40,
    color: '#4a4b4d',
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
  },
  buttonStyles: {
    backgroundColor: '#BC3B3B',
    width: Dimensions.get('window').width / 1.7,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderRadius: 25,
    top: 490,
  },
  buttonText: {
    color: '#fff',
    top: -2,
    fontSize: 12,
    fontFamily: 'Raleway-Medium',
  },
});
