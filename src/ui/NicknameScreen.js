import React from 'react';
import {
    Keyboard,
    View,
    Dimensions
} from 'react-native';
import BaseApp from './BaseApp'
import CountdownUtil from "../util/CountdownUtil";
import {isIphoneX, zdp, zsp} from "../util/ScreenUtil";
import MyTextInputWithIcon from "./component/MyTextInputWithIcon";
import ToastUtil from '../util/ToastUtil'
import MyButtonView from "./component/MyButtonView";
import TabHeader from "./component/TabHeader"
import BasePresenter from "../presenter/BasePresenter";
import NicknamePresenter from "../presenter/NicknamePresenter";

const {width, height} = Dimensions.get('window');

let mPresenter = null;

export default class NicknameScreen extends BaseApp {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);

        this.state = {
            member: {},
            nickname: ''
        }
    }

	getPresenter(): BasePresenter {
		mPresenter = NicknamePresenter.getInstance(this);
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
    
    onChangeNickname = () => {
        Keyboard.dismiss();

        var param = {
            nickname: this.state.nickname,
        }
        mPresenter.nickname(param);
    }
    
	//请求失败并返回失败信息
	failed(result) {
        super.failed(result);
        switch(result.tag){
            case mPresenter.ENUM.NICKNAME:
                ToastUtil.showShort("修改失败，请重试")
            break;
        }
	}

    //请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
            case mPresenter.ENUM.NICKNAME:
                alert("修改成功")
            break;
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <TabHeader bgcolor="#1E82D2" text="昵称修改" back />
                <MyTextInputWithIcon
                    style={{
                        marginTop: zdp(60)
                    }}
                    defaultValue={this.state.member.nickname}
                    placeholder={'请输入新的昵称'}
                    onChangeText={(text) => {
                        this.setState({
                            nickname: text
                        })
                    }}
                />
                <MyButtonView modal={1} style={{width: width / 1.3, marginTop: zdp(30)}}
                              title={'保存'}
                              onPress={this.onChangeNickname}/>
            </View>
        )
    }
}


