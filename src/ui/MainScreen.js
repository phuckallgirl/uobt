import React from 'react'
import BaseApp from './BaseApp'
import ToastUtil from '../util/ToastUtil'
import SpacingView from './component/SpacingView'
import ActiveItem from './component/ActiveItem'
import TabHeader from './component/TabHeader'
import CodePush from 'react-native-code-push'
import ProgressBarModal from './component/ProgressBarModal';
import BasePresenter from "../presenter/BasePresenter"
import MainPresenter from "../presenter/MainPresenter"
import Swiper from 'react-native-swiper'
//import Charts from 'react-native-echarts-pro'
import {StyleSheet, Image, View, Text, Dimensions, TouchableOpacity} from 'react-native';

const { width } = Dimensions.get("window");

let mPresenter = null;
/*
let data = [
	['2021-01-10', 116],
	['2021-01-11', 129],
	['2021-01-12', 135],
	['2021-01-13', 86],
	['2021-01-14', 73],
	['2021-01-15', 94],
	['2021-01-16', 118],
	['2021-01-17', 125],
	['2021-01-18', 105]
];
*/
export default class MainScreen extends BaseApp{

	constructor(props) {
		super(props);
		this.state = {
			progressModalVisible: false,
			member: {}
			/*
			option: {
				title: {text: '近7日表现'},
				tooltip: {trigger: 'axis'},
				xAxis: {
					data: data.map(function(item){
						return item[0]
					})
				},
				yAxis: {
					splitLine: {
						show: false
					}
				},
				toolBox: {
					left: 'center',
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						restore: {},
						saveAsImage: {}
					}
				},
				dataZoom: [
					{startValue: '2014-06-01'},
					{type: 'inside'}
				],
				visualMap: {
					top: 10,
					right: 10,
					pieces: [
						{gt: 0, lte: 30, color: '#096'},
						{gt: 30, lte: 60, color: '#FFDE33'},
						{gt: 60, lte: 90, color: '#FF9933'},
						{gt: 90, lte: 120, color: '#CC0033'},
						{gt: 120, lte: 150, color: '#660099'},
						{gt: 150, color: '#7E0023'}
					],
					outOfRange: {color: '#999'}
				},
				series: [
					{
						name: '跑量',
						type: 'line',
						data: data.map(function(item){
							return item[1]
						}),
						markLine: {
							silent: true,
							data: [
								{yAxis: 30},
								{yAxis: 60},
								{yAxis: 90},
								{yAxis: 120},
								{yAxis: 150}
							]
						}
					}
				]
			}
			*/
		}
	}

	getPresenter(): BasePresenter {
		mPresenter = MainPresenter.getInstance(this);
		return mPresenter;
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

	codePushStatusDidChange(syncStatus){
		switch (syncStatus) {
			case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
				this.setState({syncMessage: 'Checking for update.'});
				break;
			case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
				this.setState({syncMessage: 'Downloading package.',progressModalVisible:true});
                break;
			case CodePush.SyncStatus.AWAITING_USER_ACTION:
				this.setState({syncMessage: 'Awaiting user action.'});
				break;
			case CodePush.SyncStatus.INSTALLING_UPDATE:
				this.setState({syncMessage: 'Installing update.',progressModalVisible:true});
				break;
			case CodePush.SyncStatus.UP_TO_DATE:
				this.setState({syncMessage: 'App up to date.', progress: false});
				break;
			case CodePush.SyncStatus.UPDATE_IGNORED:
				this.setState({syncMessage: 'Update cancelled by user.', progress: false,});
				break;
			case CodePush.SyncStatus.UPDATE_INSTALLED:
				this.setState({syncMessage: 'Update installed and will be applied on restart.', progress: false,});
				break;
			case CodePush.SyncStatus.UNKNOWN_ERROR:
				this.setState({syncMessage: 'An unknown error occurred.', progress: false,});
				break;
			default:
				break;
		}
	}

	codePushDownloadDidProgress(progress){
		this.setState({
			progress
		})
	}

	syncImmediate() {
		CodePush.sync({
			installMode: CodePush.InstallMode.IMMEDIATE,
			updateDialog: {
				appendReleaseDescription: true, //是否显示更新description，默认为false
				descriptionPrefix: '更新内容：', //更新说明的前缀。 默认是” Description:
				mandatoryContinueButtonLabel: '立即更新', //强制更新的按钮文字，默认为continue
				mandatoryUpdateMessage: '', //- 强制更新时，更新通知. Defaults to “An update is available that must be installed.”.
				optionalIgnoreButtonLabel: '稍后', //非强制更新时，取消按钮文字,默认是ignore
				optionalInstallButtonLabel: '后台更新', //非强制更新时，确认文字. Defaults to “Install”
				optionalUpdateMessage: '有新版本了，是否更新？', //非强制更新时，更新通知. Defaults to “An update is available. Would you like to install it?”.
				title: '更新提示', //要显示的更新通知的标题. Defaults to “Update available”.
			}
		},
		this.codePushStatusDidChange.bind(this),
		this.codePushDownloadDidProgress.bind(this)
		);
	}
	
	onLoad(){
		super.onLoad();
		mPresenter.banner();
		this.syncImmediate();	//开始检测更新
	}

	//请求失败并返回失败信息
	failed(result) {
		super.failed(result);
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
			case mPresenter.ENUM.MEMBER_DETAIL:
				//做数据渲染操作
				this.setState({
					member: result
				})
				break;
			case mPresenter.ENUM.BANNER:
				break;
			default:
			break;
		}
	}

	withdraw(){
        this.props.navigation.navigate('Withdraw');
	}

	finance(){
        this.props.navigation.navigate('FinanceList');
	}
/*
	render(){
		return(
			<View style={Styles.container}>
				<View>
					<TabHeader bgcolor="#1E82D2" text="赏金猎人" />
				</View>
				<View style={Styles.swiper}>
					<Swiper horizontal autoplay autoplayTimeout={3} paginationStyle={{bottom: 10}}>
						<Image resizeMode='stretch' style={Styles.img} source={require('../res/img/banner/001.png')}/>
						<Image resizeMode='stretch' style={Styles.img} source={require('../res/img/banner/002.png')}/>
						<Image resizeMode='stretch' style={Styles.img} source={require('../res/img/banner/003.png')}/>
					</Swiper>
				</View>
				<SpacingView/>
				<View style={Styles.shortcuts}>
					<ActiveItem title='资金明细' image='http://m.hepay.me/upload/1.png' key={1} onPress={this.finance.bind(this)}/>
					<ActiveItem title='交易记录' image='http://m.hepay.me/upload/2.png' key={2} onPress={()=>{}}/>
					<ActiveItem title='统计报表' image='http://m.hepay.me/upload/3.png' key={3} onPress={()=>{}}/>
					<ActiveItem title='提现' image='http://m.hepay.me/upload/4.png' key={4} onPress={this.withdraw.bind(this)}/>
				</View>
				<SpacingView/>
				<View style={{flex: 1}}>
					<Charts option={this.state.option} height={250}/>
				</View>
			</View>
		);
	}
*/
	render(){
		let progressView;
        if (this.state.progress) {
            let total = (this.state.progress.totalBytes/(1024*1024)).toFixed(2);
            let received =(this.state.progress.receivedBytes/(1024*1024)).toFixed(2);
            let progress = parseInt((received/total)*100);
                  progressView = (
                      <ProgressBarModal
                          progress={progress}
                          totalPackageSize={total}
                          receivedPackageSize={received}
                          progressModalVisible={this.state.progressModalVisible}
                      />
                  );
        }
		return(
			<View style={Styles.container}>
				<View>
					<TabHeader bgcolor="#1E82D2" text="赏金猎人" />
				</View>
				<View style={Styles.swiper}>
					<Swiper horizontal autoplay autoplayTimeout={3} paginationStyle={{bottom: 10}}>
						<Image resizeMode='stretch' style={Styles.img} source={require('../res/img/banner/001.png')}/>
						<Image resizeMode='stretch' style={Styles.img} source={require('../res/img/banner/002.png')}/>
						<Image resizeMode='stretch' style={Styles.img} source={require('../res/img/banner/003.png')}/>
					</Swiper>
				</View>
				<SpacingView/>
				<View style={Styles.shortcuts}>
					<ActiveItem title='资金明细' image='https://m.hepay.me/upload/1.png' key={1} onPress={this.finance.bind(this)}/>
					<ActiveItem title='交易记录' image='https://m.hepay.me/upload/2.png' key={2} onPress={()=>{}}/>
					<ActiveItem title='统计报表' image='https://m.hepay.me/upload/3.png' key={3} onPress={()=>{}}/>
					<ActiveItem title='提现' image='https://m.hepay.me/upload/4.png' key={4} onPress={this.withdraw.bind(this)}/>
				</View>
				{progressView}
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	swiper: {
		height: 200
	},
	img: {
		width,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center'
	},
	shortcuts: {
		width,
		flexDirection: 'row',
        borderTopWidth: 1,
        borderLeftWidth: 1,
		borderColor: '#e9e9e9',
	}
})
/*
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};

App = CodePush(codePushOptions)(App);

export default App;
*/