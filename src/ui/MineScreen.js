import React from 'react';
import BaseApp from './BaseApp'
import ToastUtil from '../util/ToastUtil'
import TabHeader from '../ui/component/TabHeader'
import BasePresenter from "../presenter/BasePresenter";
import MinePresenter from "../presenter/MinePresenter";
import px2dp from '../util/px2dp'
import Item from './component/Item'
import {NavigationEvents} from 'react-navigation';

//import Icon from 'react-native-vector-icons/Ionicons'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {launchImageLibrary} from "react-native-image-picker";
import {
    View,
    Text,
    Image,
    StyleSheet,
    PixelRatio, 
    RefreshControl,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const sHeight = TabHeader.currentHeight;

const { width, height } = Dimensions.get("window");

let mPresenter = null;

export default class MineScreen extends BaseApp{

	constructor(props) {
		super(props);
		this.state = {
            member: {},
			isRefreshing: false,
            avatarSource: null,
            timer: null
		}
	}

	getPresenter(): BasePresenter {
		mPresenter = MinePresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
		mPresenter.detail();
	}
    
    onDestroy() {
        super.onDestroy();
        clearTimeout(this.state.timer);
    }

    onBackPress = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastUtil.showShort('再按一次退出应用');
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
                //做数据渲染操作
                this.setState({
                    member: result
                });
			break;
			default:
			break;
		}
	}

    rightPress() {
        this.props.navigation.navigate('Setting');
    }

    goProfile() {
        this.props.navigation.navigate('UserProfile', {
			member: this.state.member
		});
    }

    goWallet() {
        this.props.navigation.navigate('Wallet', {
			member: this.state.member
		});
    }

    goRecommend() {
        this.props.navigation.navigate('Recommend', {
			member: this.state.member
		});
    }

    goCard() {
        this.props.navigation.navigate('CardList');
    }

    goChat() {
        this.props.navigation.navigate('Chatting');
    }

    goAbout() {
        this.props.navigation.navigate('About');
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.setState({timer: setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 1500)})
    }

    _renderListItem() {
        let config = [
			{icon: "ios-person", name: "账户信息", onPress: this.goProfile.bind(this)},
            //{icon: "logo-usd", name: "提币地址"},
            // {icon: "ios-heart", name: "我的收藏", color: "#FC7B53"},
            {icon: "ios-logo-bitcoin", name: "钱包管理", color: "#FC7B53", subName: this.state.member.wallet?'已绑定':'未绑定', onPress: this.goWallet.bind(this)},
            // {icon: "ios-cart", name: "积分商城", subName: "0元好物在这里", color: "#94D94A"},
            {icon: "ios-card", name: "银行卡", subName: "", color: "#FFC636", onPress: this.goCard.bind(this)},
            //{icon: "ios-person", name: "支付设置"},
            {icon: "ios-share-social", name: "推荐有奖", subName: "10点算力", color: "#FC7B53", onPress: this.goRecommend.bind(this)},
            {icon: "headset", name: "在线客服", color: "#FFC636", onPress: this.goChat.bind(this)},
            {icon: "ios-medal", name: "关于我们", onPress: this.goAbout.bind(this)},
		]
        return config.map((item, i) => {
            if (i % 3 === 0) {
                item.first = true
            }
            return (<Item key={i} {...item}/>)
        })
    }

    targetFunction() {
		mPresenter.detail();
    }

	_onPress() {
        const options = {
            title: "选择图片",
            cancelButtonTitle: "取消",
            chooseFromLibraryButtonTitle: "从相册中选择",
            takePhotoButtonTitle: "拍照",
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
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
                        avatarSource: source
                    });
                    mPresenter.update({avatar: source});
                }).catch((error)=>{
                    console.error('error', error);
                })
            }
        });
    }

	render(){
		return(
			<View style={Styles.container}>
                <View style={Styles.sBar} backgroundColor={'#1E82D2'}/>
				<View>
					<TabHeader bgcolor="#1E82D2" text="会员中心" code="ios-settings-outline" rightPress={this.rightPress.bind(this)} right />
				</View>
				<View
                    style={Styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#FFFFFF"
                            colors={['#DDDDDD', '#0398FF']}
                            progressBackgroundColor="#FFFFFF"
                        />
                    }>

                    <View style={{
                        minHeight: height - 64 - px2dp(46),
                        paddingBottom: 60,
                        backgroundColor: "#F3F3F3"
                    }}>
                        <View style={Styles.userHead}>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <TouchableOpacity onPress={this._onPress.bind(this)}>
                                    <View
                                        style={[Styles.avatar, Styles.avatarContainer, {marginBottom: 20}]}>
                                        {this.state.avatarSource === null ?
                                            <Image style={Styles.avatar} source={require('../res/img/avatar.png')}/> :
                                            <Image style={Styles.avatar} source={this.state.avatarSource}/>
                                        }
                                    </View>
                                </TouchableOpacity>

                                <View style={{flex: 1, marginLeft: 10, paddingVertical: 5}}>
                                    <Text style={{color: "#FFFFFF",fontSize: px2dp(18)}}>
                                        {this.state.member.nickname}
                                    </Text>
                                    <View style={{marginTop: px2dp(10), flexDirection: "row"}}>
                                        <FontAwesome name='mobile' size={px2dp(20)} color="#FFFFFF"/>
                                        <Text style={{color: "#FFFFFF",fontSize: 13,paddingLeft: 5}}>
                                            {this.state.member.cellphone}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={Styles.numbers}>
                            <View style={Styles.numItem}>
                                <Text style={{color: '#FF9900',fontSize:23,fontWeight:'bold'}}>
                                    {
                                    this.state.member.uc+
                                    this.state.member.tc+
                                    this.state.member.fc+
                                    this.state.member.ac+
                                    this.state.member.tbc+
                                    this.state.member.freezing
                                    }
                                </Text>
                                <Text>个人资产</Text>
                            </View>
                            <View style={Styles.numItem}>
                                <Text style={{color: '#FF583A',fontSize:23,fontWeight:'bold'}}>564.456</Text>
                                <Text>团队资产</Text>
                            </View>
                            <View style={Styles.numItem}>
                                <Text style={{color: '#64C800',fontSize:23,fontWeight:'bold'}}>9548.54</Text>
                                <Text>利润</Text>
                            </View>
                        </View>
                        <View>
                            {this._renderListItem()}
                        </View>
                    </View>
                </View>
                <NavigationEvents onDidFocus={() => this.targetFunction()}/>
			</View>
		);
	}
}

const Styles = StyleSheet.create({
    scrollView: {
        marginBottom: px2dp(5),
        backgroundColor: "#1E82D2"
    },
    sBar: {
        height: sHeight,
        width: width
    },
    userHead: {
        paddingBottom: 5,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#1E82D2"
    },
    numbers: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        height: 74
    },
    numItem: {
        flex: 1,
        height: 74,
        justifyContent: "center",
        alignItems: "center"
    },
    quitContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    avatarContainer: {
        borderColor: '#1E82D2',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 60,
        height: 60
    }
});