import React, {Component} from 'react';
import BaseApp from './BaseApp'
import px2dp from '../util/px2dp'
import Moment from 'moment'
import TabHeader from '../ui/component/TabHeader'
import SpacingView from '../ui/component/SpacingView'
import BasePresenter from "../presenter/BasePresenter"
import FinanceListPresenter from "../presenter/FinanceListPresenter"

import {StyleSheet, Text, View, Dimensions, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';

const itemHeight = px2dp(80);
let mPresenter = null;

let {scale} = Dimensions.get('window');

class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let {onPress, amount, behaviour, createTime} = this.props
        onPress = onPress || (() => {})
        return (
            <View style={Styles.item_container}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.props.onPress}>
					<View style={Styles.contentView}>
						<View>
							<Text style={Styles.orderId}>{'￥'+amount}</Text>
						</View>
						<View>
							<Text>{Moment(createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
						</View>
					</View>
					<View style={Styles.timeView}>
						<Text style={Styles.time}>{behaviour}</Text>
					</View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class FinanceScreen extends BaseApp{

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			more: false,
			loading: false,
			refresh: false,
			//isRefreshing: false,
			page: 1
		}
	}

	getPresenter(): BasePresenter {
		mPresenter = FinanceListPresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
		this._onRefresh();
	}

	renderItem = (data) => {
		var amount = '', behaviour = '';
		switch(data.item.behaviour){
			/*
			case 'sell':
			case 'fee':
			case 'topup':
			*/
			case 'buy':
				behaviour = '买入';
				amount = data.item.tbc;
				break;
			case 'earnings':
				behaviour = '收益';
				amount = data.item.tbc;
				break;
			case 'withdraw':
				behaviour = '提现';
				amount = data.item.fc;
				break;
		}
		return(
			<ListItem behaviour={behaviour}
			amount={amount}
			createTime={data.item.create_time}
			onPress={() => this._onItemClick(data.item)}/>
		);
	}

	_onItemClick(item){
		this.props.navigation.navigate('FinanceDetail', {
			finance: item
		})
	}

	_separator = () => {
		return <View style={{height: 1/scale, backgroundColor: "#CCCCCC"}}/>;
	}

	//下拉刷新
	_onRefresh = () => {
		this.setState({
			loading: true,
			refresh: true
		})
		mPresenter.list({page: 1, limit: 10});
	}

	//拉拉加载更多
	_loadMore = () => {
		this.setState({
			loading: true
		})
		mPresenter.list({page: this.state.page+1, limit: 10});
	}

	genIndicator() {
        return <View style={Styles.indicatorContainer}>
            <ActivityIndicator
                style={Styles.indicator}
                size='large'
                animating={true}
            />
            <Text>正在加载更多</Text>
        </View>
    }

	//请求失败并返回失败信息
	failed(result) {
		super.failed(result);
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		if(result.count == result.list.length+(this.state.page*10)){
			this.setState({
				more: false
			})
		}
		switch (result.tag) {
			case mPresenter.ENUM.LIST:
				//做数据渲染操作
				this.setState({
					loading: false,
				});
				if(this.state.refresh){
					this.setState({
						refresh: false,
						data: result.list
					})
				}else{
					var arr = this.state.data.concat(result.list);
					this.setState({
						page: this.state.page+1,
						data: arr
					})
				}
			break;
			default:
			break;
		}
	}

	render(){
		return(
			<View style={Styles.container}>
				<View>
					<TabHeader bgcolor="#1E82D2" text="资金流水" back />
				</View>
				<SpacingView/>
				<View style={Styles.list}>
					{
					this.state.data.length > 0 ?
					<FlatList data={this.state.data}
					renderItem={(data) => this.renderItem(data)}
					ItemSeparatorComponent={this._separator}
					horizontal={false}
					//refreshing={this.state.refresh}
					//onRefresh={this._onRefresh.bind(this)}
					refreshControl={
						<RefreshControl
						title='Loading...'
						colors={['red']}
						refreshing={this.state.loading}
						onRefresh={this._onRefresh.bind(this)}
						tintColor={'orange'}/>
					}//*/
					onEndReached={this._loadMore.bind(this)}
					onEndReachedThreshold={__IOS__?-0.1:0.2}
					ListFooterComponent={this.genIndicator.bind(this)}
					//ListEmptyComponent={this._empty}/>
					/>
					:
					<View style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
						<Text>没有数据</Text>
					</View>
					}
				</View>
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
	},
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
	},
	
    item_container: {
        height: itemHeight,
        paddingLeft: 16,
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: "#EEEEEE"
    },
    topicView: {
        height: 30
    },
    topic: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold'
    },
    contentView: {
        height: 30
    },
    content: {
        fontSize: 14,
        color: '#505050',
    }
})