import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {TEAM} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class TeamPresenter extends BasePresenter{

	ENUM = {
		REPORT: 'TEAM_REPORT'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new TeamPresenter();
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

	//团队统计
	report(params){
		this.requestPost(this.ENUM.REPORT, TEAM.report, params);
	}
}
