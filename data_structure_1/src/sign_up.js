function render_sign_ups(activity_name){
    var activities=JSON.parse(localStorage.activities);
    return _.find(activities,function(act){
        return act.name==activity_name;
    }).sign_ups
}

function Sign_up(sms_json){
    this.name=sms_json.message;
    this.phone=sms_json.phone;
}

Sign_up.prototype.insert=function(){

    var activities=Activity.get_activities()
    var current_activity=JSON.parse(Activity.get_current_activity());
    var act_in_acts= _.find(activities,function(act){
        return act.name==current_activity;
    })

    act_in_acts.sign_ups.unshift(this);
    Activity.update_activities(JSON.stringify(activities))
}


Sign_up.get_is_signing_up=function(){
    return localStorage.is_signing_up;
}



Sign_up.set_sign_ups=function(sign_ups){
    localStorage.sign_ups=JSON.stringify(sign_ups);
}

Sign_up.get_sign_ups=function(){
    return JSON.parse(localStorage.sign_ups);
}

Sign_up.get_is_signing_up=function(){
    return localStorage.is_signing_up;
}