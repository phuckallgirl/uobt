import React from 'react';
import BaseApp from './BaseApp'
import TabHeader from '../ui/component/TabHeader'
import BasePresenter from "../presenter/BasePresenter";
import PasswordPresenter from "../presenter/PasswordPresenter";
import MyButtonView from "./component/MyButtonView";
import MyTextInputWithIcon from "./component/MyTextInputWithIcon";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import {
    zdp,
    zsp,
    zStatusBarHeight,
    zWidth
} from "../util/ScreenUtil";
import {StyleSheet, View, Platform, Keyboard, StatusBar, Dimensions} from 'react-native';

const { width, height } = Dimensions.get("window");

let mPresenter = null;

export default class PasswordScreen extends BaseApp{

	constructor(props) {
		super(props);
		this.state = {
			member: {},
			old: '',
			passcode: '',
			passcode2: ''
		}
	}

	getPresenter(): BasePresenter {
		mPresenter = PasswordPresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
        this.setState({
            member: this.props.navigation.state.params.member
        })
	}

	//请求失败并返回失败信息
	failed(result) {
		super.failed(result);
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
			case mPresenter.ENUM.PASSWORD:
				//做数据渲染操作
				this.props.navigation.pop();
			break;
			default:
			break;
		}
	}

	_onSubmit(){
        Keyboard.dismiss();
		let pwd = {
			old: this.state.old,
			passcode: this.state.passcode,
			passcode2: this.state.passcode2
		}
		mPresenter.password(pwd)
	}

	render(){
		return(
			<KeyboardAwareScrollView style={{flex: 1, width: zWidth, backgroundColor: 'white'}}
                behavior="padding"
                resetScrollToCoords={{x: 0, y: 0}}
                contentContainerStyle={{
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}>
                <TabHeader bgcolor="#1E82D2" text="重置密码" back />
                <View style={{
                    flex: 1,
                    marginTop: Platform.OS === 'ios' ? -zStatusBarHeight : 0,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    </View>
                    <View
                        style={{flex: 1, alignItems: 'center'}}>

                        <StatusBar
                            hidden={false}
                            translucent={true}
                            barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                            backgroundColor={'#fff6fd00'}
                            networkActivityIndicatorVisible={false}
                        />
                    </View>
                </View>
                <MyTextInputWithIcon
                    style={{marginTop: zdp(60)}}
                    placeholder={'请输入原密码'}
                    onChangeText={text => {
                        this.setState({
                            old: text
                        })
                    }}
                />

                <MyTextInputWithIcon
                    placeholder={'请输入新密码'}
                    // keyboardType={'email-address'}
                    onChangeText={text => {
                        this.setState({
                            passcode: text
                        })
                    }}
                />

                <MyTextInputWithIcon
                    placeholder={'请再次输入新密码'}
                    // keyboardType={'email-address'}
                    onChangeText={text => {
                        this.setState({
                            passcode2: text
                        })
                    }}
                />

                <MyButtonView style={{width: width / 1.3, marginTop: zdp(75.5)}} modal={1}
                              title={'确认修改'}
                              onPress={this._onSubmit.bind(this)}/>
            </KeyboardAwareScrollView>
		);
	}
}

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	input: {
		height: 60,
		margin: 10
	}
})