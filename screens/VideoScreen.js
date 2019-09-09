import React, { Component } from 'react';

import { StyleSheet, View, TextInput,Text } from 'react-native';
import { Video } from 'expo-av';
import * as VideoThumbnails from 'expo-video-thumbnails';

export default class Profile extends Component {
  state = {
    VideoUri:this.props.navigation.getParam('uri'),
  };
  playerRef = undefined;
  generateThumbnail = async () => {
    
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        {
          time: 15000,
        }
      );
      console.log(uri)
    } catch (e) {
      console.warn(e);
    }
  };
  async componentDidMount(){
   // console.log(this.props.navigation.getParam('uri'))
    await this.playerRef.loadAsync(
      {uri: this.props.navigation.getParam('uri')},
      {shouldPlay: true, androidImplementation: 'MediaPlayer'}
    )
  }
  render() {
    return (
      <View style={styles.container}>
       <Video
  //source={{ uri: this.props.navigation.getParam('uri') }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode="cover"
  shouldPlay
  isLooping
  useNativeControls
  style={{ width: 300, height: 300 }}
  ref={(ref) => {this.playerRef = ref}}
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