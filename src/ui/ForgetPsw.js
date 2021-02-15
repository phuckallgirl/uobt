/**
 * Created by lam Date: 2018/8/11 Time: 下午2:14
 */
import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {
    isIphoneX,
    zAppBarHeight,
    zdp,
    zsp,
} from "../util/ScreenUtil";

import BaseApp from './BaseApp'
import CountdownUtil from "../util/CountdownUtil";
import MyTextInputWithIcon from "./component/MyTextInputWithIcon";
import {cusColors} from "../util/cusColors";
import ZText from "./component/ZText";
import MyButtonView from "./component/MyButtonView";
import BasePresenter from "../presenter/BasePresenter";
import ForgetPresenter from "../presenter/ForgetPresenter";
import {checkMobile} from "../util/CheckUitls";
import ToastUtil from "../util/ToastUtil";
import TabHeader from "./component/TabHeader"

const {width, height} = Dimensions.get('window');

let mPresenter = null

export default class ForgetPsw extends BaseApp {

    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            verifyCode: '',
            passwordNew: '',
            passwordSure: '',
            isSentVerify: true,
            timerTitle: '获取验证码',
        }
    }

	getPresenter(): BasePresenter {
		mPresenter = ForgetPresenter.getInstance(this);
		return mPresenter;
	}

    onDestroy() {
        super.onDestroy();
        CountdownUtil.stop();
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

    /**
     * 确认修改
     */
    pressSureChange = () => {

        if (!checkMobile(this.state.phone)) {
            return;
        }

        let param = {
            cellphone: this.state.phone,
            passcode: this.state.passwordNew,
            code: this.state.verifyCode
        }
        mPresenter.forget(param);
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
            case mPresenter.ENUM.FORGET:
                CountdownUtil.stop();
                this.props.navigation.navigate('RegisterSuccess', {type: 0});
            break;
        }
    }


    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>
                <KeyboardAwareScrollView
                    style={{flex: 1, backgroundColor: 'transparent'}}
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps={'always'}
                >
                    <Image source={require('../res/img/login_bg.png')}
                           resizeMode={'cover'}
                           style={{
                               width,
                               height: height,
                               position: 'absolute',
                           }}/>

                    <TabHeader bgcolor="#1E82D2" text="忘记密码" back />
                    <Image
                           style={{
                               width: zdp(140),
                               height: zdp(80),
                               marginTop: zAppBarHeight
                           }}
                           resizeMode={'contain'}/>

                    <MyTextInputWithIcon
                        style={{marginTop: zdp(100)}}

                        placeholder={'请输入手机号'}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                            this.setState({
                                phone: text
                            })
                        }} iconName={'md-phone-portrait-outline'}/>


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


                    <MyTextInputWithIcon
                        placeholder={'请输入新密码'}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                passwordNew: text
                            })
                        }} iconName={'ios-lock-closed-outline'}/>

                    <MyTextInputWithIcon
                        placeholder={'确认密码'}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                passwordSure: text
                            })
                        }} iconName={'ios-lock-closed-outline'}/>


                    <View style={{
                        flex: 1,
                        width: width,
                        height: zdp(138.5),
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <MyButtonView
                            modal={1}
                            style={{width: width / 1.3, marginTop: zdp(30)}}
                            title={'确认修改'}
                            onPress={this.pressSureChange}/>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}