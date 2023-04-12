import React, { Component } from 'react';
import {
    View, ImageBackground,
    StyleSheet, ActivityIndicator, FlatList, TouchableOpacity,
    Image, Text, Dimensions, ToastAndroid, Pressable, ScrollView,
} from 'react-native';
import { Icon } from "react-native-elements";

//Global Style Import
const styles = require('../Components/Style.js');

class TermsAndConditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            isLoading: true
        }
    }
    componentDidMount() {
        this.fetch_data();
    }
    fetch_data = () => {
        var form = new FormData();
        form.append("module", "staticpage");
        form.append("page_name", "Terms and Conditions Mobile App");
        // form.append("password", this.state.password);
        // console.warn(form)
        fetch(global.api, {
            method: 'POST',
            body: form,
        }).then((response) => response.json())
            .then((json) => {
                console.warn(json)
                this.setState({ data: json[0].post_content })
                return json;
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                this.setState({ isLoading: false })
            });
    }
    render() {
        return (
            <View style={styles.container}>
                {/* Header */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }} >
                        <Icon name="arrow-back-outline" onPress={() => this.props.navigation.goBack()} type="ionicon" />
                        <Text style={[styles.headerText, { fontSize: 20 }]}>
                            Terms and Conditions
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                        </View>
                    </View>
                    <ScrollView>
                    {this.state.isLoading ?
                        <View style={{flex:1,justifyContent:"center",marginTop:200}}>
                            <ActivityIndicator size="large" color="#637752" />
                        </View>
                        :
                        <Text style={[styles.h3, { lineHeight: 25, marginHorizontal: 10, textAlign: "justify" }]}>{this.state.data}
                        </Text>
                    }
                </ScrollView>
            </View>
        )
    }
}
export default TermsAndConditions