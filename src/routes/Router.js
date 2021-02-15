import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import RouterConfig from './RouterConfig'

const HomeStack = createStackNavigator(RouterConfig, {
  initialRouteName: 'Splash',
  mode: 'card',
  headerMode: 'none',   // none 隐藏上标签栏  | float 苹果默认效果 | screen 安卓默认效果
  
  defaultNavigationOptions: {
    gestureEnabled: true,
    headerStyle: {
      backgroundColor: '#1E82D2'
    },
    headerTintColor: '#FFFFFF', // 定义导航条的字体颜色 会覆盖headerTitleStyle的颜色

    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
})

export default createAppContainer(HomeStack)
