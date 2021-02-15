/**
 * Created by lam
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TextInput,
    Dimensions, Image
} from 'react-native';

import {cusColors} from "../../util/cusColors";

const {width, height} = Dimensions.get('window');
import {zdp, zsp} from "../../util/ScreenUtil";
import Icon from 'react-native-vector-icons/Ionicons'

export default class MyTextInputWithIcon extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        keyboardType: 'default',
        style: {},
        textInputStyle: {},
        value: null,
        placeholder: '请输入内容',
        iconName: null,
        iconSize: zdp(30),
        iconColor: '#999999',
        placeholderTextColor: cusColors.text_placeHold,
        maxLength: 19,
        secureTextEntry: false,
        defaultValue: ''
    };

    render() {
        var param = this.props;
        return (
            <View style={[{
                marginTop: zdp(20),
                width: width / 1.3,
                height: zdp(50),
                flexDirection: 'row',
                backgroundColor: cusColors.inputBackgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#AAAAAA',
                borderWidth: 1,
                borderRadius: zdp(5),
            }, param.style]}

            >

                {/*<Image style={{width:zdp(30),height:zdp(30)}} source={require('../../resource/image/qianbao.png')}/>*/}
                {
                param.iconName ?
                <Icon name={param.iconName} resizeMode='contain' size={20} style={{
                           marginLeft: zdp(10),
                           marginRight: zdp(10),
                           width: zdp(20),
                           height: zdp(20),
                           backgroundColor: 'transparent'
                       }}/>:null
                }
                <TextInput
                    // password={true}
                    backgroundColor={'rgba(255, 255, 255, 0.4)'}
                    color={'#ff0000'}
                    secureTextEntry={param.secureTextEntry}
                    editable={param.editable ? param.editable : true}
                    keyboardType={param.keyboardType}
                    autoCapitalize={'none'}
                    underlineColorAndroid={'transparent'}
                    style={[styles.textInputStyle_01, param.textInputStyle]}
                    placeholder={param.placeholder}
                    placeholderTextColor={param.placeholderTextColor}
                    maxLength={param.maxLength}
                    defaultValue={param.defaultValue}
                    onChangeText={(text) => {
                        param.onChangeText(text)
                    }}
                    value={param.value}/>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    textInputStyle_01: {
        flex: 1,
        fontSize: zsp(16),
        fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
        color: cusColors.inputTextColor,
        height: zdp(50),
        backgroundColor: 'transparent',
        textAlign: 'left',
    }
})