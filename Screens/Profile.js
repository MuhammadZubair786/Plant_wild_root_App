import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Icon} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from '../AuthContextProvider.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Global Style Import
const styles = require('../Components/Style.js');

const options = {
  title: 'Pick an Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class Profile extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      last_name: '',
      contact_no: '',
      email: '',
    };
  }

  componentDidMount = () => {
    this.get_profile();
  };

  get_profile = () => {
    var form = new FormData();
    form.append('module', 'userprofile');
    form.append('user_id', global.id);
    // form.append("password", this.state.password);
    console.warn(form);
    fetch(global.api, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        console.warn(json);
        this.setState({
          name: json.first_name,
          last_name: json.last_name,
          email: json.user_email,
        });
        return json;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        // this.setState({isloading:false})
      });
  };

  logout = () => {
    AsyncStorage.setItem('@auth_login', '');
    global.token = null;
    Toast.show('Logout Successfully!');
    this.context.logout();
  };

  render() {
    let data = this.state.data;
    return (
      <View style={[styles.container, {height: '100%'}]}>
        {/* edit profile card */}
        <View style={{height: 150, backgroundColor: '#637752'}}>
          <View style={{marginLeft: 20, marginTop: 50}}>
            <Text style={style.userName}>
              Hello {global.id} {this.state.name} {this.state.last_name}
            </Text>
            <Text style={style.userName}>{this.state.email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditProfile')}
            style={{
              alignSelf: 'flex-end',
              padding: 5,
              backgroundColor: '#000',
              bottom: 10,
              position: 'absolute',
              //   marginTop: 25,
              right: 10,
              borderRadius: 10,
              width: '15%',
              alignItems: 'center',
            }}
            //  onPress={() => this.props.navigation.navigate('EditProfile')}
          >
            <Text
              style={{color: '#fff'}}
              //   onPress={() => this.props.navigation.navigate('EditProfile')}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={[style.card,{padding:5}]}>     */}

        {/* edit profile button*/}

        {/* user details */}

        {/* edit icon for image */}

        {/* Bottom Sheet fot edit picture icon */}

        {/* menu fields */}
        <View style={style.card1}>
          {/* Saved feeds */}
          {/* <TouchableOpacity
                        style={style.button}
                        onPress={() => this.props.navigation.navigate('MyCart')}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon type="ionicon" size={26} name="cart-outline" />
                            <Text style={style.buttonText}>My Cart</Text>
                        </View>
                        <View>
                            <Icon type="ionicon" name="chevron-forward-outline" />
                        </View>
                    </TouchableOpacity> */}
          <TouchableOpacity
            style={style.button}
            onPress={() => this.props.navigation.navigate('MyOrders')}>
            <View style={{flexDirection: 'row'}}>
              <Icon type="ionicon" size={26} name="basket-outline" />
              <Text style={style.buttonText}>My Orders</Text>
            </View>
            <View>
              <Icon type="ionicon" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={() => this.props.navigation.navigate('Wishlist')}>
            <View style={{flexDirection: 'row'}}>
              <Icon type="ionicon" size={26} name="heart-outline" />
              <Text style={style.buttonText}>Wishlist</Text>
            </View>
            <View>
              <Icon type="ionicon" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.button}
            onPress={() => this.props.navigation.navigate('Notifications')}>
            <View style={{flexDirection: 'row'}}>
              <Icon type="ionicon" size={26} name="notifications-outline" />
              <Text style={style.buttonText}>Notifications</Text>
            </View>
            <View>
              <Icon type="ionicon" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>

          {/* about us */}
          <TouchableOpacity
            style={style.button}
            onPress={() => this.props.navigation.navigate('AboutUs')}>
            <View style={{flexDirection: 'row'}}>
              <Icon type="ionicon" size={26} name="alert-circle-outline" />
              <Text style={style.buttonText}>About Us</Text>
            </View>
            <View>
              <Icon type="ionicon" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity
            style={style.button}
            onPress={() => this.props.navigation.navigate('PrivacyPolicy')}>
            <View style={{flexDirection: 'row'}}>
              <Icon type="ionicon" size={26} name="lock-closed-outline" />
              <Text style={style.buttonText}>Privacy Policy</Text>
            </View>
            <View>
              <Icon type="ionicon" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.button}
            onPress={() =>
              this.props.navigation.navigate('TermsAndConditions')
            }>
            <View style={{flexDirection: 'row'}}>
              <Icon type="ionicon" size={26} name="document-outline" />
              <Text style={style.buttonText}>Terms and Conditions</Text>
            </View>
            <View>
              <Icon type="ionicon" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>

          {/* Support */}
          <TouchableOpacity
            style={style.button}
            onPress={() => this.props.navigation.navigate('Support')}>
            <View style={{flexDirection: 'row'}}>
              <Icon type="ionicon" size={26} name="help-circle-outline" />
              <Text style={style.buttonText}>Support</Text>
            </View>
            <View>
              <Icon type="ionicon" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>

          {/* logout */}
          <TouchableOpacity
            style={style.buttonL}
            onPress={() => {
              this.logout();
              // Toast.show("Logout Successfully!")
              // this.props.navigation.navigate("Welcome")
            }}
            // onPress={() => {
            //     this.logout();
            // }}
          >
            <View style={{flexDirection: 'row'}}>
              <Icon type="ionicon" size={26} name="log-out-outline" />
              <Text style={style.buttonText}>Logout</Text>
            </View>
            <View>
              <Icon type="ionicon" name="chevron-forward-outline" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Profile;

const style = StyleSheet.create({
  card: {
    backgroundColor: '#326bf3',
    width: '100%',
    flex: 0.54,
    height: '50%',
    marginTop: 10,
  },
  userImg: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    // marginTop:10,
    borderRadius: 100,
    shadowRadius: 50,
    shadowOffset: {width: 50, height: 50},
    borderWidth: 1,
    borderColor: '#000',
  },
  userName: {
    fontFamily: 'Raleway-SemiBold',
    // fontSize:20,
    fontSize: RFValue(14.5, 580),
    // alignSelf: 'center',
    color: '#fff',
    // marginTop: -15,
  },
  code: {
    // fontSize:15,
    fontSize: RFValue(11, 580),
    fontFamily: 'Roboto-Medium',
    color: '#fff',
  },
  contactNo: {
    // fontSize:15,
    fontSize: RFValue(11, 580),
    fontFamily: 'Roboto-Medium',
    color: '#000',
  },
  editIcon: {
    alignSelf: 'center',
    left: 50,
    top: -30,
  },
  iconView: {
    width: 30,
    height: 30,
    shadowColor: '#fff',
    shadowOpacity: 1,
    elevation: 0.5,
    shadowRadius: 5,
    shadowOffset: {width: 1, height: 1},
    alignContent: 'center',
    alignItems: 'center',
    left: -20,
    top: -3,
    justifyContent: 'center',
    borderRadius: 50,
  },
  logo: {
    height: 60,
    width: 60,
    borderWidth: 0.2,
    borderColor: '#fff',
    borderRadius: 100,
    marginLeft: 5,
  },
  card1: {
    backgroundColor: '#fff',
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    shadowRadius: 50,
    shadowOffset: {width: 1, height: 1},
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    alignContent: 'center',
    height: 50,
    borderBottomWidth: 0.2,
    borderColor: '#b2beb5',
    alignItems: 'center',
    //backgroundColor:"red"
  },
  buttonL: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    alignContent: 'center',
    height: 50,
    alignItems: 'center',
    //backgroundColor:"red"
  },
  buttonText: {
    fontFamily: 'Raleway-Regular',
    color: '#000',
    // fontSize:17,
    fontSize: RFValue(12.5, 580),
    left: 10,
    alignSelf: 'center',
  },
  editButton: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'Raleway-Bold',
    // fontSize:15,
    fontSize: RFValue(11, 580),
  },
  icon: {
    marginLeft: 20,
    // fontSize:20,
    fontSize: RFValue(14.5, 580),
    marginBottom: 10,
  },
  Text: {
    position: 'absolute',
    // fontSize:20,
    fontSize: RFValue(14.5, 580),
    marginLeft: 80,
    fontFamily: 'Raleway-Medium',
  },
});
