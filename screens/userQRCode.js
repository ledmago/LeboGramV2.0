import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';

import { StyleSheet, View, TextInput,Text } from 'react-native';

export default class Profile extends Component {
  state = {
    text: 'http://facebook.github.io/react-native/',
  };

  render() {
    return (
      <View style={styles.container}>
       <Text style={{backgroundColor:'red'}}>{global.userInfo.userUid} asd </Text>
        <QRCode
          value={global.userInfo.userUid}
          size={200}
          bgColor='purple'
          fgColor='white'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});