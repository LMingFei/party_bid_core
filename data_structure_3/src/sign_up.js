function Sign_up(sms_json){
    this.name=sms_json.messages[0].message;
    this.phone=sms_json.messages[0].phone;
    this.activity_id = Activity.get_current_activity();
}

Sign_up.prototype.create=function(){
    var sign_ups=Activity.get_sign_ups();
    Sign_up.set_sign_ups(sign_ups.push(this))
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