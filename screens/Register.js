import React from 'react';
import {Console,ActivityIndicator,Platform,Dimensions,ScrollView, StyleSheet,View,TouchableOpacity,Text,AsyncStorage,ImageBackground,Image,TextInput } from 'react-native';
import {CheckBox,Button} from 'react-native-elements';
import Ripple from 'react-native-material-ripple';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../components/Firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  static navigationOptions = {
   
    header: null,
    headerMode: 'none'
  };
state = {
username:'',
password:'',
name:'',
email:'',
buttonLoading:false,
buttonText:true,
beniHatirla:false,
usernameExist:false,
usernameWrong:false,
emailValid:true,
passwordValid:true,
nameValid:true,
isError:false,
errorMessageSelf:'',
nullError:false,
usernameLess:false,
opacityAll:1,
geriGeldi:false,

}
_bootstrapAsync = async () => {
  const PPUpload = await AsyncStorage.getItem('PPUpload');

  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  if(PPUpload) {this.props.navigation.navigate('PPUpload');}
};
  
    render() {
      return (
        <KeyboardAwareScrollView enableOnAndroid={true}>
        <ImageBackground style={styles.Background} source={require('../assets/images/background.png')}>

        <View style={styles.headBar}><Text style={styles.headText}>LeboGram</Text></View>
              
              
          
          
      {this.state.geriGeldi && 
      <View style={{height:100 + '%', width:85 + '%', justifyContent:'center',alignSelf:'center',alignItems:'center'}}>

        <Text style={{color:'#EBEBEB',fontSize:18,marginBottom:50}}>Profil Fotoğrafı Yüklemediniz, Zorunlu Değil Ama İnsanlar Sizi Profil Fotoğrafınızdan Tanır ?</Text>
        
        <View style={{flexDirection:'row',width:100+'%',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
        <Button buttonStyle={{marginRight:20}} title='Fotoğraf Yükle' onPress={()=>this.props.navigation.navigate('PPUpload')}/>
        <Button title='Uygulamaya Gir' onPress={()=>this.props.navigation.navigate('App')}/>
        


        </View>


      </View> } 
        
        <View style={[styles.Container,{opacity:this.state.opacityAll}]}>
            
       <View style={styles.profileImageContainer}>
           <Ionicons style={styles.profileIcon} name={"md-hand"} size={60} color={"#4E4EA5"} />
          
           </View>
       <Text></Text>
       {this.state.nullError && <Text style={{color:'#6E0000',marginTop:3,}}>Lütfen Tüm Alanları Doldurun</Text> }
       {this.state.isError && <Text style={{color:'#6E0000',marginTop:3,}}>{this.state.errorMessageSelf}</Text> }
       <View style={{flexDirection:'row',marginTop:20}}>
       
     

       <View style={styles.TextInputPre}><Text style={styles.TextInputPreText}>#</Text></View>
     
     
      <TextInput
        style={styles.TextInputs}
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
        autoCompleteType='username'
        placeholder='Kullanıcı Adı'
        placeholderTextColor='#444'
        
        onEndEditing={()=>this._usernameCheck()}
      />
        </View>
     {this.state.usernameExist && <Text style={{color:'#6E0000',marginTop:3,}}>Kullanıcı Adı Daha Önce Alınmış</Text> }
     {this.state.usernameLess && <Text style={{color:'#6E0000',marginTop:3,}}>Kullanıcı Adı En Az 5 Karakterden Oluşmalıdır.</Text> }
     {this.state.usernameWrong && <Text style={{color:'#6E0000',marginTop:3,}}>Hatalı Kullanıcı Adı veya Boş Bırakmayın</Text> }
        <TextInput
        style={styles.TextInputs2}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        autoCompleteType='password'
        placeholder='Şifre'
        secureTextEntry={true}
        placeholderTextColor='#444'
        onEndEditing={()=>this._validatePassword()}
      />     
  {!this.state.passwordValid && <Text style={{color:'#6E0000',marginTop:3,}}>Şifreniz En Az 6 Karakterden Oluşmalıdır.</Text> }




<TextInput
        style={styles.TextInputs2}
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
        autoCompleteType='email'
        placeholder='Email Adresiniz'
        placeholderTextColor='#444'
        onEndEditing={()=>this._validateEmail()}
      /> 
  {!this.state.emailValid && <Text style={{color:'#6E0000',marginTop:3,}}>Email Adresi Geçerli Değil</Text> }

<TextInput
        style={styles.TextInputs2}
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}
        autoCompleteType='name'
        placeholder='Adınız'
        placeholderTextColor='#444'
        onEndEditing={()=>this._validateName()}
      /> 
  {!this.state.nameValid && <Text style={{color:'#6E0000',marginTop:3,}}>Adınızı Boş Bırakmayın</Text> }


         <Ripple 
         onPress={()=> this._signUp()}
         style={styles.GirisButton} rippleDuration={300}>
           { this.state.buttonLoading &&
           <ActivityIndicator size={30} color='#4E4EA5' style={styles.ButtonLoading}></ActivityIndicator>
           }
            { this.state.buttonText &&
            <Text style={styles.ButtonText}>Kayıt Ol</Text>
           }
           </Ripple> 
           <View style={styles.subContainer}>
           <TouchableOpacity style={{width:50 + '%'}}><Text style={styles.subTexts}>Şifremi Unuttum</Text></TouchableOpacity>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} style={{width:50 + '%'}}><Text style={[styles.subTexts, {textAlign:'right'}]}>Giriş Yap</Text></TouchableOpacity>
           </View>
        </View>
        </ImageBackground>
        </KeyboardAwareScrollView>
      );
    }
  
    _usernameCheck = ()=> {
       if(this.state.username.length > 4)
       {
        this.setState({usernameLess:false});  
           const dbh = firebase.firestore();
            const usersRef = dbh.collection('usernameList').doc(this.state.username)
            console.log(this.state.username);
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    this.setState({usernameExist:true});
                } else {
                    this.setState({usernameExist:false});  
                }
            });
    }
    else{
        this.setState({usernameLess:true});  
    }

    }
    _validateEmail = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(this.state.email).toLowerCase())){this.setState({emailValid:true});}else{this.setState({emailValid:false});}
    }
    _validateName = () => {
        if(this.state.name != ''){this.setState({nameValid:true});}else{this.setState({nameValid:false});}
    }
    _validatePassword = () => {
        if(this.state.password.length >= 6 ){this.setState({passwordValid:true});}else{this.setState({passwordValid:false});}
    }
    _nullInputCheck = ()=>
    {
      return this.state.username.length > 4 && this.state.password.length > 4 && this.state.email.length > 4 && this.state.name.length > 4 ? true : false;
    }
    _signUp = async () => {
      this._usernameCheck();
      
      if(this._nullInputCheck())
      {
        if(this.state.usernameExist == false && this.state.usernameWrong == false && this.state.emailValid == true && this.state.name.length > 5)
        {
            var self = this
            this.setState({buttonLoading:true,buttonText:false});
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(
               function(user) {
                 const thisUser = firebase.auth().currentUser;
                 
                      console.log(thisUser.uid);
                        const dbh = firebase.firestore();

                        dbh.collection("usernameList").doc(self.state.username).set({
                          email:self.state.email,
                          PPUri : 'https://firebasestorage.googleapis.com/v0/b/lebogram-4312a.appspot.com/o/ppimage.png?alt=media&token=2a955ee5-684f-47f7-be86-055dcb51b885',
                        })
                        .then(function(){
                                dbh.collection("users").doc(thisUser.uid).set({
                                  username:self.state.username,
                                  password:self.state.password,
                                  email:self.state.email,
                                  name:self.state.name,
                                  profilephoto:'null',
                                  newUser:true,

                                }).then(function(){
                                  AsyncStorage.setItem('userToken', thisUser.uid).then(function(){

                                    firebase.database().ref('channelConnections/' + thisUser.uid).set({
                                     channels:''
                                    });



                                    self.setState({opacityAll:0, geriGeldi:true,});



                                          self.props.navigation.navigate('App');
                                      
                                  });
                                  
                                });
                            


                         });
               

                 
                   
                }
            ).catch(function(error) {
                self.setState({buttonLoading:false,buttonText:true,isError:true,errorMessageSelf:errorMessage});
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
              });
        }
      }
      else{ this.setState({nullError:true}); }
    
    }
    _signInAsync = async () => {
      this.setState({buttonLoading:true,buttonText:false})
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
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
    marginTop:65,
    height:60 + '%',
    width:90+'%',
  },
  profileImage:
  {
    alignSelf:'center', 
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
  
      backgroundColor:'#EBEBEB',
      color:'#000',
      height:45,
      width:85+'%',
      textAlign:'left',
      fontSize:16,
      borderRadius:2,
    fontFamily:'Roboto-Medium',

    marginTop:10,
      paddingBottom:5,
      paddingLeft:15,
      paddingRight:15,

  },
  TextInputs3:
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