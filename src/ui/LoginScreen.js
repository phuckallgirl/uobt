import React, {Component} from 'react';
import LoginView from './LoginView';
import {BackHandler, ToastAndroid} from "react-native";

export default class LoginScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    };
    render() {
        return (
            <LoginView navigation={this.props.navigation}/>
        );
    }
}
