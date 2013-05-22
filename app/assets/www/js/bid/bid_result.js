function order_bid_info_in_asc(bid_info)
{
    bid_info.sort(function(a,b){
        return a['price']>b['price']?1:a['price']==b['price']?0:-1;
    });
    return  bid_info;
}

function get_the_num_of_each_price(bid_info)
{
    if(bid_info.length == 0){
        return [];
    }
    var num_of_price = [];
    var price = bid_info[0].price;
    var count = 0;
    for(var i = 0;i < bid_info.length; i++)
    {
        if(bid_info[i].price == price){
            count++;
        }
        if(bid_info[i].price != price){
            var item = {"price":price,"num":count};
            num_of_price.push(item);
            price = bid_info[i].price;
            count = 1;
        }
    }
    var item = {"price":price,"num":count};
    num_of_price.push(item);
    return num_of_price;
}

function get_the_winner_price(num_of_price)
{
    var winner_price;
    for(var i = 0;i < num_of_price.length; i++)
    {
        if(num_of_price[i].num == 1){
            winner_price = num_of_price[i].price;
            break;
        }
    }
    return winner_price;
}

function get_the_winner(bid_info,winner_price)
{
    for(var i = 0;i < bid_info.length; i++)
    {
        if(bid_info[i].price == winner_price)
        {break;}
    }
    return bid_info[i];
}



