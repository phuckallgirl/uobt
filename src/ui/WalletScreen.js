import React from 'react';
import {
    Keyboard,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import BaseApp from './BaseApp'
import CountdownUtil from "../util/CountdownUtil";
import {isIphoneX, zdp, zsp} from "../util/ScreenUtil";
import MyTextInputWithIcon from "./component/MyTextInputWithIcon";
import ZText from "./component/ZText";
import ToastUtil from '../util/ToastUtil'
import MyButtonView from "./component/MyButtonView";
import {CheckBox} from "react-native-elements";
import {cusColors} from "../util/cusColors";
import TabHeader from "./component/TabHeader"
import BasePresenter from "../presenter/BasePresenter";
import WalletPresenter from "../presenter/WalletPresenter";

const {width, height} = Dimensions.get('window');

let mPresenter = null;

export default class WalletScreen extends BaseApp {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);

        this.state = {
            member: {},
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '获取验证码',
            checked: true
        }
    }

	getPresenter(): BasePresenter {
		mPresenter = WalletPresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
        this.setState({
            member: this.props.navigation.state.params.member
        })
    }
    
    onDestroy() {
        super.onDestroy();
        CountdownUtil.stop();
    }

    onChangeWallet = () => {
        Keyboard.dismiss();

        if(!this.state.checked){
            ToastUtil.showShort("绑定钱包须得同意协议");
            return;
        }

        var param = {
            wallet: this.state.wallet,
            sms: this.state.verifyCode
        }
        mPresenter.wallet(param);
    }

    sendSms() {
        if (this.state.isSentVerify === true) {
            // 点击之后验证码不能发送网络请求
            this.setState({
                isSentVerify: false,
            });
            mPresenter.sms({cellphone: this.state.member.cellphone})
        }
    }
    
	//请求失败并返回失败信息
	failed(result) {
        super.failed(result);
        switch(result.tag){
            case mPresenter.ENUM.SMS:
            this.setState({
                isSentVerify: true,
                timerTitle: '重新获取'
            });
            break;
            case mPresenter.ENUM.WALLET:
                ToastUtil.showShort("绑定失败，请重试")
            break;
        }
	}

    //请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
            case mPresenter.ENUM.WALLET:
                alert("绑定成功")
            break;
            case mPresenter.ENUM.SMS:
                // 倒计时时间
                let countdownDate = new Date(new Date().getTime() + 60 * 1000);
                CountdownUtil.setTimer(countdownDate, (time) => {
                    this.setState({
                        timerTitle: time.sec > 0 ? `重新获取(${time.sec}s)` : '重新获取'
                    }, () => {
                        if (this.state.timerTitle === '重新获取') {
                            this.setState({
                                isSentVerify: true
                            })
                        }
                    })
                });
            break;
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <TabHeader bgcolor="#1E82D2" text="钱包绑定" back />
                <MyTextInputWithIcon
                    style={{
                        marginTop: zdp(60)
                    }}
                    defaultValue={this.state.member.wallet}
                    placeholder={'请输入钱包密钥'}
                    onChangeText={(text) => {
                        this.setState({
                            wallet: text
                        })
                    }}
                />
                <View style={{
                    width: width / 1.3,
                    height: zdp(50),
                    marginTop: zdp(20),
                    borderWidth: 1,
                    borderRadius: zdp(5),
                    borderColor: 'white',
                    backgroundColor: cusColors.inputBackgroundColor,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <MyTextInputWithIcon
                        style={{flex: 1, height: zdp(50), borderWidth: 0, marginTop: 0}}
                        placeholder={'请输入验证码'}
                        keyboardType={'numeric'}
                        maxLength={6}
                        onChangeText={(text) => {
                            this.setState({
                                verifyCode: text
                            })
                        }} iconName={'md-mail-outline'}/>


                    <TouchableOpacity activeOpacity={this.state.isSentVerify ? 0.5 : 1}
                                      onPress={() => this.sendSms()}>
                        <View style={{
                            height: zdp(50),
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingRight: zdp(20),
                        }}>
                            <ZText content={this.state.timerTitle}
                                   color={this.state.isSentVerify ? cusColors.verify_light : this.state.timerTitle.indexOf('s') > -1 ? cusColors.verify_dark : cusColors.verify_light}
                                   fontSize={zsp(16)}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <CheckBox title="我同意此APP与UOBT官方同步数据"
                    checkedIcon='check-square'
                    uncheckedIcon='square'
                    textStyle={{color: '#666666'}}
                    checked={this.state.checked}
                    onPress={() => {this.setState({checked: !this.state.checked})}}/>
                <MyButtonView modal={1} style={{width: width / 1.3, marginTop: zdp(30)}}
                              title={'确定'}
                              onPress={this.onChangeWallet}/>
            </View>
        )
    }
}


