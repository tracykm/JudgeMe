function AlertWatchers(req, resp){
    ClearBlade.init({ request:req });
    var userId = req.params.userId;
    var userId = 'f1fb6653-ff52-4203-945b-45654a82acd4';
    
    getWatchers(userId, function(watchers) {
        var name = watchers.filter(function(w) { return w.item_id === userId })[0].name
        
        getThisWeekGoals(userId, function(goals) {
            var textBody = getBodyText(name, goals)
            
            var messaging = ClearBlade.Messaging({}, function(){});
            messaging.publish("currentGoals", JSON.stringify(goals));
            
            watchers.forEach(function(w) {
                // SendSMS(req, resp, textBody, w.phone)
            })
            
            resp.success(watchers)
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

function getBodyText(userName, goals) {
    var numFailedGoals = goals.filter(function(goal) { return !goal.completed }).length;
    var headerText = numFailedGoals ? 'Your friend ' + userName + ' is a horrible person. ' + numFailedGoals + ' failed goals' : userName + ' is killing it! ' + goals.length + ' completed goals'
    
    var goalText = goals.map(function(goal) {
        return (goal.completed ? 'COMPLETED ' : 'FAILED ') + goal.title + ' ' + goal.timeconsumingness + ' ' + getFunEmoji(goal.unpleasantness)
    }).join('  -  ')  
    
    var fullText = headerText + '  -  ' + goalText;
    return fullText
}

function getFunEmoji(unpleasantness) {
    switch(unpleasantness) {
    case 1:
        return ':)'
    case 2:
        return ':|'
    default:
        return ':('
    } 
}