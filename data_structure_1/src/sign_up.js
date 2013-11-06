function render_sign_ups(activity_name){
    var activities=JSON.parse(localStorage.activities);
    return _.find(activities,function(act){
        return act.name==activity_name;
    }).sign_ups
}