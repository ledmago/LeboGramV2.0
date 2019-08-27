import * as WebBrowser from 'expo-web-browser';
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
  AsyncStorage
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import { tsConstructorType } from '@babel/types';
import { createStackNavigator, createAppContainer, createDrawerNavigator,DrawerItems, SafeAreaView} from 'react-navigation';
import LinksScreen from './LinksScreen';
import SettingsScreen from './SettingsScreen';
import CustomDrawerContentComponent from './Drawer';
import firebase from '../components/Firebase';
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
    /*AsyncStorage.getItem("userToken").then((value) => {
      this.setState({"userToken": value});
      console.log(value);
  })
  .then(res => {
    
  });*/
  }


  async componentDidMount(){
    let token = await AsyncStorage.getItem('userToken');
    this.setState({"userToken": token});
}
  static navigationOptions = {
   
    header: null,
    headerMode: 'none',
    userToken:'',
  };



  state = {
    firat:'1',
    userlist:['Batuhan','Hasan','Caner','Osman','Hüseyin','Mehmet','Berk','Can','Metehan','Turgay','Ahmet','Ali']

};
  


  render() {
   

    
  
  return (
   
    <View style={homeScreenStyle.container}>
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
            <Ripple style={homeScreenStyle.userProfile} onPress={()=>this.props.navigation.navigate('Profile')}>
        <Image source={require('../assets/images/ornekresim.jpg')} style={{width:67,height:67,borderRadius:67/2,borderColor:'green',borderWidth:2}} />
        <View style={homeScreenStyle.profileTextContainer}>
          <Text style={homeScreenStyle.textTitle}>{this.state.userToken}</Text>
         <Text style={homeScreenStyle.textSubtitle}>Yakındakiler tarafından görülmeye açıktır.</Text>
        </View>
        </Ripple>
        <TouchableOpacity onPress={()=>{
          

         /*
            firebase.database().ref('users/ABC').set({
              highscore: 500
            });

            const dbh = firebase.firestore();

            dbh.collection("characters").doc("mario").set({
              employment: "plumber",
              outfitColor: "red",
              specialAttack: "fireball"
            })

            */
          

        }}><Ionicons style={{marginLeft:10}}name={"ios-volume-high"} size={50} color={"#FFF"} /></TouchableOpacity>

              </View>
      

      
    
      <View style={{height:60}}></View>
 </ImageBackground>
     
      <View style={homeScreenStyle.sharePanel}>
         <TouchableOpacity onPress={()=>this.props.navigation.navigate('QRScanner')} style={homeScreenStyle.sharePanelIcons}><Ionicons style={{marginLeft:10}}name={"ios-barcode"} size={45} color={"#6E6EE8"} /></TouchableOpacity>
          <TouchableOpacity style={homeScreenStyle.sharePanelIcons}><Ionicons style={{marginLeft:10}}name={"ios-radio"} size={45} color={"#6E6EE8"} /></TouchableOpacity>
          <TouchableOpacity style={homeScreenStyle.sharePanelIcons}><Ionicons style={{marginLeft:10}}name={"ios-search"} size={45} color={"#6E6EE8"} /></TouchableOpacity>
      </View>
      
      

      <View style={homeScreenStyle.contentIc}>
          
          <View style={homeScreenStyle.contentHeader}>
          <Ionicons name={"ios-filing"} size={24} color={"#6E6EE8"} />
          <Text style={homeScreenStyle.contentHeaderText}>GELEN KUTUSU</Text>
      </View>
   
     {/* BURASI CONTENT ANA İÇERİK KISMI */}
    
   




       

         

{

  /*
  HAM PATTERN

  
          <Ripple rippleDuration={600}>
          <View style={homeScreenStyle.kisiListItem}>
              <Image source={require('../assets/images/ornekresim2.jpg')} style={{width:60,height:60,borderRadius:200,}} />
              <View style={homeScreenStyle.kisiListItemContentContainer}><View style={homeScreenStyle.kisiListItemTextcontainer}>
                <Text style={homeScreenStyle.kisiListItemTextHeader}>Hasan 2</Text>
                <Text style={homeScreenStyle.kisiListItemTextSubTitle}>2015 Yılında Katıldı</Text>
            </View>
            <View style={homeScreenStyle.kisiListItemArrow}><Ionicons name={"ios-arrow-forward"} size={25} color={"#222"}/></View>
            </View>
          </View>
          </Ripple>



*/}
     
         
     {
            this.state.userlist.map((isim,index) => {
              return(
                <Ripple rippleDuration={300} key={index}
                onPress={
                  () => this.props.navigation.navigate('LinksStack')
                    
                }
                >
                <View style={homeScreenStyle.kisiListItem}>
                    <Image source={{uri:'https://www.belbim.istanbul/FileManager/Image/Belbim/Person/FatihOzdemir.jpg'}} style={{width:60,height:60,borderRadius:60/2,}} />
                    <View style={homeScreenStyle.kisiListItemContentContainer}><View style={homeScreenStyle.kisiListItemTextcontainer}>
                      <Text style={homeScreenStyle.kisiListItemTextHeader}>{isim}</Text>
                      <Text style={homeScreenStyle.kisiListItemTextSubTitle}>2015 Yılında Katıldı</Text>
                  </View>
                  <View style={homeScreenStyle.kisiListItemArrow}>
                    <Ionicons name={"ios-arrow-forward"} size={25} color={"#222"}/>
                    
                    </View>
                  </View>
                </View>
                </Ripple>
              );

            })

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