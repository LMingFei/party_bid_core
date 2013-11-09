
describe("Bidding", function() {


    beforeEach(function() {
        init_activity_database();
        init_two_activity();
        init_sign_ups();
        init_bids();
        localStorage.current_activity_id = "1";
        localStorage.current_bid = "竞价1";
        localStorage.is_bidding = "";
    });

    afterEach(function(){
        localStorage.clear();
    })

    it("should bid successfully when it is bidding and user has signed up", function(){
        var phone_no = "13600000000";
        var sms_json = build_sms_json("JJ12", phone_no);
        localStorage.is_bidding = "true";
        notify_sms_received(sms_json);

        var bids = JSON.parse(localStorage.bids);
        expect(bids[1].biddings.length).toBe(1);
        expect(bids[1].biddings[0].phone).toBe(phone_no);
        expect(bids[1].biddings[0].price).toBe("12");
    });

    it("should bid failed when it is not on bidding", function(){
        var phone_no = "13600000000";
        var sms_json = build_sms_json("JJ12", phone_no);
        // false
        localStorage.is_bidding = "false";
        notify_sms_received(sms_json);

        var bids = JSON.parse(localStorage.bids);
        expect(bids[1].biddings.length).toBe(0);
        // empty string
        localStorage.is_bidding = "";
        notify_sms_received(sms_json);

        var activities = JSON.parse(localStorage.activities);
        expect(bids[1].biddings.length).toBe(0);
        // no attribute
        localStorage.removeItem("is_bidding");
        notify_sms_received(sms_json);

        var activities = JSON.parse(localStorage.activities);
        expect(bids[1].biddings.length).toBe(0);
    });

    it("should bid failed when user didn't sign up", function(){
        var phone_no = "13600000001";
        var sms_json = build_sms_json("JJ12", phone_no);
        localStorage.is_bidding = "true";
        notify_sms_received(sms_json);

        var bids = JSON.parse(localStorage.bids);
        expect(bids[1].biddings.length).toBe(0);
    });

    it("should accept bid once", function(){
        var sms_json = build_sms_json("JJ12", "13600000000");
        localStorage.is_bidding = "true";
        notify_sms_received(sms_json);
        var sms_json1 = build_sms_json("JJ12", "13600000000");
        notify_sms_received(sms_json1);

        var bids = JSON.parse(localStorage.bids);
        expect(bids[1].biddings.length).toBe(1);
//        expect(bids[1].biddings[0].name).toBe("仝键");
        expect(bids[1].biddings[0].phone).toBe("13600000000");
        expect(bids[1].biddings[0].price).toBe("12");
    });



});