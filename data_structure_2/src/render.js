function render_bids(activity_id){
    var bids=[];
    _.each(Activity.get_activities()[activity_id].bids,function(bid_name){
        bids[bids.length]["name"]=bid_name;
    })
    return bids;
}
