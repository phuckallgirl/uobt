import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {MEMBER} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class CellphonePresenter extends BasePresenter{

	ENUM = {
		CELLPHONE: 'MEMBER_CELLPHONE'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new CellphonePresenter();
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

	//换绑手机
	cellphone(params){
		this.requestPost(this.ENUM.CELLPHONE, MEMBER.cellphone, params);
	}
}
