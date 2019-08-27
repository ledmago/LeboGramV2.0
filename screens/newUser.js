import React from 'react';
import {Button,Animated,Dimensions,View,Text,ImageBackground, } from 'react-native';


class NewUserPopUp extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
   
    header: null,
    headerMode: 'none',
  };



 
  render()
  {
      
      return(
         
            
               
    
                  <View style={{position:'absolute', width:100 + '%', height: 100 + '%',backgroundColor:'#7d327d',justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center',zIndex:99999}}>
                    <ImageBackground style={{width:100 + '%', height:100 + '%'}} source={require('../assets/images/background.png')}>
                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color:'#FFF', fontSize:15,marginTop:10,}}>LeboGrama Hoşgeldiniz</Text>
                    <Button title='Geç' onPress={()=>{
                        
                           this.props.navigation.navigate('HomeScreen')
                    
                    }}/>
                    <Text></Text>
                    <Button title='Fotoğraf Yükle'/>
                    </View>
                    </ImageBackground>
    
    
    
    
                    </View>
                    
    


       
      );
                  }
}
export default NewUserPopUp;