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
        };


        // log CPU
        var cpuRef = firebase.database().ref("cpu");
        var queryCpu = cpuRef.limitToLast(50);

        $scope.dataCpu = $firebaseArray(queryCpu);
        $scope.dataCpu.$watch(function(event) {
            $scope.data = _.pluck($scope.dataCpu, "$value");
        });

        $scope.chartLabels = [];
        for(var i=0; i<50; i++){
            $scope.chartLabels.push("");
        }

        $scope.options = {
            animation: false,
            scales: {
                yAxes: [{
                    id: 'y-axis',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        maxTicksLimit: 5,
                        stepSize: 20
                    }
                }]
            }
        };
    }
}());