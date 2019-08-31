import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
 import Swipeable from 'react-native-gesture-handler/Swipeable';
 import Ripple from 'react-native-material-ripple';
 import { Badge,Tooltip } from 'react-native-elements';
import { GestureHandler } from 'expo';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding:2,
  },
  text: {
    color: '#4a4a4a',
    fontSize: 15,
  },
  separator: {
    width:90 + '%',
    height: 1,
    marginLeft: 10,
    alignItems:'flex-end',
  },
  separatorContent: {
    width:Dimensions.get('screen').width - 140,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10,
  },
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: 1,
  },
  rightAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
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
      /*borderBottomWidth:1,
      borderColor:'#CCC',*/
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


});

export const Separator = () => <View style={styles.separator}><View style={styles.separatorContent} /></View>;

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Add to Cart
      </Animated.Text>
    </View>
  );
};

const RightActions = ({ Itemid,progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <View style={{justifyContent: 'center',alignItems: 'flex-end',}}>
        <View style={{height:100 + '%',flexDirection:'row',backgroundColor:'#999'}}>
                <TouchableOpacity onPress={(onPress)} style={{width:70}}>
                <View style={[styles.rightAction,{backgroundColor:'#ddb400',justifyContent: 'center',alignItems:'center',}]}>
                    <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
                    <Ionicons name={"ios-trash"} size={35} color={"#FFF"}/>
                    </Animated.Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={(onPress)} style={{width:70}}>
                <View style={[styles.rightAction,{justifyContent: 'center',alignItems:'center',}]}>
                    <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
                    <Ionicons name={"ios-trash"} size={35} color={"#FFF"}/>
                    </Animated.Text>
                </View>
            </TouchableOpacity>

  </View>
  </View>
  );
};

const ListItem = ({id,username,displayname, desc, PPUri,notReadedMessage,onay, onSwipeFromLeft, onRightPress,navigate }) => (

  <Swipeable
    renderLeftActions={LeftActions}
    onSwipeableLeftOpen={onSwipeFromLeft}
    renderRightActions={(progress, dragX) => (
      <RightActions Itemid={id} progress={progress} dragX={dragX} onPress={onRightPress} />
    )}
  >
    <View style={styles.container}>
    
          
    <Ripple rippleDuration={600} onPress={()=>{
    navigate.navigate('ChatScreen',{kanalid:id,displayname:displayname,desc:desc,PPUri:PPUri,onay:onay})
    
  
  }}>
          <View style={styles.kisiListItem}>
              <Image source={{uri:PPUri}} style={{width:60,height:60,borderRadius:60/2,}} />
              <View style={styles.kisiListItemContentContainer}>
             <View style={styles.kisiListItemTextcontainer}>
             {!onay && <View style={{flexDirection:'row'}}><View style={{marginRight:5}}><Ionicons name={"ios-alert"} size={28} color={"#d43f3e"}/></View><Text style={styles.kisiListItemTextHeader}>{displayname}</Text></View>}
               {onay && <Text style={styles.kisiListItemTextHeader}>{displayname}</Text>}
                <Text style={styles.kisiListItemTextSubTitle}>{desc}</Text>
            </View>
            <View style={styles.kisiListItemArrow}><Ionicons name={"ios-arrow-forward"} size={25} color={"#222"}/></View>
          {notReadedMessage > 0 &&  <View style={{backgroundColor:'#55c319',height:25,width:25,borderRadius:25/2, position: 'absolute', alignSelf:'center',alignItems:'center',justifyContent:'center',right: 20 }}><Text style={{textAlign:'center', color:'#FFF'}}>{notReadedMessage}</Text></View>}          
            </View>
          </View>
          </Ripple>


    </View>
  </Swipeable>
);

export default ListItem;
