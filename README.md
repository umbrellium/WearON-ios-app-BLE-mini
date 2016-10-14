## WearON  
[WearON](http://umbrellium.co.uk/initiatives/wearon/) is a prototyping platform for wearable designers to connect their devices quickly and simply to a smartphone, to the web and to each other.

## About WearON mobile phone app 

The app was developed with the latest up to date cordova version 6.3.1. It supports iOS version: 
* iOS >9.1

## Note

This app is developed using Arduino Uno connected to Ble mini 

Note: If you are using Blend Micro board, please comment out:
* line 191 and 341 in scan_for_device.js
* line 718-722 in global.js

## Deploying the app on an iOS phone locally using Xcode 
* Clone the project from github. 
* Go to https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html to download the various dependencies in order to set up your SDK environment to deploy Cordova apps for iOS devices.
* Alternatively, you can also check out our [Wiki](https://github.com/umbrellium/WearON-ios-app/wiki) for instructions on installing the various dependencies using our method
* Download the latest Xcode IDE from your Apple App Store. Open the program and make sure that you have agree to the terms and conditions and install the components.
* go to your WearON cloned folder `WearON` -> `platforms` -> `ios` -> load `WearON.xcodeproj` onto Xcode
* To deploy to the device:

    * Use the USB cable to plug the device into your Mac.

    * Select the name of the project in the Xcode window's Scheme drop-down list.

    * Select your device from the Device drop-down list. If it is plugged in via USB but still does not appear, press the Organizer button to resolve any errors.

    * Press the Run button to build, deploy and run the application on your device.

* Before you run the app, on your phone, make sure that in `Settings`-> `General` -> `Device Management` that you have enabled the iPhone Developer(the account that you open Xcode with) to be trusted

## Deploying the app on an iOS phone locally using Xcode after making changes - for advanced user
* Clone the project from github. 
* Go to https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html to download the various dependencies in order to set up your SDK environment to deploy Cordova apps for iOS devices.
* Alternatively, you can also check out our [Wiki](https://github.com/umbrellium/WearON-ios-app/wiki) for instructions on installing the various dependencies using our method
* Download the latest Xcode IDE from your Apple App Store. Open the program and make sure that you have agree to the terms and conditions and install the components.
* Open a new terminal window
* Redirect to your local WearON folder and run the following command. Make sure the build is successful.
```bash
$ cordova build ios
```
* go to your WearON cloned folder `WearON` -> `platforms` -> `ios` -> load `WearON.xcodeproj` onto Xcode
* To deploy to the device:

    * Use the USB cable to plug the device into your Mac.

    * Select the name of the project in the Xcode window's Scheme drop-down list.

    * Select your device from the Device drop-down list. If it is plugged in via USB but still does not appear, press the Organizer button to resolve any errors.

    * Press the Run button to build, deploy and run the application on your device.

* If you have made any changes to the code, you have to rebuild the Xcode file via Terminal, open a new terminal window, redirect to your local WearON folder
```bash
$ cordova build ios
```

* Before you run the app, on your phone, make sure that in `Settings`-> `General` -> `Device Management` that you have enabled the iPhone Developer(the account that you open Xcode with) to be trusted

## About
WearON is an open source initiative created by [Umbrellium](http://umbrellium.co.uk/) built for the community and for us to quickly prototype connected wearables and iot devices. Join us in improving the project by contributing through github or simply drop us a message if there is any question or issue with using the platform!
