/**
 * Created by lam Date: 2018/8/11 Time: 下午3:07
 */
import React from 'react';
import {
    View,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';
import BaseApp from "./BaseApp";
import ZText from "./component/ZText";
import SignUtils from "../util/SignUtils"
import {cusColors} from "../util/cusColors";
import Storage from '../util/storage'
import MyButtonView from "./component/MyButtonView";
import {isIphoneX, zdp, zsp} from "../util/ScreenUtil";
import BasePresenter from "../presenter/BasePresenter";
import RegLoginPresenter from "../presenter/RegLoginPresenter";

let mPresenter = null;

const {width, height} = Dimensions.get('window');

export default class RegisterSuccess extends BaseApp {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this.params = {}
    }

	getPresenter(): BasePresenter {
		mPresenter = RegLoginPresenter.getInstance(this);
		return mPresenter;
	}

    onLoad(){
		super.onLoad();
        //type:0 //忘记密码  1 // 注册成功
        this.params = this.props.navigation.state.params;
        // this.params = {type: 1};
    }

    onDestroy() {
        super.onDestroy();
    }

    onBackPress = () => {
        return true;
    };

    pressSuccess = () => {
        if (this.params.type === 0) {
            this.props.navigation.navigate('Login');
        } else {
            mPresenter.login({
                uname: this.params.username,
                passcode: SignUtils.md5(this.params.password)
            });
        }
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

            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>

                <Image source={{uri: isIphoneX() ? 'bg_success' : 'bg_success'}}
                       resizeMode={'cover'}
                       style={{
                           width,
                           height: height,
                           position: 'absolute'
                       }}/>

                <StatusBar
                    hidden={false}
                    translucent={true}
                    barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                    backgroundColor={'#fff6fd00'}
                    networkActivityIndicatorVisible={false}
                />

                <ZText content={`${this.params.type === 0 ? '密码修改成功' : '注册成功'}`}
                       parentStyle={{
                           width: width,
                           marginTop: zdp(80),
                           backgroundColor: 'transparent',
                           justifyContent: 'center',
                           alignItems: 'center'
                       }}
                       fontSize={zsp(30)}
                       color={cusColors.text_secondary}/>

                <View style={{flex: 1}}/>

                <MyButtonView modal={1} style={{marginBottom: zdp(70)}} title={'完 成'}
                              onPress={this.pressSuccess}/>

            </View>
        )
    }
}


