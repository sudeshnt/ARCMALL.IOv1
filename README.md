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

add keyHash to facebook developer console if you are building from a different machine

// installed google-plus login

*** when building for android or ios install the following plugin (cordova-plugin-googleplus)  with their relevant reversed client ids. ***


cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=reversed_client_id

reversed_client_id android : com.googleusercontent.apps.itgqv3o8q200eeh6ov707hrd3vgc379t-683451474237
reversed_client_id ios : com.googleusercontent.apps.683451474237-kgbp6hbnbv3dtftbi3o1hmokm46od906

refer to : https://github.com/EddyVerbruggen/cordova-plugin-googleplus

keytool -list -v -keystore c:\users\SudeshNT\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android

SHA1 office lap : 45:8B:B7:FB:05:A8:8E:D3:4D:8B:7B:E0:65:91:20:3C:13:ED:68:9A

Pages Required
--------------

Register page
Forget Password Page
Insert New Password Page
Item List
Item Details (More-bottom)
Order List
