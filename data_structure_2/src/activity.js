function Activity(activity_name){
    this.id=(parseInt(localStorage.activity_id_generator));
    this.name=activity_name;
    this.sign_ups=[];
    this.bids=[];
    this.biddings={};
}

Activity.prototype.create=function(){
    var activity_ids=Activity.get_activity_ids();
    activity_ids.push(this.id.toString());
    localStorage.activity_ids=JSON.stringify(activity_ids)

    var activities=JSON.parse(localStorage.activities);
    activities[this.id]={name:this.name,sign_ups:this.sign_ups,bids:this.bids,biddings:this.biddings}
    localStorage.activities=JSON.stringify(activities);

    localStorage.current_activity=this.id;

    localStorage.activity_id_generator=this.id+1;

}

//Activity.prototype.active=function(){
//    localStorage.current_activity=this.id;
//}

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


Activity.get_current_activity_id=function(){
    return localStorage.current_activity_id;
}

Activity.update_activities=function(acts){
    localStorage.activities=acts;
}

Activity.activity_update=function(activity){
    var acts=this.get_activities();
    acts[Activity.get_act_id_by_name(activity.name)]=activity;
    Activity.update_activities(JSON.stringify(acts));
}


Activity.get_act_id_by_name=function(activity_name){
    var activities=Activity.get_activities();
    var ids=Activity.get_activity_ids();
    return _.find(ids,function(id){
        return activities[id].name==activity_name
    })
}


Activity.get_username_by_phone=function(phone){
    var signs=Activity.get_activities()[Activity.get_current_activity_id()].sign_ups;
    return _.find(signs,function(sign){
        return sign.phone==phone;
    }).name
}