function Activity(activity_name){
    this.name=activity_name;
    this.sign_ups=[];
    this.bids=[];
}
Activity.prototype.create=function(){
    localStorage.setItem("current_activity",JSON.stringify(this));
    activities=JSON.parse(localStorage.activities);
    activities.unshift(this);
    localStorage.setItem("activities",JSON.stringify(activities));
}