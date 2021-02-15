import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {MEMBER} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class WalletPresenter extends BasePresenter{

	ENUM = {
		WALLET: 'MEMBER_WALLET'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new WalletPresenter();
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
	wallet(params){
		this.requestPost(this.ENUM.WALLET, MEMBER.wallet, params);
	}
}
