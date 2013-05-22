function ActivityCreateController($scope, $navigate){
  $scope.create_activity =function(){
      var activity_name = $('#activity_name').val();
      if(is_the_same_activity_name_to_be_create(activity_name)){
          alert("活动名称不能重复");
      }else{
          var activity = new Activity(activity_name);
          activity.create();
          save_newest_activity_name();
          save_select_activity_name(activity_name);
          apply_status.do_not_start();
          bid_status.do_not_start();
          $navigate.go("/", "slide");
      }
  }
}