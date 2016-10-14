//some global variables for the logic panel 
var greater_than_D9 = 1;
var A5_on_D9 = false;
var on_D9 = false;
var check_number_D9 = false;
var numD9; // number input by user

//enable/disable D9 digital pin on and off
app.toggleDigitalD9 = function()
{
	if (digital_enabled_D9)
	{
		digital_enabled_D9 = false;
		checkVisualStatus();
		localStorage.digital_enabled_D9 = digital_enabled_D9;
		app.sendData([0x01,0x00,0x02]); //turn it off
		if(show_panel_D9==true){
			$( "#connect_D9_panel").hide(); // hide the connection panel
			if(logic_constructed_D9==true){
			    $('.connectD9').css("background-color", "black");
			    $('.connectD9').css("color", "white");
			    $('.connectD9').text('Reset Logic');
			}
		}
		$('.enableD9').css("background-color", "white");
		$('.enableD9').css("color", "black");
		$('.enableD9').text('Enable Pin');
		$('.connectD9').hide();
		if(connect_to_D9==true){
			toggelConnectD9();
		}

		if(show_panel_data_feed_1==true){
			checkLogic_data_feed_1_number(); 
			//run a check on whether D9 is enabled if the logic panel for data feed 1 is opened
		}
		checkVisualStatus();
	}
	
	else 
	{
		digital_enabled_D9 = true;
		checkVisualStatus();
		localStorage.digital_enabled_D9 = digital_enabled_D9;
		if((logic_constructed_D9 ==false)&&(logic_constructed_data_feed_1==false)){
		app.sendData([0x01,0x00,0x01]); // turn it on
		}
		$('.enableD9').css("background-color", "black");
		$('.enableD9').css("color", "white");
		$('.enableD9').text('Disable Pin');
		$('.connectD9').show();

		if(show_panel_data_feed_1==true){
			checkLogic_data_feed_1_number(); 
			checkLogic_thingful_data_feed_number();
			//run a check on whether D9 is enabled if the logic panel for data feed 1 is opened
		}
		checkVisualStatus();
	}
};


//enable connecting D9
function toggelConnectD9(){

  if (show_panel_D9)
  {
    show_panel_D9 = false;
    $( "#connect_D9_panel").hide(); // hide the connection panel
    if(logic_constructed_D9 ==true){
    $('.connectD9').css("background-color", "black");
    $('.connectD9').css("color", "white");
    $('.connectD9').text('Reset Logic');
    }else{
    $('.connectD9').css("background-color", "white");
    $('.connectD9').css("color", "black");
    $('.connectD9').text('Set Logic');
	}
  }
  
  else 
  {
    show_panel_D9 = true;
    if(show_panel_D10==true){
    	$( "#device_check_panel_D9_D10").show();
    }else{
    	$( "#device_check_panel_D9_D10").hide();
    }
    $( "#connect_D9_panel").show(); // open up the connection panel
    $('.connectD9').css("background-color", "black");
    $('.connectD9').css("color", "white");
    $('.connectD9').text('Close panel');
    checkLogicD9_number();
  }

};

// check greater than logic for D9
function checkLogicD9_greater_than(){

	if (greater_than_D9 == "1"){

		greater_than_D9 = 2;
		$('#greater_than_D9').html('>');
	}
		else if (greater_than_D9 == "2")
	{
		greater_than_D9 = 3;
		$('#greater_than_D9').html('=');
	}
	else {
		greater_than_D9 = 1;
		$('#greater_than_D9').html('<');
	}

}

//check sensor type chosen
function checkLogicD9_sensor(){

if(A5_on_D9){
		A5_on_D9 = false; // A4 selected
		$('#select_sensor_D9').html('A4');
		checkLogicD9_number();
	}else{
		A5_on_D9 = true; // A5 selected
		$('#select_sensor_D9').html('A5');
		checkLogicD9_number();
	}

}

//check on/off for sensor chosen
function checkLogicD9_on_off(){

	if(on_D9){
		on_D9 = false;
		$('#on_off_D9').html('OFF');
	}else{
		on_D9 = true;
		$('#on_off_D9').html('ON');
	}

}

//check overall logic of the statement made by user for D9 
function checkLogicD9_number(){

	numD9 = document.getElementById("numbering_D9").value;

	if(numD9 == ""){
		$('#check_logic_status_D9_number').show();
		$('#check_logic_status_D9_number').html('*error: input number is not within range*');
		$('#check_logic_status_D9_number').css("color", "red");

		$('#check_overall_logic_status_D9').html('<b>-Logic: Unsuccessful-</b>');
		$('#check_overall_logic_status_D9').css("color", "red");

		check_number_D9 = false;
		logic_constructed_D9 =false;
		if(A5_on_D9 == false){ // if A4 selected
			if(analog_enabled_A4==false){
		    	$('#check_logic_status_D9_sensor').show();
				$('#check_logic_status_D9_sensor').html('*Error - Pin A4 is not enabled*');
				$('#check_logic_status_D9_sensor').css("color", "red");	
			}else{
				$('#check_logic_status_D9_sensor').hide();
			}
		}else{ //if A5 selected

			if(analog_enabled_A5==false){
		    	$('#check_logic_status_D9_sensor').show();
				$('#check_logic_status_D9_sensor').html('*Error - Pin A5 is not enabled*');
				$('#check_logic_status_D9_sensor').css("color", "red");	
			}else{
				$('#check_logic_status_D9_sensor').hide();
			}
		}

	}else{

		check_number_D9 = true;
		$('#check_logic_status_D9_number').hide();
		if(A5_on_D9 == false){ // if A4 selected
			if(analog_enabled_A4==true){
				logic_constructed_D9 =true;
				$('#check_overall_logic_status_D9').html('<b>-Logic: Successful-</b>');
				$('#check_overall_logic_status_D9').css("color", "green");
				$('#check_logic_status_D9_sensor').hide();
			}else{
				logic_constructed_D9 =false;
				$('#check_overall_logic_status_D9').html('<b>-Logic: Unsuccessful-</b>');
				$('#check_overall_logic_status_D9').css("color", "red");	

		    	$('#check_logic_status_D9_sensor').show();
				$('#check_logic_status_D9_sensor').html('*Error - Pin A4 is not enabled*');
				$('#check_logic_status_D9_sensor').css("color", "red");			
			}
		}else{ // if A5 selected
			if(analog_enabled_A5==true){ 
				logic_constructed_D9 =true;
				$('#check_overall_logic_status_D9').html('<b>-Logic: Successful-</b>');
				$('#check_overall_logic_status_D9').css("color", "green");
				$('#check_logic_status_D9_sensor').hide();
			}else{
				logic_constructed_D9 =false;
				$('#check_overall_logic_status_D9').html('<b>-Logic: Unsuccessful-</b>');
				$('#check_overall_logic_status_D9').css("color", "red");	


		    	$('#check_logic_status_D9_sensor').show();
				$('#check_logic_status_D9_sensor').html('*Error - Pin A5 is not enabled*');
				$('#check_logic_status_D9_sensor').css("color", "red");					
			}
		}
	}

	if((logic_constructed_data_feed_1 == true)&&(D10_on_DataFeed1==false)){ // if D9 is used in cross connected device
		$('#check_overall_logic_status_D9').html('<b>-Logic: Unsuccessful-</b>');
		$('#check_overall_logic_status_D9').css("color", "red");

    	$('#check_logic_status_D9_sensor').show();
		$('#check_logic_status_D9_sensor').html('*Error - Pin D9 is in use*');
		$('#check_logic_status_D9_sensor').css("color", "red");	
		logic_constructed_D9 =false;	

		if(show_panel_D9==false){
		    $('.connectD9').css("background-color", "white");
		    $('.connectD9').css("color", "black");
		    $('.connectD9').text('Set Logic');
		}

	} else if((logic_constructed_thingful_data_feed==true)&&(D10_on_thingful_DataFeed==false)){ // if D9 is used in global connected device

		$('#check_overall_logic_status_D9').html('<b>-Logic: Unsuccessful-</b>');
		$('#check_overall_logic_status_D9').css("color", "red");

    	$('#check_logic_status_D9_sensor').show();
		$('#check_logic_status_D9_sensor').html('*Error - Pin D9 is in use*');
		$('#check_logic_status_D9_sensor').css("color", "red");	
		logic_constructed_D9 =false;	

		if(show_panel_D9==false){
		    $('.connectD9').css("background-color", "white");
		    $('.connectD9').css("color", "black");
		    $('.connectD9').text('Set Logic');
		}

	}

	checkVisualStatus();

}

//if A4 is selected for D9
function initiateLogicA4_D9(){  

	if(logic_constructed_D9==true){

		if(A5_on_D9 == false){ // if A4 is selected

			if(on_D9 == true){ // if selected: ON
				if(greater_than_D9 == "1"){ // selected: <

					if( A4reading < numD9){
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}else{
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}

				}else if (greater_than_D9 == "2"){ // if selected : >

					if( A4reading > numD9){
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}else{
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}

				}else if (greater_than_D9 == "3"){ //if selected: = 

					if( A4reading == numD9){
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}else{
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}
				}
			} else{ // if selected: OFF

				if(greater_than_D9 == "1"){ // selected: <

					if( A4reading < numD9){
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}else{
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}

				}else if (greater_than_D9 == "2"){ // if selected : >

					if( A4reading > numD9){
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}else{
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}

				}else if (greater_than_D9 == "3"){ //if selected: = 

					if( A4reading == numD9){
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}else{
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}
				}
			}

		}

	}

}

//if A5 is selected for D9
function initiateLogicA5_D9(){  

	if(logic_constructed_D9==true){

		if(A5_on_D9 == true){ // if A5 is selected

			if(on_D9 == true){ // if selected: ON
				if(greater_than_D9 == "1"){ // selected: <

					if( A5reading < numD9){
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}else{
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}

				}else if (greater_than_D9 == "2"){ // if selected : >

					if( A5reading > numD9){
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}else{
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}

				}else if (greater_than_D9 == "3"){ //if selected: = 

					if( A5reading == numD9){
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}else{
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}
				}
			} else{ // if selected: OFF

				if(greater_than_D9 == "1"){ // selected: <

					if( A5reading < numD9){
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}else{
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}

				}else if (greater_than_D9 == "2"){ // if selected : >

					if( A5reading > numD9){
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}else{
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}

				}else if (greater_than_D9 == "3"){ //if selected: = 

					if( A5reading == numD9){
						app.sendData([0x01,0x00,0x02]); // turn D9 off
					}else{
						app.sendData([0x01,0x00,0x01]); // turn D9 on
					}
				}
			}

		}

	}

}