


//I JUST CAN'T GET THIS TO WORK WITH THE RESTO OF THE CODE, IT IS BEAUTIFUL BY ITSELF, BUT WITH THE REST OF THE CODE IT DOESN'T WORK!!!!
// INVESTED ABOUT 4 HOURS JUST IN THIS ISSUE WITHOUT A SOLUTION, I GOT THE CODE FROM BOOTSTRAP:
//------------------------------------------------------------------------
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
//---------------------------------------------------------------------------


$(document).ready(function () {



    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCYlLunkXjd3ICY4e-BPtXrlR6yXo64efw",
        authDomain: "trainschedule-db183.firebaseapp.com",
        databaseURL: "https://trainschedule-db183.firebaseio.com",
        projectId: "trainschedule-db183",
        storageBucket: "trainschedule-db183.appspot.com",
        messagingSenderId: "916357642418"
    };

    firebase.initializeApp(config);

    var database = firebase.database();


    $("#add-train-submit").on("click", function (event) {
        // Don't refresh the page!
        event.preventDefault();

        var train_name = $("#trainName").val().trim();
        var _destination = $("#destination").val().trim();
        var initial_time = $("#initialTime").val().trim();
        var _frequency = $("#frequency").val().trim();

        database.ref("TrainDataBase").push({
            Trains: train_name,
            Destiny: _destination,
            StartTime: initial_time,
            Recurrency: _frequency
        });

        $("#trainName").val("");
        $("#destination").val("");
        $("#initialTime").val("");
        $("#frequency").val("");
    });


    database.ref("TrainDataBase").on("child_added", function (snapshot) {

        var childData = {
            Trains: snapshot.val().Trains,
            Destiny: snapshot.val().Destiny,
            StartTime: snapshot.val().StartTime,
            Recurrency: snapshot.val().Recurrency,
            NextTrain: snapshot.val().NextTrain
        }
        console.log(childData);
        AddTrain(childData);


    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    function AddTrain(data) {

        var tablebody = $("#table-body");

        var table = $("<tr>");

        var tname = $("<td>");
        tname.text(data.Trains);

        var whereto = $("<td>");
        whereto.text(data.Destiny);

        var stime = $("<td>");
        stime.text(data.StartTime);

        var often = $("<td>");
        often.text(data.Recurrency);

        var minaway = $("<td>");
        minaway.text(data.NextTrain);

        table.append(tname);
        table.append(whereto);
        table.append(stime);
        table.append(often);
        table.append(minaway);

        tablebody.append(table);
    }
    // Here is the difficult time bit

    function updateMinutes() {
        var nowTime = moment();
        var frequencyMin = snapshot.val().Recurrency;
        var StartTime = moment(snapshot.val().StartTime, "HH:mm").subtract(1 - "years");
        var timeDifference = nowTime.diff(moment(StartTime), "minutes");
        var tRemainder = timeDifference % frequencyMin;
        var minutesAway = frequencyMin - tRemainder;
        var NextTrain = moment().add(minutesAway, "minutes");

        stime.text(moment(StartTime).format("HH:mm"));
        stime.text(data.StartTime);
        minutesAway.text(data.NextTrain);
    }
    updateMinutes();

});



/*

Usable code from other excercises:

var windowTimeout = setTimeout(function () {
    alert("Alert #1: Called automatically 1 second after page load.");
}, 1000);


---------------------------------------------

var number = 100;

//  Variable that will hold our interval ID when we execute
//  the "run" function
var intervalId;

//  When the stop button gets clicked, run the stop function.
$("#stop").on("click", stop);

//  When the resume button gets clicked, execute the run function.
$("#resume").on("click", run);

//  The run function sets an interval
//  that runs the decrement function once a second.
//  *****BUG FIX********
//  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

//  The decrement function.
function decrement() {

    //  Decrease number by one.
    number--;

    //  Show the number in the #show-number tag.
    $("#show-number").html("<h2>" + number + "</h2>");


    //  Once number hits zero...
    if (number === 0) {

        //  ...run the stop function.
        stop();

        //  Alert the user that time is up.
        alert("Time Up!");
    }
}

---------------------------------------------
$("#initialTime").text("00:00");

*/