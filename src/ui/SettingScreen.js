/**
 * @author lam
 * @date 2018/7/25 11:29
 */

import React from 'react';
import {
    ScrollView,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import TabHeader from "./component/TabHeader";
import LogoutPresenter from '../presenter/LogoutPresenter'
import Item from "./component/Item";
import Storage from "../util/storage"
import BaseApp from './BaseApp';
import {closePush} from '../net/WebSocketUtil'

const {width} = Dimensions.get('window');

let mPresenter = null;

export default class SettingScreen extends BaseApp {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props)
    }

	getPresenter(): BasePresenter {
		mPresenter = LogoutPresenter.getInstance(this);
		return mPresenter;
	}

    goProfile() {
        this.props.navigation.navigate("UserProfile");
    }

    back() {
        this.props.navigation.goBack();
    }

    logout() {
        mPresenter.logout();
    }

	//请求失败并返回失败信息
	failed(result) {
        super.failed(result);
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
			case mPresenter.ENUM.LOGOUT:
                //做数据渲染操作
                closePush();
                Storage.del("token");
                this.props.navigation.replace('Login');
			break;
			default:
			break;
		}
	}

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#F3F3F3"}}>
                <View>
                    <TabHeader bgcolor="#1E82D2" text="设置" back />
                </View>
                <ScrollView>
                    <Item name="账户安全" first={true} onPress={this.goProfile.bind(this)}/>
                    <Item name="通用"/>
                    <Item name="关于顺达" first={true}/>
                    <Item.Button name="退出登录" first={true} onPress={this.logout.bind(this)}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});