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
  Picker,
  ImageEditor
} from 'react-native';
import * as Permissions from 'expo-permissions';
import Ripple from 'react-native-material-ripple';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
//import all the components we will need
import Constants from 'expo-constants';
import firebase from '../components/Firebase';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import ProgressCircle from 'react-native-progress-circle'
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
      UploadingNowImgUri: null,
      selectedCountUploaded:0,
      UploadPercent:0,

    };
    this.MaxSelectCount = 10
    
    
  }

  static navigationOptions = ({ navigation }) => {
       return {
      headerBackTitle:'Geri',
      headerTintColor: '#6E6EE8',
    
      title: 'Resim Seç',
      headerTitleStyle: {
        color:'#666',
        textAlign:'center',
        width:90 + '%',
  
      },
      headerRight: (
       <TouchableOpacity onPress={navigation.getParam('ResimGonderFirebaseNavigation')} style={{marginRight:15}}><Text style={{ color:'#6E6EE8',fontSize:16,fontWeight:'bold'}}>Gönder</Text></TouchableOpacity>
      ),
    };
  };


  
 

  getPermissionAsync = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  async componentDidMount() {
        this.props.navigation.setParams({ ResimGonderFirebaseNavigation: this.ResimGonderFirebase});
    this.getPermissionAsync();
        this._getPhotosAsync().catch(error => {
          console.error(error);
        });
        var that = this;

        // Diğer Media Albümlerini Yükle
    
          const albums3 = await MediaLibrary.getAlbumsAsync()
          this.setState({albums:albums3})

   }


/*

 Object {
      "node": Object {
        "group_name": "WhatsApp Images",
        "image": Object {
          "height": 1600,
          "uri": "file:///storage/emulated/0/WhatsApp/Media/WhatsApp Images/IMG-20190809-WA0004.jpg",
          "width": 1200,
        },
        "timestamp": 1565349310,
        "type": "image/jpeg",
      },
    },
*/

  _renderPhotos(photos) {
    let images = [];
    for (let { node: photo } of photos.edges) {
      images.push(
        <Image
        key={Math.random()}
          source={photo.image}
          resizeMode='contain'
          style={{ height: 100, width: 100, resizeMode: 'contain' }}
        />
      );
    }
    return images;
  }




  async _getPhotosAsync() {
    let photos = await CameraRoll.getPhotos({ 
      first: 50000,
    
      ...Platform.select({
        ios: {groupTypes: 'All'},
      })
    
    })
    /*.then(
      (result) => {
          const groupNamesAr = result.map(
              (item) => {
                  return item.node.group_name;
              }
          )(result.edges)
          groupNames = R.countBy((i)=>i)(groupNamesAr);
          console.log(groupNamesAr)
      }
  )
  ;*/
    for(var i = 0; i < photos.edges.length; i++)
    {
        photos.edges[i].node.isSelect = false;
        photos.edges[i].node.index = i;
    }
    this.setState({ photos:photos.edges });

  

 

  }
  UploadComplate = () =>{
  
    /*var tempstatePhotos = this.state.photos;
    tempstatePhotos.map((data)=>
    {
      data.node.isSelect = false;
      
    })
    this.setState({photos:tempstatePhotos,selectedCount:0})*/
    this.setState({isUploadButton:false,progress:0})
    this.props.navigation.navigate('ChatScreen');
  }

    
  increaseProgressbar = () =>
  {
    var select = this.state.selectedCountUploaded + 1;
    this.setState({selectedCountUploaded:select})
   if(this.state.selectedCountUploaded == this.state.selectedCount)
   {
   
    this.setState({progress:100})
   }
   else{
  
    var exactvalue = 100 / this.state.selectedCount;
   
    this.setState({progress:this.state.progress + exactvalue,selectedCountUploaded:select})
   }
  
   
    
    
  }

  ResimGonderFirebase = async () =>{
   
  
      if(this.state.selectedCount > 0)
      {


      var selectedItems = [];
      if(this.state.selectedCount <= this.MaxSelectCount)
      {
       
        this.setState({isUploadButton:true,})
      
        
          this.state.photos.map((data)=>{
         
              if(data.node.isSelect == true)
              {
              
                selectedItems.push(data.node.image);
              
              }
        });

      
               selectedItems.map(async (data,index)=>{
      
        
                      var self = this;
                    // alert('gir' + index)

                      // Resim Boyutu Küçültme 


                      var CroppedUri = '';

                      cropData = {
                        offset:{x:0,y:0}, 
                        size:{width:data.width, height:data.height},
                      displaySize:{width:250, height:250}, //THESE 2 ARE OPTIONAL. 
                      resizeMode:'cover', 
                    }
                    // Crop the image. 
                    try{
                        await ImageEditor.cropImage(data.uri, 
                            cropData, async(successURI) => { 
                              CroppedUri = successURI
                                            


                      const response = await fetch(CroppedUri).catch((error)=>alert(error));
                      const blob = await response.blob();
                      const ImageName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // Random Name
                    
                      var ref = firebase.storage().ref().child('sendImages/' + this.state.kanalid + '/' + ImageName + '/small');
                    
                      ref.put(blob).then(async function(){
                        
                        self.setState({UploadingNowImgUri:data.uri}); // Ekranda Resmi Göster
                        const responseBig = await fetch(data.uri);
                        const blobBig = await responseBig.blob();
                        var  refBig = await firebase.storage().ref().child('sendImages/' + self.state.kanalid + '/' + ImageName + '/big').put(blobBig).on('state_changed',
                      async function progress(snapshot) {
                    
                          this.percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                          self.setState({UploadPercent:this.percentage})
                        

                          if(this.percentage >99)
                          {
                          
                              // Yüklendini belirtmek için
                          self.increaseProgressbar();
                        



                          var db = firebase.database();
                          var date = new Date();
                          
                        var ref = await db.ref('chatMessages/'+ self.state.kanalid).push({
                          timestamp:date.getTime(),
                          type:'photo',
                          message:'none',
                          senderid:self.state.userToken,
                          photoName:ImageName,
                        }).then(()=>{     
                      
                    
                        });
                          
                          }






                        })
                        
                      
                      
                      }).catch(function(error){alert('hata')});
                            
                            
                            }, 
                            (error) =>{console.log('cropImage,',error)}
                        )
                    }
                    catch(error){
                      alert(error)
                    }


                      /*   
                          const smallImage = await ImageManipulator.manipulateAsync(
                            data.uri,
                            [{ resize: {width:250} }],
                          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                        ).catch((error)=>alert(error + '    -     ' + JSON.parse(data)));
                        // -------
                  */



          
              });

            
      }
     
    }



  }


AlbumChanged = async(itemValue) => {

  this.setState({selectedCount : 0});
  if(itemValue == null)
  {
   this._getPhotosAsync();
  }
  else{

    if(itemValue.length > 0)
    {
   

      const media = await MediaLibrary.getAssetsAsync({
        first:50000,
        mediaType: MediaLibrary.MediaType.photo,
        SortBy:MediaLibrary.SortBy.creationTime,
        album:this.state.selectedPicker
    });
  
    var tempArray = [];
    media.assets.reverse();
    media.assets.map((data,gelenIndex) => { // Photos Arrayine benzettik
      var item = {
        node:{group_name:data.albumId,image:{height:data.height,width:data.width,uri:data.uri},timestamp:data.creationTime,type:data.mediaType,isSelect:false,index:gelenIndex}
      };
     
      tempArray.push(item)
  
    });
  
  
  
    
    this.setState({ photos: tempArray });
    
    }
  }
 
}


selectItem = (data,gelenindex) => {
  doislem = () =>
  {
        var tempselectedCount = this.state.selectedCount;
        if(!data.node.isSelect) {tempselectedCount++}else{tempselectedCount--}
        this.setState({selectedCount:tempselectedCount})
      
      
      
        data.node.isSelect = !data.node.isSelect;
        data.node.index = gelenindex;
        data.node.selectedClass = data.node.isSelect? true:false;
      
      
      
        /*const index = this.state.photos.findIndex(
          item => data.index === item.node.image.index
        );*/
      
        this.state.photos[gelenindex].node = data.node;
      this.setState({
        photos: this.state.photos,
      });
  }

  

  if(this.state.selectedCount < this.MaxSelectCount) // Eğer Resim Adedi Sınırını Aştıysa
  {
    
    doislem();
          
  }
  else{
    if(data.node.isSelect == true) // Eğer Resimi Çıkarmak İstiyorsa
    {
      doislem();
    }
  }

};
  render() {
    const progressCustomStyles = {
      backgroundColor: '#EBEBEB', 
      borderRadius: 10,
      borderColor: 'gray',
      flex:1,
    };
    let pickerItems = [];
    this.state.albums.map((data) => {
      pickerItems.push({label:data.title + ' (' + data.assetCount + ') ',value:data.id})
     })
    return (
      <View style={styles.MainContainer}>
       
       
       
       
        <View style={{width:90 + '%', height:80,alignItems:'center',justifyContent:'flex-start',alignSelf:'center',flexDirection:'row',}}>
          <Image source={{uri:this.state.PPUri}} style={{width:60,height:60,borderRadius:60/2,}}/>
         <View style={{marginLeft:15}}>
            <Text style={styles.kisiListItemTextHeader}>{this.state.displayname}</Text>
            <Text style={styles.kisiListItemTextSubTitle}>{this.state.desc}</Text>
          </View>
        </View>






<View style={{height:50,width:100 + '%', backgroundColor:'#CCC',paddingLeft:10}}>


<RNPickerSelect
placeholder={{label:'Hepsi',}}
placeholderTextColor='#000'
style={{color:'#000'}}
      onValueChange={(value) => { this.setState({selectedPicker:value});this.AlbumChanged(value)}}
      items={pickerItems}
    />
<Text style={{position:'absolute',right:10,top:10,fontSize:18, width:130,height:30,justifyContent:'center',paddingTop:2,textAlign:'center',backgroundColor:'#6E6EE8',borderRadius:5,color:'#FFF'}}>{this.state.selectedCount} Seçilen</Text>

</View>



      
        {/* Upload edildiğindeki yükleme ekranı (popup)*/
            
              this.state.isUploadButton && 
             
                <View style={{zIndex:9999999999999,width:Dimensions.get('screen').width, height:Dimensions.get('screen').height,position:'absolute',bottom:0,left:0}}>
             
                    <View style={styles.containerblock}>
                   
                 
                    </View>


                    <View style={{backgroundColor:'#444',width:80 + '%',height:350,position: 'absolute',zIndex:99999,alignSelf:'center',top:(Dimensions.get('screen').height/2) - (350/2) - 50}}>
                    <Image source={{uri:this.state.UploadingNowImgUri}} style={{width:100 + '%', height:100+ '%'}}/>
                    <View style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <ProgressCircle
            percent={this.state.UploadPercent}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{Math.round(this.state.UploadPercent)}</Text>
        </ProgressCircle>
                      
                      </View>
                    </View>
                  
                     <View style={styles.uploadPopUp}>
                      <View style={{alignItems:'center',width:100+ '%',alignSelf:'center',justifyContent:'center',backgroundColor:'#333',position:'absolute',top:0,height:150}}>
                        <View style={{width:Dimensions.get('screen').width - 80,backgroundColor:'grey',borderRadius:10,}}>
                          <ProgressBarAnimated
                            {...progressCustomStyles}
                              width={Dimensions.get('screen').width - 80}
                            
                              value={this.state.progress}
                              
                              onComplete={() => {
                              this.UploadComplate();
                              }}
                            />
                            </View>
                    <Text style={{color:'#FFF',marginTop:20}}>Yüklenen Resim : {this.state.selectedCountUploaded} / {this.state.selectedCount}</Text>
                    <Text style={{color:'#FFF',marginTop:10}}>Lütfen bekleyin, fotoğraflar gönderiliyor..</Text>
                    </View>
                            <Ripple style={{position:'absolute',bottom:0,justifyContent:'center',width:100 + '%',height:60,alignItems:'center'}} onPress={()=>this.props.navigation.navigate('ChatScreen')}> 
                            <Text style={{color:'#EBEBEB',fontSize:18}}>İptal Et</Text>
                            </Ripple>
                    </View>
              </View>
             
           }
       



        <FlatList
          data={this.state.photos}
          extraData={this.state}
        
          renderItem={({ item,index }) => (
            <TouchableOpacity onPress={()=> this.selectItem(item,index)} style={[{flex: 1, flexDirection: 'column', margin: 1 },item.selectedClass]}>
           
             <Image style={styles.imageThumbnail} source={{ uri: item.node.image.uri}} />
             {item.node.isSelect && <View style={{width:100 + '%',height:100 + '%',backgroundColor:'blue',opacity:0.5,position:'absolute',left:0,top:0}}></View>}
             {item.node.isSelect && <View style={{right:0,bottom:0,width:40,height:40,position:'absolute',alignItems:'center',justifyContent:'center'}}><Ionicons name={"ios-checkmark-circle"} size={36} color={"#FFF"} /></View>}
            
            </TouchableOpacity>
          )}
          //Setting the number of column
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    
  },
  selected: {backgroundColor: "#FA7B5F"},
  containerblock:{
    position:'absolute',
    bottom:0,
    top:0,
    width:100 + '%',
    height:100 + '%',
    backgroundColor:'#222',
    opacity:0.6,
    zIndex:9998
  },
      uploadPopUp:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
      bottom:0,
      width:100 + '%',
      zIndex:9999,
      height:210,
      backgroundColor:'#252526',
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.6,
          shadowRadius: 10,
        },
        android: {
          elevation: 50,
        },
      }),

     
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
});