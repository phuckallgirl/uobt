import React, {Component} from 'react';
import {
    Platform,
    View,
    Image,
    Dimensions,
    SafeAreaView
} from 'react-native';
import BaseApp from './BaseApp';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {isIphoneX, zAppBarHeight, zdp, zStatusBarHeight} from "../util/ScreenUtil";
import MyTextInputWithIcon from "./component/MyTextInputWithIcon";
import MyButtonView from "./component/MyButtonView";
import ToastUtil from "../util/ToastUtil";
import TabHeader from '../ui/component/TabHeader'

const {width, height} = Dimensions.get('window');

export default class RegisterStepOne extends BaseApp {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordSure: '',
            recommend: ''
        }
    }

    pressNext = () => {
        if (this.state.password.length >= 6) {

            if (this.state.password === this.state.passwordSure) {
                this.props.navigation.navigate('RegisterStepTwo', {
                    registerInfo: {
                        recommend: this.state.recommend,
                        username: this.state.username,
                        password: this.state.password
                    }
                });
            } else {
                ToastUtil.showShort('两次输入密码不统一');
            }
        } else {
            ToastUtil.showShort('密码至少为六位数');
        }
    }

    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center'
            }}>
                <KeyboardAwareScrollView
                    style={{
                        flex: 1, backgroundColor: 'white',
                        marginTop: Platform.OS === 'ios' ? -zStatusBarHeight : 0
                    }}
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps={'always'}>

                    <Image source={require('../res/img/login_bg.png')}
                           resizeMode={'cover'}
                           style={{
                               width,
                               height: height,
                               position: 'absolute',
                           }}/>

                    <TabHeader bgcolor="#1E82D2" text="会员注册" back />

                    <Image
                           style={{
                               width: zdp(140),
                               height: zdp(80),
                               marginTop: zAppBarHeight
                           }}
                           resizeMode={'contain'}/>


                    <MyTextInputWithIcon
                        style={{marginTop: zdp(100)}}
                        placeholder={'邀请码,可不填'}
                        iconName={'person-circle-outline'}
                        onChangeText={(text) => {
                            this.setState({
                                recommend: text
                            })
                        }}
                    />
                    <MyTextInputWithIcon
                        placeholder={'用户名'}
                        iconName={'person-circle-outline'}
                        onChangeText={(text) => {
                            this.setState({
                                username: text
                            })
                        }}
                    />
                    <MyTextInputWithIcon
                        secureTextEntry={true}
                        placeholder={'密码'}
                        iconName={'ios-lock-closed-outline'}
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />

                    <MyTextInputWithIcon
                        secureTextEntry={true}
                        placeholder={'确认密码'}
                        iconName={'ios-lock-closed-outline'}
                        onChangeText={(text) => {
                            this.setState({
                                passwordSure: text
                            })
                        }}
                    />
                    <View style={{
                        width,
                        height: zdp(119.5),
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <MyButtonView modal={1} style={{width: width / 1.3, marginTop: zdp(30)}}
                                      title={'下一步'}
                                      onPress={this.pressNext}/>
                    </View>
                </KeyboardAwareScrollView>

            </SafeAreaView>

        );
    }
}


