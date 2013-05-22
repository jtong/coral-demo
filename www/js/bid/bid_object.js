function Bid ()
{
}
Bid.prototype.create_new_bid_name = function(){
    this.activity_name = localStorage.newestActivity;
    this.activity_info = JSON.parse(localStorage[this.activity_name]);
    this.bid_id = this.activity_info.bids.length + 1;
    this.name = "竞价"+ this.bid_id;
};
Bid.prototype.create = function(){
    var bid_obj = {};
    bid_obj[this.name] = [];
    this.activity_info.bids.push(bid_obj);
    localStorage.newestBid = this.name;
    localStorage[this.activity_name] = JSON.stringify(this.activity_info);
};


function BidStatus()
{}
BidStatus.prototype.started = function()
{
    localStorage.BidStatus = 'started';
};
BidStatus.prototype.ended = function()
{
    localStorage.BidStatus = 'ended';
};
BidStatus.prototype.do_not_start = function()
{
    localStorage.BidStatus = 'not_start';
};

function BidResponse(message)
{
    this.status = localStorage.BidStatus;
    this.message = message;
}
BidResponse.prototype.process_base_no_bid_status = function()
{
    this['bid_'+this.status]();
};
BidResponse.prototype.bid_not_start = function()
{
    reply_bid.do_not_start(this.message.phone);
};
BidResponse.prototype.bid_started = function()
{
    BidProcess.judge_how_to_process_bid(this.message);
};
BidResponse.prototype.bid_ended = function()
{
    reply_bid.ended(this.message.phone);
};


var BidProcess = {
    judge_how_to_process_bid : function(message){
        var activity_name = localStorage.newestActivity;
        var is_applied = this.is_bidder_applied(message.phone,activity_name);
        if(is_applied){
            var is_bid = this.is_bidder_offered_price(message.phone,activity_name);
            if(is_bid){reply_bid.repeat(message.phone);}
            else{
                BidSuccess.process(message,activity_name);
            }
        }else{
            reply_bid.have_not_applied(message.phone);
        }
    },
    is_bidder_applied : function(phone,activity_name){
        var result = false;
        var application_info = JSON.parse(localStorage[activity_name]);
        for (var i = 0; i < application_info.applicant.length; i++)
        {
            if(phone == application_info.applicant[i].phone)
            {
                result = true;
                break;
            }
        }
        return result;
    },
    is_bidder_offered_price : function(phone,activity_name)
    {
        var result = false;
        var bid_info = this.get_bid_info_which_in_progress(activity_name);
        for(var i = 0; i < bid_info.length; i++)
        {
            if(phone == bid_info[i].phone)
            {
                result = true;
                break;
            }
        }
        return result;
    },
    get_bid_info_which_in_progress : function(activity_name)
    {
        var activity_info = JSON.parse(localStorage[activity_name]);
        var bid_id = activity_info.bids.length;
        var bid_name = '竞价' + bid_id;
        var bid_in_progress = activity_info.bids[bid_id-1][bid_name];
        return bid_in_progress;
    }
};

var BidSuccess = {
    process : function(message,activity_name)
    {
        var applicant = this.get_bidder_name_from_apply_info(message.phone,activity_name);
        this.save_bid_info(applicant,message.phone,(message.message.substr(2)).trim(),activity_name);
        //render_bid_info_in_bid_page(activity_name);
        var bid_info_list = document.getElementById("bid_info_list");
        if(bid_info_list){
            var scope = angular.element(bid_info_list).scope();
            scope.$apply(function(){
                scope.biddings_refresh();
            })
        }
        reply_bid.success(message.phone);
    },
    save_bid_info : function(applicant,phone,price,activity_name)
    {
        var activity_info = JSON.parse(localStorage[activity_name]);
        var bid_id = activity_info.bids.length;
        var bid_name = "竞价" + bid_id;
        var item = {"name":applicant,"phone":phone,"price":price};
        activity_info.bids[bid_id-1][bid_name].push(item);
        localStorage[activity_name] = JSON.stringify(activity_info);
    },
    get_bidder_name_from_apply_info :function(phone,activity_name)
    {
        var activity_info = JSON.parse(localStorage[activity_name]);
        for(var i = 0; i < activity_info.applicant.length; i++)
        {
            if(phone == activity_info.applicant[i].phone)
            {
                return  activity_info.applicant[i].name;
            }
        }
    }
}