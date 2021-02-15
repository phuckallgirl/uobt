/**
 * @author lam
 * @date 2018/7/25 11:29
 */

import React, {Component} from 'react';
import {
    ScrollView,
    View,
    StyleSheet, Image
} from 'react-native';
import Moment from 'moment'
import BaseApp from './BaseApp';
import TabHeader from "./component/TabHeader";
import DetailItem from './component/DetailItem'
import SpacingView from './component/SpacingView'

export default class MemberDetailScreen extends BaseApp {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            member: {}
        }
    }

	onLoad() {
		super.onLoad();
		var member = this.props.navigation.state.params.member;
		this.setState({
			member
		})
	}

	//请求失败并返回失败信息
	failed(result) {
        super.failed(result);
	}

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#F3F3F3"}}>
                <View>
                    <TabHeader bgcolor="#1E82D2" text={this.state.member.nickname} back />
                </View>
                <ScrollView>
				<SpacingView/>
                <View style={Styles.avatarView} >
                    <Image style={{width: 120, height: 120, borderWidth: 1, borderColor: '#CCC', resizeMode: 'stretch'}} source={{uri: Const.HOST+this.state.member.avatar}}/>
                </View>
				<SpacingView/>
				<View style={{flex: 1}}>
                    <DetailItem name="昵称" value={this.state.member.nickname}/>
                    <DetailItem name="手机号码" value={this.state.member.cellphone}/>
                    <DetailItem name="收益率" value={this.state.member.rate}/>
                    <DetailItem name="状态" value={this.state.member.state}/>
                    <DetailItem name="注册时间" value={Moment(this.state.member.create_time).format('YYYY-MM-DD HH:mm:ss')}/>
                    <DetailItem name="上次登录" value={Moment(this.state.member.last_login_time).format('YYYY-MM-DD HH:mm:ss')}/>
                    <DetailItem name="上次匹配" value={this.state.member.last_pair_time?Moment(this.state.member.last_pair_time).format('YYYY-MM-DD HH:mm:ss'):'未完成'}/>
                    <DetailItem name="代理结构" value={this.state.member.hierarchy}/>
                </View>
                </ScrollView>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    avatarView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})