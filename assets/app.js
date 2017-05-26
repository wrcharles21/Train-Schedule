
$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyD4ey1C0ZLMPbQsgU6aVePnN7u0mg9avyA",
    authDomain: "train-scheduler-63351.firebaseapp.com",
    databaseURL: "https://train-scheduler-63351.firebaseio.com",
      // projectId: "train-scheduler-63351",
    storageBucket: "train-scheduler-63351.appspot.com",
      // messagingSenderId: "402807219483"
  };
  firebase.initializeApp(config);
  var train= "";
  var destination= "";
  var firstTrainArrival="";
  var frequency ="";
  var nextTrainArrival="";
  var minutesLeft="";
  var currentTime="";
  var firstTimeLayout="";
  var nextTrainLayout="";
  var timeDiff="";
  var timeRemaining="";
   


var database = firebase.database();
  

         
    $("#addTrainBtn").click(function() {

      event.preventDefault();


        train = $("#trainAdd").val().trim();
        destination= $("#trainDest").val().trim();
        firstTrainArrival=$("#firstTime").val().trim();
        frequency = $("#addMinutes").val().trim();

        firstTrainArrival= moment().minutes();
        firstTimeLayout = moment(firstTrainArrival, "hh:mm").subtract(1, "years");
        currentTime = moment();
        diffTime = moment().diff(moment(firstTimeLayout), "minutes");
        timeRemaining = timeDiff % frequency;
        minutesLeft = frequency - timeRemaining;
        nextTrainArrival = moment().add(minutesLeft, "minutes");
        nextTrainLayout = moment(nextTrainArrival).format("hh:mm");

            $("#trainData").append(train + "<br>");
            $("#destinationData").append(destination + "<br>");
            $("#freqData").append(frequency + "<br>");
            $("#arrivalInfo").append(nextTrainArrival +"<br>");
            $("#minuteData").append(minutesLeft + "<br>");


      });

      database.ref().push({
        name: train,
        dest: destination,
        freq: frequency, 
        first: firstTrainArrival,
        minutesLeft: minutesLeft,
        nextTrainArrival: nextTrainArrival

      });

       database.ref().on("child_added", function(snapshot) {

        // $("#trainData").append(snapshot.val().train + "<br>");
        // $("#destinationData").append(snapshot.val().destination + "<br>");
        // $("#freqData").append(snapshot.val().frequency + "<br>");
        // $("#arrivalInfo").append(nextTrainArrival +"<br>");
        // $("#minuteData").append(snapshot.val().minutesLeft + "<br>");
    });
});
