import React from 'react';
import BaseApp from './BaseApp'
import Item from './component/Item'
import ToastUtil from '../util/ToastUtil'
import TabHeader from '../ui/component/TabHeader'
import SpacingView from '../ui/component/SpacingView'
import BasePresenter from "../presenter/BasePresenter";
import TeamPresenter from "../presenter/TeamPresenter";

import {StyleSheet, Text, View,Dimensions, ScrollView,} from 'react-native';

const { width, height } = Dimensions.get("window");

let mPresenter = null;

export default class TeamScreen extends BaseApp{

	constructor(props) {
		super(props);
		this.state = {
			teamTotalMemberCount: 0,
			level1TodayAmount: 0,
			level1WeekAmount: 0,
			level1TotalAmount: 0,
			level2TodayAmount: 0,
			level2WeekAmount: 0,
			level2TotalAmount: 0
		}
	}

	getPresenter(): BasePresenter {
		mPresenter = TeamPresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
		this._refresh();
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

	_refresh() {
		mPresenter.report();
	}

	//请求失败并返回失败信息
	failed(result) {
		super.failed(result);
	}

	//请求成功并返回数据
	success(result) {
		super.success(result);
		switch (result.tag) {
			case mPresenter.ENUM.REPORT:
				//做数据渲染操作
				this.setState({
					teamTotalMemberCount: result.teamTotalMemberCount,
					level1TodayAmount: result.level1TodayAmount,
					level1WeekAmount: result.level1WeekAmount,
					level1TotalAmount: result.level1TotalAmount,
					level2TodayAmount: result.level2TodayAmount,
					level2WeekAmount: result.level2WeekAmount,
					level2TotalAmount: result.level2TotalAmount
				})
			break;
			default:
			break;
		}
	}

    showMemberList() {
        this.props.navigation.navigate('TeamMember');
    }

    showLevel1TodayOrderList() {
        this.props.navigation.navigate('TeamOrder', {
			args: {
				level: 1,
				range: 'today'
			}
		});
    }

    showLevel2TodayOrderList() {
        this.props.navigation.navigate('TeamOrder', {
			args: {
				level: 2,
				range: 'today'
			}
		});
    }

    showLevel1WeekOrderList() {
        this.props.navigation.navigate('TeamOrder', {
			args: {
				level: 1,
				range: 'week'
			}
		});
    }

    showLevel2WeekOrderList() {
        this.props.navigation.navigate('TeamOrder', {
			args: {
				level: 2,
				range: 'week'
			}
		});
    }

    showLevel1OrderList() {
        this.props.navigation.navigate('TeamOrder', {
			args: {
				level: 1
			}
		});
    }

    showLevel2OrderList() {
        this.props.navigation.navigate('TeamOrder', {
			args: {
				level: 2
			}
		});
	}
	
	render(){
		return(
			<View style={Styles.container}>
				<View>
					<TabHeader bgcolor="#1E82D2" text="团队" code="sync" rightPress={this._refresh.bind(this)} right />
				</View>
				<SpacingView/>

				<ScrollView>
                    <Item name="团队总人数" subName={this.state.teamTotalMemberCount} onPress={this.showMemberList.bind(this)}/>
                    <Item name="本周团队奖金" subName={(this.state.level1WeekAmount+this.state.level2WeekAmount)/2*0.001+'UOBT'} disable/>
                    <Item name="团队累计奖金" subName={(this.state.level1TotalAmount+this.state.level2TotalAmount)/2*0.001+'UOBT'} disable/>
                    <Text style={Styles.title}>{"一级团队"}</Text>
                    <Item name="今日跑量" subName={this.state.level1TodayAmount+'UOBT'} onPress={this.showLevel1TodayOrderList.bind(this)}/>
                    <Item name="本周跑量" subName={this.state.level1WeekAmount+'UOBT'} onPress={this.showLevel1WeekOrderList.bind(this)}/>
                    <Item name="总跑量" subName={this.state.level1TotalAmount+'UOBT'} onPress={this.showLevel1OrderList.bind(this)}/>
                    <Text style={Styles.title}>{"二级团队"}</Text>
                    <Item name="今日跑量" subName={this.state.level2TodayAmount+'UOBT'} onPress={this.showLevel2TodayOrderList.bind(this)}/>
                    <Item name="本周跑量" subName={this.state.level2WeekAmount+'UOBT'} onPress={this.showLevel2WeekOrderList.bind(this)}/>
                    <Item name="总跑量" subName={this.state.level2TotalAmount+'UOBT'} onPress={this.showLevel2OrderList.bind(this)}/>
                </ScrollView>
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	container: {
		flex: 1
	},
    title: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        color: "#666666"
    },
})