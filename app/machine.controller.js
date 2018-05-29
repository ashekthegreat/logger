(function () {
    angular.module("logger")
        .controller("MachineController", MachineController);

    MachineController.$inject = ["$scope", "$interval", "$firebaseArray", "messageFactory"];

    function MachineController($scope, $interval, $firebaseArray, MessageFactory) {

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
        };

        // log CPU
        var cpuRef = firebase.database().ref("cpu");
        var queryCpu = cpuRef.limitToLast(1);
        $scope.cpu = $firebaseArray(queryCpu);

        $scope.startCpuLogging = function () {
            $scope.cpuInterval = $interval(function () {
                var load = Math.floor(Math.random() * (80 - 30 + 1)) + 30;
                $scope.cpu.$add(load);
            },1000);
        };
        $scope.stopCpuLogging = function () {
            $interval.cancel($scope.cpuInterval);
        }
    }
}());