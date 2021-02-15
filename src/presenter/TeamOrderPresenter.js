import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {TEAM} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class TeamOrderPresenter extends BasePresenter{

	ENUM = {
		LEVEL1_ORDER_LIST: 'TEAM_LEVEL_1_ORDER_LIST',
		LEVEL2_ORDER_LIST: 'TEAM_LEVEL_2_ORDER_LIST'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new TeamOrderPresenter();
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

	//一级团队分时订单列表
	level1OrderList(params){
		this.requestPost(this.ENUM.LEVEL1_ORDER_LIST, TEAM.level1_order_list, params);
	}

	//二级团队分时订单列表
	level2OrderList(params){
		this.requestPost(this.ENUM.LEVEL2_ORDER_LIST, TEAM.level2_order_list, params);
	}
}
