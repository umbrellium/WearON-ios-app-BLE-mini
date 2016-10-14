app.sendData = function(data) {
	if (app.connected) {

		function onMessageSendSucces() {
			// console.log('Succeded to send message.');
		}

		function onMessageSendFailure(errorCode) {
			// alert('Failed to send data with error: ' + errorCode);
		}

		data = new Uint8Array(data);

		//send notification to check whether Digial Output Pins are ON or OFF

		if (data[0] === 0x01) {

			if (data[2] === 0x01) {
				// document.getElementById("DigitalPin0Status").innerHTML = "ON";
			} else if (data[2] === 0x02) {
				// document.getElementById("DigitalPin0Status").innerHTML = "OFF";
			} else if (data[2] === 0x03) {
				// document.getElementById("DigitalPin1Status").innerHTML = "ON";
			} else if (data[2] === 0x04) {
				// document.getElementById("DigitalPin1Status").innerHTML = "OFF";
			}
		}

		app.device.writeCharacteristic(
			app.RBL_CHAR_RX_UUID,
			data,
			onMessageSendSucces,
			onMessageSendFailure
		);
	} else {
		// Write debug information to console
		// alert('Error - No device connected.');
	}
};