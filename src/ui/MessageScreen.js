import React, {Component} from 'react';
import BaseApp from './BaseApp'
import px2dp from '../util/px2dp'
import ToastUtil from '../util/ToastUtil'
import TabHeader from '../ui/component/TabHeader'
import SpacingView from '../ui/component/SpacingView'
import BasePresenter from "../presenter/BasePresenter";
import MessagePresenter from "../presenter/MessagePresenter";

import {StyleSheet, Text, View, Dimensions, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';

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
        let {onPress, unread, title, subject} = this.props
        onPress = onPress || (() => {})
        return (
            <View style={Styles.item_container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={Styles.topicView}>
                        <Text style={Styles.topic}>{title}</Text>
                    </View>
                    <View style={Styles.contentView}>
                        <Text style={Styles.content}>{subject}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class MessageScreen extends BaseApp{

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
		mPresenter = MessagePresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
		this._onRefresh();
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

	_showContent(item) {
		this.props.navigation.navigate('MsgDetail', {
			args: item
		})
	}

	renderItem = (data) => {
		return(
			<ListItem title={data.item.title} subject={data.item.subject} onPress={() => this._showContent(data.item)}/>
		);
	}

	_separator = () => {
		return <View style={{height: 1/scale, backgroundColor: "#CCCCCC"}}/>;
	}

	_onRefresh = () => {
		this.setState({
			loading: true,
			refresh: true
		})
		mPresenter.list({page: 1, limit: 10});
	}

	_onChat = () => {
		this.props.navigation.navigate('Chatting', {
			args: '123'
		})
	}

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
					<TabHeader bgcolor="#1E82D2" text="消息" code="headset" rightPress={this._onChat.bind(this)} right />
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