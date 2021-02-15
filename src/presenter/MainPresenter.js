import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {FINANCE, INDEX} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class MainPresenter extends BasePresenter{

	ENUM = {
		LIST: 'FINANCE_LIST',
		REPORT: 'FINANCE_REPORT',
		BANNER: 'INDEX_BANNER',
		VERSION: 'INDEX_VERSION'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new MainPresenter();
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

	//资金明细列表
	list(params){
		this.requestPost(this.ENUM.LIST, FINANCE.list, params);
	}

	//资金报表
	report(params){
		this.requestPost(this.ENUM.REPORT, FINANCE.report, params);
	}

	//获取轮播图
	banner(params){
		this.requestPost(this.ENUM.BANNER, INDEX.banner, params);
	}
}
