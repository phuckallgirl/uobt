import AsyncStorage from '@react-native-community/async-storage';

function set(key, value) {
	return new Promise((resolve, reject) => {
		AsyncStorage.setItem(key, value, (err) => {
			if(err){
				reject(err)
			}else{
				resolve()
			}
		})
	})
}

function get(key) {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(key, (err, value) => {
			if(err){
				reject(err)
			}else{
				resolve(value)
			}
		})
	})
}

function keys() {
	return new Promise((resolve, reject) => {
		AsyncStorage.getAllKeys((err, value) => {
			console.log(err, value)
			if(err){
				reject(err)
			}else{
				resolve(value)
			}
		})
	})
}

function del(key) {
	return new Promise((resolve, reject) => {
		AsyncStorage.removeItem(key, (err) => {
			if(err){
				reject(err)
			}else{
				resolve()
			}
		})
	})
}


export default {set, get, del, keys}