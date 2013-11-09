function Bid(sms_json){
    this.name='竞价'+Bid.get_bids().length;
    this.activity_id=Activity.get_current_activity_id();
    this.biddings='[]';
}

Bid.prototype.create=function(){
    Bid.insert_bid_into_bids(this);
}

Bid.get_bids=function(){
    return JSON.parse(localStorage.bids)
}

Bid.get_is_bidding_up=function(){
    return localStorage.is_bidding;
}

Bid.get_current_bid=function(){
    return localStorage.current_bid;
}

Bid.set_bids=function(bids){
    localStorage.bids=bids
}

Bid.insert_bid_into_bids=function(bid){
    var bids=Bid.get_bids();
    bids.push(bid);
    Bid.set_bids(JSON.stringify(bids))
}