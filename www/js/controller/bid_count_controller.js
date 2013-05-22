function BidCountController($scope, $routeParams, $navigate){

    $scope.activity_name = $routeParams.activity_name

    $scope.bid_name = $routeParams.bid_name

    var get_num_of_price_items = function(){
        var bid_info = get_select_bid_info($scope.bid_name);
        var bid_result_info = order_bid_info_in_asc(bid_info);
        return get_the_num_of_each_price(bid_result_info);
    }

    $scope.num_of_price_items = get_num_of_price_items();

}