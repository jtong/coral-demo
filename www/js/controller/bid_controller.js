function BidController($scope, $navigate){
    $scope.activity_name = localStorage.newestActivity;

    $scope.biddings = BidProcess.get_bid_info_which_in_progress($scope.activity_name);

    $scope.bid_name = '竞价' + JSON.parse(localStorage[$scope.activity_name]).bids.length;

    $scope.biddings_refresh = function(){
        $scope.biddings = BidProcess.get_bid_info_which_in_progress($scope.activity_name);
    }

    $scope.end_bid = function(){
        bid_status.ended();
        $navigate.go("/bid/result/"+$scope.bid_name, "slide");
    }

}