import React from 'react';
import BaseApp from './BaseApp'
import TabHeader from '../ui/component/TabHeader'
import BasePresenter from "../presenter/BasePresenter"
import CardAddPresenter from "../presenter/CardAddPresenter"
import MyButtonView from "./component/MyButtonView"
import MyTextInputWithIcon from "./component/MyTextInputWithIcon"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"

import {
    isIphoneX,
    zAppBarHeight,
    zdp,
    zsp,
    zStatusBarHeight,
    zWidth
} from "../util/ScreenUtil";
import {StyleSheet, View, Platform, Keyboard, StatusBar, Dimensions} from 'react-native';

const { width, height } = Dimensions.get("window");

let mPresenter = null;

export default class CardAddScreen extends BaseApp{

	constructor(props) {
		super(props);
		this.state = {
			//animatedValue: new Animated.Value(0)
			bank: '',
			branch: '',
			account: '',
			cardNo: ''
		}
	}

	getPresenter(): BasePresenter {
		mPresenter = CardAddPresenter.getInstance(this);
		return mPresenter;
	}

	//请求失败并返回失败信息
	failed(result) {
		super.failed(result);
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
			case mPresenter.ENUM.ADD:
				//做数据渲染操作
				this.props.navigation.pop();
			break;
			default:
			break;
		}
	}

	_onSave(){
        Keyboard.dismiss();
		let card = {
			bank: this.state.bank,
			branch: this.state.branch,
			account: this.state.account,
			cardNo: this.state.cardNo
		}
		mPresenter.add(card)
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
                <TabHeader bgcolor="#1E82D2" text="添加银行卡" back />
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
                    placeholder={'请输入开户银行名称'}
                    onChangeText={text => {
                        this.setState({
                            bank: text
                        })
                    }}
                />

                <MyTextInputWithIcon
                    placeholder={'请输入开户支行'}
                    // keyboardType={'email-address'}
                    onChangeText={text => {
                        this.setState({
                            branch: text
                        })
                    }}
                />

                <MyTextInputWithIcon
                    placeholder={'请输入开户人姓名'}
                    // keyboardType={'email-address'}
                    onChangeText={text => {
                        this.setState({
                            account: text
                        })
                    }}
                />

                <MyTextInputWithIcon
                    placeholder={'请输入银行账号'}
                    keyboardType={'number-pad'}
                    onChangeText={text => {
                        this.setState({
                            cardNo: text
                        })
                    }}
                />

                <MyButtonView style={{width: width / 1.3, marginTop: zdp(75.5)}} modal={1}
                              title={'保 存'}
                              onPress={this._onSave.bind(this)}/>
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