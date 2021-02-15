/**
 * Created by lam on 2018/7/20.
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'

let {width, scale} = Dimensions.get('window');

export default class DetailItem extends Component{
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let {name, value} = this.props
        return (
            <View style={Styles.item_container}>
                <Text style={Styles.item_name}>{name}</Text>
                <Text style={Styles.item_value}>{value}</Text>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    item_container: {
        flexDirection: 'row',
        width, height: 40,
        alignItems: 'center',
        borderBottomColor: '#CCC',
        borderBottomWidth: 1/scale,
        paddingLeft: 20,
    },
    item_name: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold'
    },
    item_value: {
        flex: 1,
        fontSize: 16,
    }
})