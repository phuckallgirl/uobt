import React, {Component} from 'react';
import Moment from "moment"
import BaseApp from './BaseApp'
import px2dp from '../util/px2dp'
import TabHeader from './component/TabHeader'
import SpacingView from './component/SpacingView'
import BasePresenter from "../presenter/BasePresenter";
import TeamOrderPresenter from "../presenter/TeamOrderPresenter";

import {View, FlatList, Text, Dimensions, RefreshControl, ActivityIndicator, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';

const { scale } = Dimensions.get("window");

const itemHeight = px2dp(80);
let mPresenter = null;

class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let {onPress, orderId, amount, bank, state, createTime, uploadTime} = this.props
        onPress = onPress || (() => {})
        return (
            <View style={Styles.item_container}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.props.onPress}>
					<View style={Styles.contentView}>
						<View>
							<Text style={Styles.orderId}>{orderId}</Text>
						</View>
						<View>
							<Text>{bank+' ￥'+amount}</Text>
						</View>
					</View>
					<View style={Styles.timeView}>
						<ImageBackground style={{flex: 1}} resizeMode="contain" source={state=='accept' ? require("../res/img/accept.png"): require("../res/img/finished.png")}>
							<View style={{flex: 1, flexDirection: 'column-reverse'}}>
								<Text style={Styles.time}>{Moment(createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
							</View>
						</ImageBackground>
					</View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class TeamOrderScreen extends BaseApp{

	constructor(props) {
		super(props);

		this.args = null;
		
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
		mPresenter = TeamOrderPresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
        this.args = this.props.navigation.state.params.args;
		this._onRefresh();
		//mPresenter.list({page: 1, limit: 10});

	}

	renderItem = (data) => {
		return(
			<ListItem orderId={data.item.order_id}
			amount={data.item.real_amount}
			bank={data.item.bank}
			state={data.item.state}
			createTime={data.item.create_time}
			uploadTime={data.item.upload_time}
			onPress={() => this._onItemClick(data.item)}/>
		);
	}

	_separator = () => {
		return <View style={{height: 1/scale, backgroundColor: "#cccccc"}}/>;
	}

	_onRefresh = () => {
		this.setState({
			loading: true,
			refresh: true
		})
		if(this.args.level == 1){
			mPresenter.level1OrderList({page: 1, limit: 10, range: this.args.range});
		}else{
			mPresenter.level2OrderList({page: 1, limit: 10, range: this.args.range});
		}
	}

	_loadMore = () => {
		this.setState({
			loading: true
		})
		if(this.args.level == 1){
			mPresenter.level1OrderList({page: this.state.page+1, limit: 10, range: this.args.range});
		}else{
			mPresenter.level2OrderList({page: this.state.page+1, limit: 10, range: this.args.range});
		}
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

	_onItemClick(item){
		this.props.navigation.navigate('OrderDetail', {
			order: item
		})
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
			case mPresenter.ENUM.LEVEL1_ORDER_LIST:
			case mPresenter.ENUM.LEVEL2_ORDER_LIST:
				//做数据渲染操作
				this.setState({
					loading: false,
				});
				if(this.state.refresh){
					this.setState({
						page: 1,
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
					<TabHeader bgcolor="#1E82D2" text="团队交易列表" back />
				</View>
				<SpacingView/>
				<View style={Styles.list}>
					{
					this.state.data.length > 0 ?
					<FlatList data={this.state.data}
					renderItem={(data) => this.renderItem(data)}
					ItemSeparatorComponent={this._separator}
					horizontal={false}
					//refreshing={this.state.isRefreshing}
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
					//ListEmptyComponent={this._empty}
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
    contentView: {
        flexDirection: 'column',
        height: itemHeight,
        paddingLeft: 15,
        justifyContent: 'space-around',
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666666',
    },
    timeView: {
        flex: 1,
        height: itemHeight,
        alignItems: 'flex-end',
        paddingRight: 20,
		paddingTop: 10,
        paddingBottom: 5
    },
    time: {
        fontSize: 16,
        paddingRight: 5,
        color: '#aaaaaa',
    }
})