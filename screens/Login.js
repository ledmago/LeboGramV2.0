import React from 'react';
import {Alert,ActivityIndicator,Platform,Dimensions,ScrollView, StyleSheet,View,TouchableOpacity,Text,AsyncStorage,ImageBackground,Image,TextInput,Button } from 'react-native';
import {CheckBox} from 'react-native-elements';
import Ripple from 'react-native-material-ripple';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {KeyboardAvoidingView} from 'react-native';
import firebase from '../components/Firebase';

class LoginScreen extends React.Component {
  constructor(props)
  {
    super(props);
    global.tempUsername = '123';
  }
  static navigationOptions = {
   
   
    header: null,
    headerMode: 'none'
  };
state = {
username:'',
password:'',
buttonLoading:false,
buttonText:true,
beniHatirla:true,
}
  
    render() {
      return (
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>
        <ImageBackground style={styles.Background} source={require('../assets/images/background.png')}>

        <View style={styles.headBar}><Text style={styles.headText}>LeboGram</Text></View>
              
              
          
          
       
        
        <View style={styles.Container}>
            
       <View style={styles.profileImageContainer}><Image style={styles.profileImage} source={require('../assets/images/ppimage.png')}/></View>
       <Text></Text>
        
       <View style={{flexDirection:'row',marginTop:20}}>
       <View style={styles.TextInputPre}><Text style={styles.TextInputPreText}>#</Text></View>
     
        
      <TextInput
        style={styles.TextInputs}
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
        autoCompleteType='username'
        placeholder='Kullanıcı Adı'
        placeholderTextColor='#444'
      />
        </View>
      
        <CheckBox
  title='Beni Hatırla'
  checked={this.state.beniHatirla}
  containerStyle={{width:85 + '%'}}
/>
       

         <Ripple onPress={()=>this._signInAsync()}
         
         style={styles.GirisButton} rippleDuration={300}>
           { this.state.buttonLoading &&
           <ActivityIndicator size={30} color='#4E4EA5' style={styles.ButtonLoading}></ActivityIndicator>
           }
            { this.state.buttonText &&
            <Text style={styles.ButtonText}>Devam et</Text>
           }
           </Ripple> 
           <View style={styles.subContainer}>
           <TouchableOpacity style={{width:50 + '%'}}><Text style={styles.subTexts}>Şifremi Unuttum</Text></TouchableOpacity>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')} style={{width:50 + '%'}}><Text style={[styles.subTexts, {textAlign:'right'}]}>Kayıt Olun</Text></TouchableOpacity>
           </View>
        </View>
        </ImageBackground>
        </KeyboardAvoidingView>
      );
    }
  
    _signInAsync = async () => {
      global.tempUsername = this.state.username;
      if(this.state.username.length > 3)
      {
        
                this.setState({buttonLoading:true,buttonText:false})

                const dbh = firebase.firestore();
                      const usersRef = dbh.collection('usernameList').doc(this.state.username)
                      usersRef.get()
                      .then((docSnapshot) => {
                          if (docSnapshot.exists) {
                            this.props.navigation.navigate('LoginPw')
                            this.setState({buttonLoading:false,buttonText:true})
                            
                          } else {
                            this.setState({buttonLoading:false,buttonText:true,})


                            Alert.alert(
                              'Kullanıcı Adı Yanlış',
                              this.state.username + 'adlı kullanıcı bulunamadı. Böyle bir kullanıcı yok. Lütfen kullanıcı adınıızın doğruluğundan emin olun ',
                              [
                                { text: 'Tamam', },
                              
                              ],
                              { cancelable: false }
                            );


                          }
                      });
          }
    
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
  subContainer:
  {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    width:75 + '%',
    marginTop:15,
    
    
  },
  subTexts:
  {
    fontSize:16,
    color:'#EBEBEB',
   

  },

}