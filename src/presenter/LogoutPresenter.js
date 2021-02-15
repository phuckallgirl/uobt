import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {AUTH} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class LogoutPresenter extends BasePresenter{

	ENUM = {
		LOGOUT: 'AUTH_LOGOUT'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new LogoutPresenter();
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

	//退登
	logout(params){
		this.requestPost(this.ENUM.LOGOUT, AUTH.logout, params);
	}
}
