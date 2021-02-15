import React, {Component} from 'react';
import {
    Keyboard,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
import BaseApp from './BaseApp'
import {isIphoneX, zdp, zsp} from "../util/ScreenUtil";
import MyTextInputWithIcon from "./component/MyTextInputWithIcon";
import MyButtonView from "./component/MyButtonView";
import {Picker} from "@react-native-community/picker"
import TabHeader from "./component/TabHeader"
import WithdrawPresenter from "../presenter/WithdrawPresenter";
import BasePresenter from "../presenter/BasePresenter";

const {width, height} = Dimensions.get('window');

let mPresenter = null;

export default class WithdrawApply extends BaseApp {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);

        this.registerInfo = null;

        this.state = {
            cards: [],
            amount: 0,
            cardId: 0
        }
    }

	getPresenter(): BasePresenter {
		mPresenter = WithdrawPresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
        super.onLoad();
        mPresenter.cardList();
    }

    pressWithdraw = () => {
        Keyboard.dismiss();

        var param = {
            quantity: this.state.amount,
            cardId: this.state.cardId
        }
        console.log(param)
        mPresenter.apply(param);
    }

    updateCard(v, i) {
        this.setState({
            cardId: v
        })
    }
    
	//请求失败并返回失败信息
	failed(result) {
        super.failed(result);
        switch(result.tag){
            case mPresenter.ENUM.CARD_LIST:
            case mPresenter.ENUM.WITHDRAW:
            break;
        }
	}

    //请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
            case mPresenter.ENUM.CARD_LIST:
                this.setState({
                    cards: result.list
                })
                break;
            case mPresenter.ENUM.WITHDRAW:
                alert("申请成功！");
                break;
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={require('../res/img/login_bg.png')}
                       resizeMode={'cover'}
                       style={{
                           width,
                           height: height,
                           position: 'absolute'
                       }}/>

                <TabHeader bgcolor="#1E82D2" text="提现" back />
                <Image source={require('../res/img/logo.png')}
                           style={{
                               width: zdp(140),
                               height: zdp(100),
                               marginTop: zdp(100)
                           }}
                           resizeMode={'contain'}/>
                <Text>提现数量</Text>
                <MyTextInputWithIcon
                    keyboardType={'numeric'}
                    placeholder={'请输入数量'}
                    onChangeText={(text) => {
                        this.setState({
                            amount: text
                        })
                    }}
                />
                <Text>当前可提现 99,999.01 UOBT</Text>
                <Picker style={{height: 50, width: width/1.3}}
                selectedValue={this.state.cardId}
                onValueChange={(value,idx) => {
                    this.updateCard(value, idx)
                }}
                >
                    {
                        this.state.cards.map((o, idx) => 
                        <Picker.Item key={idx} label={o.bank+"-"+o.card_no} value={o.card_id} />
                        )
                    }
                </Picker>

                <MyButtonView modal={1} style={{width: width / 1.3, marginTop: zdp(30)}}
                              title={'确认提现'}
                              onPress={this.pressWithdraw}/>
            </View>
        )
    }
}


