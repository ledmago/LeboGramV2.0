import { DrawerItems, SafeAreaView} from 'react-navigation';
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
  import React from 'react';
  import {NavigationActions} from 'react-navigation';
  
const CustomDrawerContentComponent = props => (
    
    <ScrollView>
      <SafeAreaView style={{flex:1}} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
      <TouchableOpacity onPress={
                ()=>{
                const navigateAction = NavigationActions.navigate({
                    routeName: 'LinksStack'
                });
              /*  props.navigation.dispatch(navigateAction);*/

                props.navigation.navigate('LinksStack');
                }
      }><Text>ASDASD2</Text></TouchableOpacity>

<TouchableOpacity onPress={
async () => {
  await AsyncStorage.clear();
  props.navigation.navigate('Auth');
}

}><Text>Çıkış</Text></TouchableOpacity>

<TouchableOpacity onPress={
async () => {
  await AsyncStorage.clear();
  props.navigation.navigate('ProfileUpload');
}

}><Text>Profil Fotoğsu</Text></TouchableOpacity>


<TouchableOpacity onPress={
async () => {
  await AsyncStorage.clear();
  props.navigation.navigate('AnaEkran');
}

}><Text>Anasayfa</Text></TouchableOpacity>


<TouchableOpacity onPress={
async () => {
  await AsyncStorage.clear();
  props.navigation.navigate('NewUser');
}

}><Text>Yeni</Text></TouchableOpacity>
    </ScrollView>
  );
  export default CustomDrawerContentComponent;