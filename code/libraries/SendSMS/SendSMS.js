function SendSMS(req, resp, body, number){
    
    ClearBlade.init({request:req});
    
    var maxTextLength = 160 - 38;

    while(body.length) {
        sendSMS(body.slice(0, maxTextLength), number)
        body = body.slice(maxTextLength)
    }
    resp.success('Success');

    function sendSMS(body, number){
        var options = {
        "auth":{
            user: 'ACab560244c5248f0b7d13876306adaf7c',
            pass : 'd47a5fdf17349dba72dff501bc0a00c3',
        },
        uri : "https://api.twilio.com/2010-04-01/Accounts/ACab560244c5248f0b7d13876306adaf7c/SMS/Messages.json",
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
                // resp.success(result);
            }
        });   
    }
}