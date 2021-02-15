import React, {Component} from 'react'
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Platform
} from 'react-native';
import {withNavigation} from 'react-navigation'
import Storage from '../../util/storage'
import px2dp from '../../util/px2dp'
import Icon from 'react-native-vector-icons/Ionicons'

const TabHeaderTextPaddingTop = 11	// 字上方间距
const TabHeaderTextPaddingButtom = 11	// 字下方间距

class TabHeader extends Component {

	constructor(props) {
		super(props)
		this.state = {
			TabHeight: 0
		}
	}

	//static topbarHeight = (Platform.OS === 'ios' ? 64 : 42)

	componentDidMount() {
		Storage.get('TabHeight').then(res => {
			this.setState({
				TabHeight: Number(res)
			})
		})
	}

	render() {
		let {
			bgcolor,
			text,
			code,
			rightPress,
			right,
			back
		} = this.props

		return (
			<View style={[Styles.container, {
				paddingTop: this.state.TabHeight + TabHeaderTextPaddingTop,//+30, 
				backgroundColor: bgcolor}]}>
				<View style={Styles.headerLeft}>
					{
					back ?
					<TouchableOpacity style={[Styles.LeftButton]} onPress={this.gotoBack}>
						<Icon name='arrow-undo-outline' size={px2dp(26)} color="#FFFFFF"/>
					</TouchableOpacity>
					: null
					}
				</View>
				<View style={Styles.headerCenter}>
					<Text style={Styles.titleText}>{text}</Text>
				</View>
				<View style={Styles.headerRight}>
					{
					right?
					<TouchableOpacity onPress={rightPress}>
						<Icon name={code} size={px2dp(26)} color="#FFFFFF"/>
					</TouchableOpacity>
					: null
					}
				</View>
			</View>
		)
	}

	gotoBack = () => {
		this.props.navigation.goBack()
	}
}

const Styles = StyleSheet.create({
	container: {
		//height: TabHeader.topbarHeight,
		flexDirection: 'row',
		paddingBottom: TabHeaderTextPaddingButtom
	},
	headerLeft: {
		flex: 1,
		alignItems: 'center'
	},
	headerCenter: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerRight: {
		flex: 1,
		alignItems: 'center'
	},
	titleText: {
		fontSize: 16,
		color: '#FFFFFF',
	}
})

export default withNavigation(TabHeader);