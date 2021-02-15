/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import BaseApp from './BaseApp';
import BasePresenter from "../presenter/BasePresenter";
import SplashPresenter from "../presenter/SplashPresenter";
import Storage from '../util/storage'

let {width, height} = Dimensions.get("window");

let mPresenter = null;

export default class SplashScreen extends BaseApp {

    constructor(props) {
        super(props);
        this.state = {
            animating: true,//默认显示加载动画
        };
    }

	getPresenter(): BasePresenter {
		mPresenter = SplashPresenter.getInstance(this);
		return mPresenter;
	}

    async onLoad(){
        super.onLoad();
        let token = await Storage.get('token');
        // 倒计时3秒后进入首页
        if(token){
            //this.props.navigation.replace('TabBar')
            mPresenter.check({token})
        }else{
            setTimeout(() => {
                this.props.navigation.replace('Login')
            }, 3000);
        }
    }

	//请求失败并返回失败信息
	failed(result) {
        super.failed(result);
        switch(result.tag){
            case mPresenter.ENUM.CHECK:
                Storage.del('token');
                this.props.navigation.replace('Login')
                break;
        }
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
            case mPresenter.ENUM.CHECK:
                this.props.navigation.replace('TabBar')
                break;
			case mPresenter.ENUM.LOGIN:
                //做数据渲染操作
                Storage.set('token', result.token)
                Storage.set('uid', result.uid+'')
                this.props.navigation.replace('TabBar')
			    break;
			default:
			    break;
		}
	}

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Image style={styles.splash} source={require('../res/img/splash.png')} resizeMode={'cover'}/>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, {height: 70}]}
                    size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    splash: {
        width: width,
        height: height,
    },
    centering: {
        flex: 1,
        marginTop:-height,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },

});