function SignUpListController($scope, $routeParams){

    $scope.players = JSON.parse(localStorage[$routeParams.activity_name]).applicant;

    $scope.activity_name = $routeParams.activity_name

    $scope.sign_up_status=function()
    {
        return localStorage.ApplyStatus
    }

    $scope.start_apply = function(){
        apply_status.started();
    }

    $scope.end_apply = function(){
        apply_status.ended();
    }

}