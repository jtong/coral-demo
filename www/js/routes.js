myModule.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "pages/activity_list_page.html",
        controller: ActivityListController
    }).when("/activity/create", {
            templateUrl: "pages/activity_create_page.html",
            controller: ActivityCreateController
        }).when("/sign_ups/list/:activity_name", {
            templateUrl: "pages/apply_page.html",
            controller: SignUpListController
        }).when("/bids/list/:activity_name", {
            templateUrl: "pages/bid_list_page.html",
            controller: BidListController
        }).when("/bids/processing/", {
            templateUrl: "pages/bid_page.html",
            controller: BidController
        }).when("/bids/result/:activity_name/:bid_name", {
            templateUrl: "pages/bid_result_page.html",
            controller: BidResultController
        }).when("/bids/count/:activity_name/:bid_name", {
            templateUrl: "pages/bid_count_page.html",
            controller: BidCountController
        }).otherwise({
            redirectTo: "/"
        });
});