import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {ORDER} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class TradingPresenter extends BasePresenter{

	ENUM = {
		DETAIL: 'ORDER_DETAIL',
		CONFIRM: 'ORDER_CONFIRM',
		RECOVERY: 'ORDER_RECOVERY'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new TradingPresenter();
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

	//交易记录详情
	detail(params){
		this.requestPost(this.ENUM.DETAIL, ORDER.detail, params);
	}

	//提交支付凭证
	confirm(params){
		this.requestPost(this.ENUM.CONFIRM, ORDER.confirm, params);
	}

	//冲正
	recovery(params){
		this.requestPost(this.ENUM.RECOVERY, ORDER.recovery, params);
	}
}
