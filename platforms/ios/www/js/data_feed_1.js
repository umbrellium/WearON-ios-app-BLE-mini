//some global variables for the logic panel 
var greater_than_DataFeed1 = 1;
var D10_on_DataFeed1 = false;
var on_DataFeed1 = false;
var check_number_DataFeed1 = false;
var numDataFeed1; // number input by user

//enable retrieve of data feed 1
function toggelgetDataFeed1() {

	if (get_data_feed_1) {
		get_data_feed_1 = false;
		if (get_data_1_success == false) {
			$('#get_data_set_1').css("background-color", "white");
			$('#get_data_set_1').css("color", "black");
			$('#get_data_set_1').html("Retrieve");
			$('#get_data_set_1').css("padding-left", "22px");
			$('#get_data_set_1').css("padding-right", "22px");
			$("#get_data_set_1_panel").hide();

			//hide the set logic button
			$('#connect_data_set_1').hide();

		} else if (get_data_1_success == true) { // if data retreival is successful
			$('#get_data_set_1').css("background-color", "black");
			$('#get_data_set_1').css("color", "white");
			$("#get_data_set_1").html("Reset");
			$('#get_data_set_1').css("padding-left", "30px");
			$('#get_data_set_1').css("padding-right", "30px");
			$("#get_data_set_1_panel").hide();

			// show the set logic button
			$('#connect_data_set_1').show();
		}
		checkVisualStatus();
	} else {
		get_data_feed_1 = true;
		$('#get_data_set_1').css("background-color", "black");
		$('#get_data_set_1').css("color", "white");
		$('#get_data_set_1').html("Close Panel");
		$('#get_data_set_1').css("padding-left", "16px");
		$('#get_data_set_1').css("padding-right", "16px");
		$("#get_data_set_1_panel").show();
		$(".useStoredConnectKey_1").hide();
		$("#confirmation_connect_1").hide();
		$("#ReadApi_1").hide();
		$("#channelID_1").hide();
		$("#channel_field_1_1").hide();
		$("#channel_field_2_1").hide();
		$("#key3").val("");
		$("#key4").val("");

		//if there is stored key info, show it on panel
		if (localStorage.lastSavedConnectKey_1 != "-") {
			$(".useStoredConnectKey_1").show();
			$(".useStoredConnectKey_1").html("<p>Use Last Save Key: <br><b>" + localStorage.lastSavedConnectKey_1 + "</b></p>");
		} else {
			$(".useStoredConnectKey_1").hide();
		}
		checkVisualStatus();
	}

}

//enable connection of data feed 1 to other outputs
function toggelConnect_data_feed_1() {

	if (show_panel_data_feed_1) {
		show_panel_data_feed_1 = false;
		$('#connect_data_feed_1_panel').hide();

		if (logic_constructed_data_feed_1 == true) {

			$('#connect_data_set_1').css("background-color", "black");
			$('#connect_data_set_1').css("color", "white");
			$('#connect_data_set_1').text('Reset Logic');

		} else {

			$('#connect_data_set_1').css("background-color", "white");
			$('#connect_data_set_1').css("color", "black");
			$('#connect_data_set_1').text('Set Logic');

		}

		checkLogic_data_feed_1_number();
		checkVisualStatus();
	} else {
		show_panel_data_feed_1 = true;
		$('#connect_data_set_1').css("background-color", "black");
		$('#connect_data_set_1').css("color", "white");
		$('#connect_data_set_1').text('Close panel');

		app.sendData([0x01, 0x00, 0x02]); //turn D9 off
		app.sendData([0x01, 0x00, 0x04]); // turn D10 off

		$('#connect_data_feed_1_panel').show();
		checkLogic_data_feed_1_number();
		checkVisualStatus();

	}

}

function checkLogic_data_feed_1_greater_than() {

	if (greater_than_DataFeed1 == "1") {

		greater_than_DataFeed1 = 2;
		$('#greater_than_data_feed_1').html('>');
	} else if (greater_than_DataFeed1 == "2") {
		greater_than_DataFeed1 = 3;
		$('#greater_than_data_feed_1').html('=');
	} else {
		greater_than_DataFeed1 = 1;
		$('#greater_than_data_feed_1').html('<');
	}

}

function checkLogic_data_feed_1_output() {

	if (D10_on_DataFeed1) {
		D10_on_DataFeed1 = false; // D9 selected
		$('#select_output_data_feed_1').html('D9');
		checkLogic_data_feed_1_number();
	} else {
		D10_on_DataFeed1 = true; // D10 selected
		$('#select_output_data_feed_1').html('D10');
		checkLogic_data_feed_1_number();
	}

}

function checkLogic_data_feed_1_on_off() {

	if (on_DataFeed1) {
		on_DataFeed1 = false;
		$('#on_off_data_feed_1').html('OFF');
	} else {
		on_DataFeed1 = true;
		$('#on_off_data_feed_1').html('ON');
	}

}

//check overall logic of the statement made by user for data feed 1 
function checkLogic_data_feed_1_number() {

	numDataFeed1 = document.getElementById("numbering_data_feed_1").value;

	if (numDataFeed1 == "") { //if no number input in number box

		$('#check_logic_status_data_feed_1_number').show();
		$('#check_logic_status_data_feed_1_number').html('*error: input number is not within range*');
		$('#check_logic_status_data_feed_1_number').css("color", "red");

		$('#check_overall_logic_status_data_feed_1').html('<b>-Logic: Unsuccessful-</b>');
		$('#check_overall_logic_status_data_feed_1').css("color", "red");

		check_number_DataFeed1 = false; //number check turns out incorrect
		logic_constructed_data_feed_1 = false;

		//this section run check to check whether D9/D10 is enabled
		if (D10_on_DataFeed1 == false) { //if D9 selected

			if (digital_enabled_D9 == false) {

				$('#check_logic_status_data_feed_1_output').show();
				$('#check_logic_status_data_feed_1_output').html('*Error - D9 is not enabled*');
				$('#check_logic_status_data_feed_1_output').css("color", "red");

			} else {
				$('#check_logic_status_data_feed_1_output').hide();
			}

		} else if (D10_on_DataFeed1 == true) { //if D10 selected

			if (digital_enabled_D10 == false) {

				$('#check_logic_status_data_feed_1_output').show();
				$('#check_logic_status_data_feed_1_output').html('*Error - D10 is not enabled*');
				$('#check_logic_status_data_feed_1_output').css("color", "red");

			} else {
				$('#check_logic_status_data_feed_1_output').hide();
			}

		}

	} else { // if there is number input

		check_number_DataFeed1 = true; //number check turns out correct
		$('#check_logic_status_data_feed_1_number').hide();

		if (D10_on_DataFeed1 == false) { //if D9 selected

			if (digital_enabled_D9 == true) { //if D9 pin is enabled
				logic_constructed_data_feed_1 = true;

				$('#check_overall_logic_status_data_feed_1').html('<b>-Logic: Successful-</b>');
				$('#check_overall_logic_status_data_feed_1').css("color", "green");

				$('#check_logic_status_data_feed_1_output').hide(); // hide output check if D9 is enabled

			} else {
				logic_constructed_data_feed_1 = false;

				$('#check_overall_logic_status_data_feed_1').html('<b>-Logic: Unsuccessful-</b>');
				$('#check_overall_logic_status_data_feed_1').css("color", "red");

				$('#check_logic_status_data_feed_1_output').show();
				$('#check_logic_status_data_feed_1_output').html('*Error - D9 is not enabled*');
				$('#check_logic_status_data_feed_1_output').css("color", "red");
			}

		} else if (D10_on_DataFeed1 == true) { //if D10 selected

			if (digital_enabled_D10 == true) { //if D10 pin is enabled
				logic_constructed_data_feed_1 = true;

				$('#check_overall_logic_status_data_feed_1').html('<b>-Logic: Successful-</b>');
				$('#check_overall_logic_status_data_feed_1').css("color", "green");

				$('#check_logic_status_data_feed_1_output').hide(); // hide output check if D9 is enabled

			} else {
				logic_constructed_data_feed_1 = false;

				$('#check_overall_logic_status_data_feed_1').html('<b>-Logic: Unsuccessful-</b>');
				$('#check_overall_logic_status_data_feed_1').css("color", "red");

				$('#check_logic_status_data_feed_1_output').show();
				$('#check_logic_status_data_feed_1_output').html('*Error - D10 is not enabled*');
				$('#check_logic_status_data_feed_1_output').css("color", "red");

			}

		}

	}

	if (D10_on_DataFeed1 == false) { // if D9 selected by cross connectivity panel
		if (logic_constructed_D9 == true) { // if D9 is used in device control panel
			$('#check_overall_logic_status_data_feed_1').html('<b>-Logic: Unsuccessful-</b>');
			$('#check_overall_logic_status_data_feed_1').css("color", "red");

			$('#check_logic_status_data_feed_1_output').show();
			$('#check_logic_status_data_feed_1_output').html('*Error - D9 is in use*');
			$('#check_logic_status_data_feed_1_output').css("color", "red");
			logic_constructed_data_feed_1 = false;

			if (show_panel_data_feed_1 == false) {
				$('#connect_data_set_1').css("background-color", "white");
				$('#connect_data_set_1').css("color", "black");
				$('#connect_data_set_1').text('Set Logic');
			}
		} else if ((logic_constructed_thingful_data_feed == true) && (D10_on_thingful_DataFeed == false)) { // if D9 is used in global connected device
			$('#check_overall_logic_status_data_feed_1').html('<b>-Logic: Unsuccessful-</b>');
			$('#check_overall_logic_status_data_feed_1').css("color", "red");

			$('#check_logic_status_data_feed_1_output').show();
			$('#check_logic_status_data_feed_1_output').html('*Error - D9 is in use*');
			$('#check_logic_status_data_feed_1_output').css("color", "red");
			logic_constructed_data_feed_1 = false;

			if (show_panel_data_feed_1 == false) {
				$('#connect_data_set_1').css("background-color", "white");
				$('#connect_data_set_1').css("color", "black");
				$('#connect_data_set_1').text('Set Logic');
			}
		}

	} else if (D10_on_DataFeed1 == true) { // if D10 selected by cross connectivity panel

		if (logic_constructed_D10 == true) { // if D10 is used in device control panel
			$('#check_overall_logic_status_data_feed_1').html('<b>-Logic: Unsuccessful-</b>');
			$('#check_overall_logic_status_data_feed_1').css("color", "red");

			$('#check_logic_status_data_feed_1_output').show();
			$('#check_logic_status_data_feed_1_output').html('*Error - D10 is in use*');
			$('#check_logic_status_data_feed_1_output').css("color", "red");
			logic_constructed_data_feed_1 = false;

			if (show_panel_data_feed_1 == false) {
				$('#connect_data_set_1').css("background-color", "white");
				$('#connect_data_set_1').css("color", "black");
				$('#connect_data_set_1').text('Set Logic');
			}
		} else if ((logic_constructed_thingful_data_feed == true) && (D10_on_thingful_DataFeed == true)) { // if D10 is used in global connected device
			$('#check_overall_logic_status_data_feed_1').html('<b>-Logic: Unsuccessful-</b>');
			$('#check_overall_logic_status_data_feed_1').css("color", "red");

			$('#check_logic_status_data_feed_1_output').show();
			$('#check_logic_status_data_feed_1_output').html('*Error - D10 is in use*');
			$('#check_logic_status_data_feed_1_output').css("color", "red");
			logic_constructed_data_feed_1 = false;

			if (show_panel_data_feed_1 == false) {
				$('#connect_data_set_1').css("background-color", "white");
				$('#connect_data_set_1').css("color", "black");
				$('#connect_data_set_1').text('Set Logic');
			}
		}
	}

}

function initiateLogic_data_feed_1() {

	numDataFeed1 = parseInt(numDataFeed1); // parse the var into strictly number value

	if (logic_constructed_data_feed_1 == true) {

		if (D10_on_DataFeed1 == false) { // if D9 selected

			if (on_DataFeed1 == true) { // if selected: ON

				if (greater_than_DataFeed1 == "1") { // selected: <

					if (data_feed_1_reading < numDataFeed1) {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					} else {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					}
				} else if (greater_than_DataFeed1 == "2") { // selected: >

					if (data_feed_1_reading > numDataFeed1) {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					} else {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					}
				} else if (greater_than_DataFeed1 == "3") { // selected: =

					if (data_feed_1_reading == numDataFeed1) {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					} else {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					}
				}

			} else { // if selected: OFF

				if (greater_than_DataFeed1 == "1") { // selected: <

					if (data_feed_1_reading < numDataFeed1) {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					} else {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					}
				} else if (greater_than_DataFeed1 == "2") { // selected: >

					if (data_feed_1_reading > numDataFeed1) {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					} else {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					}
				} else if (greater_than_DataFeed1 == "3") { // selected: =

					if (data_feed_1_reading == numDataFeed1) {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					} else {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					}
				}

			}

		} else { // if D10 selected

			if (on_DataFeed1 == true) { // if selected: ON

				if (greater_than_DataFeed1 == "1") { // selected: <

					if (data_feed_1_reading < numDataFeed1) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}
				} else if (greater_than_DataFeed1 == "2") { // selected: >

					if (data_feed_1_reading > numDataFeed1) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}
				} else if (greater_than_DataFeed1 == "3") { // selected: =

					if (data_feed_1_reading == numDataFeed1) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}
				}

			} else { // if selected: OFF

				if (greater_than_DataFeed1 == "1") { // selected: <

					if (data_feed_1_reading < numDataFeed1) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}
				} else if (greater_than_DataFeed1 == "2") { // selected: >

					if (data_feed_1_reading > numDataFeed1) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}
				} else if (greater_than_DataFeed1 == "3") { // selected: =

					if (data_feed_1_reading == numDataFeed1) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}
				}

			}

		}
	}

}