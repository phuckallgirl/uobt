import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {ORDER} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class OrderListPresenter extends BasePresenter{

	ENUM = {
		LIST: 'ORDER_LIST',
		DETAIL: 'ORDER_DETAIL',
		ACCEPT: 'ORDER_ACCEPT',
		REFUSE: 'ORDER_REFUSE',
		CONFIRM: 'ORDER_CONFIRM'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new OrderListPresenter();
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

	//交易记录列表
	list(params){
		this.requestPost(this.ENUM.LIST, ORDER.list, params);
	}

	//交易记录详情
	detail(params){
		this.requestPost(this.ENUM.DETAIL, ORDER.detail, params);
	}

	//接受订单
	accept(params){
		this.requestPost(this.ENUM.ACCEPT, ORDER.accept, params);
	}

	//拒绝任务
	refuse(params){
		this.requestPost(this.ENUM.REFUSE, ORDER.refuse, params);
	}

	//任务完成
	confirm(params){
		this.requestPost(this.ENUM.CONFIRM, ORDER.confirm, params);
	}
}
