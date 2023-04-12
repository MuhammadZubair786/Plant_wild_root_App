import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import OngoingOrders from './OngoingOrders';
import CompletedOrders from './CompletedOrders';


const Tabs = createMaterialTopTabNavigator();

class MyOrders extends Component{
  render(){
    return(
      <Tabs.Navigator  
      // initialRouteName={this.props.route.params.screen}
      tabBarPosition='top'  
      lazy="true"
      screenOptions={
        {
          tabBarIndicatorStyle:{
            borderBottomColor:'green',
            borderBottomWidth:0.5
          },
          tabBarLabelStyle:{
            fontSize:17
          }
        }
      }>
      <Tabs.Screen name="OngoingOrders" component={OngoingOrders} options={{title:"Ongoing"}}/>
      <Tabs.Screen name="CompletedOrders" component={CompletedOrders} options={{title:"History"}} />
      
    </Tabs.Navigator>
    
    )
  }
}
export default MyOrders
