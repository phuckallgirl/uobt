/**
 * @author lam
 * @date 2018/7/25 11:29
 */

import React, {Component} from 'react';
import {
    ScrollView,
    View,
    ImageBackground,
    StyleSheet, Image
} from 'react-native';
import Moment from 'moment'
import BaseApp from './BaseApp';
import TabHeader from "./component/TabHeader";
import DetailItem from "./component/DetailItem"
import SpacingView from './component/SpacingView'

export default class OrderDetailScreen extends BaseApp {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            order: {}
        }
    }

	onLoad() {
		super.onLoad();
		var order = this.props.navigation.state.params.order;
		this.setState({
            order
		})
	}

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#F3F3F3"}}>
                <View>
                    <TabHeader bgcolor="#1E82D2" text={this.state.order.order_id} back />
                </View>
                <ScrollView>
				<SpacingView/>
				<View style={{flex: 1}}>
                    <DetailItem name="订单号" value={this.state.order.orderId}/>
                    <DetailItem name="开户银行" value={this.state.order.bank}/>
                    <DetailItem name="开户支行" value={this.state.order.branch}/>
                    <DetailItem name="户名" value={this.state.order.account}/>
                    <DetailItem name="银行卡号" value={this.state.order.cardNo}/>
                    <DetailItem name="金额" value={'￥'+this.state.order.amount}/>
                </View>
                <View style={{flex: 1}}>
					<ImageBackground style={{flex: 1, justifyContent: 'flex-end'}} resizeMode='contain' source={this.state.order.state=='accept' ? require("../res/img/accept.png"): require("../res/img/finished.png")}>
                    <DetailItem name="创建时间" value={Moment(this.state.order.createTime).format('YYYY-MM-DD HH:mm:ss')}/>
                    <DetailItem name="接单时间" value={Moment(this.state.order.acceptTime).format('YYYY-MM-DD HH:mm:ss')}/>
                    <DetailItem name="完成时间" value={this.state.order.uploadTime?Moment(this.state.order.uploadTime).format('YYYY-MM-DD HH:mm:ss'):'未完成'}/>
                    </ImageBackground>
                </View>
				<SpacingView/>
                <View style={Styles.evidenceView} >
                    <Image style={{width: 200, height: 200, borderWidth: 1, borderColor: '#CCC', resizeMode: 'stretch'}} source={{uri: Const.HOST+this.state.order.evidence}}/>
                </View>
                </ScrollView>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    evidenceView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})