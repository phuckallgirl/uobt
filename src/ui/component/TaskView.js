/**
 * Created by lam on 2018/7/20.
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native'

export default class TaskView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {
            bank,
            branch,
            account,
            cardNo,
            amount
		} = this.props
        return(
            <View style={[Styles.container]}>
                <Text style={Styles.amount}>￥{amount}</Text>
                <Text>{bank}</Text>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      margin:20
  },
  amount: {
      fontSize: 16,
      color: '#FF0000',
      fontWeight: 'bold'
  }
})
