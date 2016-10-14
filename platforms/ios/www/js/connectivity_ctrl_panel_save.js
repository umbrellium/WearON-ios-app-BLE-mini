//save the state of the connectivity ctrl panel in local storage of phone
function saveState_connectivity() {
	//check state of various analog, digital, geo inputs and outputs
	localStorage.get_data_1_success = get_data_1_success;

	localStorage.logic_constructed_data_feed_1 = logic_constructed_data_feed_1;
	localStorage.greater_than_DataFeed1 = greater_than_DataFeed1;
	localStorage.D10_on_DataFeed1 = D10_on_DataFeed1;
	localStorage.on_DataFeed1 = on_DataFeed1;
	localStorage.numDataFeed1 = numDataFeed1;

}

//use the last saved state of the connectivity ctrl panel
function useState_connectivity() {
	//verify last state of the functions, get it back to where it was saved

	if ((localStorage.get_data_1_success == "true") && (get_data_1_success == false)) {
		if (get_data_1_success == false) {
			get_data_1_success = true;
			//use last save connectivity key 
			lastSavedConnectKey_1();
			toggelgetDataFeed1();
		}

		if (get_data_feed_1 == false) {
			toggelgetDataFeed1();
		}

	}

	if (localStorage.logic_constructed_data_feed_1 == "true") {
		logic_constructed_data_feed_1 = true;

		$('#connect_data_set_1').css("background-color", "black");
		$('#connect_data_set_1').css("color", "white");
		$('#connect_data_set_1').text('Reset Logic');

		//check where greater_than logic was previously
		if (localStorage.greater_than_DataFeed1 == "2") {

			if (greater_than_DataFeed1 == "1") {

				checkLogic_data_feed_1_greater_than();

			} else if (greater_than_DataFeed1 == "3") {

				greater_than_DataFeed1 = 1;
				checkLogic_data_feed_1_greater_than();

			}
		} else if (localStorage.greater_than_DataFeed1 == "3") {

			if (greater_than_DataFeed1 == "1") {

				greater_than_DataFeed1 = 2;
				checkLogic_data_feed_1_greater_than();

			} else if (greater_than_DataFeed1 == "2") {

				checkLogic_data_feed_1_greater_than();
			}
		} else if (localStorage.greater_than_DataFeed1 == "1") {

			if (greater_than_DataFeed1 == "2") {

				greater_than_DataFeed1 = 3;
				checkLogic_data_feed_1_greater_than();

			} else if (greater_than_DataFeed1 == "3") {

				checkLogic_data_feed_1_greater_than();
			}

		}

		//check which output was used previously
		if (localStorage.D10_on_DataFeed1 == "false") { // if previously A4 was selected
			if (D10_on_DataFeed1 == true) {
				checkLogic_data_feed_1_output();
			}
		} else if (localStorage.D10_on_DataFeed1 == "true") { // if previously A5 was selected
			if (D10_on_DataFeed1 == false) {
				checkLogic_data_feed_1_output();
			}
		}

		//check what number was used input previously
		if (localStorage.numDataFeed1 != numDataFeed1) {
			document.getElementById("numbering_data_feed_1").value = localStorage.numDataFeed1;
			numDataFeed1 = localStorage.numDataFeed1;
			checkLogic_data_feed_1_number();
		}

		//check whether ON or OFF was used input previously
		if (localStorage.on_DataFeed1 == "true") {
			if (on_DataFeed1 == false) {
				checkLogic_data_feed_1_on_off();
			}
		} else if (localStorage.on_DataFeed1 == "false") {
			if (on_DataFeed1 == true) {
				checkLogic_data_feed_1_on_off();
			}
		}

		checkLogicD10_number();
		checkLogicD9_number();
		checkLogic_data_feed_1_number();

	}

}