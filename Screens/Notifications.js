import React, { Component } from 'react';
import {
    Text, View, ScrollView, ActivityIndicator,
    StyleSheet, Image, Dimensions,
    TouchableOpacity, ImageBackground, Pressable
} from 'react-native';
import {
    Input, Icon, Button, SearchBar, Rating
} from 'react-native-elements';


//Global StyleSheet Import
const styles = require('../Components/Style.js');

class Notifications extends Component {

  constructor(props){
    super(props);
    this.state={
      isLoading:false,
      data:[]
    }
}

  notificationCard=({item})=>(
    <View style={{flexDirection: 'row', width: '100%', padding: 10}}>
            {/* For profile Image/ user image */}
            <View style={{width: '15%'}}>
              <Image
                source={require('../images/plant.jpg')}
                style={style.Image}
              />
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '85%',
              }}>
              {/* View for Notification Text content and time */}
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 15,
                    marginTop: 10,
                  }}>
                  <Text
                    style={[
                      styles.h4,
                      { fontSize: 13},
                    ]}>
                    CabieQ
                    <Text
                      style={styles.h3}>
                      {' '}
                      added a new photo.
                    </Text>
                  </Text>
                  <Text style={[styles.h6, {color: 'grey'}]}>50 mins ago</Text>
                </View>
              </TouchableOpacity>
              {/* View for ellipsis icon */}
              {/* <View >
    <Text style={{marginTop:15,marginRight:10}}
    onPress={() => this.RBSheet.open()}>
        <Icon type="ionicon" name="ellipsis-horizontal" size={20}/>
    </Text>
</View> */}
            </View>


            
          </View>
  );

    render() {
        return (
            <View style={styles.container}>
             
                 {/* header */}
                    {/* Header */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }} >
                        <Icon name="arrow-back-outline" onPress={() => this.props.navigation.goBack()} type="ionicon" />
                        <Text style={[styles.headerText, { fontSize: 20 }]}>
                            Notifications
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        </View>
                    </View>
                <ScrollView>
                        {/* notifications */}
              <View>
                {this.state.data!=""?
                  <View style={{alignItems:"center",paddingTop:150}}>
                    <Image
                        source={require('../images/plant.jpg')}
                        style={{width: 100, height: 100}}
                      />
                  <Text style={[styles.h3,{marginTop:20,fontSize:RFValue(12,580)}]}>
                      No Notifications Found!
                  </Text>
              </View>
              :  
              
                // <FlatList
                //     navigation={this.props.navigation}
                //     showsVerticalScrollIndicator={false}
                //     data={this.state.data}
                //     renderItem={this.notificationCard}
                //     keyExtractor={item => item.id} 
                //   />
              <Notify />
              }
            </View>
                </ScrollView>
            </View>
        )
    }
}
export default Notifications;

class Notify extends Component {
  render() {
    return (
   
        <View >
        <View style={{flexDirection: 'row', width: '100%', padding: 10,alignItems:"center"}}>
          {/* For profile Image/ user image */}
          <View style={{width: '15%'}}>
            <Image
              source={require('../images/plant.jpg')}
              style={style.Image}
            />
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '85%',
            }}>
            {/* View for Notification Text content and time */}
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 15,
                  marginTop: 10,
                }}>
                <Text
                  style={[
                    styles.h4,
                    {fontSize: 12}]}>
                    You order is placed successfully. Go and track your order.
                  
                </Text>
                <Text style={[styles.h6, {color: 'grey'}]}>50 mins ago</Text>
              </View>
            </TouchableOpacity>
            {/* View for ellipsis icon */}
            {/* <View >
                        <Text style={{marginTop:15,marginRight:10}}
                        onPress={() => this.RBSheet.open()}>
                            <Icon type="ionicon" name="ellipsis-horizontal" size={20}/>
                        </Text>
                    </View> */}
          </View>

          
        </View>
        <View style={{flexDirection: 'row', width: '100%', padding: 10,alignItems:"center"}}>
          {/* For profile Image/ user image */}
          <View style={{width: '15%'}}>
            <Image
              source={require('../images/plant.jpg')}
              style={style.Image}
            />
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '85%',
            }}>
            {/* View for Notification Text content and time */}
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 15,
                  marginTop: 10,
                }}>
                <Text
                  style={[
                    styles.h4,
                    {fontSize: 12}]}>
                    You order is placed successfully. Go and track your order.
                  
                </Text>
                <Text style={[styles.h6, {color: 'grey'}]}>50 mins ago</Text>
              </View>
            </TouchableOpacity>
            {/* View for ellipsis icon */}
            {/* <View >
                        <Text style={{marginTop:15,marginRight:10}}
                        onPress={() => this.RBSheet.open()}>
                            <Icon type="ionicon" name="ellipsis-horizontal" size={20}/>
                        </Text>
                    </View> */}
          </View>

          
        </View>

        <View style={{flexDirection: 'row', width: '100%', padding: 10,alignItems:"center"}}>
          {/* For profile Image/ user image */}
          <View style={{width: '15%'}}>
            <Image
              source={require('../images/plant.jpg')}
              style={style.Image}
            />
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '85%',
            }}>
            {/* View for Notification Text content and time */}
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 15,
                  marginTop: 10,
                }}>
                <Text
                  style={[
                    styles.h4,
                    {fontSize: 12}]}>
                    You order is placed successfully. Go and track your order.
                  
                </Text>
                <Text style={[styles.h6, {color: 'grey'}]}>50 mins ago</Text>
              </View>
            </TouchableOpacity>
            {/* View for ellipsis icon */}
            {/* <View >
                        <Text style={{marginTop:15,marginRight:10}}
                        onPress={() => this.RBSheet.open()}>
                            <Icon type="ionicon" name="ellipsis-horizontal" size={20}/>
                        </Text>
                    </View> */}
          </View>

          
        </View>
      </View>
    );
  }
}


const style = StyleSheet.create({
    button: {
        width: "95%",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F4EBE3",
        alignSelf: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    iconView: {
        backgroundColor: "#d0d0d0",
        marginTop: 10,
        padding: 10,
        width: 40,
        height: 40,
        borderRadius: 100
    },
    Image: {
      height: 60,
      width: 60,
      borderRadius: 100,
      borderColor: 'grey',
      borderWidth: 0.2,
      marginTop:5
    },
})
