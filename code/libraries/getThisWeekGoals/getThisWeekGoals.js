function getThisWeekGoals(userId, func) {
    var mostRecentWeek = ClearBlade.Query({ collectionName:"week" }).equalTo("user_id", userId).descending("start_date").setPage(1, 1);
    mostRecentWeek.fetch(function(err, data) {
        var currentWeekId = data.DATA[0].item_id
        var query = ClearBlade.Query({collectionName:"goal"}).equalTo("week_id", currentWeekId);
        query.fetch(function(err, data) {
            func(data.DATA)
        })
    });
}