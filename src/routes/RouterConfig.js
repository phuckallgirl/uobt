import Login from '../ui/LoginScreen'
import Splash from '../ui/SplashScreen'
import Home from '../ui/Home'
import UserProfile from '../ui/UserProfile'
import Trading from '../ui/TradingScreen'
import Recovery from '../ui/RecoveryScreen'
import Setting from '../ui/SettingScreen'
import About from '../ui/About'
import CardList from '../ui/CardScreen'
import CardAdd from '../ui/CardAddScreen'
import MsgDetail from '../ui/MsgDetailScreen'
import TeamMember from '../ui/TeamMemberScreen'
import TeamOrder from '../ui/TeamOrderScreen'
import VerifyLogin from '../ui/LoginByVerify'
import PwdForget from '../ui/ForgetPsw'
import Withdraw from '../ui/WithdrawScreen'
import WithdrawApply from '../ui/WithdrawApply'
import RegisterStepOne from '../ui/RegisterStepOne'
import RegisterStepTwo from '../ui/RegisterStepTwo'
import RegisterSuccess from '../ui/RegisterSuccess'
import MemberDetail from '../ui/MemberDetailScreen'
import OrderDetail from '../ui/OrderDetailScreen'
import Recommend from '../ui/RecommendScreen'
import Nickname from '../ui/NicknameScreen'
import Cellphone from '../ui/CellphoneScreen'
import Password from '../ui/PasswordScreen'
import WalletBind from '../ui/WalletScreen'
import Pin from '../ui/PinScreen'
import FinanceList from '../ui/FinanceScreen'
import FinanceDetail from '../ui/FinanceDetailScreen'
import Chatting from '../ui/ChattingScreen'

export default {
  Login: {screen: Login},
  Splash: {
    screen: Splash,
    navigationOptions: {
      headerShown: false
    }
  },
  RegisterStepOne: {screen: RegisterStepOne},
  RegisterStepTwo: {screen: RegisterStepTwo},
  RegisterSuccess: {screen: RegisterSuccess},
  PwdForget: {screen: PwdForget},
  VerifyLogin: {screen: VerifyLogin},
  TabBar: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  },
  UserProfile: {screen: UserProfile},
  About: {screen: About},
  Setting: {screen: Setting},
  TeamMember: {screen: TeamMember},
  TeamOrder: {screen: TeamOrder},
  MsgDetail: {screen: MsgDetail},
  CardList: {screen: CardList},
  CardAdd: {screen: CardAdd},
  Trading: {screen: Trading},
  Recovery: {screen: Recovery},
  Withdraw: {screen: Withdraw},
  WithdrawApply: {screen: WithdrawApply},
  OrderDetail: {screen: OrderDetail},
  MemberDetail: {screen: MemberDetail},
  Nickname: {screen: Nickname},
  Cellphone: {screen: Cellphone},
  Password: {screen: Password},
  Pin: {screen: Pin},
  Wallet: {screen: WalletBind},
  Recommend: {screen: Recommend},
  FinanceList: {screen: FinanceList},
  FinanceDetail: {screen: FinanceDetail},
  Chatting: {screen: Chatting},
}
