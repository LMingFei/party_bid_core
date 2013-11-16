

function sign_array(){
    return _.where(Sign_up.get_sign_ups(),{activity_id:Activity.get_current_activity_id()})
}

function bid_array(){
    return _.where(Bid.get_bids(),{name:Bid.get_current_bid(),activity_id:Activity.get_current_activity_id()})[0].biddings
}