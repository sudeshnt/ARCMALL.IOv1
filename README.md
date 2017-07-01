# ARCMALL.IOv1

// installing phonegap-facebook-plugin

//refer this link
//https://ionicthemes.com/tutorials/about/native-facebook-login-with-ionic-framework
//if this error appears : ANDROID_BUILD_SDK_VERSION not found
//    cordova platform remove android
//    cordova platform add android@5.1.1
//    rebuild the project
//cordova -d plugin add phonegap-facebook-plugin --variable APP_ID="1823221184659287" --variable APP_NAME="ArcMall"    
    
   
    
git push https://sudeshnt:snt930105@github.com/sudeshnt/ARCMALL.IOv1.git

// installed facebook login plugin

App Id : 1823221184659287
App Name : ArcMall
cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1823221184659287" --variable APP_NAME="ArcMall" 
refer to : https://github.com/jeduan/cordova-plugin-facebook4

// installed google-plus login

cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=reversed_client_id
reversed_client_id : com.googleusercontent.apps.itgqv3o8q200eeh6ov707hrd3vgc379t-683451474237
refere to : https://github.com/EddyVerbruggen/cordova-plugin-googleplus