import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {TEAM} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class TeamMemberPresenter extends BasePresenter{

	ENUM = {
		ALL_MEMBER_LIST: 'TEAM_ALL_MEMBER_LIST',
		LEVEL1_MEMBER_LIST: 'TEAM_LEVEL_1_MEMBER_LIST',
		LEVEL2_MEMBER_LIST: 'TEAM_LEVEL_2_MEMBER_LIST'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new TeamMemberPresenter();
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

	//团队所有成员列表
	teamAllMemberList(params){
		this.requestPost(this.ENUM.ALL_MEMBER_LIST, TEAM.all_member_list, params);
	}

	//一级团队成员列表
	level1MemberList(params){
		this.requestPost(this.ENUM.LEVEL1_MEMBER_LIST, TEAM.level1_member_list, params);
	}

	//二级团队成员列表
	level2MemberList(params){
		this.requestPost(this.ENUM.LEVEL2_MEMBER_LIST, TEAM.level2_member_list, params);
	}
}
