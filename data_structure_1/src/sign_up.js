function render_sign_ups(activity_name){
    var activities=JSON.parse(localStorage.activities);
    return _.find(activities,function(act){
        return act.name==activity_name;
    }).sign_ups
}

function Sign_up(sms_json){
    this.name=sms_json.messages[0].message;
    this.phone=sms_json.messages[0].phone;
}

Sign_up.prototype.insert=function(){

    var sign_ups=Sign_up.get_sign_ups();
    sign_ups.push(this)
    Sign_up.set_sign_ups(sign_ups)
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