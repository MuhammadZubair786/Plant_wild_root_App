import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ImageBackground,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Header, Icon} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import RazorpayCheckout from 'react-native-razorpay';

const styles = require('../Components/Style');

const win = Dimensions.get('window');

class Checkout extends Component {
  constructor(props) {
    super(props);
    console.warn(props);
    this.state = {
      text: '',
      area: '',
      city: '',
      postal_code: '',
      state: '',
      status: true,
      firstName: '',
      lastName: '',
      cardNo: '',
      cvv: '',
      expYear: '',
      expMonth: '',
      data: [],
      address: [],
      card: [],
      isLoading: false,
      iconName: 'radio-button-off',
      iconName1: 'radio-button-off',
      iconName2: 'radio-button-off',
      cardIcon: 'radio-button-off',
      mode: '',
      payment_id: '',
      product_price: '',
      product_quantity: '',
      product_id: [],
      select: {},
      last_selected: '',
      addressdata: [],
      name: '',
      contact: '',
      address_id: '',
      visible: false,
    };
  }

  //setting state for cash
  cash = () => {
    if (this.state.iconName == 'radio-button-off') {
      this.setState({iconName: 'radio-button-on', mode: 'cod'});
      this.setState({iconName1: 'radio-button-off'});
      this.setState({
        iconName2: 'radio-button-off',
        cardIcon: 'radio-button-off',
      });
    } else {
      this.setState({iconName: 'radio-button-off', select: ''});
    }
  };
  // Card
  card = () => {
    if (this.state.cardIcon == 'radio-button-off') {
      this.setState({cardIcon: 'radio-button-on', mode: 'card'});
      this.setState({iconName1: 'radio-button-off'});
      this.setState({
        iconName2: 'radio-button-off',
        iconName: 'radio-button-off',
      });
    } else {
      this.setState({cardIcon: 'radio-button-off', select: ''});
    }
  };
  //setting state for female gender
  net = id => {
    // alert(id)
    if (this.state.iconName1 == 'radio-button-off') {
      this.setState({iconName1: 'radio-button-on', mode: 'netbanking'});
      this.setState({iconName: 'radio-button-off'});
      this.setState({
        iconName2: 'radio-button-off',
        cardIcon: 'radio-button-off',
      });
    } else {
      this.setState({iconName1: 'radio-button-off', select: ''});
    }
  };

  //setting state for others gender
  upi = () => {
    if (this.state.iconName2 == 'radio-button-off') {
      this.setState({iconName2: 'radio-button-on', mode: 'upi'});
      this.setState({iconName: 'radio-button-off'});
      this.setState({
        iconName1: 'radio-button-off',
        cardIcon: 'radio-button-off',
      });
    } else {
      this.setState({iconName2: 'radio-button-off', select: ''});
    }
  };

  place_order = () => {
    var options = {
      description: 'Orders from the app',
      image: 'https://demo.webixun.com/kj/kj.png',
      currency: 'INR',
      key: 'rzp_test_SsWgf6Qj4xwonA',
      amount: 10000 * 100,
      name: 'Aman',
      order_id: 120,
      method: 'debit',
      prefill: {
        email: 'aman@gmail.com',
        contact: 8755255052,
        // method:this.state.mode
      },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        console.warn(data)
        // this.setState({ payment_id: JSON.stringify(data.razorpay_payment_id) });
        // alert("hy")
        // this.payment_verify(data.razorpay_payment_id);
        // this.RBSheet.close();
      })
      .catch(error =>
        console.warn(error)
        // alert("Payment is not processed, You are reirecting to home page")
        // <PaymentFailed />
        // this.props.navigation.navigate('PaymentFailed'),
      );
  };
  renderLeftComponent() {
    return (
      <View style={{flexDirection: 'row', width: win.width / 2}}>
        <Text style={{top: 2}}>
          <Icon
            name="chevron-back-outline"
            color="#222222"
            size={20}
            type="ionicon"
            onPress={() => this.props.navigation.goBack()}
          />
        </Text>
        <Text style={[styles.headerHeadingText]}>Payment Checkout</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container, {flex: 1}]}>
        {/* View for header component */}
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
          <Text style={[styles.headerText, {fontSize: 20}]}>Checkout</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}></View>
        </View>

        {/* Delivery address */}
        <ScrollView>
          <View style={{marginHorizontal: 10}}>
            <Text
              style={[
                styles.h3,
                {color: '#000', fontWeight: '600', fontSize: RFValue(14, 580)},
              ]}>
              Shipping To
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={style.address}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="location-outline" type="ionicon" />
                  <Text style={[styles.h3, {marginLeft: 10}]}>
                    3-B GMS road, Dehradun 248001
                  </Text>
                </View>
                <Pressable onPress={() => {}}>
                  <Icon name="ellipse-outline" type="ionicon" />
                </Pressable>
              </View>
            </ScrollView>
            <Pressable
              style={{
                padding: 5,
                borderWidth: 1,
                width: 250,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 10,
                marginRight: 10,
              }}
              onPress={() => this.props.navigation.navigate('NewAddress')}>
              <Text style={styles.h3}>Ship to a different Address?</Text>
            </Pressable>
          </View>

          <View style={{marginHorizontal: 10, marginTop: 20}}>
            <Text
              style={[
                styles.h3,
                {color: '#000', fontWeight: '600', fontSize: RFValue(14, 580)},
              ]}>
              Order Notes(Optional)
            </Text>
            <TextInput
              placeholder="Notes about your order"
              multiline
              style={{
                width: '95%',
                borderWidth: 1,
                borderColor: '#d3d3d3',
                marginTop: 10,
                borderRadius: 20,
                paddingLeft: 10,
              }}
            />
          </View>

          {/* Payment Options */}
          <View
            style={{
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              marginTop: 5,
              paddingBottom: 10,
            }}>
            <View style={[style.addressView]}>
              <Text
                style={[
                  styles.h3,
                  {
                    color: '#000',
                    fontWeight: '600',
                    fontSize: RFValue(14, 580),
                  },
                ]}>
                Payment method
              </Text>
            </View>
            <Pressable
              onPress={() => this.card()}
              style={[style.pay, {paddingVertical: 15, flexDirection: 'row'}]}>
              <Text
                style={{
                  fontFamily: 'Raleway-Medium',
                  fontSize: RFValue(12, 580),
                }}>
                Debit/Credit Card
              </Text>
              <Icon name={this.state.cardIcon} type="ionicon" size={15} />
            </Pressable>
            <Pressable
              onPress={() => this.net()}
              style={[style.pay, {paddingVertical: 15, flexDirection: 'row'}]}>
              <Text
                style={{
                  fontFamily: 'Raleway-Medium',
                  fontSize: RFValue(12, 580),
                }}>
                Net Banking
              </Text>
              <Icon
                name={this.state.iconName1}
                type="ionicon"
                size={15}
                style={{top: 5}}
              />
            </Pressable>
            <Pressable
              onPress={() => this.upi()}
              style={[style.pay, {paddingVertical: 15, flexDirection: 'row'}]}>
              <Text
                style={{
                  fontFamily: 'Raleway-Medium',
                  fontSize: RFValue(12, 580),
                }}>
                UPI (Gpay, PhonePe)
              </Text>
              <Icon name={this.state.iconName2} type="ionicon" size={15} />
            </Pressable>
            <Pressable
              onPress={() => this.cash()}
              style={[style.pay, {paddingVertical: 15, flexDirection: 'row'}]}>
              <Text
                style={{
                  fontFamily: 'Raleway-Medium',
                  fontSize: RFValue(12, 580),
                }}>
                Cash on Delivery
              </Text>
              <Icon name={this.state.iconName} type="ionicon" size={15} />
            </Pressable>
          </View>

          {/* Total amount */}

          <View
            style={{
              backgroundColor: '#fff',
              marginTop: 5,
              paddingBottom: 10,
              paddingHorizontal: 10,
            }}>
            <Text
              style={[
                styles.h3,
                {color: '#000', fontWeight: '600', fontSize: RFValue(14, 580)},
              ]}>
              Price Details
            </Text>
            <View
              style={[
                style.detailsView,
                {
                  borderBottomWidth: 0,
                  paddingVertical: 10,
                  alignItems: 'center',
                },
              ]}>
              <View style={{justifyContent: 'center'}}>
                <Text style={[styles.h4]}>Total MRP </Text>
                <Text style={[styles.h5, {color: 'green'}]}>
                  (inclusive of all taxes){' '}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: RFValue(11, 580),
                }}>
                ₹ 1500
              </Text>
            </View>
            {this.state.shipping_charge == 0 ? null : (
              <View
                style={[
                  style.detailsView,
                  {paddingVertical: 0, paddingBottom: 10},
                ]}>
                <Text style={[styles.h4]}>Delivery Cost</Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                    fontSize: RFValue(11, 580),
                  }}>
                  + ₹ 40
                </Text>
              </View>
            )}
            {/* <View style={[style.detailsView, { paddingBottom: 0 }]}>
                            <Text style={[styles.h4]}>Discount</Text>
                            <Text style={{ fontFamily: "Montserrat-Medium", fontSize: RFValue(11, 580) }}> ₹ 0</Text>
                        </View> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                top: 10,
              }}>
              <Text style={styles.h3}>Total</Text>
              <Text style={[styles.h3, {fontWeight: '700'}]}>₹ 1540/-</Text>
            </View>
          </View>

          {/* Submit Button */}
          <View style={{marginTop: 70, marginBottom: 20}}>
            <TouchableOpacity
              style={styles.buttonStyles}
              onPress={() =>
                //  this.setState({visible:true})
                this.place_order()
              }>
              <Text style={styles.buttonText}> Payment</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={this.state.visible}>
            <View style={styles.container}>
              <View style={{alignItems: 'center', marginTop: 150}}>
                <Icon name="check-circle-outline" size={120} />
                {/* <Image
                                    source={require('../Images/thankyou.jpg')}
                                    style={{
                                        width: 330,
                                        height: 300,
                                        // marginTop: 10,
                                        alignSelf: 'center',
                                    }}
                                /> */}
                <Text
                  style={[
                    styles.h3,
                    {fontWeight: 'bold', fontSize: RFValue(14, 580)},
                  ]}>
                  Thank You!
                </Text>
                {/* <Text style={[styles.h4, {color: '#222222'}]}>for your order</Text> */}
                <Text
                  style={[
                    styles.h3,
                    {
                      marginHorizontal: 25,
                      fontSize: RFValue(13, 580),
                      textAlign: 'center',
                      marginTop: 10,
                    },
                  ]}>
                  Your order #535 is Confirmed.Please check the status at Order
                  Tracking page
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}
                  style={[styles.buttonStyles, {top: 250}]}>
                  <Text style={[styles.buttonText, {color: '#fff'}]}>
                    Continue Shopping
                  </Text>
                </TouchableOpacity>
                {/* <Text
                                    style={[styles.p, { top: 90, color: "#d93f11", fontWeight: "bold", marginBottom: 10 }]}
                                    onPress={() => this.props.navigation.navigate('Home')}>
                                    Back To Home
                                </Text> */}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

export default Checkout;

const style = StyleSheet.create({
  heading: {
    fontSize: 20,
    marginLeft: 10,
    color: 'black',
  },
  address: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#f5f5f5',
    width: 350,
    marginLeft: 10,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  pay: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'space-between',
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  detailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    paddingVertical: 10,
  },
  textInput: {
    backgroundColor: '#F2F2F2',
    width: Dimensions.get('window').width / 1.2,
    borderRadius: 10,
    height: 45,
    alignSelf: 'center',
    // borderRadius:20,
    marginTop: 15,
    paddingLeft: 20,
    fontFamily: 'Roboto-Regular',
  },
  methodText: {
    fontSize: RFValue(12, 580),
    fontFamily: 'Raleway-Medium',
    marginBottom: 7,
  },
  text: {
    color: '#bc3b3b',
    fontSize: RFValue(13, 580),
    // top:5,
    fontFamily: 'Montserrat-Medium',
  },
});
