import React from 'react'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import TabBar from './component/TabBar'
//页面
import Main from './MainScreen'
import Team from './TeamScreen'
import Msg from './MessageScreen'
import Mine from './MineScreen'
import Transaction from './TransactionScreen'

const Icon = {
    Ionicons,
    Fontisto,
	FontAwesome,
	Entypo
}

export default createBottomTabNavigator(
{
	main: {
		screen: Main,
		navigationOptions: () => {
			return {
				tabBarLabel: '主页',
				tabBarIcon: ({tintColor}) => {
					return <Icon.Ionicons name='home' size={28} color={tintColor}/>
				}
			}
		}
	},
	team: {
		screen: Team,
		navigationOptions: () => {
			return {
				tabBarLabel: '团队',
				tabBarIcon: ({tintColor}) => {
					return <Icon.FontAwesome name='group' size={28} color={tintColor}/>
				}
			}
		}
	},
	transaction: {
		screen: Transaction
	},
	message: {
		screen: Msg,
		navigationOptions: () => {
			return {
				tabBarLabel: '消息',
				tabBarIcon: ({tintColor}) => {
					return <Icon.Entypo name='chat' size={28} color={tintColor}/>
				}
			}
		}
	},
	mine: {
		screen: Mine,
		navigationOptions: () => {
			return {
				tabBarLabel: '我的',
				tabBarIcon: ({tintColor}) => {
					return <Icon.Ionicons name='person' size={28} color={tintColor}/>
				}
			}
		}
	}
},
{
	tabBarOptions: {
		activeTintColor: '#1E82D2',
		inactiveTintColor: '#CBCBCB',
	},
	lazy: true,
	backBehavior: 'none',
	initialRouteName: 'main',
	tabBarComponent: props => (<TabBar{...props} />)
}
)