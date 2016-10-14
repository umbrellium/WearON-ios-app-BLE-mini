//send data to user's thingspeak account when user starts using their hardware device

var connectThingspeak;

function connectingThingspeak() {
    connectThingspeak = setInterval(connect_to_thingspeak, 15000);
};

function connect_to_thingspeak() {

    //verify status of connection to A4 and A5 with user configuration setting

    if ((connect_to_A4 == true) && (analogSensor1 == "ON") && (connect_to_A5 == true) && (analogSensor2 == "ON")) {
        $.post("https://api.thingspeak.com/update", {
                api_key: thingspeakApi,
                field1: A4reading,
                field2: A5reading,
            },

            function(data, status) {
                if (status == "success") {
                    A4count++;
                    A5count++;
                    document.getElementById("connectA4status").innerHTML = "Number of readings sent to Thingspeak:" + A4count;
                    document.getElementById("connectA5status").innerHTML = "Number of readings sent to Thingspeak:" + A5count;
                } else {
                    document.getElementById("connectA4status").innerHTML = "error";
                    document.getElementById("connectA5status").innerHTML = "error";
                }
            });
    } else if ((connect_to_A4 == true) && (analogSensor1 == "ON") && (connect_to_A5 == true) && (analogSensor2 == "OFF")) {

        $('#connectA5status').show();
        document.getElementById("connectA5status").innerHTML = "-No thingspeak channel field connected to sensor feed- ";

        $.post("https://api.thingspeak.com/update", {
                api_key: thingspeakApi,
                field1: A4reading,
            },

            function(data, status) {
                if (status == "success") {
                    A4count++;
                    document.getElementById("connectA4status").innerHTML = "Number of readings sent to Thingspeak:" + A4count;
                } else {
                    document.getElementById("connectA4status").innerHTML = "error";
                }
            });
    } else if ((connect_to_A4 == true) && (analogSensor1 == "OFF") && (connect_to_A5 == true) && (analogSensor2 == "ON")) {

        $('#connectA4status').show();
        document.getElementById("connectA4status").innerHTML = "-No thingspeak channel field connected to sensor feed- ";

        $.post("https://api.thingspeak.com/update", {
                api_key: thingspeakApi,
                field2: A5reading,
            },

            function(data, status) {
                if (status == "success") {
                    A5count++;
                    document.getElementById("connectA5status").innerHTML = "Number of readings sent to Thingspeak:" + A5count;
                } else {
                    document.getElementById("connectA5status").innerHTML = "error";
                }
            });
    } else if ((connect_to_A4 == true) && (analogSensor1 == "OFF") && (connect_to_A5 == true) && (analogSensor2 == "OFF")) {

        $('#connectA4status').show();
        document.getElementById("connectA4status").innerHTML = "-No thingspeak channel field connected to sensor feed- ";
        $('#connectA5status').show();
        document.getElementById("connectA5status").innerHTML = "-No thingspeak channel field connected to sensor feed- ";

    } else if ((connect_to_A4 == true) && (analogSensor1 == "ON") && (connect_to_A5 == false)) {

        $.post("https://api.thingspeak.com/update", {
                api_key: thingspeakApi,
                field1: A4reading,
            },

            function(data, status) {
                if (status == "success") {
                    A4count++;
                    document.getElementById("connectA4status").innerHTML = "Number of readings sent to Thingspeak:" + A4count;
                    $('#connectA5status').hide();

                } else {
                    document.getElementById("connectA4status").innerHTML = "error";
                    $('#connectA5status').hide();
                }
            });

    } else if ((connect_to_A4 == true) && (analogSensor1 == "OFF") && (connect_to_A5 == false)) {
        $('#connectA4status').show();
        document.getElementById("connectA4status").innerHTML = "-No thingspeak channel field connected to sensor feed- ";

    } else if ((connect_to_A4 == false) && (connect_to_A5 == true) && (analogSensor2 == "ON")) {

        $.post("https://api.thingspeak.com/update", {
                api_key: thingspeakApi,
                field2: A5reading,
            },

            function(data, status) {
                if (status == "success") {
                    A5count++;
                    $('#connectA4status').hide();
                    document.getElementById("connectA5status").innerHTML = "Number of readings sent to Thingspeak:" + A5count;

                } else {
                    $('#connectA4status').hide();
                    document.getElementById("connectA5status").innerHTML = "error";
                }
            });

    } else if ((connect_to_A4 == false) && (connect_to_A5 == true) && (analogSensor2 == "OFF")) {
        $('#connectA5status').show();
        document.getElementById("connectA5status").innerHTML = "-No thingspeak channel field connected to sensor feed- ";
    } else {
        $('#connectA4status').hide();
        $('#connectA5status').hide();

    }


};


function toggelConnectA4() {

    if (connect_to_A4) {
        connect_to_A4 = false;
        localStorage.connect_to_A4 = connect_to_A4;
        if (connect_to_A5 == false) {
            clearInterval(connectThingspeak);
        } else {
            connectingThingspeak();
        }
        $('.connectA4').css("background-color", "white");
        $('.connectA4').css("color", "black");
        $('.connectA4').text('Connect to Thingspeak ');
        $('#connectA4status').hide();
    } else {
        connect_to_A4 = true;
        localStorage.connect_to_A4 = connect_to_A4;
        if (connect_to_A5 == false) {
            connectingThingspeak();
        }
        $('.connectA4').css("background-color", "black");
        $('.connectA4').css("color", "white");
        $('.connectA4').text('Disconnect to Thingspeak ');
        $('#connectA4status').show();

    }
};


function toggelConnectA5() {

    if (connect_to_A5) {
        connect_to_A5 = false;
        localStorage.connect_to_A5 = connect_to_A5;
        if (connect_to_A4 == false) {
            clearInterval(connectThingspeak);
        } else {
            connectingThingspeak();
        }
        $('.connectA5').css("background-color", "white");
        $('.connectA5').css("color", "black");
        $('.connectA5').text('Connect to Thingspeak ');
        $('#connectA5status').hide();
    } else {
        connect_to_A5 = true;
        localStorage.connect_to_A5 = connect_to_A5;
        if (connect_to_A4 == false) {
            connectingThingspeak();
        }
        $('.connectA5').css("background-color", "black");
        $('.connectA5').css("color", "white");
        $('.connectA5').text('Disconnect to Thingspeak ');
        $('#connectA5status').show();

    }
};