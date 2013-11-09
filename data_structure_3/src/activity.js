function Activity(act_name){
    this.name=act_name;
    this.id=localStorage.activity_id_generator;
}

Activity.prototype.create = function (){
    Activity.set_current_activity_id(this.id);
    Activity.insert_act_into_acts(this);
    localStorage.activity_id_generator=parseInt(this.id)+1;
}

Activity.get_activity_id_generator=function(){
    return localStorage.activity_id_generator;
}

Activity.get_current_activity_id=function(){
    return localStorage.current_activity_id;
}

Activity.get_activities=function(){
    return JSON.parse(localStorage.activities);
}

Activity.set_current_activity_id=function(act_id){
    localStorage.current_activity_id = act_id
}

Activity.set_activities=function(acts){
    localStorage.activities=acts
}

Activity.insert_act_into_acts=function(act){

    var acts=Activity.get_activities();
    acts.push(act);
    Activity.set_activities(JSON.stringify(acts))
}