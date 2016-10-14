//save the state of the control panel in local storage of phone
function saveState() {
	//check state of various analog, digital, geo inputs and outputs
	localStorage.saveState_analog_enabled_A4 = analog_enabled_A4;
	localStorage.saveState_connect_to_A4 = connect_to_A4;

	localStorage.saveState_analog_enabled_A5 = analog_enabled_A5;
	localStorage.saveState_connect_to_A5 = connect_to_A5;

	localStorage.saveState_geolocation_enabled = geolocation_enabled;
	localStorage.saveState_connect_to_Geo = connect_to_Geo;

	localStorage.saveState_digital_enabled_D9 = digital_enabled_D9;
	localStorage.saveState_connect_to_D9 = connect_to_D9;

	localStorage.saveState_digital_enabled_D10 = digital_enabled_D10;
	localStorage.saveState_connect_to_D10 = connect_to_D10;

	localStorage.logic_constructed_D9 = logic_constructed_D9;
	localStorage.greater_than_D9 = greater_than_D9;
	localStorage.A5_on_D9 = A5_on_D9;
	localStorage.on_D9 = on_D9;
	localStorage.numD9 = numD9;

	localStorage.logic_constructed_D10 = logic_constructed_D10;
	localStorage.greater_than_D10 = greater_than_D10;
	localStorage.A5_on_D10 = A5_on_D10;
	localStorage.on_D10 = on_D10;
	localStorage.numD10 = numD10;
};

//use the last saved state of the control panel
function useState() {

	//verify last state of A4 controls, put it back to last saved state
	if (localStorage.saveState_analog_enabled_A4 == "true") { // if save state is true but the current setting is false
		if (analog_enabled_A4 == false) {
			app.toggelAnalogA4(); // turn it to true
		}
	} else {
		if (analog_enabled_A4 == true) { // if save state is false but current setting is true
			app.toggelAnalogA4(); // turn it back to false
		}
	};

	if (localStorage.saveState_connect_to_A4 == "true") { // if save state is true but the current setting is false
		if (connect_to_A4 == false) {
			toggelConnectA4(); // turn it to true
		}
	} else {
		if (connect_to_A4 == true) { // if save state is false but current setting is true
			toggelConnectA4(); // turn it back to false
		}
	};

	//verify last state of A5 controls, put it back to last saved state
	if (localStorage.saveState_analog_enabled_A5 == "true") { // if save state is true but the current setting is false
		if (analog_enabled_A5 == false) { // turn it to true
			app.toggelAnalogA5();
		}
	} else {
		if (analog_enabled_A5 == true) { // if save state is false but current setting is true
			app.toggelAnalogA5(); // turn it back to false
		}
	};

	if (localStorage.saveState_connect_to_A5 == "true") { // if save state is true but the current setting is false
		if (connect_to_A5 == false) { // turn it to true
			toggelConnectA5();
		}
	} else {
		if (connect_to_A5 == true) { // if save state is false but current setting is true
			toggelConnectA5(); // turn it back to false
		}
	};

	//verify last state of Geo controls, put it back to last saved state
	if (localStorage.saveState_geolocation_enabled == "true") { // if save state is true but the current setting is false
		if (geolocation_enabled == false) { // turn it to true
			app.toggleGeoTrack();
		}
	} else {
		if (geolocation_enabled == true) { // if save state is false but current setting is true
			app.toggleGeoTrack(); // turn it back to false
		}
	};

	if (localStorage.saveState_connect_to_Geo == "true") { // if save state is true but the current setting is false
		if (connect_to_Geo == false) { // turn it to true
			toggelConnectGeo();
		}
	} else {
		if (connect_to_Geo == true) { // if save state is false but current setting is true
			toggelConnectGeo(); // turn it to true
		}
	}

	if (localStorage.saveState_digital_enabled_D9 == "true") { // if save state is true but the current setting is false
		if (digital_enabled_D9 == false) {
			app.toggleDigitalD9(); // turn it to true
		}
	} else {
		if (digital_enabled_D9 == true) { // if save state is false but current setting is true
			app.toggleDigitalD9(); // turn it back to false
		}
	};

	if (localStorage.saveState_connect_to_D9 == "true") { // if save state is true but the current setting is false
		if (connect_to_D9 == false) {
			toggelConnectD9(); // turn it to true
		}
	} else {
		if (connect_to_D9 == true) { // if save state is false but current setting is true
			toggelConnectD9(); // turn it back to false
		}
	};

	if (localStorage.saveState_digital_enabled_D10 == "true") { // if save state is true but the current setting is false
		if (digital_enabled_D10 == false) {
			app.toggleDigitalD10(); // turn it to true
		}
	} else {
		if (digital_enabled_D10 == true) { // if save state is false but current setting is true
			app.toggleDigitalD10(); // turn it back to false
		}
	};

	if (localStorage.saveState_connect_to_D10 == "true") { // if save state is true but the current setting is false
		if (connect_to_D10 == false) {
			toggelConnectD10(); // turn it to true
		}
	} else {
		if (connect_to_D10 == true) { // if save state is false but current setting is true
			toggelConnectD10(); // turn it back to false
		}
	};

	//verify last state of D9 controls, put it back to last saved state
	if (localStorage.logic_constructed_D9 == "true") {
		logic_constructed_D9 = true;

		$('#check_overall_logic_status_D9').html('<b>-Logic: Successful-</b>');
		$('#check_overall_logic_status_D9').css("color", "green");

		$('.connectD9').css("background-color", "black");
		$('.connectD9').css("color", "white");
		$('.connectD9').text('Reset Logic');

		//check where greater_than logic was previously
		if (localStorage.greater_than_D9 == "2") {

			if (greater_than_D9 == "1") {

				checkLogicD9_greater_than();

			} else if (greater_than_D9 == "3") {

				greater_than_D9 = 1;
				checkLogicD9_greater_than();

			}
		} else if (localStorage.greater_than_D9 == "3") {

			if (greater_than_D9 == "1") {

				greater_than_D9 = 2;
				checkLogicD9_greater_than();

			} else if (greater_than_D9 == "2") {

				checkLogicD9_greater_than();
			}
		} else if (localStorage.greater_than_D9 == "1") {

			if (greater_than_D9 == "2") {

				greater_than_D9 = 3;
				checkLogicD9_greater_than();

			} else if (greater_than_D9 == "3") {

				checkLogicD9_greater_than();
			}

		}

		//check which sensor was used previously
		if (localStorage.A5_on_D9 == "false") { // if previously A4 was selected
			if (A5_on_D9 == true) {
				checkLogicD9_sensor();
			}
		} else if (localStorage.A5_on_D9 == "true") { // if previously A5 was selected
			if (A5_on_D9 == false) {
				checkLogicD9_sensor();
			}
		}

		//check what number was used input previously
		if (localStorage.numD9 != numD9) {
			document.getElementById("numbering_D9").value = localStorage.numD9;
			numD9 = localStorage.numD9;
		}

		//check whether ON or OFF was used input previously
		if (localStorage.on_D9 == "true") {
			if (on_D9 == false) {
				checkLogicD9_on_off();
			}
		} else if (localStorage.on_D9 == "false") {
			if (on_D9 == true) {
				checkLogicD9_on_off();
			}
		}

		checkLogicD9_number();

	}

	//verify last state of D10 controls, put it back to last saved state
	if (localStorage.logic_constructed_D10 == "true") {
		logic_constructed_D10 = true;

		$('#check_overall_logic_status_D10').html('<b>-Logic: Successful-</b>');
		$('#check_overall_logic_status_D10').css("color", "green");

		$('.connectD10').css("background-color", "black");
		$('.connectD10').css("color", "white");
		$('.connectD10').text('Reset Logic');

		//check where greater_than logic was previously
		if (localStorage.greater_than_D10 == "2") {

			if (greater_than_D10 == "1") {

				checkLogicD10_greater_than();

			} else if (greater_than_D10 == "3") {

				greater_than_D10 = 1;
				checkLogicD10_greater_than();

			}
		} else if (localStorage.greater_than_D10 == "3") {

			if (greater_than_D10 == "1") {

				greater_than_D10 = 2;
				checkLogicD10_greater_than();

			} else if (greater_than_D10 == "2") {

				checkLogicD10_greater_than();
			}
		} else if (localStorage.greater_than_D10 == "1") {

			if (greater_than_D10 == "2") {

				greater_than_D10 = 3;
				checkLogicD10_greater_than();

			} else if (greater_than_D10 == "3") {

				checkLogicD10_greater_than();
			}

		}

		//check which sensor was used previously
		if (localStorage.A5_on_D10 == "false") { // if previously A4 was selected
			if (A5_on_D10 == true) {
				checkLogicD10_sensor();
			}
		} else if (localStorage.A5_on_D10 == "true") { // if previously A5 was selected
			if (A5_on_D10 == false) {
				checkLogicD10_sensor();
			}
		}

		//check what number was used input previously
		if (localStorage.numD10 != numD10) {
			document.getElementById("numbering_D10").value = localStorage.numD10;
			numD10 = localStorage.numD10;
		}

		//check whether ON or OFF was used input previously
		if (localStorage.on_D10 == "true") {
			if (on_D10 == false) {
				checkLogicD10_on_off();
			}
		} else if (localStorage.on_D10 == "false") {
			if (on_D10 == true) {
				checkLogicD10_on_off();
			}
		}

		checkLogicD10_number();
		checkLogicD9_number();
		checkLogic_data_feed_1_number();

	}

};