/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  CameraRoll,
  TouchableOpacity,
  Platform,
  Vibration,
  Dimensions,
  Text,
  ImageBackground,
  Picker
} from 'react-native';
import * as Permissions from 'expo-permissions';
import Ripple from 'react-native-material-ripple';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
//import all the components we will need
import Constants from 'expo-constants';
import firebase from '../components/Firebase';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken:global.userInfo.userUid,
      kanalid : this.props.navigation.getParam('kanalid'),
      displayname : this.props.navigation.getParam('displayname'),
      desc : this.props.navigation.getParam('desc'),
      PPUri : this.props.navigation.getParam('PPUri'),
      dataSource: {},
      photos: null,
      selectedCount:0,
      isUploadButton:false,
      progress: 0,
      albums:[],
      selectedPicker:'',
    };
    this.MaxSelectCount = 5
    
  
  }
 
  static navigationOptions = {
    headerBackTitle:'Geri',
    headerTintColor: '#FFF',
    headerStyle: {
     
      activeTintColor: '#81B247',
      backgroundColor: 'transparent',
      borderWidth:0,
      height:60,
      shadowRadius: 0,
      shadowColor: 'transparent',
      elevation: 0,
      
    },
    headerTitleStyle: {
      color:'#FFF',
      textAlign:'center',
      width:90 + '%',

    },
    headerRight: (
      <TouchableOpacity style={{marginRight:15}}><Ionicons name={"ios-settings"} size={25} color={"#FFF"} icon/></TouchableOpacity>
    ),
    
  };


  

  componentDidMount() {
    this.props.navigation.setParams({NavigationTitleDisplayName:this.state.displayname});
    var that = this;
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, src: 'https://image.yenisafak.com/resim/imagecrop/2019/03/13/05/35/resized_9dd7b-d08c1039monalisa.jpg' };
    });
    that.setState({
      dataSource: items,
    });


  }
     
    





  






  render() {
   
    return (

<ScrollView style={{marginTop:-60}}>
<ImageBackground style={{width:100 + '%', height:110,marginTop:0}} source={{uri:this.state.PPUri}}   blurRadius={1}>

</ImageBackground>
      
      <View style={styles.MainContainer}>
       
       <View style={{width:100,height:100,borderRadius:100/2,alignItems:'center',alignSelf:'center',backgroundColor:'#FFF',marginTop:-50,justifyContent:'center'}}>
         <Image source={{uri:this.state.PPUri}} style={{width:92,height:92,borderRadius:92/2,}}/>
         </View>
       
         
         <View style={{marginLeft:15,alignItems:'center',justifyContent:'center',marginBottom:25,}}>
            <Text style={styles.kisiListItemTextHeader}>{this.state.displayname}</Text>
            <Text style={styles.kisiListItemTextSubTitle}>{this.state.desc}</Text>
          </View>
      

      <View style={{flexDirection:'row',height:10,width:95 + '%',marginBottom:40,}}>
       <Button buttonStyle={{width:Dimensions.get('screen').width/3 - 5,marginLeft:2,marginRight:2,height:32,borderRadius:2}} title='Koleksyon' />
       <Button buttonStyle={{width:Dimensions.get('screen').width/3 - 5,marginLeft:2,marginRight:2,height:32,borderRadius:2}}title='Zaman Tüneli' />
      <Button  buttonStyle={{width:Dimensions.get('screen').width/3 - 5,marginLeft:2,marginRight:2,height:32,borderRadius:2}} title='Gidenler' />
      </View>
         {/*   <Button onPress={()=>this.props.navigation.navigate('ImageUpload',{kanalid:this.state.kanalid,displayname:this.state.displayname,desc:this.state.desc,PPUri:this.state.PPUri})} title='Tıkla' />
       */}


        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
            </View>
          )}
          //Setting the number of column
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      </ScrollView>


    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
kisiListItemTextHeader:
{
  fontSize:23,
  fontWeight:'500',
  color:'#444',
  marginBottom:3,

},
kisiListItemTextSubTitle:
{
  color: '#666',
},

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});