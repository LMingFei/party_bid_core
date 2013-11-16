function render_bids(activity_id){
    var bids=[];
    _.each(Activity.get_activities()[activity_id].bids,function(bid_name){
        bids[bids.length]={name:bid_name};
    })
    return bids;
}

function render_biddings(activity_id,bid_name){
    var bid= Bidding.get_min_unique_price(Activity.get_activities()[activity_id].biddings[bid_name])
    bid[0].name=Activity.get_username_by_phone(bid[0].phone)
    return bid;
}

function render_sign_ups(activity_name){
    var sign_ups=[]
    _.each(Activity.get_activities()[Activity.get_act_id_by_name(activity_name)].sign_ups,function(sign){
        sign_ups[sign_ups.length]={name:sign.name}
    })
    return sign_ups
}
