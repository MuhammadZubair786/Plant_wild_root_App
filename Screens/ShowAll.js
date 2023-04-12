import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Pressable,
} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

//Global StyleSheet Import
const styles = require('../Components/Style.js');

class ShowAll extends Component {
  constructor(props) {
    super(props);
    console.warn(props);
    this.state = {
      isLoading: true,
      data: [],
      sub_cat: [],
      object: {},
      addToCart: false,
      qty: 1,
      like: {},
      modalVisible: false,
      select: {},
      last_select: '',
    };
  }

  componentDidMount = () => {
    this.product_list(this.props.route.params.module, true);
  };

  subcat_list = () => {
    var form = new FormData();
    form.append('module', 'subcatlist');
    form.append('user_id', global.id);
    form.append('cat_id', this.props.route.params.id);
    // console.warn(form)
    fetch(global.api, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        console.warn('subcat', json);
        this.setState({sub_cat: json});
        return json;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  select = id => {
    this.setState({isLoading: true});
    this.product_list(id);
    const select = this.state.select;
    if (this.state.select[id] == true) {
      select[id] = false;
    } else {
      select[id] = true;
    }

    select[this.state.last_select] = false;
    this.setState({select});
    this.setState({last_select: id});
  };

  product_list = (e, cart) => {
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
        // console.warn( json)
        this.setState({data: json});

        let arr = this.state.data.map(item => {
          item.cart = [];
          return {...item};
        });
        this.setState({data: arr});

        return json;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };
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
        console.warn('add', json);
        Toast.show('Added to wishlist');
        // this.cartPush();
        this.product_list(this.props.route.params.module);
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
        console.warn('add', json);
        Toast.show('Removed from wishlist');
        this.product_list(this.props.route.params.module);
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

  cartPush = () => {
    let arr = this.state.data.map(item => {
      item.cart = [];
      return {...item};
    });
    this.setState({data: arr});
    console.log('arr-------->', arr);
  };

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

  productList = ({item, index}) => (
    <View
      style={{
        justifyContent: 'space-between',
        width: '50%',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <Pressable
        onPress={() =>
          console.log(item.ID)
          // this.props.navigation.navigate('ProductDetails', {id: item.ID,image:item.thumbnail},)
        }>
        <Image
          source={{uri: item.thumbnail}}
          style={[
            style.recommendedImage,
            {height: 190, elevation: 5, width: 160, borderRadius: 20},
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
      </Pressable>
      {/* View for Content */}
      <View style={{paddingLeft: 5, width: 150}}>
        <Text style={[styles.h3, {fontWeight: 'bold', marginTop: 5}]}>
          Rs. {item._regular_price}/-
        </Text>
        <Text numberOfLines={2} style={[styles.h3, {fontWeight: '600'}]}>
          {item.post_title} {item.id}
        </Text>
      </View>
      {item.cart.length > 0 ? (
        <Pressable
        onPress={() => this.addToCart(index)}
        style={{
          borderColor: '#637752',
          borderWidth:1,
          width: '70%',
          height: 35,
          borderRadius: 10,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5,
        }}>
        <Text style={[styles.buttonText,{color:"#637752"}]}>Added to cart</Text>
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
  );

  subcategories = ({item}) => (
    <>
      {this.state.select[item.term_id] ? (
        <Pressable
          onPress={() => this.select(item.term_id)}
          style={{
            backgroundColor: '#637752',
            padding: 10,
            borderRadius: 10,
            margin: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: '700', color: '#fff'}}>
            {item.name}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => this.select(item.term_id)}
          style={{padding: 10}}>
          <Text style={[styles.h3, {color: 'gray', margin: 10}]}>
            {item.name}
          </Text>
        </Pressable>
      )}
    </>
  );

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#151415'}}>
        <View style={styles.container}>
          {/* Header */}
          <View
            style={{
              backgroundColor: '#637752',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              padding: 10,
            }}>
            <Icon
              name="arrow-back-outline"
              onPress={() => this.props.navigation.goBack()}
              type="ionicon"
              color="#fff"
            />
            <Text style={[styles.h3, {fontSize: 20, color: '#fff'}]}>
              {this.props.route.params.name}
            </Text>
            <Pressable
              onPress={() =>
                this.setState({modalVisible: !this.state.modalVisible})
              }>
              <Icon name="funnel-outline" type="ionicon" color="#fff" />
            </Pressable>
          </View>
          {/* <Modal visible={this.state.modalVisible} transparent> */}
          {this.state.modalVisible ? (
            <View
              style={{
                width: 200,
                height: 120,
                backgroundColor: '#fff',
                elevation: 1,
                borderRadius: 10,
                position: 'absolute',
                right: -5,
                top: 40,
                backgroundColor: '#637752',
                zIndex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                  justifyContent: 'space-evenly',
                  width: '100%',
                }}>
                <Icon
                  name="ellipse-outline"
                  type="ionicon"
                  size={18}
                  color="#fff"
                />
                <Text style={[styles.h3, {color: '#fff'}]}>High-to-low</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 30,
                  justifyContent: 'space-evenly',
                  width: '100%',
                }}>
                <Icon
                  name="ellipse-outline"
                  type="ionicon"
                  size={18}
                  color="#fff"
                />
                <Text style={[styles.h3, {color: '#fff'}]}>Low-to-high</Text>
              </View>
            </View>
          ) : null}
          {/* </Modal> */}

          <ScrollView>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.sub_cat}
              renderItem={this.subcategories}
              keyExtractor={item => item.id}
            />
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: "row", marginLeft: 20, marginBottom: 10, marginTop: 10 }}>

                                <Pressable style={{ backgroundColor: "#637752", padding: 10, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
                                        Vegetables
                                    </Text>
                                </Pressable>
                                <Text style={[styles.h3, { color: "gray", margin: 10 }]}>
                                    Flowers
                                </Text>
                                <Text style={[styles.h3, { color: "gray", margin: 10 }]}>
                                    Fruits
                                </Text>

                                <Text style={[styles.h3, { color: "gray", margin: 10 }]}>
                                    Newly added
                                </Text>
                                <Text style={[styles.h3, { color: "gray", margin: 10 }]}>
                                    Flowers
                                </Text>
                                <Text style={[styles.h3, { color: "gray", margin: 10 }]}>
                                    Fruits
                                </Text>
                            </View>

                        </ScrollView> */}
            {this.state.isLoading ? (
              <View style={{marginTop: 200}}>
                {/* <Loaders /> */}
                <ActivityIndicator size="large" color="#637752" />
              </View>
            ) : (
              <View style={{marginBottom: 20}}>
                <FlatList
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  data={this.state.data}
                  renderItem={this.productList}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default ShowAll;

class Loaders extends Component {
  render() {
    return (
      <View>
        <SkeletonPlaceholder>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{marginLeft: 5}}>
              <View
                style={{width: win.width / 3.5, height: 110, borderRadius: 10}}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <View
                    style={{width: 150, height: 15, marginLeft: 10, top: 5}}
                  />
                  <View
                    style={{width: 250, height: 20, marginLeft: 10, top: 10}}
                  />
                </View>

                <View
                  style={{height: 20, width: 20, right: 20, bottom: 5}}></View>
              </View>
              <View style={{width: 50, height: 15, marginLeft: 10, top: 15}} />
              <View style={{width: 50, height: 15, marginLeft: 10, top: 20}} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 300,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.moveToCartButton} />
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{marginLeft: 5}}>
              <View
                style={{width: win.width / 3.5, height: 110, borderRadius: 10}}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <View
                    style={{width: 150, height: 15, marginLeft: 10, top: 5}}
                  />
                  <View
                    style={{width: 250, height: 20, marginLeft: 10, top: 10}}
                  />
                </View>

                <View
                  style={{height: 20, width: 20, right: 20, bottom: 5}}></View>
              </View>
              <View style={{width: 50, height: 15, marginLeft: 10, top: 15}} />
              <View style={{width: 50, height: 15, marginLeft: 10, top: 20}} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 300,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.moveToCartButton} />
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{marginLeft: 5}}>
              <View
                style={{width: win.width / 3.5, height: 110, borderRadius: 10}}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <View
                    style={{width: 150, height: 15, marginLeft: 10, top: 5}}
                  />
                  <View
                    style={{width: 250, height: 20, marginLeft: 10, top: 10}}
                  />
                </View>

                <View
                  style={{height: 20, width: 20, right: 20, bottom: 5}}></View>
              </View>
              <View style={{width: 50, height: 15, marginLeft: 10, top: 15}} />
              <View style={{width: 50, height: 15, marginLeft: 10, top: 20}} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 300,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.moveToCartButton} />
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{marginLeft: 5}}>
              <View
                style={{width: win.width / 3.5, height: 110, borderRadius: 10}}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <View
                    style={{width: 150, height: 15, marginLeft: 10, top: 5}}
                  />
                  <View
                    style={{width: 250, height: 20, marginLeft: 10, top: 10}}
                  />
                </View>

                <View
                  style={{height: 20, width: 20, right: 20, bottom: 5}}></View>
              </View>
              <View style={{width: 50, height: 15, marginLeft: 10, top: 15}} />
              <View style={{width: 50, height: 15, marginLeft: 10, top: 20}} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 300,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.moveToCartButton} />
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{marginLeft: 5}}>
              <View
                style={{width: win.width / 3.5, height: 110, borderRadius: 10}}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <View
                    style={{width: 150, height: 15, marginLeft: 10, top: 5}}
                  />
                  <View
                    style={{width: 250, height: 20, marginLeft: 10, top: 10}}
                  />
                </View>

                <View
                  style={{height: 20, width: 20, right: 20, bottom: 5}}></View>
              </View>
              <View style={{width: 50, height: 15, marginLeft: 10, top: 15}} />
              <View style={{width: 50, height: 15, marginLeft: 10, top: 20}} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 300,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.moveToCartButton} />
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{marginLeft: 5}}>
              <View
                style={{width: win.width / 3.5, height: 110, borderRadius: 10}}
              />
            </View>

            <View>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <View
                    style={{width: 150, height: 15, marginLeft: 10, top: 5}}
                  />
                  <View
                    style={{width: 250, height: 20, marginLeft: 10, top: 10}}
                  />
                </View>

                <View
                  style={{height: 20, width: 20, right: 20, bottom: 5}}></View>
              </View>
              <View style={{width: 50, height: 15, marginLeft: 10, top: 15}} />
              <View style={{width: 50, height: 15, marginLeft: 10, top: 20}} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 300,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.moveToCartButton} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }
}

const win = Dimensions.get('window');
const style = StyleSheet.create({
  header: {
    backgroundColor: '#ff9933',
    flexDirection: 'row',
    padding: 10,
    height: 55,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  button: {
    width: 100,
    padding: 2,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 5,
    // shadowOffset: { width: 0, height: 0 },
    elevation: 0.5,
    shadowColor: '#d3d3d3',
    alignItems: 'center',
  },
  filter: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingLeft: 7,
    width: 80,
    borderWidth: 1,
    padding: 1,
    borderColor: '#d3d3d3',
    alignItems: 'center',
    shadowRadius: 50,
    borderRadius: 5,
    shadowColor: '#f5f5f5',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    elevation: 1,
  },
  card: {
    backgroundColor: '#fff',
    // alignSelf: "center",
    width: Dimensions.get('window').width / 2,
    top: 10,
    alignItems: 'center',
    // paddingHorizontal:10,
    // flexDirection: "row",
    marginBottom: 10,
    shadowRadius: 50,
    shadowOffset: {width: 50, height: 50},
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  productImg: {
    height: 120,
    width: '100%',
    margin: 10,
    alignSelf: 'center',
  },
  contentView: {
    flexDirection: 'column',
    width: '68%',
    marginRight: 10,
    paddingBottom: 10,
  },
  textButton: {
    // fontFamily: "Raleway-SemiBold",
    fontSize: RFValue(11, 580),
    alignSelf: 'center',
    color: '#fff',

    // marginLeft:-10
  },
});
