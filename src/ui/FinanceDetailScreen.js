/**
 * @author lam
 * @date 2018/7/25 11:29
 */

import React from 'react';
import {
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import Moment from 'moment'
import BaseApp from './BaseApp';
import TabHeader from "./component/TabHeader";
import DetailItem from "./component/DetailItem"
import SpacingView from './component/SpacingView'
import BasePresenter from "../presenter/BasePresenter";
import FinanceDetailPresenter from "../presenter/FinanceDetailPresenter";

let mPresenter = null;

export default class FinanceDetailScreen extends BaseApp {

    constructor(props) {
        super(props)
        this.state = {
            finance: {}
        }
    }

	getPresenter(): BasePresenter {
		mPresenter = FinanceDetailPresenter.getInstance(this);
		return mPresenter;
	}

	onLoad() {
		super.onLoad();
		var finance = this.props.navigation.state.params.finance;
		this.setState({
            finance
		})
		//mPresenter.detail({financeId: args.finance_id});
	}

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
                    finance: result
                })
			break;
			default:
			break;
		}
	}

    render() {
        let orderId = '';
        return (
            <View style={{flex: 1, backgroundColor: "#F3F3F3"}}>
                <View>
                    <TabHeader bgcolor="#1E82D2" text='资金明细' back />
                </View>
                <ScrollView>
				<SpacingView/>
				<View style={{flex: 1}}>
                    <DetailItem name="流水号" value={this.state.finance.finance_id}/>
                    <DetailItem name="变更原由" value={
                        this.state.finance.behaviour == 'buy' ? 
                        '买入'
                        : (this.state.finance.behaviour == 'earnings' ?
                        '收益'
                        : (this.state.finance.behaviour == 'withdraw' ?
                        '提现冻结'
                        : ''))
                    }
                    />
                    <DetailItem name="订单号" value={this.state.finance.behaviour == 'buy' ? orderId=this.state.finance.order_id : (this.state.finance.behaviour == 'earnings' ? orderId=this.state.finance.order_id : (this.state.finance.withdraw_id == 'withdraw' ? orderId=this.state.finance.withdraw_id : ''))}/>
                    <DetailItem name="账变前数量" value={this.state.finance.pre_amount}/>
                    <DetailItem name="数量" value={
                        this.state.finance.uc
                        +this.state.finance.tbc
                        +this.state.finance.tc
                        +this.state.finance.fc
                        +this.state.finance.ac
                        +this.state.finance.freezing}/>
                    <DetailItem name="账变后数量" value={this.state.finance.after_amount}/>
                    <DetailItem name="创建时间" value={Moment(this.state.finance.createTime).format('YYYY-MM-DD HH:mm:ss')}/>
                </View>
                </ScrollView>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    evidenceView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})