import React from 'react';
import {Alert,ActivityIndicator,Platform,Dimensions,ScrollView, StyleSheet,View,TouchableOpacity,Text,AsyncStorage,ImageBackground,Image,TextInput,Button } from 'react-native';
import {CheckBox} from 'react-native-elements';
import Ripple from 'react-native-material-ripple';

import firebase from '../components/Firebase';
class LoginScreen extends React.Component {
  constructor(props)
  {
   
    super(props);
    
    
  
  }
    state = {
      username:global.tempUsername,
      email : '',
      password:'',
      buttonLoading:false,
      buttonText:true,
      beniHatirla:false,
      PPUri:'',      
      }
  static navigationOptions = {
   
    header: null,
    headerMode: 'none',
  };

  async componentDidMount(){
    const dbh = firebase.firestore();

    const  usersRef =  await dbh.collection('users').where('username', '==', global.tempUsername)
   usersRef.get()
   .then((docSnapshot) => {
    docSnapshot.forEach((docSnapshot2)=> {
      
      this.setState({email:docSnapshot2.data().email, PPUri : docSnapshot2.data().profilephoto + '&ver=' + Math.random()});
    })
      
    
   });


  
  
}

    render() {

      return (
      
        <ImageBackground style={styles.Background} source={require('../assets/images/background.png')}>

        <View style={styles.headBar}><Text style={styles.headText}>LeboGram</Text></View>
              
              
          
          
       
        
        <View style={styles.Container}>
            
       <View style={styles.profileImageContainer}><Image style={styles.profileImage} source={{uri:this.state.PPUri}}/></View>
       <Text></Text>
       <View style={{flexDirection:'row',marginTop:20}}>
       <View style={styles.TextInputPre}><Text style={styles.TextInputPreText}>#</Text></View>
     
      
      <TextInput
        style={styles.TextInputs}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        autoCompleteType='password'
        placeholder='•••••••••'
        placeholderTextColor='#444'
        secureTextEntry={true}
      />
        </View>
      
       
       

         <Ripple onPress={()=>this._signInAsync()}
         
         style={styles.GirisButton} rippleDuration={300}>
           { this.state.buttonLoading &&
           <ActivityIndicator size={30} color='#4E4EA5' style={styles.ButtonLoading}></ActivityIndicator>
           }
            { this.state.buttonText &&
            <Text style={styles.ButtonText}>Devam et</Text>
           }
           </Ripple> 
           
        </View>
        </ImageBackground>
        
      );
    }
  
    _signInAsync = async () => {
      var self = this;
      this.setState({buttonLoading:true,buttonText:false})


    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(user){
      // Şifre Doğru İse
        const thisUser = firebase.auth().currentUser;
        
       
            AsyncStorage.setItem('userToken', thisUser.uid).then(function(){     self.props.navigation.navigate('App');})
            self.setState({buttonLoading:false,buttonText:true})


      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        Alert.alert('Şifre Yanlış','Şifre ve Kullanıcı Adı Uyuşmuyor.', [{ text: 'Tamam', },], { cancelable: false });
        self.setState({buttonLoading:false,buttonText:true})
        // ...
      });

    
     
    };
  }

export default LoginScreen;

const styles = 
{
  Background:
  {
    flex:1,
    width:100+'%',
    paddingTop:30,
    height:Dimensions.get('screen').height+5,
    justifyContent: 'center', 
    alignItems: 'center' 
    
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
    position:'absolute',
    top:35,
  },
  headText:
  {
    fontSize:25,
    color:'#FFF',
    width:100 + '%',
    textAlign:'center',
    
  },
  Container:
  {
    justifyContent:'flex-start',
    alignItems:'center',
    alignSelf:'center',
    height:60 + '%',
    width:90+'%',
  },
  profileImage:
  {
    width:110,
    height:110,
    borderRadius:110/2,
    
      

    
  },
  profileImageContainer:
  {
    width:118,
    height:118,
    borderRadius:118/2,
    backgroundColor:'#EBEBEB',
    justifyContent:'center',
    alignItems:'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),

  },
  TextInputPreText:
  {
    color:'#444',
    textAlign:'center',
    fontSize:25,
    fontFamily:'OpenSans-Bold',
    justifyContent:'center',
    width:100 + '%'
  },
  TextInputPre:
  {
     
      backgroundColor:'#EBEBEB',
     
      height:45,
      width:40,
      marginRight:5,
     
      borderRadius:2,
      justifyContent:'center',
   
     

  },
  TextInputs:
  {
  
      backgroundColor:'#EBEBEB',
      color:'#000',
      height:45,
      width:70+'%',
      textAlign:'left',
      fontSize:16,
      borderRadius:2,
    fontFamily:'Roboto-Medium',


      paddingBottom:5,
      paddingLeft:15,
      paddingRight:15,

  },
  TextInputs2:
  {
      borderBottomWidth:2,
      borderBottomColor:'#CCC',
      color:'#EBEBEB',
      width:75+'%',
      textAlign:'center',
      fontSize:19,
    fontFamily:'OpenSans-Bold',

      marginTop:20,
      paddingBottom:5,
      paddingLeft:10,
      paddingRight:15,

  },

  ButtonText:
  {
    fontSize:20,
    textAlign:'center',
    color:'#4E4EA5',
    fontWeight:'bold',

  },
  GirisButton:
  {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    width:85+'%',
    height:50,
    backgroundColor:'#EBEBEB',
    borderRadius:40,
    justifyContent:'center',
    marginTop:20
    
  },

}