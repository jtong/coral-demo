function find_bid_list_item_in_activity_info(activity_info)
{
    var bid_list_items = [];
    for(var bid_num in activity_info.bids)
    {
        for(var bid_name in activity_info.bids[bid_num])
        {
            bid_list_items[bid_num] = bid_name;
        }
    }
    return  bid_list_items;
}

function get_select_bid_info(bid_name) {
    var activity_name = localStorage.selectActivity;
    var activity_info = JSON.parse(localStorage[activity_name]);
    var bid_id = parseInt(bid_name.substr(2, 1));
    var bid_info = activity_info.bids[bid_id - 1][bid_name];
    return bid_info;
}