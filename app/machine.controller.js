(function () {
    angular.module("logger")
        .controller("MachineController", MachineController);

    MachineController.$inject = ["$scope", "$firebaseArray", "messageFactory"];

    function MachineController($scope, $firebaseArray, MessageFactory) {

        var logRef = firebase.database().ref("log");
        var query = logRef.limitToLast(200);
        $scope.logs = $firebaseArray(query);

        $scope.projectName = "";    // Babel/Kelsey
        $scope.states = MessageFactory.messages;

        $scope.sendMessage = function (state) {
            $scope.logs.$add({
                appName: $scope.projectName,
                logTime: Date.now(),
                message: state
            });
        }
    }
}());