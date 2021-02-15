/**
 * @author lam
 */
'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import BaseApp from './BaseApp'
import px2dp from '../util/px2dp';
import TabHeader from './component/TabHeader'
import DetailItem from './component/DetailItem'
import SpacingView from './component/SpacingView'
import MyButtonView from "./component/MyButtonView";
import BasePresenter from "../presenter/BasePresenter";
import TradingPresenter from "../presenter/TradingPresenter";
import {launchImageLibrary} from "react-native-image-picker";

let mPresenter = null;

const {width} = Dimensions.get('window');

export default class TradingScreen extends BaseApp {

    constructor(props) {
        super(props)
        this.state = {
            order: this.props.navigation.state.params.order,
            evidence: null,
            evidenceUrl: ''
        }
        //let {order} = this.props.navigation.state.params;
    }

	getPresenter(): BasePresenter {
		mPresenter = TradingPresenter.getInstance(this);
		return mPresenter;
	}
	
    onBackPress = () => {
        //this.props.navigation.goBack();
        return true;
    };

	//请求失败并返回失败信息
	failed(result) {
		super.failed(result);
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
			case mPresenter.ENUM.DETAIL:
			break;
			case mPresenter.ENUM.CONFIRM:
                this.props.navigation.pop();
			break;
			default:
			break;
		}
	}

    back() {
        this.props.navigation.pop();
    }

    confirm() {
        mPresenter.confirm({orderId: this.state.order.orderId, evidence: this.state.evidenceUrl});
    }

    evidenceUpload() {
        const options = {
            title: "选择图片",
            cancelButtonTitle: "取消",
            chooseFromLibraryButtonTitle: "从相册中选择",
            takePhotoButtonTitle: "拍照",
            quality: 1.0,
            maxWidth: 200,
            maxHeight: 200,
            storageOptions: {
                skipBackup: true
            }
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };


                let formData = new FormData();
                let file = {uri: response.uri, type: 'multipart/form-data', name: ''}

                formData.append("images", file);

                fetch('https://m.hepay.me/order/upload',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                }).then((response) => response.text())
                .then((responseData) => {
                    console.log('responseData', responseData)
                    this.setState({
                        evidence: source,
                        evidenceUrl: responseData.url
                    })
                }).catch((error)=>{
                    console.error('error', error);
                })
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#F3F3F3"}}>
				<View>
					<TabHeader bgcolor="#1E82D2" text="完成订单" back />
				</View>
                <SpacingView/>
                <ScrollView>
                <View>
                    <DetailItem name="订单号" value={this.state.order.orderId}/>
                    <DetailItem name="开户银行" value={this.state.order.bank}/>
                    <DetailItem name="开户支行" value={this.state.order.branch}/>
                    <DetailItem name="户名" value={this.state.order.account}/>
                    <DetailItem name="银行卡号" value={this.state.order.cardNo}/>
                    <DetailItem name="金额" value={'￥'+this.state.order.amount}/>
                </View>
                <SpacingView/>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={this.evidenceUpload.bind(this)}>
                        <Image style={Styles.evidence} resizeMode='stretch' source={this.state.evidence?this.state.evidence:require('../res/img/no_pic.png')}/>
                    </TouchableOpacity>
                    <MyButtonView style={{width: width / 1.3, marginTop: px2dp(75.5)}} modal={1}
                              title={'操作完成'}
                              onPress={this.confirm.bind(this)}/>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const Styles = StyleSheet.create({
    evidence: {
        width: 200,
        height: 200
    },
});