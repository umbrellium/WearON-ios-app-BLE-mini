//check whether user has restart the app by accident
var restartApp = false;

//check whether user has press the begin button to start app
var startAppCheck = false;

//store token into global variables
var token_info;

//store user's input fields
var userApi;
var thingspeakApi;
var channelId;
var analogSensor1;
var analogSensor2;
var userEmail;
var userLockPassword;

//check whether each portal are connected to thingspeak
var userAPIcheck = false;
var thingspeakAPIcheck = false;
var channelIDcheck = false;
var analogSensor1check = false;
var analogSensor2check = false;

//store user's connected device
var connectedDevice;
var connectedThingspeak;
var localStoreDevice; // a var that take out the locally stored device information 

//store the connected device info
var storedDeviceInfo = {};

//check whether screen is locked
var lockScreenStatus = false;

//tracker to check bluetooth connection btw phone and app
var dataReceivedTracker = 0;
var countTracker = 0;

//store info on analog input
var analog_enabled_A4 = false; // initially not connected
var analog_enabled_A5 = false; // initially not connected
var connect_to_A4 = false; // tracker to check whether A4 sending data to thingspeak
var connect_to_A5 = false; // tracker to check whether A5 sending data to thingspeak
var A4reading; // store A4 pin reading
var A5reading; // store A5 pin reading
var A4count = 0; // counting number of times A4 is sending data to thingspeak
var A5count = 0; // counting number of times A5 is sending data to thingspeak

//store info on digital input
var digital_enabled_D9 = false;
var digital_enabled_D10 = false;
var connect_to_D9 = false;
var connect_to_D10 = false;
var show_panel_D9 = false;
var show_panel_D10 = false;
var logic_constructed_D9 = false;
var logic_constructed_D10 = false;

//store info on geolocation tracking
var geolocation_enabled = false;
var connect_to_Geo = false;
var myLocationLat;
var myLocationLong;
var geoCount = 0;

//check network, gps, bluetooth status
var networkCheck = false;
var gpsCheck = false;
var bluetoothCheck = false;

//check whether app control panel is open or not
var openControlPanel = false;

//check whether app cross connectivity panel is open or not
var openConnectivityControlPanel = false;

//check whether app global connectivity panel is open or not
var openGlobalConnectivityControlPanel = false;

//check whether app quit by accident previously when in End User Mode (lockScreenStatus =true)
var userQuitApp = false;
var userQuitAppReconnect = false;

//cross connectivity panel global variables
var get_data_feed_1 = false; // toggle check for opening data feed retrieve panel
var get_data_1_success = false; // check whether data feed is successfully retrieved from thingspeak
var show_panel_data_feed_1 = false; // toggle check for opening logic connection panel for data feed
var logic_constructed_data_feed_1 = false; // check whether logic is constructed successfully for data feed 1
var connect_key_info_1;
var ReadApi_1;
var channelID_1;
var channelField_1;
var data_feed_1_reading;

//global connectivity panel global variables
var get_thingful = false; // toggle check for opening get thingful thing panel
var get_thingful_success = false; // check whether data feed is successfully retrieved from thingspeak
var show_panel_thingful = false; // toggle check for opening logic connection panel for thingful
var logic_constructed_thingful_data_feed = false; // check whether logic is constructed successfully for thingful feed
var global_connect_key_info;
var Thing_ID;
var Thing_data_set;
var thingful_reading;


//track thingspeak connection
function showConnectedThingspeakData() {

  if ((channelIDcheck == true) && (analogSensor1check == true) && (analogSensor2check == true)) {
    document.getElementById("connectedThingspeakPortals").innerHTML = "Connected to Thingspeak";
    connectedThingspeak = true;
  } else {
    document.getElementById("connectedThingspeakPortals").innerHTML = "Error in Connection to Thingspeak";
    connectedThingspeak = false;
  }
  checkVisualStatus();

}


//track user's connected device information
function showStoredConnectedDevice() {
  if (app.connected) {
    document.getElementById("storedConnectedDevice").innerHTML = "Connected to: " + connectedDevice;
  } else {
    document.getElementById("storedConnectedDevice").innerHTML = "Not Connected to any Device";
  }

};

//check device status during designer mode 
//give user a visual status of which step they are at using the WearON app
function checkVisualStatus() {
  if ((connectedDevice == undefined) && (connectedThingspeak == undefined)) {
    $('#panel_title').css("color", "black");
    $('#panel_title').html('Scan for hardware to connect to phone app');
    $('#panel_image').attr("src", "img/Scan_for_device.png");
  } else if ((connectedDevice == true) && (connectedThingspeak == undefined)) {
    $('#panel_title').css("color", "black");
    $('#panel_title').html("Key in Configuration Key to connect app to Thingspeak channel");
    $('#panel_image').attr("src", "img/connected_to_device_check_token_key.png");
  } else if ((connectedDevice == undefined) && (connectedThingspeak == true)) {
    $('#panel_title').css("color", "black");
    $('#panel_title').html("Scan for hardware to connect to phone app or <br/>Connect to another Configuration Key");
    $('#panel_image').attr("src", "img/connected_to_thingspeak_not_to_device.png");
  } else if ((connectedDevice == true) && (connectedThingspeak == true)) {
    $('#panel_title').css("color", "black");
    $('#panel_title').html("Use App Control Panel to control data from connected device");
    $('#panel_image').attr("src", "img/connected_to_device_and_thingspeak.png");
  } else if ((connectedDevice == false) && (connectedThingspeak == false)) {
    $('#panel_title').css("color", "black");
    $('#panel_title').html("Key in Configuration Key to generate your custom WearON app");
    $('#panel_image').attr("src", "img/Not_connected_to_both_thingspeak_device.png");
  } else if ((connectedDevice == false) && (connectedThingspeak == true)) {
    $('#panel_title').css("color", "black");
    $('#panel_title').html("Scan for hardware to connect to phone app");
    $('#panel_image').attr("src", "img/connected_to_thingspeak_not_to_device.png");
  } else if ((connectedDevice == true) && (connectedThingspeak == false)) {
    $('#panel_title').css("color", "red");
    $('#panel_title').html("Connecting to Thingspeak... <br/> if error persists, check your Configuration key information");
    $('#panel_image').attr("src", "img/connected_to_device_not_to_thingspeak.png");

  } else if ((connectedDevice == undefined) && (connectedThingspeak == false)) {
    $('#panel_title').css("color", "red");
    $('#panel_title').html("Scan for hardware to connect to phone app or <br/>Connect to another Configuration Key");
    $('#panel_image').attr("src", "img/Not_connected_to_both_thingspeak_device.png");

  }


  if ((connectedDevice == true) && (connectedThingspeak == true)) {

    if ((logic_constructed_D9 == false) && (logic_constructed_D10 == false)) {

      if ((digital_enabled_D9 == true) || (digital_enabled_D10 == true)) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Set Logic to connect sensor feeds to outputs");
        $('#panel_image').attr("src", "img/device_not_connected_to_outputs.png");
      } else {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Use App Control Panel to control data from connected device");
        $('#panel_image').attr("src", "img/connected_to_device_and_thingspeak.png");
      }
    } else if ((logic_constructed_D9 == true || logic_constructed_D10 == true)) {
      $('#panel_title').css("color", "black");
      $('#panel_title').html("Click Save to save current control panel setting");
      $('#panel_image').attr("src", "img/device_connected_to_outputs.png");
    }

  }

  if ((connectedDevice == true) && (connectedThingspeak == false)) {

    if ((logic_constructed_D9 == false) && (logic_constructed_D10 == false)) {

      if ((digital_enabled_D9 == true) || (digital_enabled_D10 == true)) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Set Logic to connect sensor feeds to outputs");
        $('#panel_image').attr("src", "img/connected_to_device_not_to_thingspeak_not_to_outputs.png");
      } else {
        $('#panel_title').css("color", "red");
        $('#panel_title').html("Connecting to Thingspeak... <br/> if error persists, check your Configuration key information");
        $('#panel_image').attr("src", "img/connected_to_device_not_to_thingspeak.png");
      }
    } else if ((logic_constructed_D9 == true || logic_constructed_D10 == true)) {
      $('#panel_title').css("color", "black");
      $('#panel_title').html("Click Save to save current control panel setting");
      $('#panel_image').attr("src", "img/connected_to_device_not_to_thingspeak_connected_to_outputs.png");
    }

  }

  if ((connectedDevice == true) && (connectedThingspeak == true)) {

    if ((logic_constructed_D9 == false) && (logic_constructed_D10 == false)) {

      if (get_data_feed_1 == true) {
        if ((logic_constructed_D9 == false) && (logic_constructed_D10 == false)) {
          $('#panel_title').css("color", "black");
          $('#panel_title').html("Retrieve data feed from another WearON device");
          $('#panel_image').attr("src", "img/not_connected_to_outputs_connected_to_thingspeak_failed_cross_connectivity.png");
        }
      } else { //if get_data_feed_1 = false
        if ((logic_constructed_D9 == false) && (logic_constructed_D10 == false)) {
          $('#panel_title').css("color", "black");
          $('#panel_title').html("Use Cross Connecitity Control Panel to control data from connected device");
          $('#panel_image').attr("src", "img/connected_to_device_and_thingspeak.png");
        }
      }

      if (get_data_1_success == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to output");
        $('#panel_image').attr("src", "img/not_connected_to_outputs_connected_to_thingspeak_success_cross_connectivity.png");
      }

      if (show_panel_data_feed_1 == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Enable either D9 or D10 to set logic for data feed");
        $('#panel_image').attr("src", "img/not_yet_connected_to_outputs_connected_to_thingspeak_success_cross_connectivity.png");
      }

      if (logic_constructed_data_feed_1 == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Click Save to save current control panel setting");
        $('#panel_image').attr("src", "img/connected_to_thingspeak_success_cross_connectivity.png");
      }

    } else if ((logic_constructed_D9 == true || logic_constructed_D10 == true)) {
      if (get_data_feed_1 == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Retrieve data feed from another WearON device");
        $('#panel_image').attr("src", "img/connected_to_thingspeak_failed_cross_connectivity.png");
      } else {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Use Cross Connecitity Control Panel to control data from connected device");
        $('#panel_image').attr("src", "img/device_connected_to_outputs.png");
      }

      if (get_data_1_success == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to output");
        $('#panel_image').attr("src", "img/connected_to_thingspeak_success_cross_connectivity.png");
      }

    }


  }

  if ((connectedDevice == true) && (connectedThingspeak == false)) {

    if ((logic_constructed_D9 == false) && (logic_constructed_D10 == false)) {

      if (get_data_feed_1 == true) {
        if ((logic_constructed_D9 == false) && (logic_constructed_D10 == false)) {
          $('#panel_title').css("color", "black");
          $('#panel_title').html("Retrieve data feed from another WearON device");
          $('#panel_image').attr("src", "img/connected_to_device_not_to_thingspeak_failed_cross_connectivity.png");
        }
      } else {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("App might take a while to connect to Thingspeak <br>if problem persists, please check whether input key is correct");
        $('#panel_image').attr("src", "img/connected_to_device_not_to_thingspeak.png");
      }

      if (get_data_1_success == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to output");
        $('#panel_image').attr("src", "img/connected_to_device_not_to_thingspeak_success_cross_connectivity.png");
      }

      if (show_panel_data_feed_1 == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Enable either D9 or D10 to set logic for data feed");
        $('#panel_image').attr("src", "img/not_connected_to_thingspeak_success_cross_connectivity_1.png");
      }

      if (logic_constructed_data_feed_1 == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Click Save to save current control panel setting");
        $('#panel_image').attr("src", "img/not_connected_to_thingspeak_success_cross_connectivity.png");
      }

    } else if ((logic_constructed_D9 == true || logic_constructed_D10 == true)) {

      //haven fill in this part!!!!
      if (get_data_feed_1 == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Retrieve data feed from another WearON device");
        $('#panel_image').attr("src", "img/not_connected_to_thingspeak_failed_cross_connectivity.png");
      } else {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Use Cross Connecitity Control Panel to control data from connected device");
        $('#panel_image').attr("src", "img/connected_to_device_not_to_thingspeak_connected_to_outputs.png");
      }

      if (get_data_1_success == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to output");
        $('#panel_image').attr("src", "img/not_connected_to_thingspeak_success_cross_connectivity.png");
      }

    }


  }

  if (get_thingful == true) {

    if ((connectedDevice == true) && (connectedThingspeak == true)) {
      $('#panel_title').css("color", "black");
      $('#panel_title').html("Retrieve data from the specified Thing on Thingful");
      $('#panel_image').attr("src", "img/connectedto_device_control_panel_not_connectedto_thingful.png");

      if ((logic_constructed_D9 == true) || (logic_constructed_D10 == true)) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Retrieve data from the specified Thing on Thingful");
        $('#panel_image').attr("src", "img/connectedto_output_not_connectedto_thingful.png");
      }

      if (get_data_1_success == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Retrieve data from the specified Thing on Thingful");
        $('#panel_image').attr("src", "img/connectedto_device_all_and_cross_control_panel_not_connectedto_thingful.png");

        if (logic_constructed_data_feed_1 == true) {
          $('#panel_title').css("color", "black");
          $('#panel_title').html("Retrieve data from the specified Thing on Thingful");
          $('#panel_image').attr("src", "img/connectedto_device_all_and_cross_control_panel_not_connectedto_thingful.png");
        }

      }
    }

    if ((connectedDevice == true) && (connectedThingspeak == false)) {
      $('#panel_title').css("color", "black");
      $('#panel_title').html("Retrieve data from the specified Thing on Thingful");
      $('#panel_image').attr("src", "img/not_connected_to_thingspeak_connectedto_device_control_panel_not_connectedto_thingful.png");

      if ((logic_constructed_D9 == true) || (logic_constructed_D10 == true)) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Retrieve data from the specified Thing on Thingful");
        $('#panel_image').attr("src", "img/not_connected_to_thingspeak_connectedto_device_and_cross_control_panel_not_connectedto_thingful.png");
      }

      if (get_data_1_success == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Retrieve data from the specified Thing on Thingful");
        $('#panel_image').attr("src", "img/not_connected_to_thingspeak_connectedto_device_and_cross_control_panel_not_connectedto_thingful.png");

        if (logic_constructed_data_feed_1 == true) {
          $('#panel_title').css("color", "black");
          $('#panel_title').html("Retrieve data from the specified Thing on Thingful");
          $('#panel_image').attr("src", "img/not_connected_to_thingspeak_connected_to_all.png");
        }

      }
    }

  }

  if (get_thingful_success == true) {

    if ((connectedDevice == true) && (connectedThingspeak == true)) {
      $('#panel_title').css("color", "black");
      $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to thing");
      $('#panel_image').attr("src", "img/connectedto_device_control_panel_connectedto_thingful.png");

      if ((logic_constructed_D9 == true) || (logic_constructed_D10 == true)) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to thing");
        $('#panel_image').attr("src", "img/connectedto_output_connectedto_thingful.png");
      }

      if (get_data_1_success == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to thing");
        $('#panel_image').attr("src", "img/connectedto_device_all_and_cross_control_panel_connectedto_thingful.png");

        if (logic_constructed_data_feed_1 == true) {
          $('#panel_title').css("color", "black");
          $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to thing");
          $('#panel_image').attr("src", "img/connectedto_device_all_and_cross_control_panel_connectedto_thingful.png");
        }

      }

      if ((logic_constructed_D9 == false) && (logic_constructed_D10 == false) && (logic_constructed_data_feed_1 == false)) {

        if (show_panel_thingful == true) {
          $('#panel_title').css("color", "black");
          $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to thing");
          $('#panel_image').attr("src", "img/connected_to_thingful_not_connected_to_alloutputs.png");
        }

        if (logic_constructed_thingful_data_feed == true) {

          if ((connectedDevice == true) && (connectedThingspeak == true)) {

            $('#panel_title').css("color", "black");
            $('#panel_title').html("Open Cross Connectivity Panel to connect other wearable devices");
            $('#panel_image').attr("src", "img/connectedto_output_connectedto_thingful.png");

          }

        }

      }

    }


    if ((connectedDevice == true) && (connectedThingspeak == false)) {
      $('#panel_title').css("color", "black");
      $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to thing");
      $('#panel_image').attr("src", "img/not_connected_to_thingspeak_connectedto_output_connectedto_thingful.png");

      if ((logic_constructed_D9 == true) || (logic_constructed_D10 == true)) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to thing");
        $('#panel_image').attr("src", "img/not_connected_to_thingspeak_connectedto_output_connectedto_thingful_2.png");
      }

      if (get_data_1_success == true) {
        $('#panel_title').css("color", "black");
        $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to thing");
        $('#panel_image').attr("src", "img/not_connected_to_thingspeak_connectedto_device_and_cross_control_panel_connectedto_thingful.png");

        if (logic_constructed_data_feed_1 == true) {
          $('#panel_title').css("color", "black");
          $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to thing");
          $('#panel_image').attr("src", "img/not_connected_to_thingspeak_connectedto_device_all_and_cross_control_panel_connectedto_thingful.png");
        }

      }

      if ((logic_constructed_D9 == false) && (logic_constructed_D10 == false) && (logic_constructed_data_feed_1 == false)) {

        if (show_panel_thingful == true) {
          $('#panel_title').css("color", "black");
          $('#panel_title').html("Make sure either D9 or D10 is enabled to set Logic to connect data feed to thing");
          $('#panel_image').attr("src", "img/not_connected_to_thingspeak_connected_to_thingful_not_connected_to_alloutputs.png");
        }

        if (logic_constructed_thingful_data_feed == true) {

          if ((connectedDevice == true) && (connectedThingspeak == false)) {

            $('#panel_title').css("color", "black");
            $('#panel_title').html("Open Cross Connectivity Panel to connect other wearable devices");
            $('#panel_image').attr("src", "img/not_connected_to_thingspeak_and_connectedto_output_connectedto_thingful.png");

          }

        }

      }

    }

  }


}


//check device status during end user mode 
//check the phone's seting to make sure that the phone's bluetooth, wifi, gps are constantly on and stable
var checkDevice;

function checkingDeviceSetting() {
  checkDevice = setInterval(checkDeviceSetting, 2000); //check whether phone's setting is good every 2 seconds
};

function checkDeviceSetting() {

  //check whether bluetooth on phone is enabled 
  cordova.plugins.diagnostic.isBluetoothEnabled(function(enabled) {
    var b = enabled ? "enabled" : "disabled";

    if (b == "enabled") {

      $('#bluetooth_setting').css("color", "green");
      $('#bluetooth_setting').html("<b>Enabled</b>");

      $("#device_check_bluetooth").hide();

      bluetoothCheck = true;

    } else {

      $('#bluetooth_setting').css("color", "red");
      $('#bluetooth_setting').html("<b>Disabled *check phone setting*</b>");

      if (startAppCheck == true) {
        $("#device_check_bluetooth").show();
        $('#device_check_bluetooth').text('Bluetooth disabled *check phone setting*');
      } else {
        $("#device_check_bluetooth").hide();
      }
    }

  }, function(error) {
    console.error("The following error occurred: " + error);
  });

  //check whether network connection on phone is enabled 
  function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    var n = states[networkState];
    if ((n == "WiFi connection") || (n == "Cell 3G connection") || (n == "Cell 4G connection")) {

      $('#network_setting').css("color", "green");
      $('#network_setting').html("<b>Good strength</b>");

      $("#device_check_network").hide();
      $('#user_device_check_network').hide();

      networkCheck = true;

    } else if (n == "No network connection") {

      if (startAppCheck == true) {
        $("#device_check_network").show();
        $('#device_check_network').text('No network found *check phone setting*');
        $('#user_device_check_network').show();
        $('#user_device_check_network').html('<b>No network found *check phone setting*</b>');


      } else {
        $("#device_check_network").hide();
        $('#user_device_check_network').hide();

      }

      $('#network_setting').css("color", "red");
      $('#network_setting').html("<b>" + n + "</b>");

    } else {

      if (startAppCheck == true) {
        $("#device_check_network").show();
        $('#device_check_network').text('Weak network connection *check phone setting* ');
        $('#user_device_check_network').show();
        $('#user_device_check_network').html('<b>Weak network connection *check phone setting* </b>');

      } else {
        $("#device_check_network").hide();
        $('#user_device_check_network').hide();

      }

      $('#network_setting').css("color", "red");
      $('#network_setting').html("<b>" + n + ": weak</b>");

    }
  };

  checkConnection(); // check network connection 

  //check whether GPS on phone is enabled 
  cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
    var g = enabled ? "enabled" : "disabled";
    if (g == "enabled") {

      $('#gps_setting').css("color", "green");
      $('#gps_setting').html("<b>Enabled</b>");

      $("#device_check_gps").hide();
      $("#user_device_check_gps").hide();

      gpsCheck = true;

    } else {

      if (startAppCheck == true) {
        $("#device_check_gps").show();
        $('#device_check_gps').text('GPS disabled *check phone setting* ');
        $("#user_device_check_gps").show();
        $("#user_device_check_gps").html('<b>GPS disabled *check phone setting*</b> ');
      } else {
        $("#device_check_gps").hide();
        $("#user_device_check_gps").hide();
      }

      $('#gps_setting').css("color", "red");
      $('#gps_setting').html("<b>Disabled</b> *check phone setting*");

    }
    // console.log("Location is " + (enabled ? "enabled" : "disabled"));
  }, function(error) {
    console.error("The following error occurred: " + error);
  });

  //show the begin button ONLY if all the 3 conditions (good network, gps, wifi) are met
  if (startAppCheck == false) {
    if ((bluetoothCheck == true) && (networkCheck == true) && (gpsCheck == true)) {
      $("#begin").show();
      $("#placeholderBegin").hide();
    }
  } else {
    $("#begin").hide();
    $("#placeholderBegin").show();
  }

};
//open or close app main control panel
function openAppControl() {

  if (openControlPanel) {
    openControlPanel = false;
    $('#show_control_panel').text('+');
    $('#show_control_panel').css("background", "lightgrey");
    $('#show_control_panel').css("color", "black");
    $("#app_control_content").hide();

    if (show_panel_D9 == true) {
      $("#connect_D9_panel").hide();
    }
    if (show_panel_D10 == true) {
      $("#connect_D10_panel").hide();
    }

  } else {

    openControlPanel = true;
    $('#show_control_panel').text('-');
    $('#show_control_panel').css("background", "black");
    $('#show_control_panel').css("color", "white");
    $("#app_control_content").show();

  }

};

//open or close app cross connectivity control panel
function openAppConnectivity() {

  if (openConnectivityControlPanel) {
    openConnectivityControlPanel = false;
    $('#show_connectivity_panel').text('+');
    $('#show_connectivity_panel').css("background", "lightgrey");
    $('#show_connectivity_panel').css("color", "black");
    $("#app_connectivity_control_content").hide();
    $("#get_data_set_1_panel").hide();
    $("#connect_data_feed_1_panel").hide();

  } else {

    openConnectivityControlPanel = true;
    $('#show_connectivity_panel').text('-');
    $('#show_connectivity_panel').css("background", "black");
    $('#show_connectivity_panel').css("color", "white");
    $("#app_connectivity_control_content").show();

  }

};

//open or close app global connectivity control panel
function openAppGlobalConnectivity() {

  if (openGlobalConnectivityControlPanel) {
    openGlobalConnectivityControlPanel = false;
    $('#show_global_connectivity_panel').text('+');
    $('#show_global_connectivity_panel').css("background", "lightgrey");
    $('#show_global_connectivity_panel').css("color", "black");
    $("#app_global_connectivity_control_content").hide();
    $("#get_thingful_data_panel").hide();
    $("#connect_thingful_data_panel").hide();

  } else {

    openGlobalConnectivityControlPanel = true;
    $('#show_global_connectivity_panel').text('-');
    $('#show_global_connectivity_panel').css("background", "black");
    $('#show_global_connectivity_panel').css("color", "white");
    $("#app_global_connectivity_control_content").show();

  }
};

// BLE-mini connection check function, comment it out if using Blend Micro
// function BLE_mini_connection_check() {
//   setInterval(function() {
//     app.sendData([0x03, 0x00, 0x00]);
//   }, 1000);
// }