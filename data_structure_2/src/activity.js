function Activity(activity_name){
    this.id=(parseInt(localStorage.activity_id_generator));
    this.name=activity_name;
    this.sign_ups=[];
    this.bids=[];
    this.biddings={};
}

Activity.prototype.create=function(){
    var activity_ids=JSON.parse(localStorage.activity_ids);
    activity_ids.push(this.id.toString());
    localStorage.activity_ids=JSON.stringify(activity_ids)

    var activities=JSON.parse(localStorage.activities);
    activities[this.id]={name:this.name,sign_ups:this.sign_ups,bids:this.bids,biddings:this.biddings}
    localStorage.activities=JSON.stringify(activities);

    localStorage.current_activity=this.id;

    localStorage.activity_id_generator=this.id+1;

}

Activity.prototype.active=function(){
    localStorage.current_activity=this.id;
}

Activity.get_activity_id_generator=function(){
    return localStorage.activity_id_generator;
}

Activity.get_current_activity=function(){
    return localStorage.current_activity;
}

Activity.get_activity_ids=function(){
    return JSON.parse(localStorage.activity_ids);
}

Activity.get_activities=function(){
    return JSON.parse(localStorage.activities);
}

Activity.get_current_bid=function(){
    return localStorage.current_bid;
}

Activity.get_current_activity_id=function(){
    return localStorage.current_activity_id;
}

Activity.get_is_signing_up=function(){
    return localStorage.is_signing_up;
}

Activity.get_is_bidding_up=function(){
    return localStorage.is_bidding;
}

Activity.update_activities=function(acts){
    localStorage.activities=acts;
}

Activity.activity_update=function(activity){
    var acts=this.get_activities();
    acts[get_act_id_by_name(activity.name)]=activity;
    Activity.update_activities(JSON.stringify(acts));
}
