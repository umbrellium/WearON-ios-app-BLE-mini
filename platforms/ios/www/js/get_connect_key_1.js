function getKeyData_connectivity_1() {

    var key = document.getElementById("key3").value + "-" + document.getElementById("key4").value;
    var x = "http://www.wearon.io/connectivity_tokens/" + key + "/connect_key";
    $.get(x,
        function(data, status) {
            var body = data.replace(/^[\S\s]*<body[^>]*?>/i, "")
                .replace(/<\/body[\S\s]*$/i, ""); //get body of content

            connect_key_info_1 = body;
            readConnectKeyData_1();
        });

    localStorage.lastSavedConnectKey_1 = key;

}

function readConnectKeyData_1() {

    // split the html content of url to readable chunk
    var keyContent_1 = connect_key_info_1.split("&quot;");

    //dissect connect_key string into the neccessary info
    if (keyContent_1[3] != "") { // check is user inputing any key in this catagory

        $("#ReadApi_1").show();
        document.getElementById("ReadApi_1").innerHTML = "Read API: " + keyContent_1[3];
        ReadApi_1 = keyContent_1[3];
        localStorage.ReadApi_1 = ReadApi_1;

    } else {
        $("#ReadApi_1").show();
        document.getElementById("ReadApi_1").innerHTML = "No Read Api found";
    }

    if (keyContent_1[7] != "") { // check is user inputing any key in this catagory

        $("#channelID_1").show();
        document.getElementById("channelID_1").innerHTML = "Channel ID: " + keyContent_1[7];
        channelID_1 = keyContent_1[7];
        localStorage.channelID_1 = channelID_1;
    } else {
        $("#channelID_1").show();
        document.getElementById("channelID_1").innerHTML = "No Channel ID found";
    }

    if (keyContent_1[11] == "ON") { // check is user inputing any key in this catagory

        $("#channel_field_1_1").show();
        $("#channel_field_2_1").hide();
        document.getElementById("channel_field_1_1").innerHTML = "Channel Field 1 chosen";
        channelField_1 = 1;
        localStorage.channelField_1 = channelField_1;
    } else {
        $("#channel_field_2_1").show();
        $("#channel_field_1_1").hide();
        document.getElementById("channel_field_2_1").innerHTML = "Channel Field 2 chosen";
        channelField_1 = 2;
        localStorage.channelField_1 = channelField_1;
    }

    if ((keyContent_1[3] == undefined) || (keyContent_1[7] == undefined)) {

        clearInterval(getDataFeed1_Thingspeak);
        $("#DataFeed1").hide();

        $("#confirmation_connect_1").show();
        $(".useStoredConnectKey_1").hide();

    } else {

        $("#confirmation_connect_1").show();
        $(".useStoredConnectKey_1").hide();

    }

}

function lastSavedConnectKey_1() {

    ReadApi_1 = localStorage.ReadApi_1;
    channelID_1 = localStorage.channelID_1;
    channelField_1 = localStorage.channelField_1;
    Confirm_connect_1();

}

//get data feed from the selected thingspeak channel field every 7.5s
var getDataFeed1_Thingspeak;

function gettingDataFeed1_Thingspeak() {
    getDataFeed1_Thingspeak = setInterval(get_Data_feed_1_from_thingspeak, 2500); // get update from thingspeak every 2.5 seconds
}

function get_Data_feed_1_from_thingspeak() {

    initiateLogic_data_feed_1(); // initiate logic for data feed if there is one

    var urlConnect_key_1 = "https://api.thingspeak.com/channels/" + channelID_1 + "/fields/" + channelField_1 + "/last?api_key=" + ReadApi_1;
    $.get(urlConnect_key_1,
        function(data, status) {
            if (status == "success") {
                data_feed_1_reading = parseInt(data); // parse the var into strictly number value
                $("#DataFeed1_content").html("<b>Data Feed 1 Reading =" + data + "</b>");
                $("#DataFeed1_content_status").html("Data obtained successfully");
            } else {
                $("#DataFeed1_content_status").html("Error in obtaining data");
            }
        });

}

function Confirm_connect_1() {

    var urlConnect_key_1 = "https://api.thingspeak.com/channels/" + channelID_1 + "/fields/" + channelField_1 + "/last?api_key=" + ReadApi_1;
    $.get(urlConnect_key_1,
        function(data, status) {
            if (status == "success") {
                get_data_1_success = true;
                toggelgetDataFeed1();
                $("#DataFeed1").show();
                $("#DataFeed1_content").html("<span><b>Data Feed 1 Reading =" + data + "</b></span>");
                $("#DataFeed1_content_status").html("Data obtained successfully");
                gettingDataFeed1_Thingspeak();
            } else {
                get_data_1_success = false;
            }
        });
};

function restart_connect_1() {

    $("#confirmation_connect_1").hide();
    $("#ReadApi_1").hide();
    $("#channelID_1").hide();
    $("#channel_field_1_1").hide();
    $("#channel_field_2_1").hide();
    $("#key3").val("");
    $("#key4").val("");

}