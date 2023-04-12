import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TextInput,
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

class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      object: {},
      like: {},
      product: '',
      page: 1,
      load_more: false,
      quantity: 1,
      total:""
    };
  }

  componentDidMount() {
    console.warn('my cart', global.cart);
    this.setState({data:global.cart})
    var price= global.cart.map(item=>item['_regular_price'])
    console.log("przzzzzz--->", price)
    // this.setState({total})
    this.focusListener = this.props.navigation.addListener('focus', () => {
      console.warn('my cart', global.cart);
      this.setState({data:global.cart})
    });
  }
  pluss = () => {
    var qty = this.state.quantity + 1;
    this.setState({quantity: qty});
  };

  minus = () => {
    if (this.state.quantity > 1) {
      var qty = this.state.quantity - 1;
      this.setState({quantity: qty});
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, height: '100%', backgroundColor: '#fff'}}>
        <View style={styles.container}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Icon
              name="arrow-back-outline"
              onPress={() => this.props.navigation.goBack()}
              type="ionicon"
            />
            <Text style={[styles.headerText, {fontSize: 20}]}>
              Shopping cart
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}></View>
          </View>

          <View
            style={{backgroundColor: '#d3d3d3', paddingLeft: 10, padding: 3}}>
            <Text style={styles.h3}>{this.state.data.length} items in cart</Text>
          </View>

          {this.state.data.length == 0 ? (
            <View style={{flex:1,justifyContent:"center"}}>
                <Text style={{fontSize:18,alignSelf:"center"}}>
                    No data in cart
                </Text>
            </View>
          ) : (
            <View>
              {this.state.data.map(key => {
                return (
                  <View
                    style={style.button}
                    onPress={() => this.props.navigation.navigate('MyCart')}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri:key.thumbnail}}
                        // source={{ uri: global.img_url + value.picture[0].src }}
                        style={{height: 65, width: 65, borderRadius: 50}}
                      />
                      <View style={{marginLeft: 10,width:"65%"}}>
                        <Text
                          style={[styles.h3, {color: '#000', fontSize: 18}]}>
                          {key.post_title}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '60%',
                            justifyContent: 'space-evenly',
                            marginTop: 5,
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity onPress={() => this.minus()}>
                            <Icon
                              name="remove"
                              type="ionicon"
                              size={25}
                              color="#000"
                              style={{top: -2}}
                            />
                          </TouchableOpacity>

                          <View
                            style={[
                              style.button,
                              {
                                backgroundColor: '#000',
                                // borderColor:"#bc3b3b",
                                // borderWidth:1,
                                marginHorizontal: 5,
                                borderRadius: 50,
                                width: 30,
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                              },
                            ]}>
                            <Text
                              style={[
                                style.h4,
                                {
                                  alignSelf: 'center',
                                  fontFamily: 'Roboto-Medium',
                                  color: '#fff',
                                },
                              ]}>
                              {this.state.quantity}
                            </Text>
                          </View>

                          <TouchableOpacity onPress={() => this.pluss()}>
                            <Icon
                              name="add"
                              type="ionicon"
                              size={25}
                              color="#000"
                              style={{top: -2}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={{
                          padding: 5,
                          backgroundColor: '#f5f5f5',
                          borderRadius: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 30,
                          width: 30,
                          marginLeft: 10,
                        }}>
                        <Icon
                          type="ionicon"
                          name="close-outline"
                          color={'#000'}
                          size={20}
                        />
                      </TouchableOpacity>
                      <Text
                        style={[
                          styles.h3,
                          {fontWeight: 'bold', marginTop: 10},
                        ]}>
                        ₹ {key._regular_price}/-
                      </Text>
                    </View>
                  </View>
                );
              })}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                  top: 10,
                }}>
                <Text style={styles.h2}>Total</Text>
                <Text style={[styles.h2, {fontWeight: '700'}]}>₹ 80950/-</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 40,
                  alignSelf: 'center',
                }}>
                <TextInput
                  placeholder="Coupon code"
                  style={{
                    width: 150,
                    borderWidth: 1,
                    borderTopLeftRadius: 30,
                    borderBottomLeftRadius: 30,
                    height: 50,
                    color: '#000',
                  }}
                />
                <Pressable
                  style={{
                    width: 130,
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    backgroundColor: '#637752',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: -5,
                  }}>
                  <Text style={[styles.h3, {color: '#fff'}]}>Apply Coupon</Text>
                </Pressable>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Checkout')}
                style={{
                  width: 280,
                  height: 50,
                  backgroundColor: '#637752',
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                <Text style={styles.buttonText}>Proceed to checkout</Text>
              </TouchableOpacity>

              {/* <FlatList
                                    data={this.state.data}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.id}
                                    style={{ marginTop: 10 }}
                                    onEndReached={() => { this.load_more() }}
                                    onEndReachedThreshold={0.5}
                                /> */}
              {/* : (
                                <View style={{ alignItems: 'center', marginTop: 100, }}>
                                    <Image
                                        source={require('../Images/nowishlist.png')}
                                        style={{ width: 400, height: 300 }}
                                    />
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                                        <View style={[styles.buttonStyles, { marginTop: 40, width: 200, height: 40 }]}>
                                            <Text style={styles.buttonText}>Shop Now</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )} */}
            </View>
          )}
          {this.state.load_more ? (
            <ActivityIndicator size="large" color="#ff9933" />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}
export default MyCart;

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
                marginLeft: 220,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.removeButton} />

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
                marginLeft: 220,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.removeButton} />

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
                marginLeft: 220,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.removeButton} />

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
                marginLeft: 220,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.removeButton} />

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
                marginLeft: 220,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.removeButton} />

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
                marginLeft: 220,
                position: 'absolute',
                bottom: 5,
              }}>
              <View style={styles.removeButton} />

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    padding: 5,
    alignContent: 'center',
    // height: 50,
    borderBottomWidth: 0.2,
    borderColor: '#b2beb5',
    alignItems: 'center',
    //backgroundColor:"red"
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
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    top: 10,
    // paddingHorizontal:10,
    flexDirection: 'row',
    marginBottom: 10,
    shadowRadius: 50,
    shadowOffset: {width: 50, height: 50},
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  productImg: {
    height: 120,
    width: '100%',
    borderRadius: 10,
    // margin: 10,
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
    fontSize: RFValue(9, 580),
    alignSelf: 'center',
    color: '#fff',

    // marginLeft:-10
  },
});
