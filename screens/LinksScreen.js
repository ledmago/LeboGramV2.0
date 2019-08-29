import React from 'react';
import {Platform,Alert,ActivityIndicator,Dimensions,ImageBackground,Image, ScrollView, StyleSheet,Text,AsyncStorage,View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../components/Firebase';
import {Button} from 'react-native-elements';
import Ripple from 'react-native-material-ripple';
import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import { TouchableOpacity } from 'react-native-gesture-handler';
class LinksScreen extends React.Component {
  constructor(props)
  {
    super(props);
  }
  state={
    userToken:global.userInfo.userUid,
    imageUri:global.userInfo.profilePhotoUri,
    PictureLoading:false,
    tempUri : '',
  };


   
  static navigationOptions = {
    headerBackTitle:'Geri',
    headerTintColor: '#FFF',
  
    title: 'Profilim',
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

  async componentDidMount(){
    
    this.getPermissionAsync();
    if(this.state.imageUri.length < 2)
    {
      this.setState({imageUri:'https://firebasestorage.googleapis.com/v0/b/lebogram-4312a.appspot.com/o/ppimage.png?alt=media&token=2a955ee5-684f-47f7-be86-055dcb51b885'});
    }
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _imageSelect =
  async () => {
    this.setState({PictureLoading:true});
    const {
      cancelled,
      uri,
    } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,4],
    });
    if (!cancelled) {
      this.setState({ imageUri: uri });

      
        const manipResult = await ImageManipulator.manipulateAsync(
            this.state.imageUri,
            [{ resize: {width:250} }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
       

      this.uploadImage(manipResult.uri); /*   this.uploadImage(uri); -- Tam Boyutku Yüklüyor */
      this.setState({imageUri:manipResult,PictureLoading:true});
    }
    else{
      this.setState({PictureLoading:false});
    }
  }
  
  
  
  
  uploadImage = async(uri) => {
       var self = this;
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child('profilephoto/' + this.state.userToken + '/small');
    return ref.put(blob).then(function(){
      global.userProfilImageDownload();
      self.setState({PictureLoading:false});

      
    
     const dbh = firebase.firestore();


    dbh.collection("users").doc(global.userInfo.userUid).update({
      profilephoto:global.userInfo.profilePhotoUri + '&ver=' + Math.random(),
    }).catch(function(error){console.log(error)})


      Alert.alert('Profil Fotoğrafı','Profil Fotoğrafınız Başarı İle Yüklendi.', [{ text: 'Tamam', onPress: () => console.log('Ask me later pressed') },],{ cancelable: true });});}
 
 

  render(){
  return (
    <View style={styles.genelContainer}>
    <ImageBackground style={styles.Background} source={require('../assets/images/background.png')}>
  
      <View style={styles.container}>
<TouchableOpacity onPress={()=> this._imageSelect()}>
      <Image
          style={{width: 200, height: 200, borderRadius:200/2,borderWidth:5,borderColor:'#FFF' }}
          source={{uri: this.state.imageUri}}/>
            {this.state.PictureLoading && <ActivityIndicator style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} size={50} />}
            <View style={{position:'absolute',right:25,bottom:25,elevation:20,}}>
            <Ionicons name={"md-create"} size={50} color={"#FFF"} />
            </View>
     
     </TouchableOpacity>
   
     
    </View>
  
    </ImageBackground>
   
    <View style={styles.textView}><Text style={styles.isimText}>{global.userInfo.name}</Text></View>
    <View style={styles.contentView}>

        <View style={styles.itemView}></View>
        <View style={styles.itemView}></View>
        <View style={styles.itemView}></View>
        <View style={styles.itemView}></View>
        


    </View>


    
    </View>
    
  );
}
}

export default LinksScreen;
const styles = StyleSheet.create({
  itemView:
  {
    height:60,
    borderBottomColor:'#CCC',
    borderBottomWidth:1,
    width:100 + '%',

  },
  textView:{
    width:100+'%',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    maxHeight:100 + '%',
  },
  contentView:
  {
    width:93+'%',
    borderRadius:5,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    maxHeight:100 + '%',
    backgroundColor:'#FFF',
    marginTop:10,
  },
  genelContainer:
  {
    backgroundColor:'#CCC',
    height:100 + '%'
    
  },
  isimText:
  {
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:60,
  },

  duzenleContainer:
  {
    width:'auto',
    height:'auto',paddingLeft:200,
  },
  Background:
  {
    height:300,
    marginTop:-85,
    backgroundColor:'red',
    
    
  },
  container: {
    marginTop:150,
    height:800,
    width:85 + '%',
    justifyContent:'flex-start',
    alignItems:'center',
    alignSelf:'center',
    borderRadius:5,
   

    
  },
  button:
  {
    marginTop:20,
    padding:5,
  },
  duzenleContainer:
  {
    marginTop:-100,
  }
});
