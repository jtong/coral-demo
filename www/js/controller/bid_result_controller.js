function BidResultController($scope, $routeParams, $navigate){

    $scope.activity_name = $routeParams.activity_name

    $scope.bid_name = $routeParams.bid_name

   // console.log($routeParams.bid_name) ;
    var get_biddings = function(){
        var activity = JSON.parse(localStorage[$scope.activity_name]);
        var bid_index = parseInt($scope.bid_name.substr(2, 1)) - 1;
        return activity.bids[bid_index][$scope.bid_name];
    }

    $scope.biddings = get_biddings();

}