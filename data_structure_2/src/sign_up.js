function Sign_up(sms_json){
    this.name=sms_json.messages[0].message;
    this.phone=sms_json.messages[0].phone;
}

Sign_up.prototype.insert=function(){
    console.log(current_activity)
    var current_activity=Activity.get_activities()[Activity.get_current_activity_id(Activity.get_act_id_by_name(Activity.get_current_activity()))]
    current_activity.sign_ups.push(this);
    Activity.activity_update(current_activity);
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