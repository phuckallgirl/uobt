import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Dimensions,
    StatusBar,
    Image,
    Platform,
    Keyboard,
} from 'react-native';
import BaseApp from './BaseApp'
import {checkIsNull} from "../util/CheckUitls";
import SignUtils from "../util/SignUtils"
import TabHeader from "./component/TabHeader"
import BasePresenter from "../presenter/BasePresenter";
import AuthPresenter from "../presenter/AuthPresenter";
import MyTextInputWithIcon from "./component/MyTextInputWithIcon";
import {
    isIphoneX,
    zAppBarHeight,
    zdp,
    zsp,
    zStatusBarHeight,
    zWidth
} from "../util/ScreenUtil";
import {cusColors} from "../util/cusColors";
import ZText from "./component/ZText";
import Storage from '../util/storage'
import MyButtonView from "./component/MyButtonView";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const {width, height} = Dimensions.get('window');

let mPresenter = null;

export default class LoginView extends BaseApp {

    constructor(props) {
        super(props);

        this.state = {
            uname: '',
            passcode: ''
        };
        this._onPress = this._onPress.bind(this);
    }

    static defaultProps = {
        onPress: null
    };

	getPresenter(): BasePresenter {
		mPresenter = AuthPresenter.getInstance(this);
		return mPresenter;
	}

    _onPress() {
        Keyboard.dismiss();

        if (!checkIsNull('用户名', this.state.uname)) {
            return;
        }

        if (!checkIsNull('密码', this.state.passcode)) {
            return;
        }

        let params = {//请求参数
            uname: this.state.uname,
            passcode: SignUtils.md5(this.state.passcode)
        };

        mPresenter.login(params);
        //this.refs.loading.show()
/*
        let formData = new FormData();
        formData.append('phone', this.state.phone);
        formData.append('password', this.state.password);
        fetchRequest('Login', 'POST', formData)
            .then(res => {
                    console.log(res);
                    console.log(res.data);

                    if (res.respCode === 200 && !this.state.isLoading) {
                        console.log(res.data);

                        this.props.navigate('Home');
                    } else {
                        ToastUtil.showShort(res.respMsg);
                    }
                }
            ).catch(err => {
            console.log(err);
            ToastUtil.showShort(err);
        });
*/
    }

	//请求失败并返回失败信息
	failed(result) {
        super.failed(result);
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
			case mPresenter.ENUM.LOGIN:
                //做数据渲染操作
                Storage.set('token', result.token)
                Storage.set('uid', result.uid+'')
                this.props.navigation.replace('TabBar')
			break;
			default:
			break;
		}
	}

    render() {
        return (
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
                <View style={{
                    flex: 1,
                    marginTop: Platform.OS === 'ios' ? -zStatusBarHeight : 0,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Image source={require('../res/img/login_bg.png')}
                           resizeMode={'cover'}
                           style={{
                               width: width,
                               height: height,
                               position: 'absolute'
                           }}/>
                    <TabHeader bgcolor="#1E82D2" text="用户登录" />
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

                        <Image
                               style={{
                                width: zdp(140),
                                height: zdp(100),
                                marginTop: zdp(100) - zAppBarHeight
                               }}
                               resizeMode={'contain'}/>
                    </View>
                </View>
                <MyTextInputWithIcon
                    style={{marginTop: zdp(120)}}
                    maxLength={20}
                    placeholder={'请输入用户名'}
                    iconName={'person-circle-outline'}
                    defaultValue={this.state.uname}
                    onChangeText={text => {
                        this.setState({
                            uname: text
                        })
                    }}
                />

                <MyTextInputWithIcon
                    secureTextEntry={true}
                    placeholder={'密码登录'}
                    defaultValue={this.state.passcode}
                    // keyboardType={'email-address'}
                    iconName={'ios-lock-closed-outline'}
                    onChangeText={text => {
                        this.setState({
                            passcode: text
                        })
                    }}
                />

                <MyButtonView style={{width: width / 1.3, marginTop: zdp(50.5)}} modal={1}
                              title={'登 录'}
                              onPress={this._onPress}/>
                <View style={styles.wtf}>
                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          justifyContent: 'center', alignItems: 'center',
                                          padding: zdp(5)
                                      }}
                                      onPress={
                                          this.pressLoginByVerify
                                      }>
                        <ZText parentStyle={{marginLeft: zdp(40)}} content={'验证码登录'}
                               fontSize={zsp(16)} color={cusColors.text_secondary}
                               textAlign={'center'}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          justifyContent: 'center', alignItems: 'center',
                                          padding: zdp(5)
                                      }}
                                      onPress={
                                          this.pressForgetPsw
                                      }>
                        <ZText parentStyle={{marginRight: zdp(40)}} content={'忘记密码?'}
                               fontSize={zsp(16)} color={cusColors.text_secondary}
                               textAlign={'center'}/>
                    </TouchableOpacity>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: zdp(5),
                    marginTop: zdp(40)
                }}>
                    <ZText content={'没有账号?'} fontSize={zsp(16)}
                           color={cusColors.text_secondary}/>
                    <MyButtonView style={{width: zdp(80), height: zdp(30), marginTop: zdp(0)}}
                                  modal={1}
                                  title={'注册账号'}
                                  fontSize={zsp(16)}
                                  onPress={this.pressRegister.bind(this)}/>
                </View>
            </KeyboardAwareScrollView>

        );
    }

    pressLoginByVerify = () => {
        this.props.navigation.navigate('VerifyLogin')
    };
    pressForgetPsw = () => {
        this.props.navigation.navigate('PwdForget')
    };
    pressRegister = () => {
        this.props.navigation.navigate('RegisterStepOne')
    }
}

const styles = StyleSheet.create({
    wtf: {
        marginTop: zdp(15),
        top: zdp(5),
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

