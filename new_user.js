/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-11-26
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
var new_user=function(){};

new_user.factory=function(type,sms){
    var user;
    switch (type){
        case "sign_up":
            user=new Sign_up(sms);break;
        case "bidding":
            user=new Bidding(sms);break;
        default :
            user=new_user();
    }
    return user;
}

new_user.insert=function(type,sms){
    new_user.factory(type,sms).insert();
}