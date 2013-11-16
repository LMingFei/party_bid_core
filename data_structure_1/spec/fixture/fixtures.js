function init_activity_database(){
    localStorage.current_activity = "";
    localStorage.activities = "[]";
    localStorage.is_bidding = "";
    localStorage.is_signing_up = "";
}

function init_two_activity() {
    var activities = JSON.parse(localStorage.activities);
    var two_activities = [{
        name: "first activity",
        sign_ups: [],
        bids: []
    }, {
        name: "second activity",
        sign_ups: [],
        bids: []
    }];
    activities.push(two_activities[0],two_activities[1]);
    localStorage.activities = JSON.stringify(activities);
    localStorage.current_activity = JSON.stringify(two_activities[1]["name"]);
}



