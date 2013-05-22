function BidListController($scope, $routeParams, $navigate){
    $scope.activity_name = $routeParams.activity_name

    var get_bids = function(){
        return find_bid_list_item_in_activity_info(JSON.parse(localStorage[$scope.activity_name]));
    }

    $scope.bids= get_bids();

    $scope.refresh_bids = function(){
        $scope.bids = get_bids();
    }

    $scope.start_bid = function(){
        var new_bid = new Bid();
        new_bid.create_new_bid_name();
        new_bid.create();
        bid_status.started();
        $navigate.go("/bids/processing/", "slide")
    }
}