import React from 'react'
import BaseApp from './BaseApp'
import SpacingView from '../ui/component/SpacingView'
import TabHeader from '../ui/component/TabHeader'
import BasePresenter from "../presenter/BasePresenter"
import MessagePresenter from "../presenter/MessagePresenter"
import WebView from "react-native-webview"
import {StyleSheet, View, Dimensions} from 'react-native';

const { width } = Dimensions.get("window");

let mPresenter = null;

export default class MsgDetailScreen extends BaseApp{

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: ''
		}
	}

	getPresenter(): BasePresenter {
		mPresenter = MessagePresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
		var args = this.props.navigation.state.params.args;
		this.setState({
			title: args.title
		})
		mPresenter.detail({msgId: args.msg_id});
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
					content: result.content
				})
			break;
			default:
			break;
		}
	}

	render(){
		return(
			<View style={Styles.container}>
				<View>
					<TabHeader bgcolor="#1E82D2" text={this.state.title} back />
				</View>
				<SpacingView/>
				<View style={{flex: 1}}>
					<WebView source={{html: this.state.content}}/>
				</View>
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})