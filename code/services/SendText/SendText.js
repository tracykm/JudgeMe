function SendText(req, resp){
    
    ClearBlade.init({request:req});
    sendSMS('another test', '(+1 512-689-1979)');

    function sendSMS(body, number){
        var options = {
        "auth":{
            user: 'ACab560244c5248f0b7d13876306adaf7c',
            pass : 'd47a5fdf17349dba72dff501bc0a00c3',
        },
        uri : "https://api.twilio.com/2014-04-01/Accounts/ACab560244c5248f0b7d13876306adaf7c/SMS/Messages.json",
        "body":{
            "Body" : body,
            "To" : number,
            "From": '(+1 512-975-3006)'
        },
        "form":true
    };
    
        var requestObject = ClearBlade.http().Request();
        requestObject.post(options,function(err,result){
            if(err){
                resp.error("Failed");
            }else{
                resp.success(result);
            }
        });   
    }
}