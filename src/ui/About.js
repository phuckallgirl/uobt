import React from 'react';
import BaseApp from './BaseApp'
import TabHeader from '../ui/component/TabHeader'
import BasePresenter from "../presenter/BasePresenter";
import MemberPresenter from "../presenter/MemberPresenter";

import {StyleSheet, View, Dimensions} from 'react-native';

const { width } = Dimensions.get("window");

let mPresenter = null;

export default class AboutScreen extends BaseApp{

	constructor(props) {
		super(props);
		this.state = {
			//animatedValue: new Animated.Value(0)
		}
	}

	getPresenter(): BasePresenter {
		mPresenter = MemberPresenter.getInstance(this);
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
			case 1:
				//做数据渲染操作
			break;
			default:
			break;
		}
	}

	render(){
		return(
			<View style={Styles.container}>
				<View>
					<TabHeader bgcolor="#1E82D2" text="关于" back />
				</View>
				<View>
                </View>
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	container: {
		flex: 1
	}
})