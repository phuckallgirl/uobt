let isConnect = false;
let isReconnect = true;
let greeting,	//连接时向服务器表明身份
mCallBack;	//收到消息时的回调

export const initPush = (params, callBack) =>{
	greeting = JSON.stringify(params);
	mCallBack = callBack;
	closeConnect();
	return init();
};

export const closePush = () =>{
	closeConnect();
};

function closeConnect() {
	if(Const.WS){
		isReconnect = false;
		Const.WS.close();
	}
}

function init(){
	Const.WS = new WebSocket(Const.WS_URL);
	// 打开连接
	Const.WS.onopen = () => {
		checkHeart.reset().start();
		//发送连接验证token
		Const.WS.send(greeting);
	};

	// 接收消息
	Const.WS.onmessage = (evt) => {
		checkHeart.reset().start();
		msgHandle(evt);
	};

	//发生错误
	Const.WS.onerror = (evt) => {
	};

	//连接被关闭
	Const.WS.onclose = (evt) => {
		if(isReconnect){
			reconnect();
		}else{
			isReconnect = true;
		}
	};
	return Const.WS;
}

function reconnect() {
	if(!isConnect){
		isConnect = true;
		setTimeout(function(){
			init();
			isConnect = false;
		}, 2000);
	}
}

var checkHeart = {
	timeoutObj: null,
	reset:function(){
		clearTimeout(this.timeoutObj);
		return this;
	},
	start:function(){
		this.timeoutObj = setTimeout(function(){
			Const.WS.close();
		},40000)
	}
};

//消息处理
function msgHandle(evt){
	/*
	let obj = JSON.parse(evt.data);
	if(obj){
		//根据消息类型进行对应的逻辑处理
	}
	//*/
	mCallBack(JSON.parse(evt.data));
}