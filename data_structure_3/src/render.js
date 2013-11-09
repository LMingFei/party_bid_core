function render_bids(act_id){
    var bids=_.where(Bid.get_bids(),{activity_id:act_id})
    return bids;
}

function render_biddings(act_id,bid_name){
    var biddings= _.where(Bid.get_bids(),{activity_id:act_id,name:bid_name})[0].biddings;
    return Bidding.get_min_unique_price(biddings);
}

function render_sign_ups(act_id){
    return _.where(Sign_up.get_sign_ups(),{activity_id:act_id})
}