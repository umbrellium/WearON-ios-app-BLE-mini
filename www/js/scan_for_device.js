document.addEventListener('deviceready', function() {
	app.initialize();
}, false);

document.addEventListener('backbutton', function(e) { // only work in android platform
	backAsHome.trigger(); // avtivate home button default function
	e.preventDefault(); //prevent default back button function from executing
}, 101);

var app = {};

app.RBL_SERVICE_UUID = '713d0000-503e-4c75-ba94-3148f18d941e';
app.RBL_CHAR_TX_UUID = '713d0002-503e-4c75-ba94-3148f18d941e';
app.RBL_CHAR_RX_UUID = '713d0003-503e-4c75-ba94-3148f18d941e';
app.RBL_TX_UUID_DESCRIPTOR = '00002902-0000-1000-8000-00805f9b34fb';

app.initialize = function() {
	startAppCheck = false;
	app.connected = false;
	showStoredConnectedDevice(); // check for stored connected device data
	checkingDeviceSetting();
	checkVisualStatus();

	//check whether there is a last stored config key, if dont have, dont show the option to access last save config key
	if ((localStorage.lastSavedKey == "-") || (localStorage.lastSavedKey == undefined)) {
		$(".useStoredToken").hide();
	} else {
		$('.useStoredToken').html("Use Last Saved Key: <br><b>" + localStorage.lastSavedKey + "</b>");
	}

	$('#bluetooth_setting').html("checking...");
	$('#bluetooth_setting').css("color", "red");

	$('#network_setting').html("checking...");
	$('#network_setting').css("color", "red");

	$('#gps_setting').html("checking...");
	$('#gps_setting').css("color", "red");

};

app.startScan = function() {

	//if in designer mode (lockScreenStatus==false), get app to scan for all ble devices it can find
	app.disconnect();

	app.devices = {}; //store device info as object

	if ((userQuitApp == true) && (userQuitAppReconnect == false)) {

		$('#user_device_connection').html("<b>App restarted</b><br>Scanning for device...");

	} else if ((userQuitApp == true) && (userQuitAppReconnect == true)) {

		$('#user_device_connection').html("<b>*Lost connection with device* <br>Reconnecting, this may take a while...</b><br>Check that: 1. your device has power signal, 2. phone's bluetooth is ON");
	}

	//if in designer mode
	if (lockScreenStatus == false) {

		$("#anotherToken").hide();

		$('#scanStatus').show();

		var htmlString =
			'<p> Scanning...</p>';

		checkVisualStatus();

		$('#scanResultView').append($(htmlString));

		$('#scanResultView').show();

		localStorage.lockScreenStatus = lockScreenStatus;

	}

	//if in designer mode (lockScreenStatus==false), get app to do its default scan for device function 
	function onScanSuccess(device) {

		if (device.name != null) //if detect any devices 
		{

			if (lockScreenStatus == false) {

				app.devices[device.address] = device;

				var htmlString =
					'<button class="deviceContainer" style="-webkit-appearance:none; border-radius:0; font-size:15px; margin:1vw;"onclick="app.connectTo(\'' +
					device.address + '\')">' +
					'<p class="deviceName">' + device.name + '</p>' +
					'<p class="deviceAddress">' + device.address + '</p>' +
					'</button>';

				$('#scanResultView').append($(htmlString));

			}

			// if app quit and restart in the end user mode, reconnect to the same device again
			if (userQuitApp == true) {

				app.devices[device.address] = device;
				localStoreDevice = JSON.parse(localStorage.getItem('deviceInfo'));

				if (device.name == localStoreDevice.name) {

					$('#user_device_connection').html("<b>*Device found*</b><br>Reconnecting...this may take a while...");
					app.connectTo(localStoreDevice.address);

				} else {

					$('#user_device_connection').html("<b>*Device cannot be found*</b><br>Check that: 1. your device has power signal, 2. phone's bluetooth is ON");
				}
			}

		}

	}

	if (lockScreenStatus == true) {

		app.connectTo(storedDeviceInfo.address);

		$('#user_device_connection').html("<b>*Lost connection with device* <br>Reconnecting, this may take a while...</b><br>Check that: 1. your device has power signal, 2. phone's bluetooth is ON");

	}



	function onScanFailure(errorCode) {
		// Show an error message to the user
		app.disconnect('Failed to scan for devices.');
		// Write debug information to console.
		alert('Error ' + errorCode);
	}

	evothings.easyble.reportDeviceOnce(true);
	evothings.easyble.startScan(onScanSuccess, onScanFailure);

	$('#scanForDevice').hide();

};

app.setLoadingLabel = function(message) {
	$('#scanStatus').text(message);
}

app.connectTo = function(address) {

	//if in designer mode, get app to do its default connect to device function 
	//OR if app quit by accident while in end user mode

	if ((lockScreenStatus == false) || (userQuitApp == true)) {

		device = app.devices[address];

		app.setLoadingLabel('Trying to connect to ' + device.name + "...");

		//else if in end user mode, get app to connec directly to that previously connected device
	} else {

		device = storedDeviceInfo; // if device is reconnecting in end user mode

	}

	function onConnectSuccess(device) {

		function onServiceSuccess(device) {
			// Application is now connected
			app.connected = true;
			app.device = device;

			//if in designer mode, store the currently connected device's info
			if (lockScreenStatus == false) {
				storedDeviceInfo = device;
			}

			// store connected device to global variable
			connectedDevice = device.name;
			//store device info locally to access it when app quit by accident
			localStorage.setItem('deviceInfo', JSON.stringify(device));

			showStoredConnectedDevice();

			device.writeDescriptor(
				app.RBL_CHAR_TX_UUID,
				app.RBL_TX_UUID_DESCRIPTOR,
				new Uint8Array([1, 0]),
				function() {
					// BLE-mini connection check function, comment it out if using Blend Micro
					// BLE_mini_connection_check();
					//if in designer mode
					if (lockScreenStatus == false) {
						//reset the store value of analog_enabled_A4, analog_enabled_A4, geolocation_enabled 
						//so that app can keep track of status of them is app quit during end user mode
						localStorage.analog_enabled_A4 = false;
						localStorage.analog_enabled_A5 = false;
						localStorage.geolocation_enabled = false;

						$("#user_device_connection").hide();
						$("#lockScreen").hide();
						$('#scanResultView').hide();
						$('#scanStatus').hide();
						$('#disconnectDevice').show();
						$("#tokenKeyPage").show();
						connectedDevice = true;
						checkVisualStatus();
						$('#connectedThingspeakPortals').show();
						$('#anotherToken').hide();
						$('.connectGeo').hide();
						$('.connectD9').hide();
						$('.connectD10').hide();

						if (connectedThingspeak == true) {
							if (openControlPanel == true) {
								openAppControl();
							}
							if (openConnectivityControlPanel == true) {
								openAppConnectivity();
							}
							if (openGlobalConnectivityControlPanel == true) {
								openAppGlobalConnectivity();
							}
							$("#lockScreen").show();
							$('#tokenKeyPage').hide();
							$('#confirmationPage').hide();
							$("#AppControl").show();
							$("#AppConnectivityControl").show();
							$("#AppGlobalConnectivityControl").show();
							$("#AppContent").show();
							$('.connectA5').hide();
							$('#connectA5status').hide();
							$('#geoStatus').hide();
							$('.connectA4').hide();
							$('#connectA4status').hide();
							$('#connect_data_set_1').hide();
						}

						//clear local notification if device is connected back
						cordova.plugins.notification.local.clear(1, function() {});
						// Enable background mode
						cordova.plugins.backgroundMode.enable();
						//Get informed when the background mode could not been activated
						cordova.plugins.backgroundMode.onfailure = function(errorCode) {
							alert(errorCode);
						};

						//else if in end user mode, get app to connect back to those pins and features that were enabled before it got disconnected
					} else {

						connectedDevice = true;
						$('#user_device_connection').html("*Device Connected*");
						//get device's A4,A5,Geo portal to open again, if it was previously turn on before disconnected
						if (analog_enabled_A4 == true) {
							app.sendData([0xA0, 0x01, 0x00]);
						}
						if (analog_enabled_A5 == true) {
							app.sendData([0xA0, 0x03, 0x00]);
						}
						if (geolocation_enabled == true) {
							geolocationTracking();
						}

						if (userQuitApp == false) {
							$("#user_device_connection").fadeToggle(2000);
						} else {
							$("#user_device_connection").fadeOut(2000, openEndUserUI());
						}

						//clear local notification if device is connected back
						cordova.plugins.notification.local.clear(1, function() {});
						// Enable background mode
						cordova.plugins.backgroundMode.enable();
						//Get informed when the background mode could not been activated
						cordova.plugins.backgroundMode.onfailure = function(errorCode) {
							alert(errorCode);
						};
					}

				},
				function(errorCode) {
					// Disconnect and give user feedback.
					app.disconnect('Failed to set descriptor.');

					// Write debug information to console.
					alert('Error: writeDescriptor: ' + errorCode + '.');
				}
			);

			function failedToEnableNotification(erroCode) {
				alert('BLE enableNotification error: ' + errorCode);
			}

			device.enableNotification(
				app.RBL_CHAR_TX_UUID,
				app.receivedData,
				function(errorcode) {
					alert('BLE enableNotification error: ' + errorCode);
				}
			);
		};

		function onServiceFailure(errorCode) {
			// Disconnect and show an error message to the user.
			app.disconnect('Device is not from RedBearLab');

			// Write debug information to console.
			console.log('Error reading services: ' + errorCode);
		};

		app.setLoadingLabel('Identifying services...');

		// Connect to the appropriate BLE service
		device.readServices(
			[app.RBL_SERVICE_UUID],
			onServiceSuccess,
			onServiceFailure
		);
	};

	function onConnectFailure(errorCode) {

		// Disconnect and show an error message to the user.
		app.disconnect();

		// Write debug information to console
		// alert('Error ' + errorCode);
	};

	// Stop scanning
	evothings.easyble.stopScan();
	// Connect to our device
	device.connect(onConnectSuccess, onConnectFailure);


};


app.disconnect = function(errorMessage) {
	//send a ble signal from app to board to turn off microcontroller board
	// app.sendData([0x04, 0x00, 0x00]); //for BLE mini or BLE shield, comment this out line out if using blend micro

	if (errorMessage) {
		// navigator.notification.alert(errorMessage, function() {});
	}
	app.connected = false;
	app.device = null;

	// Stop any ongoing scan and close devices.
	evothings.easyble.stopScan();
	evothings.easyble.closeConnectedDevices();

	connectedDevice = undefined;
	showStoredConnectedDevice();
	//if in designer mode 
	if (lockScreenStatus == false) {
		$("#connect_D9_panel").hide();
		$("#connect_D10_panel").hide();
		$("#connect_data_feed_1_panel").hide();
		$("#get_data_set_1_panel").hide();
		$('#scanStatus').empty();
		$('#scanResultView').hide();
		$('#scanResultView').empty();
		$('#disconnectDevice').hide();

		$("#anotherToken").show()
		$("#scanForDevice").show();

		$('#scanDevicePage').show();
		$("#AppContent").hide();
		$("#AppControl").hide();
		$("#AppConnectivityControl").hide();
		$("#AppGlobalConnectivityControl").hide();
		$('#valueA5').empty();
		$('#valueA4').empty();
		$('#geolocationValue').empty();

		if (analog_enabled_A5 == true) {
			app.toggelAnalogA5();
			$('.connectA5').css("background-color", "white");
			$('.connectA5').css("color", "black");
		};
		if (analog_enabled_A4 == true) {
			app.toggelAnalogA4();
			$('.connectA4').css("background-color", "white");
			$('.connectA4').css("color", "black");
		};
		if (geolocation_enabled == true) {
			app.toggleGeoTrack();
		};

		if (digital_enabled_D9 == true) {
			app.toggleDigitalD9();
		}

		if (digital_enabled_D10 == true) {
			app.toggleDigitalD10();
		}

		if (logic_constructed_D9 == true) {
			logic_constructed_D9 = false;
			$('.connectD9').css("background-color", "white");
			$('.connectD9').css("color", "black");
			$('.connectD9').text('Set Logic');
			greater_than_D9 = 1;
			A5_on_D9 = false;
			on_D9 = false;
			check_number_D9 = false;
			numD9 = "";
			$('#numbering_D9').val("");
		}

		if (logic_constructed_D10 == true) {
			logic_constructed_D10 = false;
			$('.connectD10').css("background-color", "white");
			$('.connectD10').css("color", "black");
			$('.connectD10').text('Set Logic');
			greater_than_D10 = 1;
			A5_on_D10 = false;
			on_D10 = false;
			check_number_D10 = false;
			numD10 = "";
			$('#numbering_D10').val("");
		}

		// for cross connectivity panel///////
		if (logic_constructed_data_feed_1 == true) {
			logic_constructed_data_feed_1 = false;
			$('#connect_data_set_1').css("background-color", "white");
			$('#connect_data_set_1').css("color", "black");
			$('#connect_data_set_1').text('Set Logic');
			greater_than_DataFeed1 = 1;
			D10_on_DataFeed1 = false;
			on_DataFeed1 = false;
			check_number_DataFeed1 = false;
			numDataFeed1 = "";
			$('#numbering_data_feed_1').val("");
			checkLogic_data_feed_1_number();
		} else {
			$('#numbering_data_feed_1').val("");
		}

		if (get_data_feed_1 == true) {
			toggelgetDataFeed1();
		}

		if (get_data_1_success == true) {
			get_data_1_success = false;
			toggelgetDataFeed1();
			$('#get_data_set_1_panel').hide();
			//hide the data feed content on main content screen
			$('#DataFeed1').hide();
		}

		if (show_panel_data_feed_1 == true) {
			toggelConnect_data_feed_1();
		}

		clearInterval(getDataFeed1_Thingspeak);
		//END cross connectivity panel //////

		// for global connectivity panel /////

		if (logic_constructed_thingful_data_feed == true) {
			logic_constructed_thingful_data_feed = false;
			$('#connect_thingful').css("background-color", "white");
			$('#connect_thingful').css("color", "black");
			$('#connect_thingful').text('Set Logic');
			greater_than_thingful_DataFeed = 1;
			D10_on_thingful_DataFeed = false;
			on_thingful_DataFeed = false;
			check_number_thingful_DataFeed = false;
			numThingfulDataFeed = "";
			$('#numbering_thingful_data_feed').val("");
			checkLogic_thingful_data_feed_number();
		} else {
			$('#numbering_thingful_data_feed').val("");
		}

		if (get_thingful == true) {
			toggelgetThingful();
		}

		if (get_thingful_success == true) {
			get_thingful_success = false;
			toggelgetThingful();
			$('#get_thingful_data_panel').hide();
			//hide the data feed content on main content screen
			$('#ThingfulFeed').hide();
		}

		if (show_panel_thingful == true) {
			toggelConnect_thingful();
		}

		clearInterval(getDataFeed_Thingful);

		//END global connectivity panel //////

		A4count = 0;
		A5count = 0;
		geoCount = 0;
		document.getElementById("connectA4status").innerHTML = "Number of readings sent to Thingspeak: - ";
		document.getElementById("connectA5status").innerHTML = "Number of readings sent to Thingspeak: - ";
		document.getElementById("geoStatus").innerHTML = "Number of readings sent to Thingspeak: - ";
		checkVisualStatus();
		if ((connectedDevice == undefined) && (connectedThingspeak == undefined)) {
			$("#tokenKeyPage").hide();
			$("#anotherToken").hide();
		};

		// only disable the background mode if the app is in foreground
		if (cordova.plugins.backgroundMode.isActive() == false) {
			//disable background mode
			cordova.plugins.backgroundMode.disable();
		}
	}

};










