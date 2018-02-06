function getThisWeekGoals(req, resp) {
    // log("Our request object is: "+JSON.stringify(req));
    var userId = 'f1fb6653-ff52-4203-945b-45654a82acd4';
    var goals = getThisWeekGoals(userId, function(goals) {
        resp.success(goals);
    })
}