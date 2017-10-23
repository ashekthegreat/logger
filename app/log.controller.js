(function () {
    angular.module("logger")
        .controller("LogController", LogController);

    LogController.$inject = ["$scope", "$firebaseArray"];

    function LogController($scope, $firebaseArray) {

        $scope.load = function(org){
            var logRef = firebase.database().ref("log");
            var query;
            query = org ? logRef.orderByChild("appName").equalTo(org).limitToLast(100) : logRef.limitToLast(100);
            $scope.logs = $firebaseArray(query);
        };

        $scope.load();

        $scope.change = function(org){
            $scope.load(org);
        }

    }
}());