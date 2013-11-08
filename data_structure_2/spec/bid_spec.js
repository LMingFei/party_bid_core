
describe("Bid", function() {


    beforeEach(function() {
        init_activity_database();
        var activities = JSON.parse(localStorage.activities);
        var activity = new Activity("first activity");
        activities.push(activity);
        localStorage.activities = JSON.stringify(activities);
        localStorage.current_activity_id = 0;
        localStorage.activity_ids='[0]'
        localStorage.is_bidding = "";
        localStorage.current_activity="first activity"
    });

    afterEach(function(){
        localStorage.clear();
    })

    it("should create new bid", function(){
        create_new_bid("1");

        var activities =JSON.parse(localStorage.activities);
        expect(Object.getOwnPropertyNames(activities[0].biddings).length).toBe(1);
        expect(JSON.stringify(activities[0].biddings["竞价1"])).toBe("[]");
    });

});