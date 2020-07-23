# LeboGram (V2.0)
**Türkçe
Lebogram kişisel bilgileri paylaşmadan, mesaj, dosya, fotoğraf ve video gönderilebilen mobil uygulamadır.
React Native ile birlikte Firebase cloud, Firebase Realtime Database ve storage kullanılmıştır.
**Lebogram is the cross platform mobile application** that created through React Native framework.
This application's aim is sending photos and videos (not ready for yet) to peoples without sharing personal information such as number or facebook account. 

### Technologies
- React Native Framework
- Expo Client framework.
- Firebase for database and storage
- Node JS

### Coding Tips
There is a global variables that stores user log in,
`global.userInfo = {userUid : '', username:'',email:'',name:'',profilePhotoUri : '',}`

### Installation
    npm install --save
    npm install react-native-progress-circle --save
    npm install react-native-image-zoom-viewer --save
    npm install react-native-picker-select --save
    npm install react-native-progress-bar-animated --save
    npm install react-native-qrcode --save
    npm install react-native-material-ripple --save
    npm install react-navigation-transitions --save
    expo install expo-barcode-scanner
    expo install expo-image-manipulator
    expo install expo-image-picker
    expo install expo-media-library
    npm install --save firebase
    npm install react-native-elements
    npm i react-native-keyboard-aware-scroll-view --save
    npm install react-native-gifted-chat --save

### Firebase Rules

#### Firestore Rules

    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
      match /usernameList/{username} {
      allow read,write;
      }
        match /users/{uid} {
        allow read;
            allow write: if request.auth.uid == uid;
        }
        match /channels/{channelId} {
            allow read, write;
        }
        match /locations/{uid} {
            allow read, write;
        }
      }
    }
    `
#### Realtime Database Rules
    {
      "rules": {
        "channelConnections":{
          "$uid":
          {
            ".read": true,
            ".write": true,
          }
        
          },
      
        "chatMessages":{
          "$uid":{
            ".read": true,
            ".write":true,
               ".indexOn": "readed",
               "$emssageid" : {
                 ".indexOn": "readed"
             }
          }
          }
    }
      }
#### Cloud Store Rules
    rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
    	match /profilephoto/{uid}/small {
          allow write: if request.auth.uid == uid;
          allow read;
        }
        	match /sendImages/{kanalid}/{resimid}/{size} {
          allow write;
          allow read;
        }
      }
    }

### ScreenShots
![alt text](https://raw.githubusercontent.com/ledmago/LeboGramV2.0/master/ScreenShots/1.PNG)
![alt text](https://raw.githubusercontent.com/ledmago/LeboGramV2.0/master/ScreenShots/2.PNG)
![alt text](https://raw.githubusercontent.com/ledmago/LeboGramV2.0/master/ScreenShots/3.PNG)
![alt text](https://raw.githubusercontent.com/ledmago/LeboGramV2.0/master/ScreenShots/4.PNG)
![alt text](https://raw.githubusercontent.com/ledmago/LeboGramV2.0/master/ScreenShots/5.PNG)
