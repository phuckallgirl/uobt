import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {MEMBER, ORDER} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class TradePresenter extends BasePresenter{

	ENUM = {
		MEMBER_DETAIL: 'TRADE_MEMBER_DETAIL',
		ORDER_DETAIL: 'TRADE_ORDER_DETAIL',
		SWITCH: 'TRADE_MEMBER_SWITCH',
		ACCEPT: 'TRADE_ORDER_ACCEPT',
		REFUSE: 'TRADE_ORDER_REFUSE'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new TradePresenter();
		}
		return instance;
	}

	getBaseApp(): BaseApp {
		return baseApp;
	}

	success(result) {
		super.success(result);
		baseApp.success(result);
	}

	failed(result) {
		super.failed(result);
		baseApp.failed(result);
	}

	//获取会员详细信息
	memberDetail(params){
		this.requestPost(this.ENUM.MEMBER_DETAIL, MEMBER.detail, params);
	}

	//获取订单详细信息
	orderDetail(params){
		this.requestPost(this.ENUM.ORDER_DETAIL, ORDER.detail, params);
	}

	//交易开关
	switch(params){
		this.requestPost(this.ENUM.SWITCH, MEMBER.switch, params);
	}

	//接受订单
	accept(params){
		this.requestPost(this.ENUM.ACCEPT, ORDER.accept, params);
	}

	//拒绝任务
	refuse(params){
		this.requestPost(this.ENUM.REFUSE, ORDER.refuse, params);
	}
}
