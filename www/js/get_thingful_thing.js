//some global variables for the logic panel 
var greater_than_thingful_DataFeed = 1;
var D10_on_thingful_DataFeed = false;
var on_thingful_DataFeed = false;
var check_number_thingful_DataFeed = false;
var numThingfulDataFeed; // number input by user

//enable retrieve of thing on thingful
function toggelgetThingful() {

	if (get_thingful) {
		get_thingful = false;
		if (get_thingful_success == false) {
			$('#get_thingful').css("background-color", "white");
			$('#get_thingful').css("color", "black");
			$('#get_thingful').html("Retrieve");
			$('#get_thingful').css("padding-left", "22px");
			$('#get_thingful').css("padding-right", "22px");
			$("#get_thingful_data_panel").hide();

			//hide the set logic button
			$('#connect_thingful').hide();

		} else if (get_thingful_success == true) { // if data retreival is successful
			$('#get_thingful').css("background-color", "black");
			$('#get_thingful').css("color", "white");
			$("#get_thingful").html("Reset");
			$('#get_thingful').css("padding-left", "30px");
			$('#get_thingful').css("padding-right", "30px");
			$("#get_thingful_data_panel").hide();

			// show the set logic button
			$('#connect_thingful').show();
		}
		checkVisualStatus();
	} else {
		get_thingful = true;
		$('#get_thingful').css("background-color", "black");
		$('#get_thingful').css("color", "white");
		$('#get_thingful').html("Close Panel");
		$('#get_thingful').css("padding-left", "16px");
		$('#get_thingful').css("padding-right", "16px");
		$("#get_thingful_data_panel").show();
		$(".useStoredGlobalConnectKey").hide();
		$("#confirmation_global_connect").hide();
		$("#thingID").hide();
		$("#thing_data_name").hide();
		$("#key5").val("");
		$("#key6").val("");

		//if there is stored key info, show it on panel
		if (localStorage.lastSavedGlobalConnectKey != "-") {
			$(".useStoredGlobalConnectKey").show();
			$(".useStoredGlobalConnectKey").html("<p>Use Last Save Key: <br><b>" + localStorage.lastSavedGlobalConnectKey + "</b></p>");
		} else {
			$(".useStoredGlobalConnectKey").hide();
		}
		checkVisualStatus();
	}

}


//enable connection of thing on thingful to other outputs
function toggelConnect_thingful() {

	if (show_panel_thingful) {
		show_panel_thingful = false;
		$('#connect_thingful_data_panel').hide();

		if (logic_constructed_thingful_data_feed == true) {

			$('#connect_thingful').css("background-color", "black");
			$('#connect_thingful').css("color", "white");
			$('#connect_thingful').text('Reset Logic');

		} else {

			$('#connect_thingful').css("background-color", "white");
			$('#connect_thingful').css("color", "black");
			$('#connect_thingful').text('Set Logic');

		}

		checkLogic_thingful_data_feed_number();
		checkVisualStatus();
	} else {
		show_panel_thingful = true;
		$('#connect_thingful').css("background-color", "black");
		$('#connect_thingful').css("color", "white");
		$('#connect_thingful').text('Close panel');

		app.sendData([0x01, 0x00, 0x02]); //turn D9 off
		app.sendData([0x01, 0x00, 0x04]); // turn D10 off

		$('#connect_thingful_data_panel').show();
		checkLogic_thingful_data_feed_number();
		checkVisualStatus();

	}

}

function checkLogic_thingful_data_feed_greater_than() {

	if (greater_than_thingful_DataFeed == "1") {

		greater_than_thingful_DataFeed = 2;
		$('#greater_than_thingful_data_feed').html('>');
	} else if (greater_than_thingful_DataFeed == "2") {
		greater_than_thingful_DataFeed = 3;
		$('#greater_than_thingful_data_feed').html('=');
	} else {
		greater_than_thingful_DataFeed = 1;
		$('#greater_than_thingful_data_feed').html('<');
	}

}

function checkLogic_thingful_data_feed_output() {

	if (D10_on_thingful_DataFeed) {
		D10_on_thingful_DataFeed = false; // D9 selected
		$('#select_output_thingful_data_feed').html('D9');
		checkLogic_thingful_data_feed_number();

	} else {
		D10_on_thingful_DataFeed = true; // D10 selected
		$('#select_output_thingful_data_feed').html('D10');
		checkLogic_thingful_data_feed_number();
	}

}

function checkLogic_thingful_data_feed_on_off() {

	if (on_thingful_DataFeed) {
		on_thingful_DataFeed = false;
		$('#on_off_thingful_data_feed').html('OFF');
	} else {
		on_thingful_DataFeed = true;
		$('#on_off_thingful_data_feed').html('ON');
	}

}

//check overall logic of the statement made by user for data feed 1 
function checkLogic_thingful_data_feed_number() {

	numThingfulDataFeed = document.getElementById("numbering_thingful_data_feed").value;

	if (numThingfulDataFeed == "") { //if no number input in number box

		$('#check_logic_status_thingful_data_feed_number').show();
		$('#check_logic_status_thingful_data_feed_number').html('*error: input number is not within range*');
		$('#check_logic_status_thingful_data_feed_number').css("color", "red");

		$('#check_overall_logic_thingful_status_data_feed').html('<b>-Logic: Unsuccessful-</b>');
		$('#check_overall_logic_thingful_status_data_feed').css("color", "red");

		check_number_thingful_DataFeed = false; //number check turns out incorrect
		logic_constructed_thingful_data_feed = false;

		//this section run check to check whether D9/D10 is enabled
		if (D10_on_thingful_DataFeed == false) { //if D9 selected

			if (digital_enabled_D9 == false) {

				$('#check_logic_status_thingful_data_feed_output').show();
				$('#check_logic_status_thingful_data_feed_output').html('*Error - D9 is not enabled*');
				$('#check_logic_status_thingful_data_feed_output').css("color", "red");

			} else {
				$('#check_logic_status_thingful_data_feed_output').hide();
			}

		} else if (D10_on_thingful_DataFeed == true) { //if D10 selected

			if (digital_enabled_D10 == false) {

				$('#check_logic_status_thingful_data_feed_output').show();
				$('#check_logic_status_thingful_data_feed_output').html('*Error - D10 is not enabled*');
				$('#check_logic_status_thingful_data_feed_output').css("color", "red");

			} else {
				$('#check_logic_status_thingful_data_feed_output').hide();
			}

		}

	} else { // if there is number input

		check_number_thingful_DataFeed = true; //number check turns out correct
		$('#check_logic_status_thingful_data_feed_number').hide();

		//this section run check to check whether D9/D10 is enabled
		if (D10_on_thingful_DataFeed == false) { //if D9 selected

			if (digital_enabled_D9 == true) { //if D9 pin is enabled
				logic_constructed_thingful_data_feed = true;

				$('#check_overall_logic_thingful_status_data_feed').html('<b>-Logic: Successful-</b>');
				$('#check_overall_logic_thingful_status_data_feed').css("color", "green");

				$('#check_logic_status_thingful_data_feed_output').hide(); // hide output check if D9 is enabled

			} else {
				logic_constructed_thingful_data_feed = false;

				$('#check_overall_logic_thingful_status_data_feed').html('<b>-Logic: Unsuccessful-</b>');
				$('#check_overall_logic_thingful_status_data_feed').css("color", "red");

				$('#check_logic_status_thingful_data_feed_output').show();
				$('#check_logic_status_thingful_data_feed_output').html('*Error - D9 is not enabled*');
				$('#check_logic_status_thingful_data_feed_output').css("color", "red");
			}

		} else if (D10_on_thingful_DataFeed == true) { //if D10 selected

			if (digital_enabled_D10 == true) { //if D10 pin is enabled
				logic_constructed_thingful_data_feed = true;

				$('#check_overall_logic_thingful_status_data_feed').html('<b>-Logic: Successful-</b>');
				$('#check_overall_logic_thingful_status_data_feed').css("color", "green");

				$('#check_logic_status_thingful_data_feed_output').hide(); // hide output check if D9 is enabled

			} else {
				logic_constructed_thingful_data_feed = false;

				$('#check_overall_logic_thingful_status_data_feed').html('<b>-Logic: Unsuccessful-</b>');
				$('#check_overall_logic_thingful_status_data_feed').css("color", "red");

				$('#check_logic_status_thingful_data_feed_output').show();
				$('#check_logic_status_thingful_data_feed_output').html('*Error - D10 is not enabled*');
				$('#check_logic_status_thingful_data_feed_output').css("color", "red");

			}

		}

	}

	if (D10_on_thingful_DataFeed == false) { // if D9 selected by global connectivity panel

		if (logic_constructed_D9 == true) { // if D9 is used in device control panel

			$('#check_overall_logic_thingful_status_data_feed').html('<b>-Logic: Unsuccessful-</b>');
			$('#check_overall_logic_thingful_status_data_feed').css("color", "red");

			$('#check_logic_status_thingful_data_feed_output').show();
			$('#check_logic_status_thingful_data_feed_output').html('*Error - D9 is in use*');
			$('#check_logic_status_thingful_data_feed_output').css("color", "red");
			logic_constructed_thingful_data_feed = false;

			if (show_panel_thingful == false) {
				$('#connect_thingful').css("background-color", "white");
				$('#connect_thingful').css("color", "black");
				$('#connect_thingful').text('Set Logic');
			}

		} else if ((logic_constructed_data_feed_1 == true) && (D10_on_DataFeed1 == false)) { // if D9 is used in cross connected device

			$('#check_overall_logic_thingful_status_data_feed').html('<b>-Logic: Unsuccessful-</b>');
			$('#check_overall_logic_thingful_status_data_feed').css("color", "red");

			$('#check_logic_status_thingful_data_feed_output').show();
			$('#check_logic_status_thingful_data_feed_output').html('*Error - D9 is in use*');
			$('#check_logic_status_thingful_data_feed_output').css("color", "red");
			logic_constructed_thingful_data_feed = false;

			if (show_panel_thingful == false) {
				$('#connect_thingful').css("background-color", "white");
				$('#connect_thingful').css("color", "black");
				$('#connect_thingful').text('Set Logic');
			}

		}

	} else if (D10_on_thingful_DataFeed == true) { // if D10 selected by global connectivity panel

		if (logic_constructed_D10 == true) { // if D10 is used in device control panel

			$('#check_overall_logic_thingful_status_data_feed').html('<b>-Logic: Unsuccessful-</b>');
			$('#check_overall_logic_thingful_status_data_feed').css("color", "red");

			$('#check_logic_status_thingful_data_feed_output').show();
			$('#check_logic_status_thingful_data_feed_output').html('*Error - D10 is in use*');
			$('#check_logic_status_thingful_data_feed_output').css("color", "red");
			logic_constructed_thingful_data_feed = false;

			if (show_panel_thingful == false) {
				$('#connect_thingful').css("background-color", "white");
				$('#connect_thingful').css("color", "black");
				$('#connect_thingful').text('Set Logic');
			}

		} else if ((logic_constructed_data_feed_1 == true) && (D10_on_DataFeed1 == true)) { // if D10 is used in cross connected device

			$('#check_overall_logic_thingful_status_data_feed').html('<b>-Logic: Unsuccessful-</b>');
			$('#check_overall_logic_thingful_status_data_feed').css("color", "red");

			$('#check_logic_status_thingful_data_feed_output').show();
			$('#check_logic_status_thingful_data_feed_output').html('*Error - D10 is in use*');
			$('#check_logic_status_thingful_data_feed_output').css("color", "red");
			logic_constructed_thingful_data_feed = false;

			if (show_panel_thingful == false) {
				$('#connect_thingful').css("background-color", "white");
				$('#connect_thingful').css("color", "black");
				$('#connect_thingful').text('Set Logic');
			}

		}

	}


}

//initiate the logic for thing's data to connect to output pin
function initiateLogic_thingful_data_feed() {

	numThingfulDataFeed = parseInt(numThingfulDataFeed); // parse the var into strictly number value

	if (logic_constructed_thingful_data_feed == true) {

		if (D10_on_thingful_DataFeed == false) { // if D9 selected

			if (on_thingful_DataFeed == true) { // if selected: ON

				if (greater_than_thingful_DataFeed == "1") { // selected: <

					if (thingful_reading < numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					} else {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					}
				} else if (greater_than_thingful_DataFeed == "2") { // selected: >

					if (thingful_reading > numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					} else {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					}
				} else if (greater_than_thingful_DataFeed == "3") { // selected: =

					if (thingful_reading == numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					} else {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					}
				}

			} else { // if selected: OFF

				if (greater_than_thingful_DataFeed == "1") { // selected: <

					if (thingful_reading < numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					} else {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					}
				} else if (greater_than_thingful_DataFeed == "2") { // selected: >

					if (thingful_reading > numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					} else {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					}
				} else if (greater_than_thingful_DataFeed == "3") { // selected: =

					if (thingful_reading == numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x02]); // turn D9 off
					} else {
						app.sendData([0x01, 0x00, 0x01]); // turn D9 on
					}
				}

			}



		} else { // if D10 selected

			if (on_thingful_DataFeed == true) { // if selected: ON

				if (greater_than_thingful_DataFeed == "1") { // selected: <

					if (thingful_reading < numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}
				} else if (greater_than_thingful_DataFeed == "2") { // selected: >

					if (thingful_reading > numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}
				} else if (greater_than_thingful_DataFeed == "3") { // selected: =

					if (thingful_reading == numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					} else {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					}
				}

			} else { // if selected: OFF

				if (greater_than_thingful_DataFeed == "1") { // selected: <

					if (thingful_reading < numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}
				} else if (greater_than_thingful_DataFeed == "2") { // selected: >

					if (thingful_reading > numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}
				} else if (greater_than_thingful_DataFeed == "3") { // selected: =

					if (thingful_reading == numThingfulDataFeed) {
						app.sendData([0x01, 0x00, 0x04]); // turn D10 off
					} else {
						app.sendData([0x01, 0x00, 0x03]); // turn D10 on
					}
				}

			}


		}

	}

}