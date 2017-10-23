(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDJVeF-4v2ZBCu5sOz5mesxu113DXzP8c4",
        authDomain: "cinebd-51f5f.firebaseapp.com",
        databaseURL: "https://cinebd-51f5f.firebaseio.com",
        storageBucket: "cinebd-51f5f.appspot.com",
        messagingSenderId: "85880803011"
    };
    firebase.initializeApp(config);

    angular.module("logger", ["firebase"]).factory('messageFactory', function() {
        return {
            messages: [
                "Start machine",
                "Generate 500 error",
                "Generate 404 error",
                "Database timeout occurred",
                "Machine resource overload",
                "Access from unauthorized location",
                "Stop machine",
                "Exception at database"
            ]
        };
    });
}());
