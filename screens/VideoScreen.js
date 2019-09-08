import React, { Component } from 'react';

import { StyleSheet, View, TextInput,Text } from 'react-native';
import { Video } from 'expo-av';

export default class Profile extends Component {
  state = {
    VideoUri:this.props.navigation.getParam('uri'),
  };

  componentDidMount()
  {
    console.log(this.props.navigation.getParam('uri'))
  }
  render() {
    return (
      <View style={styles.container}>
       <Video
  source={{ uri: this.props.navigation.getParam('uri') }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  useNativeControls
  style={{ width: 300, height: 300 }}
/>
<Text>{this.props.navigation.getParam('uri')}</Text>
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