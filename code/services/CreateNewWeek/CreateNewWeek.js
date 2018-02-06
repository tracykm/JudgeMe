function CreateNewWeek(req, resp){
    ClearBlade.init({request:req});
    getOptedInUsers(function(users) {
        
        var col = ClearBlade.Collection({ collectionName: "week" });
        var completed = numToComplete(resp, users.length); // call completed to count done
        users.forEach(function(u) {
            col.create({ start_date: getFormattedCurrentDate(), user_id: u.item_id }, function(err, data) {
                SendSMS(req, resp, 'The new week has started! This is not hand triggered', u.phone)
                completed()
            });            
        })

    })
}

function numToComplete(resp, numNeeded) {
    return function() {
        numNeeded--;
        if (numNeeded === 0) {
            resp.success('yay!')
        }
    }    
}

function getFormattedCurrentDate() {
    var d = new Date(Date.now())
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + 'T00:00:00Z'
}

function getOptedInUsers(func) {
    var query = ClearBlade.Query({ collectionName: "user" }).equalTo('opted_for_judgement', true);
    query.fetch(function(err, data) {
        func(data.DATA)
    })
}