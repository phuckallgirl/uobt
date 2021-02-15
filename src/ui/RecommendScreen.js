import React, {Component} from 'react';
import BaseApp from './BaseApp'
import TabHeader from './component/TabHeader'
import {View, ImageBackground} from "react-native";

export default class RecommendScreen extends BaseApp {

    constructor(props) {
        super(props)
        this.state = {
            member: {}
        }
    }

	onLoad() {
		super.onLoad();
        this.setState({
            member: this.props.navigation.state.params.member
        })
	}
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#F3F3F3"}}>
                <View>
                    <TabHeader bgcolor="#1E82D2" text="推荐好友" back />
                </View>
                <View style={{flex: 1}}>
                    <ImageBackground style={{flex: 1}} resizeMode='cover' source={require('../res/img/recommend.png')}/>
                </View>
            </View>
        );
    }
}
