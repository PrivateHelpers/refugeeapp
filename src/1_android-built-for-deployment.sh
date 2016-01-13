#!/bin/sh
echo "we build the apk for release now..."
cordova build --release android 

echo "now go up two levels in the directory to sign, zip-align and finally deploy the app to the Google Play Store..."
 

