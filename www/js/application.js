var myModule = angular.module('myApp', ['mobile-navigate']);

myModule.run(function($route, $http, $templateCache) {
    angular.forEach($route.routes, function(r) {
        if (r.templateUrl) {
            $http.get(r.templateUrl, {cache: $templateCache});
        }
    });
});

myModule.controller('MainCtrl', function($scope, $navigate) {
    $scope.$navigate = $navigate;
});

myModule.directive('ngTap', function() {
    var isTouchDevice = !!("ontouchstart" in window);
    return function(scope, elm, attrs) {
        if (isTouchDevice) {
            var tapping = false;
            elm.bind('touchstart', function() { tapping = true; });
            elm.bind('touchmove', function() { tapping = false; });
            elm.bind('touchend', function() {
                tapping && scope.$apply(attrs.ngTap);
            });
        } else {
            elm.bind('click', function() {
                scope.$apply(attrs.ngTap);
            });
        }
    };
});


function onDeviceReady() {
}

var apply_status = new ApplyStatus();
var bid_status = new BidStatus();

var native_access;
$(document).ready(function () {


    native_access = new NativeAccess();

    if (!localStorage.ActivityNames) {
        localStorage.ActivityNames = JSON.stringify([]);
    }
    if(!localStorage.bidNames){
        localStorage.bidNames = JSON.stringify([]);
    }
    if(!localStorage.ApplyStatus){
        localStorage.ApplyStatus = 'not_start';
    }
    if(!localStorage.BidStatus){
        localStorage.BidStatus = 'not_start';
    }

});

myModule.factory('test', function() {
    //factory function body that constructs shinyNewServiceInstance
    return "test";
})



function judge_and_process_received_apply_message(json_message)
{
    var message = json_message.messages[0];
    if((message.message.substr(0,2)).toUpperCase() == 'BM')
    {
        var apply_response = new ApplyResponse(message);
        apply_response.process_base_on_apply_status();
    }
    if((message.message.substr(0,2)).toUpperCase() == 'JJ')
    {
        var bid_response = new BidResponse(message);
        bid_response.process_base_no_bid_status();
    }
}

