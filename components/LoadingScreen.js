import React from 'react';
import {Animated,Console,ActivityIndicator,Platform,Dimensions,ScrollView, StyleSheet,View,TouchableOpacity,Text,AsyncStorage,ImageBackground,Image,TextInput } from 'react-native';
import {CheckBox,Button} from 'react-native-elements';
import Ripple from 'react-native-material-ripple';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../components/Firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render()
  {
    
      return(
        <View style={{position:'absolute', width:100 + '%', height:101 + '%', top:0,backgroundColor:'#7d327d',justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center',zIndex:9999999}}>

      <ImageBackground style={{width:100 + '%', height:100 + '%'}} source={require('../assets/images/background.png')}>

      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator color='#FFF' size={55}></ActivityIndicator><Text style={{color:'#FFF', fontSize:15,marginTop:10,}}>Yükleniyor...</Text></View>
        </ImageBackground>




      </View>
      );
  }
}
export default LoadingScreen;