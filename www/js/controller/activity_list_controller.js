function ActivityListController($scope){
    $scope.activities =function(){
        return JSON.parse(localStorage.ActivityNames);
    }
}