app.toggleLockScreen = function() {

	if (lockScreenStatus) {
		$("#verification").show(); // verify via password before unlocking screen, show the verification screen
	} else {
		//in end user mode
		lockScreenStatus = true;
		saveState(); // save state of device control panel
		saveState_connectivity(); //save state of connectivity control panel
		localStorage.lockScreenStatus = lockScreenStatus;
		$('body').css("background-color", "#ffa500"); // change the colour of the background of the whole app screen
		$('link[href="css/global.css"]').attr('href', 'css/user.css'); // switch to user css file, designer can alter the code to change the UI 
		$("#userA4").empty();
		$("#userA5").empty();
		$("#userGeo").empty();
		$("#userGeoShape").hide();
		$("#endUserContent").show(); // open end user UI interface html content
		$("#AppContent").hide(); // hide default app html content
		$("#disconnectDevice").hide();
		$('#AppControl').hide();
		$('#AppConnectivityControl').hide();
		$('#AppGlobalConnectivityControl').hide();
		$('#disconnectButton').hide();
		$('#visual_panel').hide();
		$("#connect_D9_panel").hide();
		$("#connect_D10_panel").hide();
		$("#connect_data_feed_1_panel").hide();
		$("#get_data_set_1_panel").hide();
		checkDataForUser();
	}
};

//function for verification screen
function verifyPassword() {

	var password = document.getElementById("lockScreenPassword").value;
	if (password == localStorage.userLockPassword) {

		$("#lockScreenPassword").val('');
		$("#verification").hide();
		//in designer mode
		lockScreenStatus = false; // app is back to designer mode
		userQuitApp = false; //app is back to normal
		userQuitAppReconnect = false;

		localStorage.lockScreenStatus = lockScreenStatus;
		$("#endUserContent").hide(); // hide end user UI interface html content

		$('body').css("background-color", "white"); //back to default colour
		$('link[href="css/user.css"]').attr('href', 'css/global.css'); // switch back to default css file

		$("#AppContent").show(); // open default app html content
		$("#disconnectDevice").show();
		$('#AppControl').show();
		$('#AppConnectivityControl').show();
		$('#AppGlobalConnectivityControl').show();
		$('#disconnectButton').show();
		checkVisualStatus();
		$('#visual_panel').show();

		if (connectedDevice == undefined) {
			app.disconnect();
		}

		if (openControlPanel == true) {
			openAppControl();
		}

		if (openConnectivityControlPanel == true) {
			openAppConnectivity();
		}

	} else {
		$("#lockScreenPassword").val('');
		$("#wrong_password").show();
		$("#wrong_password").fadeToggle(2000);
		$("#verification").hide();
	}

};

//hide verification if the password keyed in by user/designer is wrong in End user UI interface
function cancelUnlockScreen() {
	$("#verification").hide();
};


function checkDataForUser() {
	//alter content of what end user will see
	//alter A4 content
	if (analog_enabled_A4 == true) {
		if (A4reading > 980) {
			$('#userA4').html("Dark");
		} else if (A4reading < 980) {
			$('#userA4').html("Bright");
		}
	}

	if (analog_enabled_A5 == true) {
		//alter A5 content
		if (A5reading > 500) {
			$('#userA5').html("Nothing In Front!");
		} else if (A5reading < 500) {
			$('#userA5').html("Something In Front!");
		}
	}

	if (geolocation_enabled == true) {
		//alter geolocation content
		$("#userGeoShape").show();
		$("#userGeo").show();
		$('#userGeo').html("Your Location <br> (" + myLocationLat + "," + myLocationLong + ")");
	}

};