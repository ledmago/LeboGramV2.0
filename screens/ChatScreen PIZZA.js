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
  Text,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
//import all the components we will need
 
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {},
      photos: null,
      selected:[],
      selectedItems:[],
      secItem:[],
    };
  }
  static navigationOptions = {
    headerBackTitle:'Geri',
    headerTintColor: '#6E6EE8',
  
    title: '',
    headerTitleStyle: {
      color:'red',
      textAlign:'center',
      width:90 + '%',

    },
    headerRight: (
      <TouchableOpacity style={{marginRight:15}}><Text style={{ color:'#6E6EE8',fontSize:16,fontWeight:'bold'}}>Gönder</Text></TouchableOpacity>
    ),
    
  };
 
  componentDidMount() {

    this._getPhotosAsync().catch(error => {
      console.error(error);
    });
    var that = this;
    let items = Array.apply(null, Array(13)).map((v, i) => {
      return { id: i, src: 'https://cdn.webtekno.com/media/cache/content_detail_v2/article/60023/da-vinci-nin-unlu-tablosu-mona-lisa-hakkinda-muhtemelen-simdi-ogreneceginiz-7-bilgi-1545996367.jpg' };
    });
    that.setState({
      dataSource: items,
    });
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
          resizeMode="contain"
          style={{ height: 100, width: 100, resizeMode: 'contain' }}
        />
      );
    }
    return images;
  }




  async _getPhotosAsync() {
    let photos = await CameraRoll.getPhotos({ first: 25,
    
      ...Platform.select({
        ios: {groupTypes: 'All'},
      })
    
    
    });
    for(var i = 0; i < photos.edges.length; i++)
    {
      photos.edges[i].node.image.selected = false;
    }
    this.setState({ photos:photos.edges });

  

 

  }
  findObjectByKey(array, key, value) {
    try{
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return false;
  }
  catch(error)
  {
    return false
  }
}

SelectedItemBul(indexgelen)
{
  this.state.selectedItems.map((data)=>{
    if(data.index == indexgelen)
    {
     return data.selected;
    }

  })
}
selectEvent(gelenImage,indexgelen)
{


  
  gelenImage.index = indexgelen;
  gelenImage.selected = true;
  var tempselectedItems = this.state.selectedItems;
  tempselectedItems.push(gelenImage)
  this.setState({selectedItems:tempselectedItems})
  Vibration.vibrate(60);

  

 /* this.setState(prevState => {
    let jasper = Object.assign({}, prevState.photos[indexgelen].node.image);  // creating copy of state variable jasper
    jasper.selected = true;                     // update the name property, assign a new value                 
    return { jasper };                                 // return new object jasper object
  })*/

  //alert(this.state.photos[indexgelen].node.image.selected);
 

}

  render() {
  
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.photos}
          extraData={this.state.selectedItems}
          selected={true}
          renderItem={({ item,index }) => (
            <TouchableOpacity onPress={()=> this.selectEvent(item.node.image,index)} style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
           
             <Image style={styles.imageThumbnail} source={{ uri: item.node.image.uri}} />
             {false && <View style={{width:100 + '%',height:100 + '%',backgroundColor:'blue',opacity:0.5,position:'absolute',left:0,top:0}}></View>}
             {false && <View style={{right:0,bottom:0,width:40,height:40,position:'absolute',alignItems:'center',justifyContent:'center'}}><Ionicons name={"ios-checkmark-circle"} size={36} color={"#FFF"} /></View>}
            
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
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});