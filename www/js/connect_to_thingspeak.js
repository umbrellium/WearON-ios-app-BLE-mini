//check whether the thingspeak info that user keys in are correct 

function connectThingspeak() {

  //connect to channel id
  var urlContent0 = "https://api.thingspeak.com/channels/" + channelId + "/feeds/";
  $.get(urlContent0, function(data, status) {
    if (status == "success") {

      channelIDcheck = true;
    } else {
      channelIDcheck = false;
    }
    showConnectedThingspeakData();

  });

  //connect to analog sensor 1
  var urlContent1 = "https://api.thingspeak.com/channels/" + channelId + "/fields/" + analogSensor1;
  $.get(urlContent1,
    function(data, status) {
      if (status == "success") {

        analogSensor1check = true;
      } else {
        analogSensor1check = false;
      }
      showConnectedThingspeakData();
    });

  //connect to analog sensor 2
  var urlContent2 = "https://api.thingspeak.com/channels/" + channelId + "/fields/" + analogSensor2;
  $.get(urlContent2,
    function(data, status) {
      if (status == "success") {

        analogSensor2check = true;
      } else {
        analogSensor2check = false;
      }
      showConnectedThingspeakData();

    });

  showConnectedThingspeakData();
  checkVisualStatus();

};