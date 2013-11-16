function Activity(activity_name){
    this.name=activity_name;
    this.sign_ups=[];
    this.bids=[];
}
Activity.prototype.create=function(){
    localStorage.setItem("current_activity",JSON.stringify(this));
    var activities=JSON.parse(localStorage.activities);
    activities.unshift(this);
    localStorage.setItem("activities",JSON.stringify(activities));
}



Activity.get_activity_id_generator=function(){
    return localStorage.activity_id_generator;
}

Activity.get_current_activity=function(){
    return localStorage.current_activity;
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