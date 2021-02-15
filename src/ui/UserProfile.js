/**
 * @author lam
 */
'use strict';

import React from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native'
import BaseApp from './BaseApp'
import Item from './component/Item'
import TabHeader from './component/TabHeader'
import BasePresenter from "../presenter/BasePresenter";
import UserProfilePresenter from "../presenter/UserProfilePresenter";
import {NavigationEvents} from 'react-navigation';

let mPresenter = null;

const {width} = Dimensions.get('window');

export default class UserProfile extends BaseApp {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props)
        this.state = {
            member: {}
        }
    }

	getPresenter(): BasePresenter {
		mPresenter = UserProfilePresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
        this.setState({
            member: this.props.navigation.state.params.member
        })
	}

    targetFunction() {
		mPresenter.detail();
    }

	//请求失败并返回失败信息
	failed(result) {
		super.failed(result);
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
			case mPresenter.ENUM.DETAIL:
                //做数据渲染操作
                this.setState({
                    member: result
                });
                break;
			default:
			break;
		}
	}

    back() {
        this.props.navigation.pop();
    }

    goBind() {
        this.props.navigation.navigate('Cellphone', {
			member: this.state.member
		});
    }

    goNickname() {
        this.props.navigation.navigate('Nickname', {
			member: this.state.member
		});
    }

    goPassword() {
        this.props.navigation.navigate('Password', {
			member: this.state.member
		});
    }

    goPin() {
        this.props.navigation.navigate('Pin', {
			member: this.state.member
		});
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#F3F3F3"}}>
				<View>
					<TabHeader bgcolor="#1E82D2" text="基本信息" back />
				</View>
                <ScrollView>
                    <Item name="昵称" subName={this.state.member.nickname} onPress={this.goNickname.bind(this)}/>
                    <Text style={styles.title}>{"账号绑定"}</Text>
                    <Item name="手机" font="FontAwesome" icon="mobile" subName={this.state.member.cellphone} onPress={this.goBind.bind(this)}/>
                    <Text style={styles.title}>{"安全设置"}</Text>
                    <Item name="登录密码" subName="" onPress={this.goPassword.bind(this)}/>
                    <Item name="支付密码" subName="" onPress={this.goPin.bind(this)}/>
                </ScrollView>
                <NavigationEvents onDidFocus={() => this.targetFunction()}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: "#666666"
    },
});
