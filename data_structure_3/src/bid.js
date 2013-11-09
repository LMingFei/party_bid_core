function Bid(){
    this.name='竞价'+Bid.get_bids().length;
    this.activity_id=Activity.get_current_activity_id();
    this.biddings='[]';
}

Bid.prototype.insert=function(){
    var bids=Bid.get_bids();
    bids.push(this);
    Bid.set_bids(JSON.stringify(bids))
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







function Bidding(sms_json){
    this.phone=sms_json.messages[0].phone;
    this.price=sms_json.messages[0].message;
}

Bidding.prototype.create=function(){
    var bids=Bid.get_bids();
    bids[this.name.substr(2)].biddings.push(this)
    Bid.set_bids(JSON.stringify(bids));
}