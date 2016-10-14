//some global variables for the logic panel 
var greater_than_D10 = 1;
var A5_on_D10 = false;
var on_D10 = false;
var check_number_D10 = false;
var numD10; // number input by user

//enable/disable D10 digital pin on and off
app.toggleDigitalD10 = function() {
	if (digital_enabled_D10) {
		digital_enabled_D10 = false;
		checkVisualStatus();
		localStorage.digital_enabled_D10 = digital_enabled_D10;
		app.sendData([0x01, 0x00, 0x04]); //turn it off
		if (show_panel_D10 == true) {
			$("#connect_D10_panel").hide(); // hide the connection panel
			if (logic_constructed_D10 == true) {
				$('.connectD10').css("background-color", "black");
				$('.connectD10').css("color", "whi8te");
				$('.connectD10').text('Reset Logic');
			}
		}
		$('.enableD10').css("background-color", "white");
		$('.enableD10').css("color", "black");
		$('.enableD10').text('Enable Pin');
		$('.connectD10').hide();
		if (connect_to_D10 == true) {
			toggelConnectD10();
		}

		if (show_panel_data_feed_1 == true) {
			checkLogic_data_feed_1_number();
			checkLogic_thingful_data_feed_number();
			//run a check on whether D9 is enabled if the logic panel for data feed 1 is opened
		}
		checkVisualStatus();
	} else {
		digital_enabled_D10 = true;
		checkVisualStatus();
		localStorage.digital_enabled_D10 = digital_enabled_D10;
		if ((logic_constructed_D10 == false) && (logic_constructed_data_feed_1 == false)) {
			app.sendData([0x01, 0x00, 0x03]); // turn it on
		}
		$('.enableD10').css("background-color", "black");
		$('.enableD10').css("color", "white");
		$('.enableD10').text('Disable Pin');
		$('.connectD10').show();

		if (show_panel_data_feed_1 == true) {
			checkLogic_data_feed_1_number();
			//run a check on whether D9 is enabled if the logic panel for data feed 1 is opened
		}
		checkVisualStatus();
	}
};


//enable connecting D10
function toggelConnectD10() {

	if (show_panel_D10) {
		show_panel_D10 = false;
		if (show_panel_D9 == true) {
			$("#device_check_panel_D9_D10").hide();
		}
		$("#connect_D10_panel").hide(); // hide the connection panel
		if (logic_constructed_D10 == true) {
			$('.connectD10').css("background-color", "black");
			$('.connectD10').css("color", "white");
			$('.connectD10').text('Reset Logic');
		} else {
			$('.connectD10').css("background-color", "white");
			$('.connectD10').css("color", "black");
			$('.connectD10').text('Set Logic');
		}
	} else {
		show_panel_D10 = true;
		$("#connect_D10_panel").show(); // open up the connection panel
		$('.connectD10').css("background-color", "black");
		$('.connectD10').css("color", "white");
		$('.connectD10').text('Close panel');
		checkLogicD10_number();
	}

};


// check greater than logic for D10
function checkLogicD10_greater_than() {

	if (greater_than_D10 == "1") {

		greater_than_D10 = 2;
		$('#greater_than_D10').html('>');
	} else if (greater_than_D10 == "2") {
		greater_than_D10 = 3;
		$('#greater_than_D10').html('=');
	} else {
		greater_than_D10 = 1;
		$('#greater_than_D10').html('<');
	}

}

//check sensor type chosen
function checkLogicD10_sensor() {

	if (A5_on_D10) {
		A5_on_D10 = false; // A4 selected
		$('#select_sensor_D10').html('A4');
		checkLogicD10_number();
	} else {
		A5_on_D10 = true; // A5 selected
		$('#select_sensor_D10').html('A5');
		checkLogicD10_number();
	}

}

//check on/off for sensor chosen
function checkLogicD10_on_off() {

	if (on_D10) {
		on_D10 = false;
		$('#on_off_D10').html('OFF');
	} else {
		on_D10 = true;
		$('#on_off_D10').html('ON');
	}

}


//check overall logic of the statement made by user for D10 
function checkLogicD10_number() {

	numD10 = document.getElementById("numbering_D10").value;

	if (numD10 == "") {
		$('#check_logic_status_D10_number').show();
		$('#check_logic_status_D10_number').html('*error: input number is not within range*');
		$('#check_logic_status_D10_number').css("color", "red");

		$('#check_overall_logic_status_D10').html('<b>-Logic: Unsuccessful-</b>');
		$('#check_overall_logic_status_D10').css("color", "red");

		check_number_D10 = false;
		logic_constructed_D10 = false;
		if (A5_on_D10 == false) { // if A4 selected
			if (analog_enabled_A4 == false) {
				$('#check_logic_status_D10_sensor').show();
				$('#check_logic_status_D10_sensor').html('*Error - Pin A4 is not enabled*');
				$('#check_logic_status_D10_sensor').css("color", "red");
			} else {
				$('#check_logic_status_D10_sensor').hide();
			}
		} else { //if A5 selected

			if (analog_enabled_A5 == false) {
				$('#check_logic_status_D10_sensor').show();
				$('#check_logic_status_D10_sensor').html('*Error - Pin A5 is not enabled*');
				$('#check_logic_status_D10_sensor').css("color", "red");
			} else {
				$('#check_logic_status_D10_sensor').hide();
			}
		}

	} else {

		check_number_D10 = true;
		$('#check_logic_status_D10_number').hide();
		if (A5_on_D10 == false) { // if A4 selected
			if (analog_enabled_A4 == true) {
				logic_constructed_D10 = true;
				$('#check_overall_logic_status_D10').html('<b>-Logic: Successful-</b>');
				$('#check_overall_logic_status_D10').css("color", "green");
				$('#check_logic_status_D10_sensor').hide();
			} else {
				logic_constructed_D10 = false;
				$('#check_overall_logic_status_D10').html('<b>-Logic: Unsuccessful-</b>');
				$('#check_overall_logic_status_D10').css("color", "red");

				$('#check_logic_status_D10_sensor').show();
				$('#check_logic_status_D10_sensor').html('*Error - Pin A4 is not enabled*');
				$('#check_logic_status_D10_sensor').css("color", "red");
			}
		} else { // if A5 selected
			if (analog_enabled_A5 == true) {
				logic_constructed_D10 = true;
				$('#check_overall_logic_status_D10').html('<b>-Logic: Successful-</b>');
				$('#check_overall_logic_status_D10').css("color", "green");
				$('#check_logic_status_D10_sensor').hide();
			} else {
				logic_constructed_D10 = false;
				$('#check_overall_logic_status_D10').html('<b>-Logic: Unsuccessful-</b>');
				$('#check_overall_logic_status_D10').css("color", "red");


				$('#check_logic_status_D10_sensor').show();
				$('#check_logic_status_D10_sensor').html('*Error - Pin A5 is not enabled*');
				$('#check_logic_status_D10_sensor').css("color", "red");
			}
		}
	}

	if ((logic_constructed_data_feed_1 == true) && (D10_on_DataFeed1 == true)) { //if D10 is used in cross connected device
		$('#check_overall_logic_status_D10').html('<b>-Logic: Unsuccessful-</b>');
		$('#check_overall_logic_status_D10').css("color", "red");

		$('#check_logic_status_D10_sensor').show();
		$('#check_logic_status_D10_sensor').html('*Error - Pin D10 is in use*');
		$('#check_logic_status_D10_sensor').css("color", "red");
		logic_constructed_D10 = false;

		if (show_panel_D10 == false) {
			$('.connectD10').css("background-color", "white");
			$('.connectD10').css("color", "black");
			$('.connectD10').text('Set Logic');
		}

	} else if ((logic_constructed_thingful_data_feed == true) && (D10_on_thingful_DataFeed == true)) { // if D10 is used in global connected device

		$('#check_overall_logic_status_D10').html('<b>-Logic: Unsuccessful-</b>');
		$('#check_overall_logic_status_D10').css("color", "red");

		$('#check_logic_status_D10_sensor').show();
		$('#check_logic_status_D10_sensor').html('*Error - Pin D10 is in use*');
		$('#check_logic_status_D10_sensor').css("color", "red");
		logic_constructed_D10 = false;

		if (show_panel_D10 == false) {
			$('.connectD10').css("background-color", "white");
			$('.connectD10').css("color", "black");
			$('.connectD10').text('Set Logic');
		}

	}

	checkVisualStatus();

}


//if A4 is selected for D10
function initiateLogicA4_D10() {

	if (logic_constructed_D10 == true) {

		if (A5_on_D10 == false) { // if A4 is selected

			if (on_D10 == true) { // if selected: ON
				if (greater_than_D10 == "1") { // selected: <

					if (A4reading < numD10) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}

				} else if (greater_than_D10 == "2") { // if selected : >

					if (A4reading > numD10) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}

				} else if (greater_than_D10 == "3") { //if selected: = 

					if (A4reading == numD10) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}
				}
			} else { // if selected: OFF

				if (greater_than_D10 == "1") { // selected: <

					if (A4reading < numD10) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}

				} else if (greater_than_D10 == "2") { // if selected : >

					if (A4reading > numD10) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}

				} else if (greater_than_D10 == "3") { //if selected: = 

					if (A4reading == numD10) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}
				}
			}

		}

	}

}

//if A5 is selected for D10
function initiateLogicA5_D10() {

	if (logic_constructed_D10 == true) {

		if (A5_on_D10 == true) { // if A5 is selected

			if (on_D10 == true) { // if selected: ON
				if (greater_than_D10 == "1") { // selected: <

					if (A5reading < numD10) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}

				} else if (greater_than_D10 == "2") { // if selected : >

					if (A5reading > numD10) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}

				} else if (greater_than_D10 == "3") { //if selected: = 

					if (A5reading == numD10) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}
				}
			} else { // if selected: OFF

				if (greater_than_D10 == "1") { // selected: <

					if (A5reading < numD10) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}

				} else if (greater_than_D10 == "2") { // if selected : >

					if (A5reading > numD10) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}

				} else if (greater_than_D10 == "3") { //if selected: = 

					if (A5reading == numD10) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}
				}
			}

		}

	}

}