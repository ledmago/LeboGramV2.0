import React from 'react';
import { createAppContainer, createSwitchNavigator,createStackNavigator,createDrawerNavigator, createBottomTabNavigator,BottomTabBar  } from 'react-navigation';
import LinksScreen from '../screens/LinksScreen';
import HomeScreen from '../screens/HomeScreen';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/Login';
import LoginPwScreen from '../screens/LoginPw';
import QRScannerScreen from '../screens/QRScanner';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import CustomDrawerContentComponent from '../screens/Drawer';
import SettingsScreen from '../screens/SettingsScreen';
import { fromLeft, fromRight } from 'react-navigation-transitions';
import userQRCodeScreen from '../screens/userQRCode';
import RegisterScreen from '../screens/Register';
import ProfileUploadScreen from '../screens/ProfileUpload';
import NewUserScreen from '../screens/newUser';
import ChatScreen from '../screens/ChatScreen';
import ImageUploadScreen from '../screens/ImageUploadScreen';
import UserSearchScreen from '../screens/UserSearch';
import Chat2Screen from '../screens/Chat2';
import VideoScreen from '../screens/VideoScreen';

const AppStack = createStackNavigator({ Home: HomeScreen, },);
const AuthScreen = createStackNavigator({ Login: LoginScreen,LoginPw: LoginPwScreen,Register:RegisterScreen},{transitionConfig: () => fromRight(),});
const TabBarComponent = (props) => (<BottomTabBar {...props} />);
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
 
 
};
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    App: 
  createDrawerNavigator(
          {
            Main:createStackNavigator(
              {
                HomeScreen:HomeScreen,
                NewUser:NewUserScreen,
                LinksStack:LinksScreen,
                QRScanner:QRScannerScreen,
                userQRCode:userQRCodeScreen,
                ChatScreen:ChatScreen,
                ImageUpload:ImageUploadScreen,
                ProfileUpload:ProfileUploadScreen,
                UserSearch:UserSearchScreen,
                Chat2:Chat2Screen,
                VideoScreen:VideoScreen
  
              },
              {
                transitionConfig: () => fromRight(),
              }
  
            )
          },
          {            
                                           
            transitionConfig: () => fromRight(),
            contentComponent:CustomDrawerContentComponent,
            hideStatusBar: false,
            drawerBackgroundColor: 'rgba(255,255,255,.9)',
            overlayColor: '#6b52ae',
            contentOptions: {
              activeTintColor: '#fff',
              activeBackgroundColor: '#6b52ae',
            },
          },
        ),



    
  },
  {
    transitionConfig: () => fromLeft(),
    initialRouteName: 'AuthLoading',
    
    
  }


));