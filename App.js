import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import Home from './Screens/Home';
import Skip from './Screens/Skip';
import Welcome from './Screens/Welcome';
import ForgotPassword from './Screens/ForgotPassword';
import SignUp from './Screens/SignUp';
import Splash from './Screens/Splash';
import Discover from './Screens/ShowAll';
import Category from './Screens/Category';
import Products from './Screens/Products';
import ProductDetails from './Screens/ProductDetails';
import Wishlist from './Screens/Wishlist';
import Profile from './Screens/Profile';
import MyCart from './Screens/MyCart';
import MyOrders from './Screens/MyOrders';
import AboutUs from './Screens/AboutUs';
import PrivacyPolicy from './Screens/PrivacyPolicy';
import TermsAndConditions from './Screens/TermsAndConditions';
import Support from './Screens/Support';
import Search from './Screens/Search';
import OrderDetails from './Screens/OrderDetails';
import Checkout from './Screens/Checkout';
import NewAddress from './Screens/NewAddress';
import EditProfile from './Screens/EditProfile';
import Notifications from './Screens/Notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './AuthContextProvider';
import ShowAll from './Screens/ShowAll';

global.api = 'https://wildroots.in/storeapi';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          borderRadius: 25,
          bottom: 10,
          zIndex: 1,
          height: 60,
          elevation: 2,
          width: '95%',
          position: 'absolute',
          alignSelf: 'center',
          left: 10,
          paddingHorizontal: 20,
          backgroundColor: '#637752',
        },
        headerShown: false,
        tabBarIcon: ({focused, color, tintColor}) => {
          let iconName;
          if (route.name == 'Home') {
            return (
              <Icon
                name={focused ? 'home' : 'home'}
                type="ionicon"
                size={20}
                style={{fontWeight: 'bold'}}
                color={focused ? '' : color}
              />
            );
          } else if (route.name == 'Category') {
            return (
              <Icon
                name={focused ? 'menu' : 'menu'}
                type="ionicon"
                size={25}
                color={focused ? '' : color}
              />
            );
          } else if (route.name == 'Search') {
            return (
              <Icon
                name="search"
                type="ionicon"
                size={22}
                color={focused ? '' : color}
              />
            );
          } else if (route.name == 'MyCart') {
            return (
              <Icon
                name={focused ? 'basket' : 'basket'}
                color={focused ? '' : color}
                type="ionicon"
                size={25}
              />
            );
          } else if (route.name == 'Profile') {
            return (
              <Icon name="person" size={25} color={focused ? '' : color} />
            );
          }
          return (
            <Icon name={iconName} color={color} type="ionicon" size={22} />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        labelPosition: 'below-icon',
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        // activeBackgroundColor:"red",
        style: {
          backgroundColor: 'red',
          paddingBottom: 10,

          // height: 100,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        },

        labelStyle: {
          fontSize: 14,
          paddingBottom: 15,
        },
      }}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />

      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Search" component={Search} />

      <Tab.Screen name="MyCart" component={MyCart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      islogin: false,
      step: 'done',
    };
  }

  componentDidMount() {
    global.cart = [];
    AsyncStorage.getItem('@auth_login', (err, result) => {
      // console.warn(result)
      if (JSON.parse(result) != null) {
        this.setState({islogin: true, step: JSON.parse(result).use_type});
        global.token = JSON.parse(result).token;
        global.id = JSON.parse(result).user_id;
        global.step = this.state.step;
      }
    });
    setTimeout(() => {
      this.setState({isloading: false});
    }, 2000);
  }

  login = step => {
    this.setState({islogin: true, step: step});
  };

  logout = () => {
    this.setState({islogin: false});
  };
  render() {
    if (this.state.isloading) {
      return <Splash />;
    } else {
      return (
        <AuthContext.Provider value={{login: this.login, logout: this.logout}}>
          <NavigationContainer>
            <Stack.Navigator>
              {/* <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} /> */}

              {!this.state.islogin ? (
                <>
                  <Stack.Screen
                    name="Skip"
                    component={Skip}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{headerShown: false}}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Home"
                    component={MyTabs}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="ShowAll"
                    component={ShowAll}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name="Products"
                    component={Products}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetails}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name="MyCart"
                    component={MyCart}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="MyOrders"
                    component={MyOrders}
                    options={{title: 'My Orders'}}
                  />

                  <Stack.Screen
                    name="OrderDetails"
                    component={OrderDetails}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name="AboutUs"
                    component={AboutUs}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicy}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="TermsAndConditions"
                    component={TermsAndConditions}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="Support"
                    component={Support}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name="Checkout"
                    component={Checkout}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="NewAddress"
                    component={NewAddress}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    options={{headerShown: false}}
                  />

                  <Stack.Screen
                    name="Wishlist"
                    component={Wishlist}
                    options={{headerShown: false}}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      );
    }
  }
}

export default App;
