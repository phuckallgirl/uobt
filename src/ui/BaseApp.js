import React from 'react';
import ToastUtil from "../util/ToastUtil";
import BasePresenter from "../presenter/BasePresenter";
import {BackHandler} from 'react-native'

let mPresenter:BasePresenter;

export default class BaseApp extends React.Component{

    componentDidMount() {
        mPresenter = this.getPresenter();
		this.onLoad();
    }
	
	//加载数据
    onLoad(){
        if(Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        }
    }
	
	componentWillUnmount() {
        //页面退出时可以在此方法统一对Presenter做相关处理
        this.onDestroy();
    };

    onDestroy(){
        if(Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        }
    }
/*
    //按两次返回键退出程序
    exit = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    };
//*/

    //按一次返回键返回上一页
    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };
//*/

	//获得逻辑层对象
    getPresenter():BasePresenter{
    }

	//请求成功
    success(result){
        //this.hidLoading();
        console.log(result);
    }

	//请求失败
    failed(result){
        //this.hidLoading();
        ToastUtil.showShort(result.msg);
    }
}
