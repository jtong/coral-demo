function ApplyStatus()
{}
ApplyStatus.prototype.do_not_start = function()
{
    localStorage.ApplyStatus = 'not_start';
}
ApplyStatus.prototype.started = function()
{
    localStorage.ApplyStatus = 'started';
}
ApplyStatus.prototype.ended = function()
{
    localStorage.ApplyStatus = 'ended';
}


function ApplyResponse(message)
{
    this.status = localStorage.ApplyStatus;
    this.message = message;
}
ApplyResponse.prototype.process_base_on_apply_status = function()
{
    this["apply_"+ this.status]();
}
ApplyResponse.prototype.apply_not_start = function()
{
    reply_application.do_not_start(this.message.phone);
}
ApplyResponse.prototype.apply_started = function()
{
     ApplicationProcess.judge_how_to_process_application(this.message);
}
ApplyResponse.prototype.apply_ended = function()
{
    reply_application.ended(this.message.phone);
}

var ApplicationProcess = {
    judge_how_to_process_application : function(message){
        var activity_name = localStorage.newestActivity;
        var same = this.is_phone_same(message.phone,activity_name);
        if(same){reply_application.repeat(message.phone);}
        if(!same){ApplySucceed.process(message,activity_name);}
    },
    is_phone_same : function(phone,activity_name)
    {
        var same = false;
        var activity_info = JSON.parse(window.localStorage[activity_name]);
        for(var i = 0;i < activity_info.applicant.length;i++)
        {
            if(activity_info.applicant[i].phone == phone)
            {
                same = true;
                break;
            }
        }
        return same;
    }
}

var ApplySucceed = {
    _render_player_list: function (activity_name) {
        var player_list = document.getElementById("player_list");
        if (player_list) {
            var scope = angular.element(player_list).scope();
            scope.$apply(function () {
                scope.players = JSON.parse(localStorage[activity_name]).applicant;
            })
        }
    },
    process : function(message,activity_name)
    {
        this.save_activity_apply_info((message.message.substr(2)).trim(),message.phone,activity_name);

//        render_apply_info(translate_apply_info_to_html(activity_name),translate_num_of_apply_to_html(activity_name));
        this._render_player_list(activity_name);
        reply_application.success(message.phone);
    },
    save_activity_apply_info : function(applicant,phone,activity_name)
    {
        var json = JSON.parse(window.localStorage[activity_name]);
        var item = {"name":applicant,"phone":phone};
        json.applicant.push(item);
        window.localStorage[activity_name] = JSON.stringify(json);
    }
}

