import React, {Component} from 'react';
import Moment from "moment"
import BaseApp from './BaseApp'
import px2dp from '../util/px2dp'
import TabHeader from '../ui/component/TabHeader'
import SpacingView from '../ui/component/SpacingView'
import BasePresenter from "../presenter/BasePresenter";
import TeamMemberPresenter from "../presenter/TeamMemberPresenter";

import {StyleSheet, Text, View, Image, Dimensions, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity} from 'react-native';

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
        let {onPress, nickname, avatar, cellphone, registTime} = this.props
        onPress = onPress || (() => {})
        return (
            <View style={Styles.item_container}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.props.onPress}>
                    <View style={Styles.avatarView}>
                        <Image style={Styles.avatar} source={{uri: avatar}} />
                    </View>
                    <View style={Styles.contentView}>
                        <View>
                            <Text style={Styles.nickname}>{nickname}</Text>
                        </View>
                        <View>
                            <Text>{cellphone}</Text>
                        </View>
                    </View>
                    <View style={Styles.timeView}>
                        <Text style={Styles.time}>{Moment(registTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class TeamMemberList extends BaseApp{

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
		mPresenter = TeamMemberPresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
		this._onRefresh();
		//mPresenter.list({page: 1, limit: 10});
	}

	renderItem = (data) => {
		return(
			<ListItem nickname={data.item.nickname}
			avatar={Const.HOST+data.item.avatar}
			cellphone={data.item.cellphone}
			registTime={data.item.create_time}
			onPress={()=>this._onItemClick(data.item)}/>
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
		mPresenter.teamAllMemberList({page: 1, limit: 10});
	}

	_loadMore = () => {
		this.setState({
			loading: true
		})
		mPresenter.teamAllMemberList({page: this.state.page+1, limit: 10});
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
		this.props.navigation.navigate('MemberDetail', {
			member: item
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
			case mPresenter.ENUM.ALL_MEMBER_LIST:
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
					<TabHeader bgcolor="#1E82D2" text="团队成员" back />
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
    avatarView: {
        width: 60,
        height: itemHeight,
        justifyContent: 'center',
    },
    avatar: {
        //borderRadius: 75,
        width: 60,
        height: 60
    },
    contentView: {
        flexDirection: 'column',
        height: itemHeight,
        paddingLeft: 15,
        justifyContent: 'space-around',
    },
    nickname: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666666',
    },
    timeView: {
        flex: 1,
        height: itemHeight,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 30,
        paddingBottom: 10,
    },
    time: {
        fontSize: 16,
        paddingRight: 5,
        color: '#aaaaaa',
    }
})