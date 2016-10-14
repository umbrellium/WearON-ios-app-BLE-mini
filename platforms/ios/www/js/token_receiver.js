//retrieve user's token key information from the text that user has enter into input box
function getTokenData() {

    $(".useStoredToken").hide();
    var key = document.getElementById("key").value + "-" + document.getElementById("key2").value;
    var x = "https://pure-taiga-5893.herokuapp.com/tokens/" + key + "/token_key";
    $.get(x,
        function(data, status) {
            token_info = data;
            readTokenData();
        });

    localStorage.lastSavedKey = key;

}

//read user's token key content
function readTokenData() {

    // split the html content of url to readable chunk
    var dataChunk = token_info.split(" ");

    // split the actual content of the tokenstring
    var tokenContent = dataChunk[28].split("&quot;");

    //dissect tokenstring into the neccessary info
    if (tokenContent[3] != "") { // check is user inputing any key in this catagory
        document.getElementById("userEmail").innerHTML = "User email address: " + tokenContent[3];
        userEmail = tokenContent[3];
        localStorage.userEmail = userEmail;

    } else {
        document.getElementById("userEmail").innerHTML = "No User email address found";
    }

    if (tokenContent[7] != "") { // check is user input any key in this catagory
        document.getElementById("userLockPassword").innerHTML = "User Lock Screen Password: " + tokenContent[7];
        userLockPassword = tokenContent[7];
        localStorage.userLockPassword = userLockPassword;

    } else {
        document.getElementById("userLockPassword").innerHTML = "No User Lock Screen Password found ";
    }

    if (tokenContent[11] != "") { // check is user input any key in this catagory
        document.getElementById("userApi").innerHTML = "User API: " + tokenContent[11];
        userApi = tokenContent[11];
        localStorage.userApi = userApi;

    } else {
        document.getElementById("userApi").innerHTML = "No User API found ";
    }

    if (tokenContent[15] != "") { // check is user input any key in this catagory
        document.getElementById("thingspeakApi").innerHTML = "Thingspeak API: " + tokenContent[15];
        thingspeakApi = tokenContent[15];
        localStorage.thingspeakApi = thingspeakApi;

    } else {
        document.getElementById("thingspeakApi").innerHTML = "No Thingspeak API found ";
    }

    if (tokenContent[19] != "") { // check is user input any key in this catagory
        document.getElementById("channelID").innerHTML = "Channel ID: " + tokenContent[19];
        channelId = tokenContent[19];
        localStorage.channelId = channelId;

    } else {
        document.getElementById("channelID").innerHTML = "No Channel ID found ";
    }

    if (tokenContent[23] == "ON") { // check is user input any key in this catagory
        document.getElementById("Analog1").innerHTML = "Analog Sensor 1 field name: " + tokenContent[23];
        analogSensor1 = tokenContent[23];
        localStorage.analogSensor1 = analogSensor1;

    } else if (tokenContent[23] == "OFF") {
        document.getElementById("Analog1").innerHTML = "Sensor 1 field not selected ";
        analogSensor1 = "OFF";
        localStorage.analogSensor1 = analogSensor1;
    }

    if (tokenContent[27] == "ON") { // check is user input any key in this catagory
        document.getElementById("Analog2").innerHTML = "Analog Sensor 2 field name: " + tokenContent[27];
        analogSensor2 = tokenContent[27];
        localStorage.analogSensor2 = analogSensor2;

    } else if (tokenContent[27] == "OFF") {
        document.getElementById("Analog2").innerHTML = "Sensor 2 field not selected ";
        analogSensor2 = "OFF";
        localStorage.analogSensor2 = analogSensor2;
    }

    // have a confirm and restart button for user to verify data, and move on to next step if correct
    $("#confirmationPage").show();


};

//use last save configuration key's info 
function lastSavedToken() {

    $('#tokenKeyPage').hide();
    $("#confirmationPage").hide();

    userEmail = localStorage.userEmail;
    userLockPassword = localStorage.userLockPassword;
    userApi = localStorage.userApi;
    thingspeakApi = localStorage.thingspeakApi;
    channelId = localStorage.channelId;
    analogSensor1 = localStorage.analogSensor1;
    analogSensor2 = localStorage.analogSensor2;

    $('#panel_title').html("Loading...");

    setTimeout(confirm, 2000); // give it 2 second to load the functions the confirm()

};

function confirmPrelude() {

    $('#panel_title').html("Loading...");

    setTimeout(confirm, 2000); // give it 2 second to load the functions the confirm()

}

//restart the whole process if user type in wrong token key
function restart() {
    $(".key").val('');
    $(".userApi").empty();
    $(".thingspeakApi").empty();
    $(".channelID").empty();
    $(".Analog1").empty();
    $(".Analog2").empty();
    $(".userEmail").empty();
    $(".userLockPassword").empty();

    $("#confirmationPage").hide();
    $("#anotherToken").hide();

};

//move to scan device page and validate thingspeak data
function confirm() {

    if ((connectedThingspeak == false) && (connectedDevice == true)) {
        $("#AppControl").show();
        $("#AppConnectivityControl").show();
        $("#AppGlobalConnectivityControl").show();
        $("#app_control_content").hide();
        $("#app_connectivity_control_content").hide();
        $("#app_global_connectivity_control_content").hide();

        if (openGlobalConnectivityControlPanel == true) {
            openAppGlobalConnectivity();
        }
    }

    showConnectedThingspeakData();

    if (connectedDevice == true) {

        $("#lockScreen").show();
        connectThingspeak();

        if (userQuitApp == false) {

            $("#AppControl").show();
            $("#AppConnectivityControl").show();
            $("#AppGlobalConnectivityControl").show();
            $("#app_control_content").hide();
            $("#app_connectivity_control_content").hide();
            $("#app_global_connectivity_control_content").hide();

            $("#AppContent").show();
            $('.connectA5').hide();
            $('#connectA5status').hide();
            $('#geoStatus').hide();
            $('.connectA4').hide();
            $('#connectA4status').hide();
            $('#tokenKeyPage').hide();
            $("#confirmationPage").hide();
            checkVisualStatus();
        } else {
            checkVisualStatus();
        }

    } else {

        $("#lockScreen").show();
        $("#scanDevicePage").show();
        $('#tokenKeyPage').hide();
        $("#confirmationPage").hide();
        showConnectedThingspeakData();
        checkVisualStatus();
    }

};

//move to display scan device page html content
function startScanForDevice() {
    $("#tokenKeyPage").hide();
    $("#confirmationPage").hide();
    $("#scanDevicePage").show();
    $("#anotherToken").hide();

};

//reset the whole process if user wants to input new token key after connecting to device
function reset() {
    userApi = undefined;
    thingspeakApi = undefined;
    channelId = undefined;
    analogSensor1 = undefined;
    analogSensor2 = undefined;
    $(".key").val('');
    $(".userApi").empty();
    $(".thingspeakApi").empty();
    $(".channelID").empty();
    $(".Analog1").empty();
    $(".Analog2").empty();
    $(".userEmail").empty();
    $(".userLockPassword").empty();
    $("#confirmationPage").hide();
    $("#tokenKeyPage").show();
    $("#anotherToken").hide();
    $("#scanDevicePage").hide();
    var userAPIcheck = false;
    var thingspeakAPIcheck = false;
    var channelIDcheck = false;
    var analogSensor1check = false;
    var analogSensor2check = false;
    showConnectedThingspeakData();
    document.getElementById("connectedThingspeakPortals").innerHTML = "Not Connected to Thingspeak";

    connectedDevice = false;
    connectedThingspeak = false;
    checkVisualStatus();

    $(".useStoredToken").show();
    $('.useStoredToken').html("Use Stored Key: <br><b>" + localStorage.lastSavedKey + "</b>");

};