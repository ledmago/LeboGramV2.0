import { createStackNavigator, createAppContainer, createDrawerNavigator,StackNavigator,stackNavigator} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const DrawerNavigator = createDrawerNavigator(
    {
      Home: SettingsScreen,
      Settings: SettingsScreen,
    },
    {
      hideStatusBar: false,
      drawerBackgroundColor: 'rgba(255,255,255,.9)',
      overlayColor: '#6b52ae',
      contentOptions: {
        activeTintColor: '#fff',
        activeBackgroundColor: '#6b52ae',
      },
    }
  );
  
  export default createAppContainer(DrawerNavigator);