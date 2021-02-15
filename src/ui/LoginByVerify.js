import React, {Component} from 'react';
import {
    Keyboard,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import BaseApp from './BaseApp'
import CountdownUtil from "../util/CountdownUtil";
import {isIphoneX, zAppBarHeight, zdp, zsp} from "../util/ScreenUtil";
import MyTextInputWithIcon from "./component/MyTextInputWithIcon";
import {cusColors} from "../util/cusColors";
import MyButtonView from "./component/MyButtonView";
import {checkMobile} from "../util/CheckUitls";
import ToastUtil from "../util/ToastUtil";
import ZText from "./component/ZText";
import PhoneAuthPresenter from '../presenter/PhoneAuthPresenter'
import BasePresenter from "../presenter/BasePresenter";
import TabHeader from "./component/TabHeader"

const {width, height} = Dimensions.get('window');

let mPresenter = null;

// import storage from '../../storage/Storage'
export default class LoginByVerify extends BaseApp {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);


        this.state = {
            phone: '',
            verifyCode: '',
            isSentVerify: true,
            timerTitle: '获取验证码',
            isSuccess: false
        };

        // this.props.initGlobalInfo({
        //         //     phone: '1326297',
        //         //     token: 'ajsda3812323qwsdq42'
        //         // })
    }

	getPresenter(): BasePresenter {
		mPresenter = PhoneAuthPresenter.getInstance(this);
		return mPresenter;
	}

    onDestroy() {
        super.onDestroy();
        CountdownUtil.stop();
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
            case mPresenter.ENUM.REGISTER:
            break;
        }
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
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
			default:
			break;
		}
	}

    sendSms() {
        if (this.state.phone.length === 11) {
            if (this.state.isSentVerify === true) {
                // 点击之后验证码不能发送网络请求
                this.setState({
                    isSentVerify: false,
                });
                mPresenter.sms({cellphone: this.state.phone})
            }
        }else{
            ToastUtil.showShort("请输入正确的手机号码");
        }
    }

    pressLogin = () => {

        if (!checkMobile(this.state.phone)) {
            return;
        }
    }

    render() {
        // this.removeData();

        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={require('../res/img/login_bg.png')}
                       resizeMode={'cover'}
                       style={{
                           width,
                           height,
                           position: 'absolute'
                       }}/>

                <TabHeader bgcolor="#1E82D2" text="验证码登录" back />

                <View
                    style={{flex: 1, alignItems: 'center'}}>

                    <Image
                           style={{
                               width: zdp(140),
                               height: zdp(100),
                               marginTop: zdp(100) - zAppBarHeight
                           }}
                           resizeMode={'contain'}/>

                    <MyTextInputWithIcon
                        style={{marginTop: zdp(100)}}
                        placeholder={'请输入手机号'}
                        iconName={'md-phone-portrait-outline'}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                            this.setState({
                                phone: text
                            })
                        }}/>

                    <View style={{
                        width: width / 1.3,
                        height: zdp(52),
                        marginTop: zdp(20),
                        borderWidth: 1,
                        borderRadius: zdp(5),
                        borderColor: '#AAAAAA',
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


                        <TouchableOpacity activeOpacity={this.state.isSentVerify ? 0.5 : 1} onPress={() => this.sendSms()}>
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
                    <MyButtonView
                        modal={1}
                        style={{width: width / 1.3, marginTop: zdp(30)}}
                        title={'登录'}
                        onPress={this.pressLogin}/>
                </View>
            </View>
        );
    }
}