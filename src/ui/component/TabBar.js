import React from 'react'
import {
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	Dimensions,
	Animated, Easing
} from 'react-native';

import BaseApp from '../BaseApp'
import Posed from 'react-native-pose'
import Sound from 'react-native-sound'
import Storage from '../../util/storage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto'
import px2dp from '../../util/px2dp';
import ModalDialog from './ModalDialog'
import {decrypting} from "../../util/aes";
import TaskView from './TaskView'
import TradePresenter from '../../presenter/TradePresenter'
import BasePresenter from '../../presenter/BasePresenter'
import {initPush} from '../../net/WebSocketUtil'

let audioUrl = require('../../res/audio/notice.mp3')

const windowWidth = Dimensions.get('window').width

const tabWidth = windowWidth / 5

const Scaler = Posed.View({
	active: {scale: 1},
	inactive: {scale: 0.8}
})

const Icon = {
    Ionicons,
    Fontisto
}

let mPresenter = null;

const sound = new Sound(audioUrl,(e) =>{
	if(e){
		alert("声音播放失败");
	}
});

export default class TabBar extends BaseApp {

	constructor(props) {
		super(props);
		this.spinValue = new Animated.Value(0)
		this.state = {
			spin: this.spinValue.interpolate({
				inputRange: [0, 1],
				outputRange: ['0deg', '360deg']
			}),
			order: {},
			recoveryId: '',
			transaction: '',
			rate: 0,
			uid: 0
		}
	}

	getPresenter(): BasePresenter {
		mPresenter = TradePresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
		mPresenter.memberDetail();
	}

    onDestroy() {
		super.onDestroy();
        sound.release();
    }

	//中间按钮长按时
	async _onTabLongPress(){
		var state = await Storage.get('state');
		console.log("Storage得到的是："+state);
		if(state == null || state == 'online'){
			state = 'trading'
		}else{
			state = 'online';
		}
		mPresenter.switch({state: state});
	}

	//请求失败并返回失败信息
	failed(msg) {
		super.failed(msg);
		console.log(msg);
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
			case mPresenter.ENUM.MEMBER_DETAIL:
				this.setState({
					transaction: result.state,
					rate: result.rate,
					uid: result.member_id
				});
				Storage.set('state', result.state);
				
				//连接WS
				var greeting = {type: 'member', memberId: result.member_id};
				initPush(greeting, (data) => {
					this.msgHandler(data);
				});
				break;
			case mPresenter.ENUM.SWITCH:
				//做数据渲染操作
				this.setState({
					transaction: result.state
				})
				Storage.set('state', result.state)
				if(result.state == 'trading'){
					this.spin();
				}
			break;
			case mPresenter.ENUM.ORDER_DETAIL:
				this.setState({
					order: result
				})
				console.log("收到信息："+JSON.stringify(this.state.order));
				this.showTaskDetail(result);
				break;
			case mPresenter.ENUM.REFUSE:
				break;
			case mPresenter.ENUM.ACCEPT:
				this.props.navigation.navigate('Trading', {order: this.state.order});
				break;
			default:
			break;
		}
	}

	refuse() {
		mPresenter.refuse({orderId: this.state.order.orderId});
	}

	accept() {
		mPresenter.accept({orderId: this.state.order.orderId});
	}

	recovery(){
		this.props.navigation.navigate('Recovery', {orderId: this.state.recoveryId})
	}

	showTaskDetail(data){
		var profit = data.amount*this.state.rate;
		var options={
            headTitle:'您有新任务',
            messText:'可获得 '+profit+' UOBT',
            headStyle:{
                backgroundColor:'#E6456E',
                color:'#FFFFFF'
            },
            buttons:[
                {txt:'驳回', onpress: this.refuse.bind(this)},
                {txt:'接受', onpress: this.accept.bind(this)}
            ]
        }
        this.refs.task.show(options)
	}

	showRecoveryDetail(){
		var options={
            headTitle:'您有新任务',
            messText:'请提供订单号为 '+this.state.recoveryId+' 的交易凭证',
            headStyle:{
                backgroundColor:'#E6456E',
                color:'#FFFFFF'
            },
            buttons:[
                {txt:'马上处理', onpress: this.recovery.bind(this)}
			],
			clickScreenToHide: false
        }
        this.refs.recovery.show(options)
	}

	msgHandler(data){
		var decrypted = decrypting(data.data);
		console.log(decrypted);
		sound.setVolume(1.0);
		sound.play();
		//alert(JSON.stringify(data));
		switch(data.event){
			case 'task':
				this.setState({
					order: {orderId: decrypted.orderId}
				})
				mPresenter.orderDetail({orderId: decrypted.orderId});
				break;
			case 'recovery':
				this.setState({
					recoveryId: decrypted.orderId
				})
				this.showRecoveryDetail();
				break;
		}
	}

	spin = () => {
		if(this.state.transaction == 'trading'){
			this.spinValue.setValue(0)
			Animated.timing(this.spinValue, {
				toValue: 1,
				duration: 2000,
				easing: Easing.linear,
				useNativeDriver: true
			}).start(()=> this.spin())
		}
	}

	renderCenterIcon(isActive) {
		let state = this.state.transaction;
		if(state === 'trading'){
			return <Scaler style={Styles.scalerOnline}
				pose={isActive ? 'active' : 'inactive'}>
				<Animated.Image style={[{transform: [{rotate: this.state.spin}]}]} source={require('../../res/img/radar.png')}/>
			</Scaler>
		}else{
			if(isActive){
				return <Scaler style={Styles.scalerOnline}
					pose={isActive ? 'active' : 'inactive'}>
						<Icon.Fontisto name='money-symbol' size={28} color="#1E82D2"/>
						<Text style={isRouteActive? Styles.specialText : Styles.iconText}>
							交易
						</Text>
				</Scaler>
			}else{
				return <Scaler style={Styles.scalerOnline}
					pose={isActive ? 'active' : 'inactive'}>
						<Icon.Fontisto name='money-symbol' size={28} color="#808080"/>
						<Text style={isRouteActive? Styles.specialText : Styles.iconText}>
							交易
						</Text>
				</Scaler>
			}
		}
	}
	

	render() {
		const {
			renderIcon,
			getLabelText,
			activeTintColor,
			inactiveTintColor,
			onTabPress,
			onTabLongPress,
			getAccessibilityLabel,
			navigation
		} = this.props

		const {routes, index: activeRouteIndex} = navigation.state
		return (
			<Scaler style={Styles.container}>
				<ModalDialog components={<TaskView{...this.state.order}/>} ref="task" />
				<ModalDialog ref="recovery" />
				{
					routes.map((route, routeIndex) => {
						const isRouteActive = routeIndex === activeRouteIndex
						const tintColor = isRouteActive ? activeTintColor: inactiveTintColor
						return (
							<TouchableNativeFeedback key={routeIndex} style={Styles.tabButton}
							onPress = {() => {
								onTabPress({route})
							}}
							onLongPress = {() => {
								onTabLongPress({route})
								if(route.key == 'transaction'){
									this._onTabLongPress();
								}
							}}
							accessibilityLabel = {getAccessibilityLabel({route})}>
								{route.key == 'transaction' ? (	//对中间的图标进行特殊处理
									this.renderCenterIcon(isRouteActive)
								): (//普通图标普通处理
									<Scaler style={Styles.scaler}
										pose={isRouteActive ? 'active' : 'inactive'}
										>
										{renderIcon({route, focused: isRouteActive, tintColor})}
										<Text style={isRouteActive? Styles.specialText : Styles.iconText}>
											{getLabelText({route})}
										</Text>
									</Scaler>
								)}
							</TouchableNativeFeedback>
						)
					})
				}
			</Scaler>
		)
	}
}

const Styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 53,
		borderWidth: 1,
		borderRadius: 1,
		borderColor: '#EEEEEE',
		//shadowOffset: {width: 5, height: 10},
		//shadowOpacity: 0.75,
		elevation: 1
	},
	tabButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	spotLight: {
		width: tabWidth,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	scaler: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	scalerOnline: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	iconText: {
		fontSize: 16,
		lineHeight: 20,
		color: '#303030'
	},
	specialText: {
		fontSize: 16,
		lineHeight: 20,
		color: '#1E82D2'
	}
})