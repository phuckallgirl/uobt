/**
 * https://github.com/facebook/react-native
 * @flow GridItem上边图片下边文字
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const { width,height } = Dimensions.get('window');

export default class ActiveItem extends Component {

	constructor(props) {
		super(props)
		this.state = {
		}
	}
    
    render() {
        let {
            title,
            image
		} = this.props

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Image style={styles.icon} source={{uri: image}} />
                <View>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#666666'}}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width / 7,
        height: width / 7 + 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        //borderRightWidth: 1,
        borderColor: '#E9E9E9'
    },
    icon: {
        width: width / 7,
        height: width / 7,
    }
});

