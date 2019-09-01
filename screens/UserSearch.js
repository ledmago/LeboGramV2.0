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
  Dimensions,
  AsyncStorage,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import firebase from '../components/Firebase';
import { SearchBar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserSearch extends React.Component {
  constructor(props)
  {
        super(props);
     
  }

  state = {
    search: '',
    isEverythingReady:false,
    tempItemQuota:[],
    ItemQuota:[],
    isItemQuotaFinish:false,
    displaynameRef:'asd',
    isUserNotFound:true,
    searchFoundSize:0,
    isLoading:false,

  

  }
  async _isRelationship(userId)
  {
      
      


  }
async componentDidMount()
{
  

  const gelenUserId = this.props.navigation.getParam('userUid',null);
  const gelenLocation = this.props.navigation.getParam('location',null);
  if(gelenLocation !=null)
  {
    var date = new Date();
    var now = parseFloat(new Date().getTime().toString().slice(0,-3))
    await firebase.firestore().collection('locations')
    .where('latitude', '>', gelenLocation.latitude - 0.0005)
    .where('latitude', '<', gelenLocation.latitude + 0.0005)
    .get().then((usersArray)=>{
      usersArray.forEach((users)=>{
        var ozaman = parseFloat(users.data().timestamp.toString().slice(0,-3))

        if(users.data().longitude > gelenLocation.longitude - 0.0005 && users.data().longitude < gelenLocation.longitude + 0.0005 && (now >= ozaman && ozaman  <= parseFloat(now + 120)) && users.data().userUid != global.userInfo.userUid)
        {
          

                        var self = this;
                        const dbh_firestore = firebase.firestore();
                        const  selectUser =  dbh_firestore.collection('users').doc(users.data().userUid)
                        
                        selectUser.get()
                      .then((docSnapshot) => {
                  
                        if(docSnapshot.exists)
                        {
                         
                          var indexNumber = 0;
                         this._finalSonuc(docSnapshot.data().name,docSnapshot.data().profilephoto,users.data().userUid,indexNumber,1) // 1 Yazdık Çünkü Sadece 1 kişiyi bulacak
                        }
                            })

        }
       

      })
    })
  }
  if(gelenUserId != null){

   
    
    var self = this;
    const dbh_firestore = firebase.firestore();
                  const  selectUser =  dbh_firestore.collection('users').doc(gelenUserId)
                  
                  selectUser.get()
                .then((docSnapshot) => {
            
                  if(docSnapshot.exists)
                  {
                   
                    var indexNumber = 0;
                   this._finalSonuc(docSnapshot.data().name,docSnapshot.data().profilephoto,gelenUserId,indexNumber,1) // 1 Yazdık Çünkü Sadece 1 kişiyi bulacak
                  }
                      })
  }



  



}

  _finalSonuc = (displaynameRef,PPUri,uid,index,size) =>
  {
    if(PPUri == null | PPUri == ''){ PPUri = 'https://firebasestorage.googleapis.com/v0/b/lebogram-4312a.appspot.com/o/profilephoto%2F' + uid + '%2Fsmall?alt=media';}
      this.setState({isUserNotFound:false})
            // console.log('-----' + kanalid + ' | ' + displaynameRef + ' | ' + desc + ' | ' + PPUri + ' ----- ' );
          // { id: 'AKSJDHASUIDHASJ',displayname:'Fırat Doğan', desc:'2015 Yılında Katıldı', PPUri: 'https://www.belbim.istanbul/FileManager/Image/Belbim/Person/FatihOzdemir.jpg'  },
        
        var gelenArray = this.state.tempItemQuota;
          var pushItem = {id:uid,displayname:displaynameRef,desc:'Kullanıcı',PPUri:PPUri,last_time:''} // Bura Yukardaki ile Aynı Olcaak
        gelenArray.push(pushItem)
          
        this.setState({tempItemQuota:gelenArray,isEverythingReady:true});


        
        if((index + 1) == size) // Burası Listenin Sonu
        {

          this.setState({ItemQuota:this.state.tempItemQuota});

          
          this.setState({isLoading:false})
  
        }
  }
  

    LoadChannelList = async (search)=> {
      this.setState({isLoading:true,tempItemQuota:[],ItemQuota:[]})
 
  
        var self = this;
        const dbh_firestore = firebase.firestore();
                      const  selectUser =  dbh_firestore.collection('users').where('username', '==', search)
                      
                      selectUser.get()
                    .then((docSnapshot) => {
                
                      if(docSnapshot.size > 0)
                      {
                        
                        var indexNumber = 0;
                        docSnapshot.forEach((doc) => {
                          
                           
                            this._finalSonuc(doc.data().name,doc.data().profilephoto,doc.id,indexNumber,docSnapshot.size)
                            indexNumber++;
                          })
                      }
                      else{
                        const  selectUserbyName =  dbh_firestore.collection('users').where('name', '==', search)
                        selectUserbyName.get().then((docSnapshot) => {
                          
                          if(docSnapshot.size > 0)
                          {
                            var indexNumber = 0;
                            docSnapshot.forEach((doc) => {
                              
                             
                                this._finalSonuc(doc.data().name,doc.data().profilephoto,doc.id,indexNumber,docSnapshot.size)
                                indexNumber++;
                              })
                          }
                          else{
                            // Artık Bulunamadı Bitir.
                            this.setState({isLoading:false})
                          }
                      });
                  }
                      

           

                   

                  }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
        


      }


    





  static navigationOptions = {
   
    headerBackTitle:'Geri',
    headerTintColor: '#777',
  
    title: 'Kullanıcı Ara',
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
      color:'#777',
      textAlign:'center',
      width:90 + '%',

    },
    headerRight: (
      <TouchableOpacity style={{marginRight:15}}><Ionicons name={"ios-settings"} size={25} color={"#FFF"} icon/></TouchableOpacity>
    ),
  };



  updateSearch = search => {
    this.setState({ search });
    this.LoadChannelList(search);
  };

  


  render() {
   
    const { search } = this.state;
  return (
   
    <View style={homeScreenStyle.container}>
      <SearchBar
   
        placeholder="Kullanıcı Adı"
      showLoading={this.state.isLoading}
        onChangeText={this.updateSearch}
        value={search}
        cancelButtonTitle='Vazgeç'
        lightTheme={true}
      />

{!this.state.isUserNotFound && 

  <FlatList
        data={this.state.ItemQuota}
        extraData={this.state}
        renderItem={({item}) =>
      
        <View onPress={()=>{}}>
        <View style={homeScreenStyle.kisiListItem}>
            <Image source={{uri:item.PPUri}} style={{width:60,height:60,borderRadius:60/2,}} />
            <View style={homeScreenStyle.kisiListItemContentContainer}><View style={homeScreenStyle.kisiListItemTextcontainer}>
              <Text style={homeScreenStyle.kisiListItemTextHeader}>{item.displayname}</Text>
              <Text style={homeScreenStyle.kisiListItemTextSubTitle}>{item.desc}</Text>
          </View>
          <View style={homeScreenStyle.kisiListItemArrow}>
                              <Button
                              onPress={() => {
                              
                             /*  

                                var GetDataRef = firebase.database().ref('channelConnections').child(global.userInfo.userUid);
                                GetDataRef.on('value',(snapshot)=>{
                                  if(snapshot.exists())
                                  {
                                    var datas = snapshot.val().channels;
                                    var channelArray = datas.split(","); // Giriş yapan kullanıcının kanalları
                                   
                                    // Giriş yapan kullanıcının kanlllarına aradğı user ile olan konuşması var mı diye bakıyoruz.
                                    channelArray.map((channelid)=>
                                    {
                                      var firestoreRef = firebase.firestore();
                                      var searchInArray = firestoreRef.collection('channels').doc(channelid)
                                      searchInArray.get()
                                      .then((docSnapshot) => {
                                        var userList = docSnapshot.data().users;
                                       
                                      });

                                    })






                                  }
                                  else{
                                    // Zaten hiç Kanalı Yok O yüzden direk İşlemi Başlat.
                                  }
                                    
                                  
                                  })*/

                        
                                var firestoreRef = firebase.firestore();
                                var searchInArray = firestoreRef.collection('channels')
                                .where("users." + global.userInfo.userUid, '==', true)
                                .where("users." + item.id, '==', true)
                                searchInArray.get()
                                .then((docSnapshot) => {
                                 var isGroup = null;
                                 docSnapshot.forEach((datasw)=>{
                                  if(isGroup  != false){isGroup = datasw.data().isGroup;}
                                  
                 
                                 })
                                

                                   
                                  if(docSnapshot.size > 0 && isGroup == false )
                                  {
                                   docSnapshot.forEach((snap)=>{
                                     // Kanal Zaten Varsa Oraya Yönlendir.
                                     var Karsiuserid = global.userInfo.userUid == Object.keys(snap.data().users)[0] ? Object.keys(snap.data().users)[1] : Object.keys(snap.data().users)[0];
                                     
                                    var userInfoCek = firebase.firestore().collection('users').doc(Karsiuserid);
                                    userInfoCek.get().then((userData)=>{
                                      
                                      // Buraya PPuri ekle databaseye
                                      this.props.navigation.navigate('ChatScreen',{kanalid:snap.id,displayname:userData.data().name,desc:snap.data().desc,PPUri:userData.data().profilephoto})
                                    })
                                    
                                   // this.props.navigation.navigate('');
                                  
                                  });
                                   
                                  }
                                  else{
                                
                                        // Bir Kanal Oloştur
                                        var date = new Date();
                                        var timestamp = date.getTime();
                                  
                                        var channelCreateRef = firebase.firestore().collection("channels").add({
                                          desc:'Kişisel',
                                          isGroup:false,
                                          onay:false,
                                          last_time:timestamp,
                                          users:{
                                            [global.userInfo.userUid]:true,
                                           [item.id] : true,
                                          }, });

                                          channelCreateRef.then((ref)=>{
                                           
                                              var kanalid = ref.id;
                                             
                                              firebase.database().ref('channelConnections').child(global.userInfo.userUid).child('channels').child(kanalid).set({last_time:timestamp,unReadMessage:0,onay:true})
                                              firebase.database().ref('channelConnections').child(item.id).child('channels').child(kanalid).set({last_time:timestamp,unReadMessage:0,onay:false})


                                              this.props.navigation.navigate('ChatScreen',{kanalid:kanalid,displayname:item.displayname,desc:item.desc,PPUri:item.PPUri})
                                              

                                            


                                          })

                               
                                  }

                                  
                                });
                              
                                // Önce Var olan kanalları al, sonra üzerine ekle
                               /* var ref = firebase.database().ref('channelConnections').child(global.userInfo.userUid);

                                  var newPostRef = ref.push();
                                  newPostRef.set({
                                   message:'none',
                                   type:'welcome',
                                   timestamp:'0',
                                  });

                                  var ref2 = firebase.database().ref('channelConnections').child(item.id);

                                  var newPostRef2 = ref2.push();
                                  newPostRef2.set({
                                   message:'none',
                                   type:'welcome',
                                   timestamp:'0',
                                  });
*/

                              }}
                              buttonStyle={{marginLeft:-50}}
                      title="Gönder"
                    />
          </View>
          </View>
        </View>
        </View>
      }
      />



          }
       
{this.state.isUserNotFound && 

  <View style={{width:100 + '%',height:200,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:20}}>
     <Ionicons name={"md-sad"} size={65} color={"#999"} />
    <Text style={{fontSize:16,marginTop:10,color:'#999'}}>Kullanıcı Bulunamadı</Text>
    </View>
}
         
        </View>

   

  
  );
  }
}




export default UserSearch;

const homeScreenStyle = 
{
    container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
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
