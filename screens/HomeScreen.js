import React from 'react';
import {
  Component,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
  Dimensions,
  AsyncStorage,
  Alert,
  ActivityIndicator,
  FlatList,
  Vibration
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import { tsConstructorType } from '@babel/types';
import { createStackNavigator, createAppContainer, createDrawerNavigator,DrawerItems, SafeAreaView} from 'react-navigation';
import LinksScreen from './LinksScreen';
import SettingsScreen from './SettingsScreen';
import CustomDrawerContentComponent from './Drawer';
import firebase from '../components/Firebase';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import ListItem, { Separator } from '../components/ListPostUser';
import LoadingScreen from '../components/LoadingScreen';
import { ScreenOrientation } from 'expo';
import {
  Notifications,
} from 'expo';
/*const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView style={{flex:1}} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
    <Text>ASDASD</Text>
  </ScrollView>
);*/
class HomeScreen extends React.Component {
  constructor(props)
  {
        super(props);
        global.userInfo = {
          userUid : '',
          username:'',
          email:'',
          name:'',
          profilePhotoUri : '',
        };
        
        
        global.userProfilImageDownload = async () =>
        {
        
          const ref = firebase.storage().ref('profilephoto/' + global.userInfo.userUid + '/small');
          try{const url = await ref.getDownloadURL(); global.userInfo.profilePhotoUri = url;} catch(error){global.userInfo.profilePhotoUri = 'https://firebasestorage.googleapis.com/v0/b/lebogram2.appspot.com/o/ppimage.png?alt=media&token=2a955ee5-684f-47f7-be86-055dcb51b885';}
        try{this.setState({PPUri:global.userInfo.profilePhotoUri})}catch(error){this.setState({PPUri:'https://firebasestorage.googleapis.com/v0/b/lebogram2.appspot.com/o/ppimage.png?alt=media&token=2a955ee5-684f-47f7-be86-055dcb51b885'})}
        };

        

        this._bootstrapAsync();

  
  }
  state = {
  
    userUid : '',
    username:'',
    email:'',
    name:'',
    PPUri : 'https://firebasestorage.googleapis.com/v0/b/lebogram2.appspot.com/o/ppimage.png?alt=media&token=2a955ee5-684f-47f7-be86-055dcb51b885',
    isEverythingReady:false,
    tempItemQuota:[],
    ItemQuota:[],
    isItemQuotaFinish:false,
    displaynameRef:'asd',
    isKonusmaYok:true,
    location: null,
    isLocationEnable:false,
    
};
getPermissionAsync = async () => { 
  const { statusNotifications } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.platform.ios || Constants.platform.android) {
    const { statusCamera } = await Permissions.askAsync(Permissions.CAMERA);
    const { statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
   
   
  }
}
sendNotificationImmediately = async (gonderen,adet) => {
  Vibration.vibrate(1000);
  let notificationId = await Notifications.presentLocalNotificationAsync({
    title: adet + 'Yeni Mesaj Alındı',
    body: gonderen + ' tarafından ' + adet + ' adet yeni mesajınız var',
  });
  console.log(notificationId); // can be saved in AsyncStorage or send to server
};
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if(userToken)
    {
        global.userInfo.userUid = userToken;
      this._getUserInfo();
      /* Resim Adresi Yükle */
      global.userProfilImageDownload();
      this.getDataFromDatabase();
     /* --------------------*/    
    }
   

  
  };

  // Databaseden Kullaanıcı Verilerini Çek
  getDataFromDatabase = async () =>
  {

         const dbh = firebase.firestore();
         const  usersRef =  await dbh.collection('users').doc(global.userInfo.userUid)
        usersRef.get()
        .then((docSnapshot) => {
          global.userInfo.username =  docSnapshot.data().username;
          global.userInfo.email =  docSnapshot.data().email;
          global.userInfo.name =  docSnapshot.data().name;

          this.setState({username:docSnapshot.data().username});
          this.setState({email:docSnapshot.data().email});
          this.setState({name:docSnapshot.data().name});
          this.setState({PPUri:global.userInfo.profilePhotoUri});
          this.setState({newUser:docSnapshot.data().newUser});

   
          if(docSnapshot.data().newUser == true){
        var self=this;
         
            firebase.firestore().collection("users").doc(global.userInfo.userUid).update({newUser: false}).then(()=>{
              self.props.navigation.navigate('NewUser'); 
              
            })
          
          
          
          };
          

          var arrayuserInfo = {username:docSnapshot.data().username,email:docSnapshot.data().email,name:docSnapshot.data().name,PPUri:global.userInfo.profilePhotoUri};
          this._saveUserInfo(arrayuserInfo)
         
          
        });

  }


  LocationServices()
  {
    if(this.state.isLocationEnable) // Görünürü Açıksa
    {
      this.setState({isLocationEnable:false});
      firebase.firestore().collection('locations').doc(global.userInfo.userUid).update({timestamp:0});
   
    }
    else
    {
      this.setState({isLocationEnable:true});
      this._getLocationAsync();
    } 

  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        location: 'Permission to access location was denied',
      });
    }

   try{let location = await Location.getCurrentPositionAsync({});

   var locationObject = {latitude:location.coords.latitude, longitude:location.coords.longitude}
    this.setState({ location:locationObject });
    var date = new Date();
    var timestamp = date.getTime();
    firebase.firestore().collection('locations').doc(global.userInfo.userUid).set({userUid:global.userInfo.userUid,latitude:locationObject.latitude,longitude:locationObject.longitude,timestamp:timestamp});
   
  } catch(error)
  {
    if(Location.hasServicesEnabledAsync == false)
    {
      this._getLocationAsync();
    }
    else
    {
      alert(error);
    }
  }



  };

  resimyukle = async() =>{

    
      
      let promise = new Promise(async (res, rej) => {
        await setTimeout(() => {
          console.log('yüklendi 1')
          res('abiii');
         
         }, 5000)
   

    })
   

 
 
    };
  // Load Channel List
  async componentDidMount(){
  //  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    this.getPermissionAsync();
    LoadChannelList = async ()=> {
      this._getItemQuota();
        var db = firebase.database();
        const userToken = await AsyncStorage.getItem('userToken');
        // Kullanıcının Konuşma Kanallarını Çek
        var ref = db.ref('channelConnections/' + userToken).child('channels').orderByChild('last_time');
        var self = this;
        
     
      ref.on("value", (snapshot) => {
            if(snapshot.exists()) {     // Kulanıcı Adı Var mı ? (Real Time Database)

                  this.setState({tempItemQuota:[]});
                    var data = Object.keys(snapshot.val())
                    
                    
                  
                    if(data.length == 0){ // Hiç Konuşması Yok İse
                  
                      self.setState({isKonusmaYok:true,isEverythingReady:true})
                      self._saveItemQuota(true);
                      self.setState({ItemQuota:[]});
                      self._saveItemQuota(true);
                      return;
                      
                    }
                    else{
                       
                      self.setState({isKonusmaYok:false})
                      channelArray = data;
                      var channelSize = channelArray.length
                     
                     
                      
                      channelArray.map((kanalid,index)=>
                      {
                      
                        var notReadedMessage = snapshot.val()[kanalid]['unReadMessage'];
                        var timestamp_gelen = parseFloat(snapshot.val()[kanalid]['last_time'].toString().slice(0,-3));
                        var now = parseFloat(new Date().getTime().toString().slice(0,-3));
                        var desc ='';
                        var PPUri = '';
                        var onay = snapshot.val()[kanalid]['onay'];
                        var last_time = snapshot.val()[kanalid]['last_time'];
                        var isGroup = '';
                        var userArray = [];
                        var displaynameRef = '';
                        const dbh_firestore = firebase.firestore();
                        const  kanalRef =  dbh_firestore.collection('channels').doc(kanalid)
                        
                        kanalRef.get()
                      .then((docSnapshot) => {
                        desc = docSnapshot.data().desc;
                        PPUri = '';
                        isGroup = docSnapshot.data().isGroup;
                        userArray = docSnapshot.data().users
                        userArray = Object.keys(userArray);
                        
                        
                      
                                if(!docSnapshot.data().isGroup)
                                  {
                                    
                                    
                                var self = this;
                                    // Eğer Kanal Bir Grup Değilse, Useri Çek
                                                                    
                                        var karsiUserId = userArray[0] == userToken ? userArray[1] : userArray[0];
                                      
                                      var karisik = '';
                                        const  UserRef2 =  firebase.firestore().collection('users').doc(karsiUserId)
                                      
                                        UserRef2.get()
                                        .then(async (docSnapshot2) => {
                                        
                                                
                                            
                                                      displaynameRef = docSnapshot2.data().name
                                              
                                                      var username = docSnapshot2.data().username;
                                                      
                                                      
                                                              PPUri= docSnapshot2.data().profilephoto;
                                                              if(notReadedMessage > 0 && (now >= timestamp_gelen && now <= timestamp_gelen + 5))
                                                              {
                                                                this.sendNotificationImmediately(displaynameRef,notReadedMessage);
                                                                
                                                              }
      
                                                       finalSonuc(kanalid,displaynameRef,desc,PPUri,last_time,index,notReadedMessage,onay);
                                                             
                                                            
                                                   

                                                   
                                                        
  
  
                                        })
                                      
                                    
                                  }
                                  else{
                                  displaynameRef = docSnapshot.data().displayname;
                                    PPUri = docSnapshot.data().PPUri;
                                    finalSonuc(kanalid,displaynameRef,desc,PPUri,last_time,index,notReadedMessage,onay)
                                  }
                          
  
                      });
                    
                      });
  
                      function finalSonuc(kanalid,displaynameRef,desc,PPUri,last_time,index,notReadedMessage,onay)
                      {
                        
                     
                          // console.log('-----' + kanalid + ' | ' + displaynameRef + ' | ' + desc + ' | ' + PPUri + ' ----- ' );
                        // { id: 'AKSJDHASUIDHASJ',displayname:'Fırat Doğan', desc:'2015 Yılında Katıldı', PPUri: 'https://www.belbim.istanbul/FileManager/Image/Belbim/Person/FatihOzdemir.jpg'  },
                      
                      var gelenArray = self.state.tempItemQuota;
                      var pushItem = {id:kanalid,displayname:displaynameRef,desc:desc,PPUri:PPUri,last_time:last_time,notReadedMessage:notReadedMessage,onay:onay} // Bura Yukardaki ile Aynı Olcaak
                      gelenArray.push(pushItem)
                        
                        self.setState({tempItemQuota:gelenArray,isEverythingReady:true});
                      
  
                        if((index + 1) == channelSize) // Burası Listenin Sonu
                        {
                          
                          self.setState({ItemQuota:self.state.tempItemQuota});
                          self._saveItemQuota(false);
  
                          
                        }
                      
                      
  
                      }
                    }
                

                    }

            
    
        }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
        


      }
      LoadChannelList();

    
}


// BUNLAR OFFLINE İKEN VAR OLAN VERİLERİ YÜKLİCEK
      _saveItemQuota = async (bosMu) => {
      if(bosMu == false)
      {
            try {
              await AsyncStorage.setItem('ItemQuota', JSON.stringify(this.state.tempItemQuota));
            } catch (error) {
            
            }
      }
      else{
        await AsyncStorage.setItem('ItemQuota', '{}');
      }
      };

      _getItemQuota = async () => {
        try {
          
          const ItemQuotaValue = await AsyncStorage.getItem('ItemQuota');
        
          if (ItemQuotaValue != null) {
            
            this.setState({ItemQuota:JSON.parse(ItemQuotaValue),isKonusmaYok:false});
          }
        } catch (error) {
         
          // Error saving data
        }
      };

      //----------------------------------------------


      _saveUserInfo = async (gelenArray) => {
  
        try {
          await AsyncStorage.setItem('userInfo', JSON.stringify(gelenArray));
        } catch (error) {
        
        }
      };

      _getUserInfo= async () => {
        try {
          
          const userInfoArray = await AsyncStorage.getItem('userInfo');
         
          if (userInfoArray != null) {
     
            this.setState({isEverythingReady:true})
            var userInfoArrayParse = JSON.parse(userInfoArray);
            this.setState({username:userInfoArrayParse.username});
            this.setState({email:userInfoArrayParse.email});
            this.setState({name:userInfoArrayParse.name});
            this.setState({PPUri:userInfoArrayParse.profilePhotoUri});

      
          }
        } catch (error) {}
      };


// BUNLAR OFFLINE İKEN VAR OLAN VERİLERİ YÜKLİCEK -----------------------------------








  static navigationOptions = {
   
    header: null,
    headerMode: 'none',
  };



  
  


  render() {
   
  
  return (
   
    <View style={homeScreenStyle.container}>
      {!this.state.isEverythingReady && <LoadingScreen />}

    

      
       
       
       
        <ScrollView style={{marginBottom:5,}}>
      <ImageBackground style={homeScreenStyle.backgroundImage} source={require('../assets/images/background.png')}>
       
        <View style={homeScreenStyle.headBar}>
        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
          <Ionicons name={"md-menu"} size={36} color={"#FFF"} />
          </TouchableOpacity>
              <Text style={homeScreenStyle.headText}>LeboGram</Text>
              <Ionicons name={"ios-add"} size={36} color={"#FFF"} />
          </View>

            <View style={homeScreenStyle.userProfile}>
            <Ripple style={homeScreenStyle.userProfile} onPress={()=>this.props.navigation.navigate('userQRCode')}>
        <Image source={{uri:this.state.PPUri}} style={{width:67,height:67,borderRadius:67/2,borderColor:'green',borderWidth:2}} />
        <View style={homeScreenStyle.profileTextContainer}>
          <Text style={homeScreenStyle.textTitle}>{this.state.name}</Text>
         <Text style={homeScreenStyle.textSubtitle}>{this.state.isLocationEnable?'Yakındakiler tarafından görülmeye açıktır.':'Yakındakiler tarafından görülmezsiniz.'}</Text>
        </View>
        </Ripple>
        <TouchableOpacity  onPress={()=>{this.LocationServices();}} ><Ionicons style={{marginLeft:10}}name={this.state.isLocationEnable?'ios-volume-high':'ios-volume-off'} size={50} color={"#FFF"} /></TouchableOpacity>

              </View>
      

      
    
      <View style={{height:60}}></View>
 </ImageBackground>
     
      <View style={homeScreenStyle.sharePanel}>
         <TouchableOpacity onPress={()=>this.props.navigation.navigate('QRScanner')} style={homeScreenStyle.sharePanelIcons}><Ionicons style={{marginLeft:10}}name={"ios-barcode"} size={45} color={"#6E6EE8"} /></TouchableOpacity>
          <TouchableOpacity   style={homeScreenStyle.sharePanelIcons} onPress={()=>{if(this.state.isLocationEnable && this.state.location != null){this.props.navigation.navigate('UserSearch',{location:this.state.location})}else{alert('Önce Görünürlüğünüzü açık yapın')}}}><Ionicons style={{marginLeft:10}}name={"ios-radio"} size={45} color={"#6E6EE8"} /></TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserSearch')} style={homeScreenStyle.sharePanelIcons}><Ionicons style={{marginLeft:10}}name={"ios-search"} size={45} color={"#6E6EE8"} /></TouchableOpacity>
      </View>
      
      

      <View style={homeScreenStyle.contentIc}>
          
          <View style={homeScreenStyle.contentHeader}>
          <Ionicons name={"ios-filing"} size={24} color={"#6E6EE8"} />
          <Text style={homeScreenStyle.contentHeaderText}>GELEN KUTUSU</Text>
      </View>
   
     {/* BURASI CONTENT ANA İÇERİK KISMI */}
    

{!this.state.isKonusmaYok && this.state.ItemQuota.length > 0 && 
     <FlatList
          data={this.state.ItemQuota}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
            navigate={this.props.navigation}
              {...item}
              onSwipeFromLeft={() => alert('swiped from left!')}
              onRightPress={() => alert('pressed right!')}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
          }
       
{this.state.isKonusmaYok && 

  <View style={{width:100 + '%',height:200,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:20}}>
     <Ionicons name={"md-sad"} size={65} color={"#999"} />
    <Text style={{fontSize:16,marginTop:10,color:'#999'}}>Hiç Etkileşimin Yok</Text>
    </View>
}
         
        </View>

   

      
      </ScrollView>
    </View>
  );
  }
}






export default HomeScreen;

const homeScreenStyle = 
{
    container: {
    flex: 1,
    backgroundColor: '#CCC',
  },
  backgroundImage:
  {

    paddingTop:30,
  },
  headBar:
  {
    height:50,
    width:100+'%',
    paddingLeft:5,
    paddingRight:5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  headText:
  {
    fontSize:25,
    color:'#FFF',
    width:Dimensions.get('screen').width - 90,
    textAlign:'center',
    
  },
  userProfile:
  {
      flexDirection:'row',
      width:'auto',
      alignSelf:'center',
      alignItems:'center',
      marginTop:10,

  },
  profileTextContainer:
  {
    marginLeft:15,
    marginTop:-5,
    marginRight:15,
  },
  textTitle:
  {
    fontSize:23,
    color:'#FFF',
    
    fontWeight: 'bold',
    
  },
  textSubtitle:
  {
    fontSize:10,
    color:'#FFF',
  },
  sharePanel:
  { 
    width:90 + '%',
    height:67,
    backgroundColor:'#FFF',
    borderRadius:50,
    alignSelf:'center',
    marginTop:-35,
    flexDirection:'row',
    paddingLeft:20,
    paddingRight:20,
    justifyContent:'center',
      ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 10,
      },
    }),

  },
  sharePanelIcons:{
    width:33+'%', 
    alignItems:'center',
    justifyContent:'center',
  },
  contentIc:
  {
    width:93+'%',
    borderRadius:5,
    marginTop:15,
    backgroundColor:'#FFF',
    minHeight:Dimensions.get('screen').height - 330,
    alignSelf:'center',
  },
  contentHeader:
  {
    width:100+'%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
    marginBottom:3,
  },
  contentHeaderText:
  {
    fontSize:17,
    color:'#6E6EE8',
    fontWeight:'bold',
    marginLeft:10,
  },
  kisiListItem:
  {
    
    width:100 + '%',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:13,
    height:70,

  
  },
  kisiListItemContentContainer:
  {
      flexDirection:'row',
      borderBottomWidth:1,
      borderColor:'#CCC',
      height:100 + '%',
      width:Dimensions.get('screen').width - 125,
      marginLeft:15,
      paddingTop:2,
      
  },
  kisiListItemTextcontainer:
  {
    marginTop:5,
    width:Dimensions.get('screen').width - 140,

  },
  kisiListItemTextHeader:
  {
    fontSize:17,
    fontWeight:'500',
    color:'#444',
    marginBottom:3,

  },
  kisiListItemTextSubTitle:
  {
    color: '#666',
  },
  kisiListItemArrow:
  {
    alignSelf:'center',
    justifyContent:'center',
  },
};
