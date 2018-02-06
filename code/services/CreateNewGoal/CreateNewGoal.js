function CreateNewGoal(req, resp){
    ClearBlade.init({request:req});
    var week_id = req.params.week_id || '5077d0e0-b40c-4d3c-a217-9c4ef116fc36'
    var newGoal = {
        timeconsumingness: 1,
        unpleasantness: 1,
        title: 'sdfasd',
        week_id: week_id,
    };
    var callback = function (err, data) {
        if (err) {
        	resp.error("creation error : " + JSON.stringify(data));
        } else {
        	resp.success(data);
        }
    };
    var col = ClearBlade.Collection( {collectionName: "goal" } );
    col.create(newGoal, callback);
}