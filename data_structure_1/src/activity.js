function Activity(activity_name){
    this.name=activity_name;
    this.sign_ups=[];
    this.bids=[];
}
Activity.prototype.create=function(){
    Activity.update_current_activity(JSON.stringify(this.name));
    var activities=JSON.parse(localStorage.activities);
    activities.unshift(this);
    Activity.update_activities(JSON.stringify(activities));
}




Activity.get_current_activity=function(){
    return localStorage.current_activity;
}

Activity.update_current_activity=function(act){
    localStorage.current_activity=act;
}
Activity.get_activities=function(){
    return JSON.parse(localStorage.activities);
}








Activity.update_activities=function(acts){
    localStorage.activities=acts;
}

Activity.activity_update=function(activity){
    var acts=this.get_activities();
    acts[Activity.get_id_by_name(activity.name)]=activity;
    Activity.update_activities(JSON.stringify(acts));
}

Activity.get_id_by_name=function(act_name){
    var acts=Activity.get_activities();
    return _.indexOf(acts,function(act){
        return act.name==act_name
    })
}



Activity.get_current_act_obj=function(){

    var activities=Activity.get_activities();
    var current_activity=JSON.parse(Activity.get_current_activity());
    return _.find(activities,function(act){
        return act.name==current_activity;
    })
}