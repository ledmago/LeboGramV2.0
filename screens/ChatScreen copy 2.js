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
  Animated,
  AsyncStorage,
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
const { width } = Dimensions.get("window");
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
      Posts:[],
      selectedPicker:'',
      active: 0,
      xTabOne: 0,
      xTabTwo: 0,
      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(width),
      translateY: -1000
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


 // Offline İken Fotoğraf Yükle 
_ListSave  = async() =>
{
  
    await AsyncStorage.setItem('_' + this.state.kanalid, JSON.stringify(this.state.Posts));

}
_GetList = async() =>
{
    const ListItems = await AsyncStorage.getItem('_' + this.state.kanalid);

        
        if (ListItems != null) {
        
  
             
            this.setState({Posts:JSON.parse(ListItems)});
  
          
      
       
        }

}

 // ---------------------------- 
  componentDidMount() {
    this._getChannelPhotos();

    this.props.navigation.setParams({NavigationTitleDisplayName:this.state.displayname});
    var that = this;
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, src: 'https://image.yenisafak.com/resim/imagecrop/2019/03/13/05/35/resized_9dd7b-d08c1039monalisa.jpg' };
    });
    that.setState({
      dataSource: items,
    });


  }
     
    





  
  handleSlide = type => {
    let {
        active,
        xTabOne,
        xTabTwo,
        translateX,
        translateXTabOne,
        translateXTabTwo
    } = this.state;
    Animated.spring(translateX, {
        toValue: type,
        duration: 100
    }).start();
    if (active === 0) {
        Animated.parallel([
            Animated.spring(translateXTabOne, {
                toValue: 0,
                duration: 100
            }).start(),
            Animated.spring(translateXTabTwo, {
                toValue: width,
                duration: 100
            }).start()
        ]);
    } else {
        Animated.parallel([
            Animated.spring(translateXTabOne, {
                toValue: -width,
                duration: 100
            }).start(),
            Animated.spring(translateXTabTwo, {
                toValue: 0,
                duration: 100
            }).start()
        ]);
    }
};




_getChannelPhotos = () =>
{
    this._GetList()
  var db = firebase.database();
    var ref = db.ref('chatMessages/' + this.state.kanalid);
    var self = this;
   
    ref.on("value", (snapshot) => {
        if(snapshot.exists())
        {

       
        this.setState({Posts:[]});
        var keys = Object.keys(snapshot.val());
        var son_item = keys.length - 1;
       var firat = snapshot.val();
     
        keys.map(async(item,index)=>{
            
            var firat = snapshot.val()[item]
       
          
            var message = firat.message;
           
            var photoName = firat.photoName;
            var senderid = firat.senderid;
     
            var timestamp = firat.timestamp;
            var type = firat.type;
            
           
         /* const ref = await firebase.storage().ref('sendImages/IawIXQmBnvmg1eJ4R9hJ/ph2iaz7y5bg3zbxbkvcz');
           const url = ref.getDownloadURL();*/
              
          
                 // Buraası Arızalı
                 var size = '%2Fsmall';
           var urlForSize = 'https://firebasestorage.googleapis.com/v0/b/lebogram-4312a.appspot.com/o/sendImages'+ '%2F' + this.state.kanalid + '%2F' + photoName + size + '?alt=media';
         
           // var url2 = 'https://iasbh.tmgrup.com.tr/aa940f/752/397/0/1/700/370?u=https://isbh.tmgrup.com.tr/sb/album/2019/01/09/mona-lisa-tablosunun-buyuk-sirri-cozuldu-iste-mona-lisanin-gizemi-1547019790330.jpg';
          
         
              var tempArray = self.state.Posts;
              
            tempArray.push({message:message,photoName:urlForSize,senderid:senderid,timestamp:timestamp,type:type});
         
            self.setState({Posts:tempArray});
            if(son_item == index && index >= 0)
            {
             
                self._ListSave();
            }
         
        });

    }
    });


  
}
  render() {
    let {
      xTabOne,
      xTabTwo,
      translateX,
      active,
      translateXTabOne,
      translateXTabTwo,
      translateY
  } = this.state;
    return (
<View style={{flex:1}}>

<TouchableOpacity style={{width:60,height:60,borderRadius:60/2,position:'absolute',backgroundColor:'green',right:0,bottom:50,zIndex:9999,justifyContent:'center',alignItems:'center'}} onPress={()=>this.props.navigation.navigate('ImageUpload',{kanalid:this.state.kanalid,displayname:this.state.displayname,desc:this.state.desc,PPUri:this.state.PPUri})}><Ionicons name={"ios-settings"} size={25} color={"#FFF"} icon/></TouchableOpacity>
<ScrollView style={{marginTop:-60}}>
   
<ImageBackground style={{width:100 + '%', height:110,marginTop:0}} source={{uri:this.state.PPUri}}   blurRadius={1}>

</ImageBackground>
      
      <View style={styles.MainContainer}>
       
       <View style={{width:100,height:100,borderRadius:100/2,alignItems:'center',alignSelf:'center',backgroundColor:'#FFF',marginTop:-50,justifyContent:'center'}}>
         <Image source={{uri:this.state.PPUri}} style={{width:92,height:92,borderRadius:92/2,}}/>
         </View>
       
         
         <View style={{marginLeft:15,alignItems:'center',justifyContent:'center',marginBottom:0,}}>
            <Text style={styles.kisiListItemTextHeader}>{this.state.displayname}</Text>
            <Text style={styles.kisiListItemTextSubTitle}>{this.state.desc}</Text>
          </View>
      
{/*
      <View style={{flexDirection:'row',height:10,width:95 + '%',marginBottom:40,}}>
       <Button buttonStyle={{width:Dimensions.get('screen').width/3 - 5,marginLeft:2,marginRight:2,height:32,borderRadius:2}} title='Koleksyon' />
       <Button buttonStyle={{width:Dimensions.get('screen').width/3 - 5,marginLeft:2,marginRight:2,height:32,borderRadius:2}}title='Zaman Tüneli' />
      <Button  buttonStyle={{width:Dimensions.get('screen').width/3 - 5,marginLeft:2,marginRight:2,height:32,borderRadius:2}} title='Gidenler' />
      </View>
            <Button onPress={()=>this.props.navigation.navigate('ImageUpload',{kanalid:this.state.kanalid,displayname:this.state.displayname,desc:this.state.desc,PPUri:this.state.PPUri})} title='Tıkla' />
       

*/}
     
      </View>



      <View style={{ width: 100 + '%' }}>
                <View
                    style={{
                        width: "98%",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 40,
                            marginBottom: 20,
                            height: 36,
                            position: "relative"
                        }}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: "50%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                backgroundColor: "#007aff",
                                borderRadius: 4,
                                transform: [
                                    {
                                        translateX
                                    }
                                ]
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#007aff",
                                borderRadius: 4,
                                borderRightWidth: 0,
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabOne: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 0 }, () =>
                                    this.handleSlide(xTabOne)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 0 ? "#fff" : "#007aff"
                                }}
                            >
                                Koleksyon
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "#007aff",
                                borderRadius: 4,
                                borderLeftWidth: 0,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }}
                            onLayout={event =>
                                this.setState({
                                    xTabTwo: event.nativeEvent.layout.x
                                })
                            }
                            onPress={() =>
                                this.setState({ active: 1 }, () =>
                                    this.handleSlide(xTabTwo)
                                )
                            }
                        >
                            <Text
                                style={{
                                    color: active === 1 ? "#fff" : "#007aff"
                                }}
                            >
                                Zaman Tüneli
                            </Text>
                        </TouchableOpacity>
                        
                    </View>

                    <ScrollView>
                        <Animated.View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabOne
                                    }
                                ]
                            }}
                            onLayout={event =>
                                this.setState({
                                    translateY: event.nativeEvent.layout.height
                                })
                            }
                        >
                                  <View style={{width:100 + '%'}}>
                                              <FlatList
                                      data={this.state.Posts}
                                      extraData={this.state}
                                      renderItem={({ item }) => (
                                        <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                            <TouchableOpacity><Image style={styles.imageThumbnail} source={{ uri: item.photoName }} /></TouchableOpacity>
                                        </View>
                                      )}
                                      //Setting the number of column
                                      numColumns={3}
                                      keyExtractor={(item, index) => index.toString()}
                                      />
                                  </View>


                            <View style={{ marginTop: 20 }}>
                              
                            </View>
                        </Animated.View>

                        <Animated.View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                transform: [
                                    {
                                        translateX: translateXTabTwo
                                    },
                                    {
                                        translateY: -translateY
                                    }
                                ]
                            }}
                        >
                            <Text>Hi, I am a cute dog</Text>
                            <View style={{ marginTop: 20 }}>
                                
                            </View>
                        </Animated.View>
                    </ScrollView>
                </View>
            </View>




      </ScrollView>
</View>

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