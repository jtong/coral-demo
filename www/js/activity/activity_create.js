function is_the_same_activity_name_to_be_create(activity_name)
{
    var activity_names = JSON.parse(localStorage.ActivityNames);
    for (var i = 0;i < activity_names.length;i++)
    {
        if(activity_name == activity_names[i])
        {return true;break}
    }
}

function save_newest_activity_name() {
    localStorage.newestActivity = $('#activity_name').val();
    return localStorage.newestActivity;
}

function save_select_activity_name(activity_name){
    localStorage.selectActivity = activity_name;
}


