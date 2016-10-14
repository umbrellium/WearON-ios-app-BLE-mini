//save the state of the global connectivity ctrl panel in local storage of phone
function saveState_global_connectivity() {
	//check state of various analog, digital, geo inputs and outputs
	localStorage.get_thingful_success = get_thingful_success;

	localStorage.logic_constructed_thingful_data_feed = logic_constructed_thingful_data_feed;
	localStorage.greater_than_thingful_DataFeed = greater_than_thingful_DataFeed;
	localStorage.D10_on_thingful_DataFeed = D10_on_thingful_DataFeed;
	localStorage.on_thingful_DataFeed = on_thingful_DataFeed;
	localStorage.numThingfulDataFeed = numThingfulDataFeed;

}


//use the last saved state of the global connectivity ctrl panel
function useState_global_connectivity() {
	//verify last state of the functions, get it back to where it was saved

	if ((localStorage.get_thingful_success == "true") && (get_thingful_success == false)) {
		if (get_thingful_success == false) {
			get_thingful_success = true;
			//use last save connectivity key 
			lastSavedGlobalConnectKey();
			toggelgetThingful();
		}

		if (get_thingful == false) {
			toggelgetThingful();
		}

	}

	if (localStorage.logic_constructed_thingful_data_feed == "true") {

		logic_constructed_thingful_data_feed = true;

		$('#connect_thingful').css("background-color", "black");
		$('#connect_thingful').css("color", "white");
		$('#connect_thingful').text('Reset Logic');

		//check where greater_than logic was previously
		if (localStorage.greater_than_thingful_DataFeed == "2") {

			if (greater_than_thingful_DataFeed == "1") {

				checkLogic_thingful_data_feed_greater_than();

			} else if (greater_than_thingful_DataFeed == "3") {

				greater_than_thingful_DataFeed = 1;
				checkLogic_thingful_data_feed_greater_than();

			}
		} else if (localStorage.greater_than_thingful_DataFeed == "3") {

			if (greater_than_thingful_DataFeed == "1") {

				greater_than_thingful_DataFeed = 2;
				checkLogic_thingful_data_feed_greater_than();

			} else if (greater_than_thingful_DataFeed == "2") {

				checkLogic_thingful_data_feed_greater_than();
			}
		} else if (localStorage.greater_than_thingful_DataFeed == "1") {

			if (greater_than_thingful_DataFeed == "2") {

				greater_than_thingful_DataFeed = 3;
				checkLogic_thingful_data_feed_greater_than();

			} else if (greater_than_thingful_DataFeed == "3") {

				checkLogic_thingful_data_feed_greater_than();
			}

		}

		//check which output was used previously
		if (localStorage.D10_on_thingful_DataFeed == "false") { // if previously A4 was selected
			if (D10_on_thingful_DataFeed == true) {
				checkLogic_thingful_data_feed_output();
			}
		} else if (localStorage.D10_on_thingful_DataFeed == "true") { // if previously A5 was selected
			if (D10_on_thingful_DataFeed == false) {
				checkLogic_thingful_data_feed_output();
			}
		}

		//check what number was used input previously
		if (localStorage.numThingfulDataFeed != numThingfulDataFeed) {
			document.getElementById("numbering_thingful_data_feed").value = localStorage.numThingfulDataFeed;
			numThingfulDataFeed = localStorage.numThingfulDataFeed;
			checkLogic_thingful_data_feed_number();
		}

		//check whether ON or OFF was used input previously
		if (localStorage.on_thingful_DataFeed == "true") {
			if (on_thingful_DataFeed == false) {
				checkLogic_thingful_data_feed_on_off();
			}
		} else if (localStorage.on_thingful_DataFeed == "false") {
			if (on_thingful_DataFeed == true) {
				checkLogic_thingful_data_feed_on_off();
			}
		}

	}

}